define(
	['sys', 'events', 'enum.events'],
	function (sys, events, enumEvents)
	{
		/**
		* A room is responsible for holding a list of clients that connected
		* to this room, adding/removing clients, broadcasting to all clients or
		* to a specific client.
		*
		* @constructor
		* @class Room
		* @param {String} id The id of the room.
		*/
		var Room = function (id)
		{
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

      var roomId = _self.id;

			/**
			* The client that created the room and that manages the entire room
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
			var _roomOwnerChildren = {};
			var _roomOwnerChildSolo = {};
			//var _roomInstruments = {}; // instruments to client id matrix
			var _instruments = {};
			//var _clientsPageIds = {};

			var _include = function (arr, obj)
			{
				return (arr.indexOf(obj) != -1);
			};

      //var _path = '/home/solam/loops.solam.co/public/editor/'; // online version
      var _path = '/media/iwan/data/tweb/2015-09-29_jam_session/app/StepDaddy/clients/';      

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
			var _removeAllFromRoom = function ()
			{
				for (id in _clients)
				{
					_self.notifyClient(id, global.Events.ROOM_CLOSED, {room: _self.id});
					_self.removeClient(id);
				}

				/*
				var fs = require('fs'); // ./clients/sequencer/data.txt path might be unix dependant due to use of backslashes
				writeFile('./clients/sequencer/data.txt', 'server-not-ready', function (err) {
				if (err) throw err;
				console.log('audio server not ready');
				});
				*/
			};

			/**
			* It is triggered when the client triggers a disconnect event
			*
			* @private
			* @function
			* @param {Object} data The data of the event.
			*/
			var _onClientBye = function (data)
			{
				//console.log('Removing client with id', data.client, 'from room with id', _self.id);



        if ( typeof _roomOwnerClient !== 'undefined' ) {
          if (data.client === _roomOwnerClient.id) {
            _removeAllFromRoom();

            /*var fs = require('fs');
            fs.writeFile(_path + roomId + ".room", "0", function(err) {
              if (err) {
                return console.log(err);
              }
              //console.log(roomId + ".room = 0");
            }); */

            var fs = require('fs');

            fs.stat(_path + roomId + ".room", function (err, stats) {
               //console.log(stats); // here we got all information of file in stats variable

               if (err) {
                   return console.error(err);
               }

               fs.unlink(_path + roomId + ".room",function(err){
                    if(err) return console.log(err);
                    console.log(roomId + ".room"+ ' deleted successfully');
               });  
            });        



          } else {
            // Inform the room creator that a client left.
            _roomOwnerClient.send(global.Events.CLIENT_LEFT, {client: data.client});


            if ( Object.keys(_roomOwnerChildren).length > 0 ) {
              for (id in _roomOwnerChildren) {
                _roomOwnerChildren[id].send(global.Events.CLIENT_LEFT, {client: data.client});
              } 
            } 


          }
        }


        // if last child room remaining delete xxxx.room file
				

				if (typeof _clients[data.client] !== 'undefined')
				{
					var cltId = _clients[data.client].id;
					delete _instruments[cltId];
          console.log('Bye: ', _clients[data.client].id.substr(_clients[data.client].id.length - 4));
				}

				delete _clients[data.client];
			};

			var _onGetInstrument = function (data)
			{

        if ( typeof _roomOwnerClient !== 'undefined' ) {
				  _roomOwnerClient.send(global.Events.GET_INSTRUMENT, {client: data.client});
        }

				var soloClients = [];

				if (Object.keys(_roomOwnerChildSolo).length > 0)
				{
					for (idSolo in _roomOwnerChildSolo)
					{
						/*
						console.log('idSolo', idSolo);
						if (id==idSolo)
						{ // exclude room child solos from receiving any new get instrument after the one they got by calling their solo child room in the 1st place
							//delete _roomOwnerChildren[id];                              
						}
						else
						{
							if (typeof _roomOwnerChildren[id] !== 'undefined')
							{
								_roomOwnerChildren[id].send('get_instrument', {client: data.client});
							}
						}
						*/
						soloClients.push(idSolo);
					}
				}

				if (Object.keys(_roomOwnerChildren).length > 0)
				{
					for (id in _roomOwnerChildren)
					{
						if (typeof _roomOwnerChildren[id].pageId !== 'undefined') {

							var rezzult = _include(soloClients, id);

							if (typeof rezzult == 'undefined') {
								_roomOwnerChildren[id].send(global.Events.GET_INSTRUMENT, {client: data.client});
                console.log('_roomOwnerChildren[id].pageId', _roomOwnerChildren[id].pageId);
							}

						} else {
							_roomOwnerChildren[id].send(global.Events.GET_INSTRUMENT, {client: data.client});
						}
					}
				}
			};

			var _onNote = function (data)
			{
        if ( typeof _roomOwnerClient !== 'undefined' ) {
  			  _roomOwnerClient.send(global.Events.NOTE, {client: data.client, args: data.args});
        }
  //_self.notifyChildren(global.Events.NOTE, {client: data.client, args: data.args});
  //_self.notifyClients(global.Events.NOTE, data);


        if ( Object.keys(_roomOwnerChildren).length > 0 ) {
          for (id in _roomOwnerChildren) {
            _roomOwnerChildren[id].send('note', {client: data.client, args: data.args});
          } 
        } 

			};

			var _onInstrument = function (data)
			{
				var receiver = _clients[data.args.receiver];

				if (receiver)
				{
					receiver.send(global.Events.INSTRUMENT, data.args.instrument);
					_instruments[receiver.id] = data.args.instrument;
				}

				//if (typeof _instruments[receiver]== 'undefined') {
				//}
				//console.log('ins: ',receiver.pageId); // _instruments
				//console.log('insLength: ', Object.keys(_instruments).length);
			};

			var _onModifierChange = function (data)
			{

        if ( typeof _roomOwnerClient !== 'undefined' ) {
				  _roomOwnerClient.send(global.Events.MODIFIER_CHANGE, {client: data.client, args: data.args});
        }

				if (Object.keys(_roomOwnerChildren).length > 0)
				{
					for (id in _roomOwnerChildren)
					{
						_roomOwnerChildren[id].send(global.Events.MODIFIER_CHANGE, {client: data.client, args: data.args});
						//console.log('child room id:', id);
					}
				}
			};

			var _onSeqencerBeat = function (data)
			{
				_self.broadcast(global.Events.SEQUENCER_BEAT, data);
				//_self.broadcast('note', data);
			};



// start of section lacking childroom support

			//demande de tracks venant du device, vers le sequencer
			var _onGetTracks = function (data)
			{
        if ( typeof _roomOwnerClient !== 'undefined' ) {
				  _roomOwnerClient.send(global.Events.GET_TRACKS, {client: data.client});
        }  
			}

			//réponse du séquencer, à destination du device
			var _onTracks = function (data)
			{
				var receiver = _clients[data.args.receiver];

				if (receiver)
				{
					receiver.send(global.Events.TRACKS, data.args.tracks);
				}
			}



      //demande d'orchestration venant du device, vers le sequencer
      var _onGetSession = function (data)
      {
        if ( typeof _roomOwnerClient !== 'undefined' ) {
          _roomOwnerClient.send(global.Events.GET_SESSION, {client: data.client});
        }
      }

      //réponse du séquencer, à destination du device
      var _onSession = function (data)
      {
        //console.log('_onSession');
        var receiver = _clients[data.args.receiver];

        if (receiver)
        {
          receiver.send(global.Events.SESSION, data.args.session);
        }
      }


// end of section lacking childroom support



			/**
			* Registers all the event listeners for a client
			*
			* @private
			* @function
			* @param {Client} client The client that we want to register for it's events.
			*/
			var _addEventListeners = function (client)
			{
				//console.log('Adding room specific event listeners for client', client.id);

				client.on(global.Events.GET_INSTRUMENT, _onGetInstrument)
					.on(global.Events.INSTRUMENT, _onInstrument)
					.on(global.Events.GET_TRACKS, _onGetTracks) //permettant de demander les tracks en cours
					.on(global.Events.TRACKS, _onTracks) //permettant de recevoir les tracks en cours
          .on(global.Events.GET_SESSION, _onGetSession) //permettant de demander l'orchestration en cours
          .on(global.Events.SESSION, _onSession) //permettant de recevoir l'orchestration en cours          
					.on(global.Events.MODIFIER_CHANGE, _onModifierChange)
					.on(global.Events.NOTE, _onNote)
					.on(global.Events.DISCONNECT, _onClientBye)
					.on(global.Events.BYEBYE, _onClientBye) // Why DISCONNECT + BYEBYE: this seems redundant?
					.on(global.Events.SEQUENCER_BEAT, _onSeqencerBeat);
			};

			/**
			* Registers a room owner and its children
			*
			* @public
			* @function
			* @param {Client} client The client to join this room.
			* @param {Function} callback The callback to be executed on success.
			* @param {Function} errback The callback to be executed on error.
			* @return {Room} This instance.
			*/
			this.registerRoomOwnerAndRoomChildren = function (id, client, callback, errback)
			{			


        var fs = require('fs');

        if (fs.existsSync(_path + roomId + '.room')) {          
          // file exists
          var mstrm = fs.readFileSync(_path + roomId + '.room', 'utf8');
        } else {
          fs.writeFile(_path + roomId + ".room", "0", function(err) {
            if (err) {
              return console.log(err);
            }
            //console.log(roomId + ".room = 0");
          });   

          var mstrm = '0';        
        }



				var alreadyExists = false;
				var ids = id.split('_');


      /*if (ids[1]=='child' && typeof ids[2] !== 'undefined' && ids[2] !=='nopageid') {
        client.pageId = ids[2];
      } */






        // first room creation by client requested = becomes master room - do not allow overriding _roomOwnerClient at each 'http://loops.solam.co/sequencer/?rm/nochild' url refresh
        if (mstrm == '0' && ids[1] == 'nochild' || mstrm == '0' && ids[1] == 'nocmult' ) { 
          _roomOwnerClient = client;
          console.log('Reg as master room:', client.id.substr(client.id.length - 4));

          //console.log('_roomOwnerClient', _roomOwnerClient);

          fs.writeFile(_path + roomId + ".room", "1", function(err) {
            if (err) {
              return console.log(err);
            }
            console.log(roomId + ".room = 1");
          }); 

				} else if (ids[1] == 'child' && typeof ids[2] !== 'undefined' && ids[2] !== 'nopageid')
				{
					client.pageId = ids[2];

					_roomOwnerChildren[client.id] = client;

					for (id in _roomOwnerChildren)
					{
						for (clientId in _clients)
						{
							if (_roomOwnerChildren[id].pageId == _clients[clientId].pageId)
							{
								//console.log('pageId: ', id); //.pageId
								client.loaded = 1;
								_roomOwnerChildSolo[client.id] = client;
                console.log('Reg as _roomOwnerChildSolo:', client.id.substr(client.id.length - 4)); // 
								_roomOwnerChildren[id].send(global.Events.GET_INSTRUMENT, {client: clientId, insId: _instruments[clientId].id});
								//console.log('ins sent to ins room solo');
							}
						}
					}
				}
				else if (ids[1] == 'child' && ids[2] == 'nopageid') // additional room creation requested = become slave room
				{ 
					console.log('Reg as slave room:', client.id.substr(client.id.length - 4)); // Registering as room owner child the client with id
					_roomOwnerChildren[client.id] = client;

          // inform main-room that a late comer child-room brought her ass to the jam
          if ( typeof _roomOwnerClient !== 'undefined' ) {
            var infarr = {};
            infarr.client = client.id;
            infarr.tap = "crlateco"; // child-room late comer

            _roomOwnerClient.send(global.Events.CLIENT_JOINED, {data: infarr});
          }  



				}

				if (!alreadyExists)
				{
					_addEventListeners(client);
				}

				callback({room: this.id, client: client.id});

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
			this.registerClient = function (client, callback, errback)
			{
				var alreadyExists = false;

				//console.log('Need to register client', client.id, 'for room', id);

				if (typeof _clients[client.id] !== 'undefined')
				{
					_clients[client.id] = null;
					alreadyExists = true;
				}

				_clients[client.id] = client;

				if (!alreadyExists) {
					_addEventListeners(client);
				}

				callback({room: this.id, client: client.id, pwd: client.pwd});

//_self.notifyChildren(global.Events.CLIENT_JOINED, {client: client.id, pwd: client.pwd});

        //* 
        if ( Object.keys(_roomOwnerChildren).length > 0 ) {
          for (id in _roomOwnerChildren) {
            //_roomOwnerChildren[id].send('client_joined', {client: client.id, pwd: client.pwd});
            _roomOwnerChildren[id].send(global.Events.CLIENT_JOINED, {client: client.id, pwd: client.pwd});
          } 
        } 
        //*/
			
				if (_roomOwnerClient) { // Inform the room owner that a new client has connected to the room
					_roomOwnerClient.send(global.Events.CLIENT_JOINED, {client: client.id, pwd: client.pwd});
				}

				return this;
			}

			/**
			* Removes a client from this room
			*
			* @public
			* @function
			* @param {String} id The id of the client that we need to remove.
			* @return {Room} The instance of this class.
			*/
			this.removeClient = function (id)
			{
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
			this.notifyClient = function (id, messageType, args)
			{
				if (typeof _clients[id] !== 'undefined') {
					_clients[id].send(messageType, args);
				}
			}

			/**
			* Notifies all the clients
			*
			* @public
			* @function
			* @param {String} messageType The type of the message type  of the message to send to the client.
			* @param {Object} args The arguments to send to the client.
			*/
/*      
			this.notifyClients = function (messageType, args)
			{
				if (Object.keys(_clients).length > 0)
				{
					for (id in _clients)
					{
						_clients[id].send(messageType, args);
					}
				}
			}
*/
			/**
			* Notifies a child of the room
			*
			* @public
			* @function
			* @param {String} id The id of the child.
			* @param {String} messageType The type of the message type of the message to send to the child.
			* @param {Object} args The arguments to send to the child.
			*/
			this.notifyChild = function (id, messageType, args)
			{
				if ( typeof _roomOwnerChildren[id] !== 'undefined' ) {
					_roomOwnerChildren[id].send(messageType, args);
				}
			}

			/**
			* Notifies all the children of the room
			*
			* @public
			* @function
			* @param {String} messageType The type of the message type of the message to send to the children.
			* @param {Object} args The arguments to send to the children.
			*/
/*      
			this.notifyChildren = function (messageType, args)
			{
				if (Object.keys(_roomOwnerChildren).length > 0)
				{
					for (id in _roomOwnerChildren)
					{
						_roomOwnerChildren[id].send(messageType, args);
					}
				}
			}
*/
			/**
			* Broadcasts to all clients and children a message
			* @param {String} messageType The type of the message to send to the clients and children.
			* @param {Object} args The arguments to send to the clients and children.
			* @return {Room} The instance of this class.
			*/
			this.broadcast = function (messageType, args)
			{
//_self.notifyClients(messageType, args);
//_self.notifyChildren(messageType, args);

      for (id in _clients) {
        _self.notifyClient(id, messageType, args);
        //console.log('this.broadcast: _clients', id, messageType);
      }

      if (Object.keys(_roomOwnerChildren).length>0) {
        for (id in _roomOwnerChildren) {
          _self.notifyChild(id, messageType, args);
          //console.log('this.broadcast: _roomOwnerChildren', id, messageType);
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
			this.dispose = function ()
			{

				_removeAllFromRoom();
				_roomOwnerClient.send(global.Events.ROOM_CLOSED, {room: this.id});
				_roomOwnerClient = null;

			};
		};

		sys.inherits(Room, events.EventEmitter);

		return Room;
	});