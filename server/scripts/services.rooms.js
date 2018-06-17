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
				if (typeof _rooms[roomId] !== 'undefined')
				{
					_rooms[roomId].dispose();
					_rooms[roomId] = null;
				}
				else
				{
					errback('No room exists!');
				}

				return this;
			};
		};

		sys.inherits(RoomsManager, events.EventEmitter);

		return RoomsManager;
	});
