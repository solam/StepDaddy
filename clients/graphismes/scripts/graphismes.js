(function ()
{
    Graphismes = function ()
    {
        var _canvas; //le canvas qui servira d'affichage

        var _connexion; //l'objet mixr.net.Connexion
        //var _bpm = 1; //le bpm
        //var _color = "rgba(0, 0, 0, 0)"; //la couleur associée avec l'instrument

        var _tracks;
        var _session;

        //cette fonction initialise la classe, en établissant la connexion et en définissant les comportements
        this.initialize = function()
        {
            _connexion = new mixr.net.Connection();
            _connexion.connect(window.SERVER);
            _connexion.on(mixr.enums.Events.REGISTER, _onRegistered);
            _connexion.on(mixr.enums.Events.SEQUENCER_BEAT, _onSequencerBeat);
            _connexion.on(mixr.enums.Events.TRACKS, _onTracks);
            _connexion.on(mixr.enums.Events.SESSION, _onSession);
            _connexion.on(mixr.enums.Events.NOTE, _onNote);
            //_connexion.on(mixr.enums.Events.INSTRUMENT, _onInstrument);
          if (typeof window.gfxMode == 'undefined') {    
            _canvas = new GestionCanvas().initialize();
          }
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


            //_connexion.execute(mixr.enums.Events.GET_SESSION, {});

        }

        //fonction appelée en cas de réussite de connexion à la salle
        var _onRoomJoined = function()
        {
            console.log("ok : salle rejointe");

            //on effectue une demande pour avoir le bpm via l'instrument
            //_connexion.execute(mixr.enums.Events.GET_INSTRUMENT, {});

            //on récupère les tracks des instruments
            _connexion.execute(mixr.enums.Events.GET_TRACKS, {});
            _connexion.execute(mixr.enums.Events.GET_SESSION, {});
        }

        //fonction appelée en cas d'échec de connexion à la salle
        var _onRoomNotJoined = function(e)
        {
            console.log("ko : ", e);
        }

        //fonction appelée lors d'un signal SEQUENCER_BEAT
        var _onSequencerBeat = function(data)
        {      

          /*if (data.beat == 0) {
            //_tracks = 
            _connexion.execute(mixr.enums.Events.GET_TRACKS, {});
          } */
          



          if (typeof window.gfxMode == 'undefined') {

            
            for(var numInstru=0; numInstru<_tracks.length; numInstru++) //parcours des instruments
            {
                for(var numPiste=0; numPiste<_tracks[numInstru].length; numPiste++) //parcours des tracks sur un instrument
                {
                    if (_tracks[numInstru][numPiste] !== 'undefined') //vérification que cet instrument a bien des tracks
                    {
                        if (_tracks[numInstru][numPiste].notes[data.beat] == 1) //vérification que la note (1 à 16) renvoyée par data.beat est active
                        {
                            //_canvas.affichage1(numInstru, _tracks.length, numPiste, _tracks[numInstru].length, data.beat);
                            _canvas.affichage2(numInstru, numPiste, data.beat);
                            //_canvas.affichage3(numInstru, numPiste, data.beat);

                            //$("#gfx").css('background-color', 'white');
                            //console.log("on");
                        } else {
                          //$("#gfx").css('background-color', 'black');
                          //console.log("off");
                        }
                    }
                }
            }
            


          } else if ( window.gfxMode == 'local' && window['instrumentType'] == 'gfx') {
            


                  var devChNb = window.instrumentdata.id; // 0 - devicechannelNumber


                  if ( typeof _session !== 'undefined' && typeof devChNb !== 'undefined') {
                    //console.log(devChNb);
                    window.audiolink = _session[devChNb].audiolink;
                  } 

                  var srcChNb = window.audiolink;

                  //var srcChNb = _session[devChNb].audiolink;
                  //console.log("srcChNb", srcChNb, devChNb, _session[devChNb]);

                  var srcChColor = _session[srcChNb].conf[0].color; // 'white'

                  console.log('gfx feature is happening');


                var noLight = 0;  
                var currentStep = 0;  

                // silent step detector (across multiple notes of same monophonic instrument)  
                for(var numPiste=0; numPiste<_tracks[srcChNb].length; numPiste++) //parcours des tracks sur un instrument
                {
                    if (_tracks[srcChNb][numPiste] !== 'undefined') //vérification que cet instrument a bien des tracks
                    {
                        // only apply following condition if 1 noteOn (1) event is followed by 2 noteOff (0) events, so that hihat sequences can flash too!                                                                   
                        if (_tracks[srcChNb][numPiste].notes[data.beat] == 0 )
                        {
                          //var currentStep = 0;
                          //currentStep--;
                          currentStep++;
                        } /*else {
                          currentStep++;
                        }  */     

                    }
                    //console.log("numPiste", numPiste);
                }


                if ( _tracks[srcChNb].length == currentStep) {
                  var noLight = 1;  
                  //console.log("noLight", data.beat, noLight);
                }

                //console.log("currentStep", data.beat, currentStep);














                for(var numPiste=0; numPiste<_tracks[srcChNb].length; numPiste++) //parcours des tracks sur un instrument
                {
                    if (_tracks[srcChNb][numPiste] !== 'undefined') //vérification que cet instrument a bien des tracks
                    {

                      var opacity = 1-(numPiste*0.2);
                      var srcChColor = srcChColor.replace(/[\d\.]+\)$/g, opacity+')'); // '1)': remove opacity from rgba color


                                                                 

                        // keep animation for 2 steps instead of only 1 step
                        if ( data.beat == 0 ) {
                          var beatm1 = 15;
                          var beatm2 = 14;
                          var beatm3 = 13;
                        } else if ( data.beat == 1 ) {
                          var beatm1 = 0;  
                          var beatm2 = 15;
                          var beatm3 = 14;
                        } else if ( data.beat == 2 ) {
                          var beatm1 = 15;  
                          var beatm2 = 14;
                          var beatm3 = 13;                          
                        } else {
                          var beatm1 = data.beat-1;  
                          var beatm2 = data.beat-2;
                          var beatm3 = data.beat-3;
                        }                                         


                        if (_tracks[srcChNb][numPiste].notes[beatm1] == 1 && _tracks[srcChNb][numPiste].notes[beatm2] == 0 && _tracks[srcChNb][numPiste].notes[beatm3] == 0 ) 
                        {
                          //console.log("pattern with at least 2 silent steps in a row", data.beat);
                          var twosteps = 1;
                        } else {
                          //console.log("hihat style ptn", data.beat);
                          var twosteps = 0;
                        }


                        // only apply following condition if 1 noteOn (1) event is followed by 2 noteOff (0) events, so that hihat sequences can flash too!                                                                   
                        if (_tracks[srcChNb][numPiste].notes[data.beat] == 1 || _tracks[srcChNb][numPiste].notes[data.beat-1] == 1 && twosteps == 1
                        /* && _tracks[srcChNb][0].notes[data.beat] == 0*/ ) //vérification que la note (1 à 16) renvoyée par data.beat est active
                        {
                            //_canvas.affichage1(numInstru, _tracks.length, numPiste, _tracks[numInstru].length, data.beat);
                            //_canvas.affichage2(numInstru, numPiste, data.beat);
                            //_canvas.affichage3(numInstru, numPiste, data.beat);

                            $("#gfx").css('background-color', srcChColor);
                            //console.log("on", data.beat);
                        } else if ( noLight == 1) {
                          $("#gfx").css('background-color', 'black');
                          //console.log("off");
                          //console.log("currentStep", data.beat, currentStep);
                        }          



                    }
                }   

              }

          }
          
/*

        }




        }


        } */

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
            //console.log("_onTracks");

            //_canvas.initAffichage1(_tracks);

          if (typeof window.gfxMode == 'undefined') {    
            _canvas.initAffichage2(_tracks);
          }

            
        //_canvas.initAffichage3(_tracks);
        }

        var _onSession = function(data) {
            _session = data;
            //console.log("_onSession", _session);
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

    // if (typeof window['instrumentType'] !== 'undefined' && window['instrumentType'] == 'gfx' ) {


      

      //if (typeof window.gfxMode == 'undefined') 

        //if ( $('body').is('#gfxglobal') ) {

        if (typeof $ == 'undefined') {  
        console.log('gfx call in graphismes.js');
        new Graphismes().initialize();        
      }
    

}());