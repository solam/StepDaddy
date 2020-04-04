define(
	['sys', 'events', 'services.room'],
	function (sys, events, Room)
	{
		/**
		* The RoomsManager class is responsible managing
		* all the rooms.
		*
		* @constructor
		* @class ConnectionsManager
		*/
		var RoomsManager = function ()
		{
			/**
			* A hash map with all the rooms
			*
			* @private
			* @type {Object}
			*/
			var _rooms = {};
      //var _path = '/home/solam/loops.solam.co/public/editor/'; // online version
      var _path = '/media/iwan/data/tweb/2015-09-29_jam_session/app/StepDaddy/clients/';      

			/**
			* Creates a room
			*
			* @private
			* @function
			* @param {String} id The unique id of the room.
			* @param {Client} client The client.
			* @param {Function} callback The callback to be executed on success.
			* @param {Function} errback The callback to be executed on error.
			* @return {RoomsManager} Returns this instance.
			*/
			this.createRoom = function (id, client, callback, errback)
			{

        //console.log('this.createRoom func:', id);

				var roomArrayB = id.split('_');
				var roomIdB = roomArrayB[0];

				//ne crée une salle que si l'id est nouveau
				if (typeof _rooms[roomIdB] === 'undefined')
				{
					_rooms[roomIdB] = new Room(roomIdB);
				}

				_rooms[roomIdB].registerRoomOwnerAndRoomChildren(id, client, callback, errback);

				return this;
			};

			/**
			* Adds a client to a room
			* @param {String} roomId The id of the room the client wants to join.
			* @param {Client} client The client to join the room.
			* @param {Function} callback The callback to be executed on success.
			* @param {Function} errback The callback to be executed on error.
			* @return {RoomsManager} Returns this instance.
			*/
			this.joinRoom = function (roomId, client, callback, errback)
			{
				//console.log('roomId: ', roomId);
				var roomArray = roomId.split('_');
				var roomId = roomArray[0];

				client.pwd = roomArray[1]; // restrict some instrument to people connecting with a password
				client.pageId = roomArray[2];

				// If the room exists
				if (typeof _rooms[roomId] !== 'undefined')
				{
					_rooms[roomId].registerClient(client, callback, errback);
				}
				else
				{
					errback('No room exists!');
				}

				return this;
			};

			/**
			* Removes a room.
			* @param {String} roomId The id of the room the client wants to join.
			* @param {Function} callback The callback to be executed on success.
			* @param {Function} errback The callback to be executed on error.
			* @return {RoomsManager} Returns this instance.
			*/
			this.deleteRoom = function (roomId, callback, errback)
			{
				if ( typeof _rooms[roomId] !== 'undefined')
				{
					_rooms[roomId].dispose();
					_rooms[roomId] = null;

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
                  console.log(roomId + ".room"+ ' deleted successfully yo!');
             });  
          });          
            
  				} else {
  					errback('No room exists!');
  				}

				return this;
			};
		};

		sys.inherits(RoomsManager, events.EventEmitter);

		return RoomsManager;
	});
