(function()
{
	mixr.Mixer = function() 
	{
		var _room_id = 'Mixr_room_1';
		var _conn;
		var _clients = {};
		var _instruments = {};
		var _totalInstruments = 0;
		var _sequencer;
		var _sequencerView;
		var _clientJoinedCount = 0;
		//var _channelUsedCount = 0;
		var _self = this;
		var _childRoom = 0;
		window.childRoom = 0;
		window.timeShift = 0; // 31.25;
		window.timeOutIncrement=0;



		var _encode = function(i)
		{

			var _url = mixr.Utils.parseURL(location.href);  			
			var _arrUrl = _url.url.split('/'); // _self.      

			// var url = 'http://127.0.0.1:8282/sequencer/?rm/child'

			var pwd = _arrUrl[4]; // ! beware hardcoded-static non dynamic value !
      //var pwd = _arrUrl[5]; // online version

			var pwd = pwd.replace("?", ""); 
			
			return pwd; 
		}



		var _onRoomCreated = function(data)
		{



      if (window.childRoom==0) {
        var seqType = 'localMasterRoom'; 
      } else if (window.childRoom == 2) {
        var seqType = 'localSlaveRoom';
      }


      //console.log(seqType);
      localStorage.setItem(seqType, 1);



			//dans le cas ou c'est le premier lancement de la page
			if(window.childRoom==0)
			{
				//window.open('http://127.0.0.1:8282/sequencer/?rm/child/nopageid/gfxonly', 'window name', 'window settings');
			}
			
			//console.log('The room was created:', data.room);
			$("#audio-server-ready").html('1');    

			//dans le cas ou nous sommes en precue
      // On precue window, render an audio mixer
			if(window.childRoom == 2)
			{
				// conductorControls
				var controls = _sequencer._instrumentsConfig[1].conf[0].controls;
				var container = document.getElementById('modifiers');
				var channelId = 1;

				if(controls!=0)
				{  
					//console.log('_model.instrument.type', _model.instrument.type);

					var usedLibrary = 'noUiSlider'; // Interface

					// define array to group all channel volumes into
					window['channelVol'] = [];

					window.changeParamMode = 'auto'; // synth sliders etc are automatically changed vs. user events: manual

					for(var j = 0; j < controls.length; j++)
					{
						var input = input + j;

						if(typeof input !== 'undefined') 
						{ 
							if(controls[j].type=='slider')
							{
								if(controls[j].direction !== 'undefined') 
								{
									if (controls[j].direction=='horizontal') {
										var orientation = 'horizontal';
									} else {
										var orientation = 'vertical';
									}
								} else {
									var orientation = 'vertical';
								}

								if(controls[j].x.mute !== 'undefined')
								{
									if (controls[j].x.mute==1)
									{
										var mute = controls[j].x.muteKey; //1;
									} else {
										var mute = 0;
									}
								} else {
									var mute = 0;
								}

								if(controls[j].x.muteNote !== 'undefined')
								{
									if(controls[j].x.mute==1)
									{
										var muteNote = controls[j].x.muteNote; //1;
									} else {
										var muteNote = 0;
									}
								} else {
									var muteNote = 0;
								}                

								if(controls[j].x.solo !== 'undefined')
								{
									if(controls[j].x.solo==1)
									{
										var solo = controls[j].x.soloKey; //1;
									} else {
										var solo = 0;
									}
								} else {
									var solo = 0;
								}

								//console.log('mute', mute);

								var displayedRange = [];
								displayedRange['min'] = 0;
								displayedRange['max'] = 100;
								
								if(typeof controls[j].x.displayedRangeMin !== 'undefined' && typeof controls[j].x.displayedRangeMax !== 'undefined')
								{
									displayedRange['min'] = controls[j].x.displayedRangeMin;
									displayedRange['max'] = controls[j].x.displayedRangeMax;
								} 
								
								//console.log('displayedRange', displayedRange, controls[j].x.displayedRangeMin);

								var value = controls[j].x.value;

								//console.log('value: ', value);

								if (typeof value == 'undefined') { // typeof window.preset[controls[j]]
									var value = 0;
								}
								//console.log(value/*, window.preset*/);

								window['ctrl'+input] = new mixr.ui.Slider(controls[j].id, controls[j].x.name, container, value, controls[j], channelId, usedLibrary, orientation, mute, controls[j].x.midicc, muteNote, displayedRange, solo).initialize(); // NexusUI
								
							} else if (controls[j].type=='hidden') {

							} 
						} // end of if (typeof input !== 'undefined') {
					} // end of controls loop
					window.changeParamMode = 'manual'; // now that params have been auto changed, future param changes are assumed to be from user events
				} 
			} // end of if window.childRoom = 2
		};




		var _onRoomClosed = function(data)
		{

      if (window.childRoom==0) {
        var seqType = 'localMasterRoom'; 
      } else if (window.childRoom == 2) {
        var seqType = 'localSlaveRoom';
      }

      console.log(seqType);
      localStorage.setItem(seqType, 0);



			console.log('The room with id', data.room, 'was closed.');
			$("#audio-server-ready").html('0');
			_clients = {};
		};



		var _onRoomCreateError = function(error)
		{
			console.log('The room was not created');
		};



		var _onDisconnect = function()
		{


      if (window.childRoom==0) {
        var seqType = 'localMasterRoom'; 
      } else if (window.childRoom == 2) {
        var seqType = 'localSlaveRoom';
      }

      console.log(seqType);
      localStorage.setItem(seqType, 0);
      

			_conn.disconnect();
			_clients = {};
		};



		var _onClientJoined = function(data)
		{
			//window.ratelimit.schedule(function() {      
				//console.log('sysptns at client join room:', _sequencer._systemPatterns); 
				//console.log('mixer.js _onClientJoined:', data); 

				var client = _clients[data.client];
				if (typeof client !== 'undefined') {
					console.log('A client with id', data.client, 're-joined the room');
				} else {
					console.log('A client with id ', data.client, 'joined the room');
				}

				//var numAvailableInstruments = Object.keys(_clients).length;     //_sequencer._availableInstruments.length -1; 
				//console.log('in: win avail slots',window._availableInstruments.length);
				//$("#audio-server-available-slots").html(_totalInstruments); //_channelUsedCount      

				if (_clientJoinedCount==0)
				{
					var startDate = new Date();
					var firstJoinTime = startDate.getTime();
					_sequencer.updateSeqVariables('_audioServerStartTimestamp', firstJoinTime);        
					//_sequencer.createInstruments(); // Update general instruments' object
					// create updateInstruments seq class method
					// just refresh channel data : do not re-init "audio rendering" of instrument - do not reset notes' data
					console.log('first client joined', firstJoinTime);
				}   
				
				//console.log('_clientJoinedCount', _clientJoinedCount);
				_clientJoinedCount++;

				if (typeof data.pwd !== 'undefined') {
					_clients[data.client] = data.pwd;
				} else {  
					_clients[data.client] = true;
				}
				//console.log('_clients', _clients);
				//_updateChannels();
			//}); // window.ratelimit.schedule  
		};




		var _onClientLeft = function(data)
		{
			//window.ratelimit.schedule(function() {
				console.log('A client with id', data.client, 'left the room');
				var instrument = _instruments[data.client];
				
				if (typeof instrument !== 'undefined')
				{
					if (window.graphixMode==1)
					{        
						//_sequencerView.removeInstrument(instrument);
					}        
					
					_sequencer.addInstrument(instrument); // add abandoned instrument to "available instruments" list
					delete _instruments[data.client];
					_totalInstruments--;
					//_clientJoinedCount--; commenting this line prevents initial channel countdown to reset as "clients all leave audio server then 1 client re-joins again"
					
					delete _clients[data.client]; // avoid having too much clients connected (window refreshs creating multiple clients)

					if (_totalInstruments <= 0)
					{
						$('#roomId').show();
					}
				}
				//_channelUsedCount--;
				//var numAvailableInstruments = Object.keys(_clients).length;     // _sequencer._availableInstruments.length;   - _instruments
				$("#audio-server-available-slots").html(window.availSlots - Object.keys(_instruments).length); //  _channelUsedCount
				//console.log('out: win avail slots',window._availableInstruments.length);
				//console.log('avSlots', window.availSlots);
				//_updateChannels();
			//}); // window.ratelimit.schedule      
		};




		var _onGetInstrument = function(data)
		{
			//window.ratelimit.schedule(function() {
				//console.log('Got a request for an instrument', data);  

				if ( typeof data.insId !== 'undefined' ) {
					_sequencer.getInstrumentById(data.client, data.insId);
				} else {
					var pwd = _clients[data.client];		

					// var instrument = _sequencer.getRandomInstrument(data.client);
					var instrument = _sequencer.getNextInstrument(data.client, pwd);
					
					if (instrument) {
 						//if (window.childRoom==0) { // detri
              console.log('update instrument');
							_conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: instrument});
						//}

						//console.log('>>> Instrument', instrument, _totalInstruments);
						if (typeof _instruments[data.client] === 'undefined') {
							_totalInstruments++;

							if (window.graphixMode==1) {          
								_sequencerView.addInstrument(instrument) // remove audio stuttering
							}
							
							_instruments[data.client] = instrument;
							$('#roomId').hide();
							$("#audio-server-available-slots").html(window.availSlots - Object.keys(_instruments).length);
						}
					} else {
						console.log('No more instruments available.');
						
						//if ( window.childRoom==0 ) { // detri
_conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: 'waitroom'});
						//}
					} //*/
					//_updateChannels();
				}      

			//}); // window.ratelimit.schedule
		};



		var _onNote = function(data){
			//console.log('mixer onNote:', window.graphixMode, data);
			if (window.graphixMode==1) {
				//_sequencerView.updateNote(data.args); // remove audio stuttering
			}     

			_sequencer.updateNote(data.args);
			//console.log('_onNote: ', data);
		};



		var _onGetTracks = function(data)
		{
			_conn.execute(mixr.enums.Events.TRACKS, {receiver: data.client, tracks: _sequencer.getTracks()});
      //console.log('_onGetTracks: ', data);
		}



    var _onGetSession = function(data) {
      //console.log('_onGetSession: ', data);
      _conn.execute(mixr.enums.Events.SESSION, {receiver: data.client, session: _sequencer.getSession()});
    }    



		var _updateChannels = function()
		{ // aka force refreshing each client instrument/page so that each user receives a new instrument (on its browser tab)
			//console.log('update channels');
			var claients = Object.keys(_clients); 

			for(var i = 0; i < claients.length; i++) 
			{

				if(i!=133) 
				{ // do not process conductor role (1) which has no track data associated to it ! Beware hardcoded value!
					//console.log('upd ch - claients'+i, claients[i]);

					var instrument = _sequencer.updateChannelInfo(claients[i], i);    

					if(instrument) 
					{
						//_conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: claients[i], instrument: instrument}); // after 10+ bpm changes sound degrades on main sounding tab (with f12: code debug open) 

						//console.log('i', i); // following link will output VM10110:1 Uncaught SyntaxError: Unexpected identifier
						//if (window.childRoom==0) { // detri
							window['updCh'+i] = setTimeout(_conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: claients[i], instrument: instrument}),i*300);
						//}

					} else {
						//console.log('_updateChannels : no more instruments available.');
					}        
				}      
			}
		};  





    // message dispatch center func
		var _onModifierChange = function(data)
		{
			//window.ratelimit.schedule(function() {
			//console.log('_onModifierChange: ', data);
			

      // Conductor uses this func to kickout user from its current instrument (user is transferred to the waiting room where she might be able to get a random instrument)
			// if 'channel change' id from conductor role
			if ( data.args.id == 997 ) {
				//console.log('_clients before client kick', _clients);
				//console.log('claients + avail ins', claients, _sequencer._availableInstruments); // [_availableInstruments]
			
				var claients = Object.keys(_clients);

				if (_sequencer._availableInstruments.length==0)
				{
					console.log('no channel available', _sequencer._availableInstruments.length);     
					
					//if (window.childRoom==0) { // detri
						_conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: claients[0], instrument: 'kickOut' }); //     
					//}
					
					_sequencer.addInstrument(_instruments[claients[0]]); 
					delete _instruments[claients[0]];
					_totalInstruments--;
					delete _clients[claients[0]];   

				}

				//console.log('_clients after client kick', _clients);
				var claients = Object.keys(_clients); 

				for(var i = 0; i < claients.length; i++)
				{
					//console.log('claients'+i, claients[i]);
					var oldInstrument = _instruments[claients[i]];
					_sequencer.addInstrument(oldInstrument); // add abandoned instrument to "availabe instruments" list
					delete _instruments[claients[i]];

					var instrument = _sequencer.changeChannel(claients[i]);          
					//var instrument = _sequencer.getRandomInstrument(claients[i]);
				
					if (instrument)
					{
						//if (window.childRoom==0) { // detri
							_conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: claients[i], instrument: instrument});
						//}
						//console.log(claients[i], instrument);
						//console.log('>>> Instrument', instrument, _totalInstruments);
						if(typeof _instruments[claients[i]] === 'undefined')
						{
							_totalInstruments++;
							//_sequencerView.addInstrument(instrument); // remove audio stuttering
							_instruments[claients[i]] = instrument;
							$('#roomId').hide();
						}
					} else {
						console.log('No more instruments available.');
					}        

				}

				//console.log('(after channelChange) avail ins', _sequencer._availableInstruments.length);




				// Part save
      } else if (data.args.id==987) {

        var claients = Object.keys(_clients);
        var clientCount = 0;
        var part = [];

        for(var i = 0; i < claients.length; i++)
        {
          var caydi = claients[i];
          
          if ( typeof _instruments[caydi] !== 'undefined' && _instruments[caydi].type !== 'control' ) {

            console.log('claients'+i, claients[i], _instruments[caydi]);

            // if (window.childRoom==0) { // detri
              _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: claients[i], instrument: 'savePart'});
            // } 

            var partObj = {};

            partObj.channelId = _instruments[caydi].id; 
            partObj.presetId = _instruments[caydi].channelInfo.presetId;
            partObj.kitId = _instruments[caydi].kitNumber;

            if ( typeof _instruments[caydi].channelInfo.currentPtnSeq == 'undefined' ) {
              var currPtnSeq = _instruments[caydi].channelInfo.channelPatternSeqList;
            } else {
              var currPtnSeq = _instruments[caydi].channelInfo.currentPtnSeq;
            }            

            partObj.ptnSeqList = currPtnSeq;
            
            part.push(partObj);

            //clientCount++;
            //console.log(claients[i], instrument);
          } else if ( typeof _instruments[caydi] !== 'undefined' && _instruments[caydi].type == 'control' ) {
            var conductorId = claients[i];
          }  

        }

        if ( typeof conductorId !== 'undefined' ) {
          //if (window.childRoom==0) { // detri
            _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: conductorId, instrument: part }); // 'savePart'
            //console.log('claients'+i, claients[i], _instruments[caydi]);
          //}          
        }

       


      // "puppet master" play 
      } else if (data.args.id==986) {

        parts = JSON.parse(data.args.part);
        //console.log('part play: ', data.args, parts, _instruments);


        if (parts) {

        var claients = Object.keys(_clients);
        var clientCount = 0;
        var part = [];

        for(var i = 0; i < claients.length; i++)
        {
          var caydi = claients[i];
          
          if ( typeof _instruments[caydi] !== 'undefined' /*&& _instruments[caydi].type !== 'control'*/ ) {

            //console.log('payload: ', parts.payload, parts.payload.length);

            for ( var j = 0; j < parts.payload.length; j++ ) {

              //console.log('claients'+i/*, claients[i], _instruments[caydi]*/, caydi, parts.payload[i].channelId, _instruments[caydi].id);

              if ( parts.payload[j].channelId == _instruments[caydi].id ) {

                parts.payload[j].clockts = parts.clockts;
                parts.payload[j].bar = parts.bar;
                //console.log('presetId: ', parts.payload[i].presetId, _instruments[caydi].channelInfo.presetId);
                //_instruments[caydi].channelInfo.presetId = parts.payload[i].presetId;

                //if (window.childRoom==0) { // detri
                  _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: caydi, instrument: parts.payload[i] }); // 'savePart'                  
                //}     
                //console.log('presetId: ', _instruments[caydi].channelInfo.presetId);
              }
            }
          } 
        }
      }


      }
      // if 'program/preset/kit change' id from any instrument channel
			else if (data.args.id==998)
			{
				//console.log(data);
				// TODO check for conductor role...
				var instrument = _sequencer.updateInstrument(data.args, data.client);        
				// console.log('instrument.tracks', instrument.tracks); // data

				//if (typeof window['clockStarted'] !== 'undefined') { // detri

					//window.ratelimit.schedule(function() {

						console.log('change kit happens');

						//if (window.childRoom==0) { // detri
							_conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: instrument});
						//}
						//console.log('>>> Instrument', instrument);
						_instruments[data.client] = instrument; 
					//});
				//}

				//*
				// remove old channel instrument from _sequencerView      
				//_sequencerView.removeInstrument(instrument); // remove audio stuttering

				//_sequencerView.addInstrument(instrument); // remove audio stuttering

				// import notes from old instr to new one (so theyr are displayed on seq view)  
				for(var i = 0; i < instrument.tracks.length; i++)
				{          
					//console.log('instrument.tracks[i]', instrument.tracks[i]);
					for(var j = 0; j < instrument.tracks[i].notes.length; j++)
					{
						//var note = instrument.tracks[i].notes[j];  
						//if (instrument.tracks[i].notes[j] > 0) 
						
						var dataObj =
						{ 
							'id': instrument.id, // channel id
							'trackId': instrument.tracks[i].id, 
							'noteId': j , // step number 0-15 - instrument.tracks[i].note
							'volume': instrument.tracks[i].notes[j]
						};  
						//console.log('dataObj', dataObj); 

						//_sequencerView.updateNote(dataObj); // remove audio stuttering
					}
				}
				//*/



				// change preset
			} else if (data.args.id==992) {

				//console.log('update preset', data);

        if ( typeof window.presetBuffer === 'undefined' ) {
          window.presetBuffer = [];
        }  

        window.presetBuffer.push(data);
        



      } else if (data.args.id==985) {

        //console.log('update preset', data);

        //*
        var instrument = _sequencer.updatePreset(data.args, data.client);
        //if (window.childRoom==0) {  // detri      
          _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: instrument});
        //} 
        _instruments[data.client] = instrument; 
        //*/


        //*
        // import notes from old instr to new one (so they are displayed on seq view)  
        for (var i = 0; i < instrument.tracks.length; i++) {          
          for (var j = 0; j < instrument.tracks[i].notes.length; j++) {            
            var dataObj =
            { 
              'id': instrument.id, // channel id
              'trackId': instrument.tracks[i].id, 
              'noteId': j , // step number 0-15 - instrument.tracks[i].note
              'volume': instrument.tracks[i].notes[j]
            };  
          }
        }
        //*/



			} else if (data.args.id==996) {
				_sequencer.changeSession(data.args, data.client);
			


      } else if (data.args.id==995)
			{
				//console.log('995 save ptn data', data);
				_sequencer.addPattern(data, data.client);
				//_conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: _instruments[data.client]});


				if (typeof data.args.triggerMode !== 'undefined') {

					// will ensure "on the fly" modified pattern in ptnSeq mode gets visually refreshed on grid
					if (data.args.triggerMode == 'manual') {

						data.args.x = data.args.kitNumber;
						var instrument = _sequencer.updateInstrument(data.args, data.client);
						//if (window.childRoom==0) { // detri       
							_conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: instrument});
						//}
						_instruments[data.client] = instrument; 
					}
				}

				//console.log('ins data clt: ', _instruments[data.client]);




			}
			else if (data.args.id==991)
			{
				//console.log('995 save ptn data', data);
				_sequencer.addPreset(data, data.client);

				if (typeof data.args.triggerMode !== 'undefined') {
					if (data.args.triggerMode == 'manual') {

						data.args.x = data.args.kitNumber;
						var instrument = _sequencer.updateInstrument(data.args, data.client);       
						//if (window.childRoom==0) { // detri
							_conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: instrument});
						//}
						_instruments[data.client] = instrument; 
					}
				} 






			}
      // change pattern
			else if (data.args.id==994)
			{
				//console.log('receive ptn change, data 994:', data);   

      if ( typeof window.patternBuffer === 'undefined' ) {
        window.patternBuffer = [];
      }  

      window.patternBuffer.push(data);
              
				//_sequencerView.updateNotes(data); // .args

// fucking culprit of song editor vs multilocation perfs' modes battle found !!!! */
if ( window.childRoom == 2 || window.nocmult == 1) {

        var notes = _sequencer.updateNotes(data);   // !!! this line (when uncommented/active) fucks up song (editor) play !!!
        // but essential to multilocation mode !!!

}

				/*
				for (var a = 0; a < notes.length; a += 1) {
					setTimeout(function () {
					_sequencerView.updateNote(notes[a]);
					console.log(notes[a]);  
					}, 100);
				}
				*/  

				//console.log(notes);




			}
			else if (data.args.id==993)
			{ // update channel infos
				//console.log('data 993: channel sound', data); 
				_sequencer.updateChannelSound(data.client, data.args.x, 0);




			}
			else if (data.args.id==990)
			{ // update channel time shift
				_sequencer.updateChannelSound(data.client, data.args.x, 1);        
			


      }
			else if (data.args.id==989)
			{ // noteOn - noteOff from keyboard

        // mute sequencer mode for channel using keyboard
        //_sequencer.updateChannelSound(data.client, 0, 0);

        //console.log("noteOn - noteOff from keyboard", data.args);        
/*


        var soundingClients = JSON.parse(JSON.stringify(_clients));
        var soundingClientsKeys = Object.keys(soundingClients);

        for (var i = 0; i < soundingClientsKeys.length; i++)
        {
          if (soundingClients[soundingClientsKeys[i]]=='mopo')
          { // if conductor exclude from sounding instrument list to be picked by keyboard triggering channels
            delete soundingClients[soundingClientsKeys[i]];
          }
          else
          {
            //soundingClients.push(_clients[i]);            
            //soundingClients.key3 = _clients[i];
          } 
        }  

        //console.log('_clients + soundingClients:', _clients, soundingClients);

        claients = Object.keys(soundingClients);        

        for (var i = 0; i < claients.length; i++) {
          if (claients[i]==data.client) {

            var channelId = i; // +1; // +1

            console.log('clt i:', claients[i]);
          }
        }         
*/
        if ( typeof data.args.cid !== 'undefined' ) {

          var channelId = data.args.cid;


          var synthInstance = 'channel_' + channelId;


          if (typeof window[synthInstance] !== 'undefined') { 

            //if (window[synthInstance].constructor.name=='CWilsoWAMidiSynth') {
              //if ( data.args.note !== null ) {

                if (data.args.type=="on") {

                  window[synthInstance].noteOn(data.args.note, data.args.velocity, channelId);  // normalize func names to play-stop notes accross different synth types       

                } else {

                  window[synthInstance].noteOff(data.args.note, channelId);

                }    
                console.log(data.args.note, data.args.velocity, channelId);   
              //}   

            //}

          }
        }


        //console.log("channelId, data.client, window[synthInstance].constructor.name", channelId, data.client, window[synthInstance].constructor.name);




			}
			else if (data.args.id==201 || data.args.id==202 || data.args.id==203 || data.args.id==204)
			{  
				//console.log('data mixer752: ', data);
				_sequencer.directInfoChange(data);



      } else {
        //console.log('data', data); //console.log('non regular event id popped');

        // remove rate limits on conductor volume controls for snappy channel mutes,...
        if (data.args.id<=900 && data.args.id>=800) {
          _sequencer.updateFxParam(data.args, data.client);
        } else {

          //if (typeof window['clockStarted'] !== 'undefined') { // this uncommented prevents childroom from getting necessary info
            //window.ratelimit.schedule(function() {
              //console.log('data', data.args, data.args.x); //
              _sequencer.updateFxParam(data.args, data.client);     
            //});


            if ( data.args.id == 999 ) {

              window.lastrecedbpm = data.args.x;     

              var claients = Object.keys(_clients);
              var clientCount = 0;

              for ( var i = 0; i < claients.length; i++ ) {
                var caydi = claients[i];
                
                if ( typeof _instruments[caydi] !== 'undefined' ) {
                  obj = {};
                  obj.bpm = data.args.x;


                  if (window.childRoom==0) { // child rooms should not receive bpm change as they are following main room via sequencer beats/clock info
                    _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: caydi, instrument: obj }); //
                  }     
                } 
              }
            }

          //}            
        }  
        /*
        if (data.args.id==699 || data.args.id==999 //|| data.args.id==993//) { // 993: update channel sound On/Off | 699: General Bar kickout time | 999: bpm - if data of type general (non instrument specific command)
        _updateChannels(); // comment line to limit crackin' sound
        } else
        */ 
        if (data.args.id>0 && data.args.id<=200) { // >=0

          // at each slider change update presets gets invoked which overloads the system                                                                        

          //if (typeof window['clockStarted'] !== 'undefined') { // this uncommented prevents childroom from getting necessary info

            //window.ratelimitPresetChange.schedule(function() {
              _sequencer.directInfoChange(data);   
            //});

          //}
        }
      } 

      //}); // window.ratelimit.schedule
    };







		var _onSequenceBeat = function(data)
		{

			//console.log('_childRoom', _childRoom);

			if (_childRoom==1 /*&& window.gfxonly != 1*/) {
				
				// correct the one step in advance of the master room compared to child rooms
				if (data.beat ==0) {
					actualBeat=15;
				} else {
					actualBeat=data.beat-1;
				}
				//console.log('actualBeat', actualBeat);

				window['SEQ']._beatCount = actualBeat;
				window['SEQ'].uiNextBeat(); 

				if (window.gfxonly==1) { // - window.graphixMode==1 

					/*    
					// dirty hack
					if ( $('#pattern-editor table thead').length==0 ) {
						var $item = $('#pattern-editor');
						var $table = $item.find('table');

						var $head = $('<thead>');
						for (var i = 0; i < 17; i++) {
						var $th = $('<th>');
						$head.append($th);
						}

						$table.prepend($head);
					}
					*/
					
					var localBeat = data.beat;// actualBeat;
					var currTarget = localBeat + 2;
					var lastTarget = localBeat +1; // +1; | -2: playhead at 1+5+9+13

					if (currTarget==2) {
						lastTarget = 17; // 17 | 14: playhead at 1+5+9+13
					}

					/*
					// highlight played note at playHead's passage
					$('tr td').removeClass('highlight');

					$('tr td:nth-child(' + (currTarget) + ')').each(function(index) {

					if ( $(this).hasClass('active') ) {
						if ( $('#pattern-editor tr').hasClass('play') ) {
						$(this).addClass('highlight'); 
						}
					} else {

						if ( $(this).hasClass('highlight') ) {
						$(this).removeClass('highlight'); 
						}

					}

					});

					if ( actualBeat==0 ) {
					 $('th:nth-child(1)').text(data.bar);
					}
					*/    

					var $thCurrTarget = $('th:nth-child(' + (currTarget) + ')');
					var $thLastTarget = $('th:nth-child(' + (lastTarget) + ')');

					if (typeof $thCurrTarget.attr("id") == 'undefined') {
						$thCurrTarget.attr("bgcolor", "darkgrey");   //.addClass('beat'); ="#FF0000"      
					}

					if (typeof $thLastTarget.attr("id") == 'undefined') {
						$thLastTarget.attr("bgcolor", "#000000");  //.removeClass('beat');
					}
				}
			}  
		};





    //* // comment this section for online version
    var gestionParametres = function(param) // SettingManagement
    {
      if(param[5] === 'child')
      {
        _childRoom = 1;
        window.childRoom = 1;

        //on ajoute à body la classe "child"
        $('body').addClass('child');
      }


      if ( typeof param[6] !== 'undefined' ) {

        var slas1 = param[6].slice(0,7);
        var slas2 = param[6].slice(7,param[6].length);


        //console.log('slas', slas1, slas2);

        if ( param[6].slice(0,7) === 'ptnmode' ) {
          window.ptnmode = 1;
        }      

        window.sessionid = parseInt(slas2, 10); //1; // Converting string to number ! beware it might break above 100 (3 digits)
        console.log('window.sessionid', window.sessionid);

      }


      if (typeof param[6] === 'undefined' || param[6] === '') {
        param[6] = 'nopageid';
      } 


      if ( window.childRoom == 1 && param[6] === 'nopageid' ) {
        window.childRoom = 2;
//window.nocmult = 1;
        //on ajoute à body la classe "precue"
        $('body').addClass('precue');


        if ( typeof param[7] !== 'undefined' ) {

          var slas245646 = param[7].slice(7,param[7].length); // remove 'session' string

          window.sessionid = parseInt(slas245646, 10); //1; // Converting string to number ! beware it might break above 100 (3 digits)
          console.log('window.sessionid nopageid childroom', window.sessionid);

        }


      }


      if(param[5] === 'child' && param[7] === 'gfxonly')
      {
        window.childRoom = 1;
        window.gfxonly = 1;

        //on ajoute à body la classe "gfx"
        $('body').addClass('gfx');
      }

      _room_id = param[4].replace("?", "");
      window.roomId = _room_id;
    };

