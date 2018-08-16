define(
	['express', 'http', 'socket.io', 'sys', 'events', 'services.rooms', 'net.client', 'enum.events'],
	function (express, http, socket, sys, events, RoomsManager, Client, enumEvents)
	{
		/**
		* The Connection class is responsible for creating a server
		* and opening a port for the clients to connect to.
		*
		* @constructor
		* @class Server
		*/
		var Server = function ()
		{
			/**
			* The default port
			*
			* @private
			* @type {Number}
			*/
			var PORT = 60000;

			/**
			* The app
			*
			* @private
			* @type {Object}
			*/
			var _app;

			/**
			* The http server
			*
			* @private
			* @type {Object}
			*/
			var _server;

			/**
			* The websockets interface
			*
			* @private
			* @type {Object}
			*/
			var _io;

			/**
			* Holds this specific instance of this class
			*
			* @private
			* @type {ConnectionsManager}
			*/
			var _self = this;

			/**
			* A hash map with all the sockets
			*
			* @private
			* @type {Object}
			*/
			var _clients = {};

			/*var _sessionChannels = 9; // 8 controllers + 1 client as general audio renderer
			var _clientJoinedCount = 0; // used to inform potential clients on available slots   */

			/**
			* The rooms manager is responsible for managing all the rooms.
			*
			* @private
			* @type {RoomsManager}
			*/
			var _roomsManager = new RoomsManager();

			/**
			* It adds all the event listeners to the connection
			*
			* @private
			* @function
			*/
			var _addEventListeners = function ()
			{
				_io.sockets.on(global.Events.CONNECTION, function (socket)
				{
					socket.on(global.Events.REGISTER, function (data)
					{
						if (!data.client)
						{
							data.client = 'client_' + (new Date().getTime() + Math.floor(Math.random() * 1000));
							console.log('I need to create a new id');
						}

						console.log('Registering socket with id', data.client);
						_self.register(data.client, socket);
					});
				});
			};

			/**
			* It is triggered when the client triggers an emit event
			*
			* @private
			* @function
			* @param {Object} data The data of the event.
			*/
			var _onClientEmit = function (data)
			{
				console.log('Emit', data);
			};

			/**
			* It is triggered when the client triggers a create_room event
			*
			* @private
			* @function
			* @param {Object} data The data of the event.
			*/
			var _onClientCreateRoom = function (data)
			{
				_roomsManager.createRoom(data.args.room, _clients[data.client],
					function (response)
					{
						_clients[data.client].send(global.Events.EXECUTE, {success: true, id: data.id, response: response});
						/*
						var fs = require('fs'); // ./clients/sequencer/data.txt path might be unix dependant due to use of backslashes
						fs.writeFile('./clients/sequencer/data.txt', _sessionChannels-1, function (err)
						{
						  if (err) throw err;
							console.log('avail clients slot(s) at session start', _sessionChannels-1);
						});
					    
						_clientJoinedCount = 1; // 0
						//_clientJoinedCount++;
						*/
					},
					function (error)
					{
						_clients[data.client].send(global.Events.EXECUTE, {success: false, id: data.id, response: error});
					});
			};

			/**
			* It is triggered when the client triggers a join_room event
			*
			* @private
			* @function
			* @param {Object} data The data of the event.
			*/
			var _onClientJoinRoom = function (data)
			{
				_roomsManager.joinRoom(data.args.room, _clients[data.client],
					function (response)
					{
						_clients[data.client].send(global.Events.EXECUTE, {success: true, id: data.id, response: response});
						/*
						//console.log('data.id', data.id);
						_clientJoinedCount++;
						var fs = require('fs');
						fs.writeFile('./clients/sequencer/data.txt', _sessionChannels - _clientJoinedCount, function (err)
						{
						  if (err) throw err;
							console.log('avail clients slot(s)', _sessionChannels - _clientJoinedCount);
						});
						*/

						//console.log('clts length', _self._clients.length);
					},
					function (error)
					{
						_clients[data.client].send(global.Events.EXECUTE, {success: false, id: data.id, response: error});
					});
			};

			/**
			* It is triggered when the client triggers a byebye event
			*
			* @private
			* @function
			* @param {Object} data The data of the event.
			*/
			var _onClientBye = function (data)
			{
				_self.unregister(data.client);
				/*
				_clientJoinedCount--;
				var fs = require('fs');
				fs.writeFile('./clients/sequencer/data.txt', _sessionChannels - _clientJoinedCount, function (err)
				{
				  if (err) throw err;
					console.log('avail clients slot(s)', _sessionChannels - _clientJoinedCount);
				});
				*/
			};

			/**
			* Is triggered when the client triggers the search event
			*
			* @private
			* @function
			* @param {Object} data The data.
			*/
			var _onSearch = function (data)
			{
				_clients[data.client].send(global.Events.EXECUTE, {success: true, id: data.id, response: 'you searched for ' + data.args.keyword});
			};

			/**
			* Gets a uri and returns a url.
			*
			* @private
			* @function
			* @param {Object} data This data.
			*/
			var _onResolveURL = function (data)
			{
				_clients[data.client].send(global.Events.EXECUTE, {success: true, id: data.id, response: 'http://localhost:8282/common/resources/Kavinsky - Nightcall (Feat. Lovefoxxx).mp3'});
			};

			/**
			* Registers a new connection/socket
			*
			* @private
			* @function
			* @param {String} clientId The id of the socket/client.
			* @param {Object} socket The socket to register.
			* @return {ConnectionsManager} This instance of the ConnectionManager.
			*/
			this.register = function (clientId, socket)
			{
				// If we are trying to register a client with an id that already is
				// registered this probably means that the client lost connection
				// and reconnected. So what we do is just update the client class
				// with the new socket.
				if (typeof _clients[clientId] !== 'undefined')
				{
					console.log('Client already exists, will just update the socket');
					_clients[clientId].setSocket(socket);
				}
				else
				{
					// If this is a new socket then we create a new client
					// class and register all the events to it.
					_clients[clientId] = new Client(clientId, socket)
						.on(global.Events.EMIT, _onClientEmit)
						.on(global.Events.BYEBYE, _onClientBye)
						.on(global.Events.DISCONNECT, _onClientBye)
						.on(global.Events.CREATE_ROOM, _onClientCreateRoom)
						.on(global.Events.JOIN_ROOM, _onClientJoinRoom)
						.on(global.Events.SEARCH, _onSearch)
						.on(global.Events.RESOLVE_URL, _onResolveURL);
				}

				_clients[clientId].send(global.Events.REGISTER, clientId);

				return this;
			};

			/**
			* Unregisters an already existing connection/socket
			*
			* @private
			* @function
			* @param {String} id The id of the socket/client.
			* @return {ConnectionsManager} This instance of the ConnectionManager.
			*/
			this.unregister = function (id)
			{
				console.log('Removing client with id', id);

				if (typeof _clients[id] !== 'undefined')
				{
					_clients[id] = null;
					delete _clients[id];
				}

				return this;
			};

			/**
			* Initializes the connection
			*
			* @public
			* @function
			* @return {Server} This instance of the server class.
			*/
			this.initialize = function ()
			{
				//initialisation de la librairie Express 
				_app = express();

				_server = http.createServer(_app); //creation d'un serveur
        // , { 'destroy buffer size': Infinity } = avoid warn: websocket parser forced user kick: max buffer size reached: https://github.com/socketio/socket.io/issues/1592
				_io = socket.listen(_server, { 'destroy buffer size': Infinity }); //attachement au serveur pour gérer un relation bidirectionnelle
				_io.set('log level', 1);

				_addEventListeners();

				return this;
			};

			/**
			* Opens a connection for the clients to connect to
			* and listen to.
			*
			* @private
			* @function
			* @param {Number} port The port that will be used.
			* @return {Server} This instance of the server class.
			*/
			this.start = function (port)
			{
				_server.listen(port || PORT);
				return this;
			};
		};

		sys.inherits(Server, events.EventEmitter);

		return Server;
	});