define(['sys', 'mixins.wrapper'], function(sys, MixinsWrapper) {
  /**
   * A room is responsible for holding a list of clients that connected
   * to this room, adding/removing clients, broadcasting to all clients or
   * to a specific client.
   *
   * @constructor
   * @class Room
   * @param {String} id The id of the room.
   */
  var Room = function(id) {

    console.log('Creating a new room with id', id);

    /**
     * The id of this room
     *
     * @type {String}
     */
    this.id = id || '';

    /**
     * A reference to this specific instance.
     *
     * @private
     * @type {Room}
     */
    var _self = this;

    /**
     * The client that created the room and that manages the entir room
     *
     * @private
     * @type {Client}
     */
    var _roomOwnerClient;

    /**
     * A hash map with all the sockets
     *
     * @private
     * @type {Object}
     */
    var _roomOwners = {};



    var _roomOwnerChilds = {};



    var _roomOwnerChildSolo = {};


    


    //var _roomInstruments = {}; // instruments to client id matrix

    var _instruments = {};

    //var _clientsPageIds = {};



    var _include = function(arr,obj) {
      return (arr.indexOf(obj) != -1);
    };



    /**
     * A hash map with all the sockets
     *
     * @private
     * @type {Object}
     */
    var _clients = {}; // this references only "instrument control" client no master or child rooms clients

    /**
     * It is triggered when the room owner is disconnected in purpose and
     * it then removes all the clients from the room.
     *
     * @private
     * @function
     */
    var _removeAllFromRoom = function() {
      for (id in _clients) {
        _self.notifyClient(id, 'room_closed', {room: _self.id});
        _self.removeClient(id);
      }

      /*var fs = require('fs'); // ./clients/sequencer/data.txt path might be unix dependant due to use of backslashes
      fs.writeFile('./clients/sequencer/data.txt', 'server-not-ready', function (err) {
        if (err) throw err;
          console.log('audio server not ready');
      }); */

    };

    /**
     * It is triggered when the client triggers a disconnect event
     *
     * @private
     * @function
     * @param {Object} data The data of the event.
     */
    var _onClientBye = function(data) {
      console.log('Removing client with id', data.client, 'from room with id', _self.id);
      if (data.client === _roomOwnerClient.id) {
        _removeAllFromRoom();
      } else {
        // Inform the room creator that a client left.
        _roomOwnerClient.send('client_left', {client: data.client});
      }

      //console.log('_onClientBye: ', data, _clients[data.client]);

      if (typeof _clients[data.client] !== 'undefined') {
        var cltId = _clients[data.client].id;
        delete _instruments[cltId]; 
      }

      delete _clients[data.client];

    };

    var _onGetInstrument = function(data) {
      _roomOwnerClient.send('get_instrument', {client: data.client});

      
      var soloClients = [];
      
      if (Object.keys(_roomOwnerChildSolo).length>0) {            
        for (idSolo in _roomOwnerChildSolo) {
          /*console.log('idSolo', idSolo);
          if (id==idSolo) { // exclude room child solos from receiving any new get instrument after the one they got by calling their solo child room in the 1st place
            //delete _roomOwnerChilds[id];                              
          } else {
            if (typeof _roomOwnerChilds[id] !== 'undefined') {
              _roomOwnerChilds[id].send('get_instrument', {client: data.client});
            }
          } */
          soloClients.push(idSolo);
        }  
      }
    
      if (Object.keys(_roomOwnerChilds).length>0) {
        for (id in _roomOwnerChilds) {
          //*
          if (typeof _roomOwnerChilds[id].pageId !== 'undefined') {

            var rezzult = _include(soloClients, id);
            if (typeof rezzult == 'undefined') {
              _roomOwnerChilds[id].send('get_instrument', {client: data.client});          
            } 

          } else { //*/
            _roomOwnerChilds[id].send('get_instrument', {client: data.client});          
          }


          //
          //console.log('child room id:', id);
        } 
      } 

    };

    var _onNote = function(data) {
      _roomOwnerClient.send('note', {client: data.client, args: data.args});

      if (Object.keys(_roomOwnerChilds).length>0) {
        //console.log('_roomOwnerChilds:', _roomOwnerChilds); 
        for (id in _roomOwnerChilds) {
          _roomOwnerChilds[id].send('note', {client: data.client, args: data.args});
          //console.log('child room id:', id);
        } 
      } 

    };

    var _onInstrument = function(data) {
      var receiver = _clients[data.args.receiver];
      if (receiver) {
        receiver.send('instrument', data.args.instrument);
        _instruments[receiver.id] = data.args.instrument;
      }

      //if (typeof _instruments[receiver]== 'undefined') {
        
      //}
        
      //console.log('ins: ',receiver.pageId); // _instruments

      //console.log('insLength: ', Object.keys(_instruments).length);






    };

    var _onModifierChange = function(data) {
      _roomOwnerClient.send('modifier_change', {client: data.client, args: data.args});

      if (Object.keys(_roomOwnerChilds).length>0) {
        for (id in _roomOwnerChilds) {
          _roomOwnerChilds[id].send('modifier_change', {client: data.client, args: data.args});
          //console.log('child room id:', id);
        } 
      } 

    };

    var _onSeqencerBeat = function(data) {
      _self.broadcast('seq_beat', data);
      //_self.broadcast('note', data);
    };

    /**
     * Registers all the event listeners for a client
     *
     * @private
     * @function
     * @param {Client} client The client that we want to register for it's events.
     */
    var _addEventListeners = function(client) {
      console.log('Registering room specific event listeners for client', client.id);
      client.on('get_instrument', _onGetInstrument)
      .on('instrument', _onInstrument)
      .on('modifier_change', _onModifierChange)
      .on('note', _onNote)
      .on('disconnect', _onClientBye)
      .on('byebye', _onClientBye)
      .on('seq_beat', _onSeqencerBeat);
    };

    /**
     * Registers a room owner
     *
     * @public
     * @function
     * @param {Client} client The client to join this room.
     * @param {Function} callback The callback to be executed on success.
     * @param {Function} errback The callback to be executed on error.
     * @return {Room} This instance.
     */
    this.registerRoomOwner = function(id, client,  callback, errback) {
      var alreadyExists = false;
      console.log('Registering as room owner the client with id', client.id);

      /*  
      if (typeof _roomOwners[client.id] !== 'undefined') {
        _roomOwners[client.id] = null;
        alreadyExists = true;
      } //*/

      var ids = id.split('_'); 

      if (ids[1]=='child' && typeof ids[2] !== 'undefined' && ids[2]!=='nopageid') {
        client.pageId = ids[2];
      }


      // first room creation by client requested = becomes master room
      if /*(Object.keys(_roomOwners).length==0)*/ (ids[1]=='nochild') {
        _roomOwnerClient = client;
      }  else if (ids[1]=='child' && typeof ids[2] !== 'undefined' && ids[2]!=='nopageid') {
        //_roomOwnerChildSolo[client.id] = client;
        _roomOwnerChilds[client.id] = client;



        for (id in _roomOwnerChilds) {
          for (clientId in _clients) {
             
            if ( _roomOwnerChilds[id].pageId==_clients[clientId].pageId /*&& typeof _clients[clientId].loaded == 'undefined'*/ ) {
              //console.log('pageId: ', id); //.pageId
              client.loaded = 1;
              _roomOwnerChildSolo[client.id] = client;
              _roomOwnerChilds[id].send('get_instrument', {client: clientId, insId: _instruments[clientId].id});              
              //console.log('ins sent to ins room solo');
            } 
          }
        }
        











      }  else if (ids[1]=='child' /*|| typeof ids[2] == 'undefined' ||*/ && ids[2]=='nopageid') { // additional room creation requested = become slave rooms
        _roomOwnerChilds[client.id] = client;
      }

      //_roomOwnerClient = client;

      _roomOwners[client.id] = client;

      if (!alreadyExists) {
        console.log('Adding event listeners for', client.id);
        _addEventListeners(client);

      }

      callback({room: this.id, client: client.id});


      /*if (ids[1]=='child' && typeof ids[2] !== 'undefined' && ids[2]!=='nopageid') {

        for (id in _roomOwnerChilds) {
          for (clientId in _clients) {
             console.log('pageId: ', _instruments[clientId]); //.pageId
            if (_roomOwnerChilds[id].pageId==_clients[clientId].pageId) {
              _roomOwnerChilds[id].send('get_instrument', {client: clientId});
              //console.log('ins sent to ins room solo');
            } 
          }
        }
      }*/



      return this;

    };

    /**
     * Registers a client to this room
     *
     * @public
     * @function
     * @param {Client} client The client to join this room.
     * @param {Function} callback The callback to be executed on success.
     * @param {Function} errback The callback to be executed on error.
     * @return {Room} This instance.
     */
    this.registerClient = function(client, callback, errback) {
      var alreadyExists = false;
      console.log('Need to register client!', client);
      if (typeof _clients[client.id] !== 'undefined') {
        _clients[client.id] = null;
        alreadyExists = true;
      }

      _clients[client.id] = client;
      //_clientsPageIds = client.pageId;

      if (!alreadyExists) {
        _addEventListeners(client);
      }

      callback({room: this.id, client: client.id, pwd: client.pwd});

      if (Object.keys(_roomOwnerChilds).length>0) {
        for (id in _roomOwnerChilds) {
          _roomOwnerChilds[id].send('client_joined', {client: client.id, pwd: client.pwd});
        } 
      } 
      

      if (_roomOwnerClient) {
        // Inform the room owner that a new client has
        // connected to the room
        _roomOwnerClient.send('client_joined', {client: client.id, pwd: client.pwd});


      }

      return this;
    };

    /**
     * Removes a client from this room
     *
     * @public
     * @function
     * @param {String} id The id of the client that we need to remove.
     * @return {Room} The instance of this class.
     */
    this.removeClient = function(id) {
      if (typeof _clients[id] !== 'undefined') {
        delete _clients[id];
      }
      return this;
    };

    /**
     * Notifies a client
     *
     * @public
     * @function
     * @param {String} id The id of the client.
     * @param {String} messageType The type of the message type  of the message
     *     to send to the client.
     * @param {Object} args The arguments to send to the client.
     * @return {Room} The instance of this class.
     */
    this.notifyClient = function(id, messageType, args) {
      if (typeof _clients[id] !== 'undefined') {
        _clients[id].send(messageType, args);
      }
    };

    this.notifyChildRoom = function(id, messageType, args) {
      if (typeof _roomOwnerChilds[id] !== 'undefined') {
        _roomOwnerChilds[id].send(messageType, args);
      }
    };    

    /**
     * Broadcasts to all clients a message
     * @param {String} messageType The type of the message type  of the message
     *     to send to the client.
     * @param {Object} args The arguments to send to the client.
     * @return {Room} The instance of this class.
     */
    this.broadcast = function(messageType, args) {
      for (id in _clients) {
        _self.notifyClient(id, messageType, args);
      }

      if (Object.keys(_roomOwnerChilds).length>0) {
        for (id in _roomOwnerChilds) {
          _self.notifyChildRoom(id, messageType, args);
        } 
      } 


      return this;
    };

    /**
     * Disposes the room by informing all clients and removing them
     * from the room.
     *
     * @public
     * @function
     * @return {Room} The instance fo tihs class.
     */
    this.dispose = function() {
      _removeAllFromRoom();
      _roomOwnerClient.send('room_closed', {room: this.id});
      _roomOwnerClient = null;
    };

  };

  sys.inherits(Room, MixinsWrapper);

  return Room;

});
