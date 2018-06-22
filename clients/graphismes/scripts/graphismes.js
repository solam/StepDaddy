(function ()
{
    Graphismes = function ()
    {
        var _canvas; //le canvas qui servira d'affichage

        var _connexion; //l'objet mixr.net.Connexion
        //var _bpm = 1; //le bpm
        //var _color = "rgba(0, 0, 0, 0)"; //la couleur associée avec l'instrument

        var _tracks;

        //cette fonction initialise la classe, en établissant la connexion et en définissant les comportements
        this.initialize = function()
        {
            _connexion = new mixr.net.Connection();
            _connexion.connect(window.SERVER);
            _connexion.on(mixr.enums.Events.REGISTER, _onRegistered);
            _connexion.on(mixr.enums.Events.SEQUENCER_BEAT, _onSequencerBeat);
            _connexion.on(mixr.enums.Events.TRACKS, _onTracks);
            _connexion.on(mixr.enums.Events.NOTE, _onNote);
            //_connexion.on(mixr.enums.Events.INSTRUMENT, _onInstrument);

            _canvas = new GestionCanvas().initialize();
        }

        //cette fonction est appelée à partir du moment où le client est enregistré
        var _onRegistered = function(data)
        {
            console.log('client enregistré', data);

            //if(_isJoinedToRoom)
            //{
            //    _conn.joinRoom(_isJoinedToRoom, _onRoomJoined, function (e)
            //    {
            //    console.log('Room not joined!', e);
            //    });
            //}

            var url = mixr.Utils.parseURL(location.href);

            //http://127.0.0.1:8282/device/?rm/mopo will give mopo as pwd
            var pwd = url.url.split("/").pop();

            var rmid = JSON.stringify(url.query) + '/' + JSON.stringify(pwd); // rm/mopo
            var delim = '_';
            var rmid = url.query.concat(delim).concat(pwd).concat(delim).concat(window.pageId);

            if (rmid)
            {
                _connexion.joinRoom(rmid, _onRoomJoined, _onRoomNotJoined);
            }
        }

        //fonction appelée en cas de réussite de connexion à la salle
        var _onRoomJoined = function()
        {
            console.log("ok : salle rejointe");

            //on effectue une demande pour avoir le bpm via l'instrument
            //_connexion.execute(mixr.enums.Events.GET_INSTRUMENT, {});

            //on récupère les tracks des instruments
            _connexion.execute(mixr.enums.Events.GET_TRACKS, {});
        }

        //fonction appelée en cas d'échec de connexion à la salle
        var _onRoomNotJoined = function(e)
        {
            console.log("ko : ", e);
        }

        //fonction appelée lors d'un signal SEQUENCER_BEAT
        var _onSequencerBeat = function(data)
        {            
            for(var numInstru=0; numInstru<_tracks.length; numInstru++) //parcours des instruments
            {
                for(var numPiste=0; numPiste<_tracks[numInstru].length; numPiste++) //parcours des tracks sur un instrument
                {
                    if (_tracks[numInstru][numPiste] !== 'undefined') //vérification que cet instrument a bien des tracks
                    {
                        if (_tracks[numInstru][numPiste].notes[data.beat] == 1) //vérification que la note (1 à 16) renvoyée par data.beat est active
                        {
                            //_canvas.affichage1(numInstru, _tracks.length, numPiste, _tracks[numInstru].length, data.beat);
                            //_canvas.affichage2(numInstru, numPiste, data.beat);
                            _canvas.affichage3(numInstru, numPiste, data.beat);
                        }
                    }
                }
            }
        }

        //fonction appelée suite à l'envoi de l'appel à GET_INSTRUMENT
        //var _onInstrument = function(data)
        //{
            //_bpm = data.channelInfo.bpm;
            //_color = data.channelInfo.channelColor;

            //_canvas = new GestionCanvas().initialize(_bpm);
        //    instrumentEnCours = data;
        //    console.log(data);
        //}

        var _onTracks = function(data)
        {
            _tracks = data;

            //_canvas.initAffichage1(_tracks);
            //_canvas.initAffichage2(_tracks);
            _canvas.initAffichage3(_tracks);
        }

        var _onNote = function(data)
        {
            //var numInstru = data.args.id;
            var numPiste = data.args.trackId.split('-')[1];
            var numInstru = data.args.trackId.split('-')[0];
            var numNote = data.args.noteId;
            var volume = data.args.volume;

            if (typeof _tracks[numInstru][numPiste] !== 'undefined')
            {
				_tracks[numInstru][numPiste].notes[numNote] = volume;
			}
        }
    };

    //appel à initialize() au moment de l'appel de graphismes.js
    new Graphismes().initialize();
}());