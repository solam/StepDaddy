(function ()
{
	/**
	* The events object holds all the enumerations for different events.
	* @type {Object}
	*/
    global.Events = Object.freeze(
        {
            /**
            * The BYEBYE event
            * @type {String}
            */
            BYEBYE: 'byebye',

            /**
            * The EMIT event
            * @type {String}
            */
            EMIT: 'emit',

            /**
            * The CONNECT event
            * @type {String}
            */
            CONNECTION: 'connection',

            /**
            * The DISCONNECT event
            * @type {String}
            */
            DISCONNECT: 'disconnect',

            /**
            * The REGISTER event
            * @type {String}
            */
            REGISTER: 'register',

            /**
            * The JOIN_ROOM event
            * @type {String}
            */
            JOIN_ROOM: 'join_room',

            /**
            * The CREATE_ROOM event
            * @type {String}
            */
            CREATE_ROOM: 'create_room',

            /**
            * The SEARCH event
            * @type {String}
            */
            SEARCH: 'search',

            /**
            * The RESOLVE_URL event. Used for mapping the Spotify URIs to
            * downloadable URLs of songs.
            * @type {String}
            */
            RESOLVE_URL: 'resolve_url',

            /**
            * The EXECUTE event
            * @type {String}
            */
            EXECUTE: 'execute',

            /**
            * The ROOM_CLOSED event is triggered when the room owner
            * of a room is disconnected from the room on purpose.
            * @type {String}
            */
            ROOM_CLOSED: 'room_closed',

            /**
            * The CLIENT_JOINED event is send when a new client is connected to a room.
            * @type {String}
            */
            CLIENT_JOINED: 'client_joined',

            /**
            * The CLIENT_LEFT event is send when a client leaves the room on purpose.
            * @type {String}
            */
            CLIENT_LEFT: 'client_left',

            /**
            * The NOTE event
            * @type {String}
            */
            NOTE: 'note',

            /**
            * The GET_INSTRUMENT event
            * @type {String}
            */
            GET_INSTRUMENT: 'get_instrument',

            /**
            * The INSTRUMENT event
            * @type {String}
            */
            INSTRUMENT: 'instrument',

            /**
            * The SEQUENCER_BEAT event
            * @type {String}
            */
            SEQUENCER_BEAT: 'seq_beat',

            /**
            * The MODIFIER_CHANGE event
            * @type {String}
            */
            MODIFIER_CHANGE: 'modifier_change',

            /**
            * The GET_TRACKS event
            * @type {String}
            */
            GET_TRACKS: 'get_tracks',

            /**
            * The TRACKS event
            * @type {String}
            */
            TRACKS: 'tracks',
        });
}());