// */



    /* online version
    var gestionParametres = function(param) { // SettingManagement 



      console.log('param', param);

      if ( param[6] === 'child') {


        _childRoom = 1;
        window.childRoom = 1;

        //on ajoute à body la classe "child"
        $('body').addClass('child');
      }


if ( typeof param[7] !== 'undefined' ) {


var slas1 = param[7].slice(0,7);

var slas2 = param[7].slice(7,param[6].length);


console.log('slas', slas1, slas2);

if ( param[7].slice(0,7) === 'ptnmode' ) {

  window.ptnmode = 1;
}      



var stripTekst = param[7].replace(/\D/g,'');
window.sessionid =  parseInt(stripTekst, 10); //1; // Converting string to number ! beware it might break above 100 (3 digits)


}



      if(typeof param[7] === 'undefined' || param[7] === '')

      {
        param[7] = 'nopageid';

      } 

      if(window.childRoom == 1 && param[7] === 'nopageid')

      {
        window.childRoom = 2;
window.nocmult = 1;
        //on ajoute à body la classe "precue"
        $('body').addClass('precue');


        if ( typeof param[8] !== 'undefined' ) {

          var slas245646 = param[8].slice(7,param[8].length); // remove 'session' string

          window.sessionid = parseInt(slas245646, 10); //1; // Converting string to number ! beware it might break above 100 (3 digits)
          console.log('window.sessionid nopageid childroom', window.sessionid);

        }




      }

      // && _arrUrl[6]=='gfxonly'

      if(param[6] === 'child' && param[8] === 'gfxonly')

      {
        window.childRoom = 1;
        window.gfxonly = 1;

        //on ajoute à body la classe "gfx"
        $('body').addClass('gfx');
      }

      _room_id = param[5].replace("?", "");

      window.roomId = _room_id;

      var kjap = param[5].slice(1)+'_'+param[6]+'_'+param[7];

      return kjap;

    };

//*/




		this.initialize = function()
		{
			var _url = mixr.Utils.parseURL(location.href);  
			var _arrUrl = _url.url.split('/'); // _self.

      if ( _arrUrl[5] == 'nocmult' ) {
      // if ( _arrUrl[6] == 'nocmult' ) { // online version       
        window.nocmult = 1;
      } else {
        window.nocmult = 0;
      }

      
      


      gestionParametres(_arrUrl); // comment this line for online version

      $('#roomId').find('span').html(_room_id);
      var delim = '_';
      // rm _ child|no _ [randomPwd]|no


      if ( _arrUrl[5] == 'nochildundefined' ) {
        _arrUrl[5] = 'nochild';
        _arrUrl[6] = 'undefined';
      }

      if ( _arrUrl[5] == 'nocmultundefined' ) {
        _arrUrl[5] = 'nocmult'; // no child multi
        _arrUrl[6] = 'undefined';
      }      


      var rmid = _room_id.concat(delim).concat(_arrUrl[5]).concat(delim).concat(_arrUrl[6]); // comment this line for online version

      console.log('rmid: ', rmid, _arrUrl[5]);


      // var rmid = gestionParametres(_arrUrl); // online version

      console.log('no child multi: ', window.nocmult);

			_conn = new mixr.net.Connection();
			_conn.connect(window.SERVER)
			.on(mixr.enums.Events.REGISTER, function() {
				_conn.createRoom(rmid, _onRoomCreated, _onRoomCreateError);
			})
			.on(mixr.enums.Events.CLIENT_JOINED, _onClientJoined)
			.on(mixr.enums.Events.ROOM_CLOSED, _onRoomClosed)
			.on(mixr.enums.Events.CLIENT_LEFT, _onClientLeft)
			.on(mixr.enums.Events.GET_INSTRUMENT, _onGetInstrument)
			.on(mixr.enums.Events.NOTE, _onNote)
			.on(mixr.enums.Events.MODIFIER_CHANGE, _onModifierChange)
			.on(mixr.enums.Events.SEQUENCER_BEAT, _onSequenceBeat)
      .on(mixr.enums.Events.GET_SESSION, _onGetSession)
			.on(mixr.enums.Events.GET_TRACKS, _onGetTracks);

			// new code location:
			_sequencerView = new mixr.views.SequencerView(document.getElementById('sequencer-view')).initialize();
			window['SEQVIEW'] = _sequencerView;      

			_sequencer = new mixr.Sequencer();
			window['SEQ'] = _sequencer;

			window.barcount=0;

			if (_childRoom==0)
			{
				// comment this line to recentralize audio & visuals on same browser tab
				$('body').addClass('soundgen'); 

				_sequencer.on(mixr.enums.Events.SEQUENCER_BEAT, function(beat)
				{
					if ( typeof window['clockStarted'] == 'undefined' )
					{
						window['clockStarted']=1;
					}

					if ( window['clockStarted'] == 1 )
					{
						console.log('clock started!');
					}

					window['clockStarted']=2;

					// bar count rounds from bar1 to bar8
					if (window.barcount==8 && beat==0)
					{
						window.barcount=0;
					}



          // it is useful to send 'change pattern' message in advance (at 4th '16th step'/beat instead of at 15th one) vs. so that next pattern is smoothly quantizely played at next bar
          if ( beat == 3 ) { // 7

            // send bar pulse to all channels    
            var claients = Object.keys(_clients);
            var clientCount = 0;

            for ( var i = 0; i < claients.length; i++ ) {
              var caydi = claients[i];
              
              if ( typeof _instruments[caydi] !== 'undefined' ) {

                obj = {};
                obj.bpm = window.lastrecedbpm; 
                obj.bar = window.barcount;


                //if (window.childRoom==0) { // ? cond. filtering detrimental to childroom
                  _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: caydi, instrument: obj }); //

                //}      
              } 
            }
          }  



					if ( beat == 0 ) {
						window.barcount++;

            // quantizing feature!!!!
            //console.log(window.patternBuffer);

            if ( typeof window.patternBuffer !== 'undefined' ) {
              if ( window.patternBuffer.length > 0 ) {
                for ( var j = 0; j < window.patternBuffer.length; j++ ) {
                  _sequencer.updateNotes(window.patternBuffer[j]);   
                }
              }          
            }

            window.patternBuffer = [];
					}



          if ( beat == 15 ) {  
            if ( typeof window.presetBuffer !== 'undefined' ) {
              if ( window.presetBuffer.length > 0 ) {
                for ( var j = 0; j < window.presetBuffer.length; j++ ) {
                  _sequencer.updatePresetLean(window.presetBuffer[j].args, window.presetBuffer[j].client);
                  _sequencer.directInfoChange(window.presetBuffer[j]);   
                }
              }          
            }

            window.presetBuffer = [];
          }


          /*
          // reset quantizing feature
          if ( beat == 7 ) {
            window.patternBuffer = [];
          } */


					//console.log('beat', beat, window.barcount);
					//_sequencerView.drawPlayhead(beat); // remove audio stuttering


          //console.log('window.sessionid: ', window.sessionid);
          //*
          if ( typeof window.sessionid !== 'undefined' ) {  

            if ( window.sessionid == 10 || window.nocmult == 1) { // */
              // beware this is used by gfx instruments (that render graphics depending/linked on sounding ins/channels
              //console.log('beat & bar: ', beat, window.barcount);
              _conn.execute(mixr.enums.Events.SEQUENCER_BEAT, {beat: beat, bar: window.barcount}); // lighten data transmitted to clients 
            //*   
            }
          } // */
				});
			}  
			/*
			if (window.childRoom==1) {
			_sequencer.initialize(); // _self.start
			}
			*/
		};
	};

	new mixr.Mixer().initialize();
}());


