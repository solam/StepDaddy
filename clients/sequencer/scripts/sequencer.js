(function()
{
	mixr.Sequencer = function(conn)
	{
		/**
		* Mixins
		*/
		mixr.mixins.EventTarget.call(this);

		var _clients = {};

		var _instruments = [];		
		var _availableInstruments = [];				
		var _tracks = {};

		var _patterns = [];
		this._patterns = [];
		this._systemPatterns = [];

    this._parts = [];
    this._systemParts = [];    
		
		this._patternSequencer = [];
    this._songSequencer = [];
		var _presets = [];
		this._presets = [];
		this._systemPresets = [];    

		var _currentTime = 0;
		var _noteTime = 1;
		this._noteTime = 0; // 1
		this._noteTimes = [];				
		this._noteChannelIndex = [];
		this._noteTrigger = 1;
		this._noteTriggers = [];
		var _timeGrid = 1;
		var _noteIndex = 0;
		var _startTime = 0;
		this._startTime = 0;
		
		this._beatCount = -1;
		this._signature = 16;
		this._Ins01Volume = 1;
		
		var startDate = new Date();
		
		this._audioServerStartTimestamp = startDate.getTime();
		var _clock2 = null;    
		var _loopLength = 16;
		var _started = false;
		var _lastDrawTime = -1;
		var _self = this;
		var _clients = {};
		var samplesPath = '../common/resources/';

		this.interpolate2 = function(value, outputMin, outputMax, displayedMin, displayedMax)
		{			
			$res = (outputMin + (outputMax - outputMin) * value) / displayedMax;

			if ($res <= 0.01) {
				$res = 0; 
			}

			return $res;
      // console.log('interpolate:', valueX);
			// (0 + (1-0) * 50)100 : 0.5
		}  


		this._clockMode = 2; // 0: simple clock - 1: multi clock for sounding channel time-shifts - 2: WAAClock
		window.graphixMode = 0; // ven 16 sept 2016: 0 > 1 > 1
		
		// _countdownMode vs. rotation only mode
		
		this._countdownMode = 0; // 0: direct access mode | 1: some channel users may have to wait before their patern editor is fully visible (as to delay their contribution to the current session) // ven 16 step 2016: 0 puis 1 > 1 > 1      
		
		// if all channels' offsets are set to 0: offSetMode = off while rotation = on


    

  // select which session to select at app startup
    if ( typeof window.sessionid == 'number' ) {
      this._sessionNumber = window.sessionid; 
    } else {

    // ven 16 step 2016: 6 > 5 > 1 (with /mopo)
    /*
    1: Pitch instruments A (for apéro SdCC janvier 2016)

    2: Batucada (for apéro SdCC juin 2016)
    3: The Chase (draft, only 4 channels)
    4: Summerlab (using lab sounds)
    5: perf NDW 2016 
    6: workshop NDW 2016 
    7: AperoCC_fev_2017 / EJS #1

    8: 16 participants: AWS1
    9: 16 particpants: marimba / piano
    10: 16 participants drumbox
    11: Giorgio Moroder - The Chase (song editor mode)
    12: Mr Fingers - Can You Feel It (song editor mode)
    99: test
    */

      this._sessionNumber = 13; // 13
    }
/*
    if (window.childRoom == 2 || typeof window.childRoom == 'undefined' ) { 
      this._sessionNumber = 13; // default for childroom - 13
    }  
//*/

    console.log('this._sessionNumber, window.sessionid: ', this._sessionNumber, window.sessionid);
		//console.log('window.graphixMode, window.childRoom', window.graphixMode, window.childRoom);

		if (window.childRoom == 1)
		{ // window.gfxonly == 1
			window.graphixMode = 1;
		}

		this._instrumentsConfig = window['insConf' + this._sessionNumber]; 
		
		window['insConf'] = this._instrumentsConfig; 


  // Arbitrarily define number of channels for session to be loaded
		if (typeof soundingChannelNumber !== 'undefined')
		{ 
			var soundingChannelNumber = window.findObjectById(this._instrumentsConfig, 500);
			var soundingChannelNumber = soundingChannelNumber.x.value;
		}
		else if (typeof soundingChannelNumber == 'undefined')
		{  
			var soundingChannelNumber = 17; // 16
		}


  // Defining number of bars from app start until a specific channel is allowed to sound/play (in case _countdownMode is on)

		if (this._countdownMode == 1)
		{ 
			var sound = 1; // 0 
			
			// this code section was out of condition if (this._countdownMode == 1) {  previously
			var barOffsetStart = 700;
			
			for (var b=0; b<soundingChannelNumber; b++)
			{
				var elVal = window.findObjectById(this._instrumentsConfig, barOffsetStart);
				
				if (typeof elVal !== 'undefined')
				{
					this['_insBarOffset'+b]= elVal.x.value;
				}
				barOffsetStart++;
			}
		} else {
			var sound = 1;
		} 

		var defaultShift = 0;

		this._channelName = [];

		this._channelPatterns = [];
		var achannelPatterns = [];

    this._channelParts = [];
    var achannelParts = [];    

		this._channelPresets = [];
		var achannelPresets = [];

		this._channelpatternSeq = [];
		var achannelpatternSeq = [];

    this._channelsongSeq = [];
    var achannelsongSeq = [];    

		this._instrumentsSoundModes = [];
		this._audioChannelShift = [];


  // Defining default channel volumes at app startup

		var insVol0X = window.findObjectById(this._instrumentsConfig, 800).x; // this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[0].x; // ! hardcoded value: conductor channel + control id may change !
		
		window['insVol0X'] = insVol0X;
		
		this._insVol0 = this.interpolate2(insVol0X.value, insVol0X.min, insVol0X.max, insVol0X.displayedRangeMin, insVol0X.displayedRangeMax);  
		
		for (var g=2; g<soundingChannelNumber; g++)
		{
			window['insVol' + g +'X'] = window.findObjectById(this._instrumentsConfig, 800).x; //
			this['_insVol' + g] = this.interpolate2(window['insVol' + g +'X'].value, window['insVol' + g +'X'].min, window['insVol' + g +'X'].max, window['insVol' + g +'X'].displayedRangeMin, window['insVol' + g +'X'].displayedRangeMax);       
		}  





  // Extracting song information (list of parts) from channel 1 AKA "puppet master/ conductor" channel from selected default session
    if ( typeof window['insConf'][1].songs !== 'undefined' ) {

      var preset = [];
      var pattern = [];
      var songPresets = [];
      var songPatterns = [];
      var songs = Object.keys(window['insConf'][1].songs);

      for ( var h = 0; h < songs.length; h++ ) {

        var partsFromConductorCh = window['insConf'][1].songs[h].parts; 
        var part = [];
        part[1] = window['insConf'][1].songs[h].parts;

        if ( typeof part[1] !== 'undefined' ) {

          var paarts = Object.keys(partsFromConductorCh);

          for ( var i = 0; i < paarts.length; i++ ) {

            var partChannels = Object.keys(partsFromConductorCh[i].payload);

            for ( var j = 0; j < partChannels.length; j++ ) {
              var channelInPart = partsFromConductorCh[i].payload[j];   
              var chNumber = partsFromConductorCh[i].payload[j].channelId;

              if ( typeof pattern[chNumber] == 'undefined' ) {
                pattern[chNumber] = [];
                //console.log(chNumber, patternnn.id);
              }                

              if ( typeof channelInPart.presetId !== 'undefined' ) {

                if ( typeof preset[chNumber] == 'undefined' ) {
                  preset[chNumber] = [];                  
                }  

                preset[chNumber].push(channelInPart.presetId);
              }


              if ( typeof channelInPart.ptnSeqList !== 'undefined' ) {

                var chPatterns = Object.keys(channelInPart.ptnSeqList);

                for ( var k = 0; k < chPatterns.length; k++ ) {
                  var patternnn = channelInPart.ptnSeqList[k];  
                  pattern[chNumber].push(patternnn.id);
                }
              }

            }              
          }  

          songPresets.push(window['insConf'][1].songs[h].presets);
          //console.log(window['insConf'][1].songs[h].presets);

          songPatterns.push(window['insConf'][1].songs[h].patterns);
          //console.log(pattern/*,songPatterns*/);

        }

      }


      // Flattening multidimensional Arrays
      var songPatterns = [].concat.apply([], songPatterns);
      var songPresets = [].concat.apply([], songPresets);


      for ( var l = 0; l < preset.length; l++ ) {

        if ( typeof preset[l] !== 'undefined' ) {

          preset[l] = preset[l].filter(function(elem, index, self) {
            return index === self.indexOf(elem);
          });

          preset[l] = songPresets.filter(function(item) { // presetObj[l]
              return preset[l].indexOf(item.id) !== -1;
          });

          if ( preset[l].length == 0 ) {
            preset.splice(l, 1);
          }    
        }  
      }  



      for ( var m = 0; m < pattern.length; m++ ) {

        if ( typeof pattern[m] !== 'undefined' ) {

          pattern[m] = pattern[m].filter(function(elem, index, self) {
            return index === self.indexOf(elem);
          });

          pattern[m] = songPatterns.filter(function(item) { // patternObj[l]
              return pattern[m].indexOf(item.id) !== -1;
          });
        }  
      }  


    }
    //console.log(pattern, songPatterns); //  songPresets , pattern preset, songPresets






   // Looping through all session channel data to store corresponding/specific data into arrays (patterns, parts, presets,)

		//var sndChannelStart = 800;
		for (var b=0; b<soundingChannelNumber; b++) {
			if (typeof window['insConf'][b] !== 'undefined') { 
				//console.log('ok');
				this._channelName[b]=[];
				this._channelName[b]['name']= this._instrumentsConfig[b].channelName;
				this._channelName[b]['color']= this._instrumentsConfig[b].conf[0]['color'];

				this._channelPatterns[b] = this._instrumentsConfig[b].patterns;


        if ( typeof window['insConf'][1].songs !== 'undefined' ) {

          if ( typeof this._channelPatterns[b] == 'undefined' ) {
            this._channelPatterns[b] = [];
          }  


          if ( typeof pattern[b] !== 'undefined' ) {
            for ( var l = 0; l < pattern[b].length; l++ ) {
              this._channelPatterns[b].push(pattern[b][l]);
            }  
          }  

        }    
        //console.log(this._channelPatterns[b]); 
				achannelPatterns[b]= JSON.stringify(this._channelPatterns[b]); // this._instrumentsConfig[b].patterns

        this._channelParts[b] = this._instrumentsConfig[b].parts;

        if ( typeof window['insConf'][1].songs !== 'undefined' ) {  

          // in case no channel parts where defined in session of ins_conf.js
          if ( typeof this._channelParts[b] == 'undefined' ) {
            this._channelParts[b] = [];
          }  


          if ( typeof part[b] !== 'undefined' ) {
            for ( var l = 0; l < part[b].length; l++ ) {
              this._channelParts[b].push(part[b][l]);
            }  
          }  

        }    
        achannelParts[b]= JSON.stringify(this._channelParts[b]); // this._instrumentsConfig[b].parts



				this._channelPresets[b] = this._instrumentsConfig[b].presets;


        if ( typeof window['insConf'][1].songs !== 'undefined' ) {    

          if ( typeof this._channelPresets[b] == 'undefined' ) {
            this._channelPresets[b] = [];
          }        

          if ( typeof preset[b] !== 'undefined' ) {
            for ( var l = 0; l < preset[b].length; l++ ) {
              this._channelPresets[b].push(preset[b][l]);
            }  
          } 
        }    

				achannelPresets[b]= JSON.stringify(this._channelPresets[b]); 

				this._channelpatternSeq[b]= this._instrumentsConfig[b].patternSeq;
				achannelpatternSeq[b]= JSON.stringify(this._instrumentsConfig[b].patternSeq);

        this._channelsongSeq[b]= this._instrumentsConfig[b].songs;
        achannelsongSeq[b]= JSON.stringify(this._instrumentsConfig[b].songs);


				this._instrumentsSoundModes[b]= sound;
				this._audioChannelShift[b]= defaultShift;
				// 10 params processed
			}			
		}



  // General (non channel dependent) parameters
		// 802
		var elVal = window.findObjectById(this._instrumentsConfig, 699);
		this._insKickoutTime = elVal.x.value;

		var elVal = window.findObjectById(this._instrumentsConfig, 999);
		this._tempo = elVal.x.value;

		var elVal = window.findObjectById(this._instrumentsConfig, 698);
		if (typeof elVal !== 'undefined')
		{
			this._noteMin = elVal.x.value;    
		}
		
		var elVal = window.findObjectById(this._instrumentsConfig, 697);
		if (typeof elVal !== 'undefined')
		{
			this._noteMax = elVal.x.value;    
		}        

		window.chPatternsAtStartup = achannelPatterns;
    window.chPartsAtStartup = achannelParts;
		window.chPresetsAtStartup = achannelPresets;

		this._channelInfo = [];
		this._channelInfo['bpm']=this._tempo;
		this._channelInfo['serverStartTime']=this._audioServerStartTimestamp;
		this._channelInfo['kickoutTime']=this._insKickoutTime;
		this._channelInfo['NoteMin']=this._noteMin;
		this._channelInfo['NoteMax']=this._noteMax;



  // Populating list of all available session names [from ins.conf file(s)]
		this._sessionList = [];

		for(var a=1; a<99; a++)
		{
			if(typeof window['insConf'+a] !== 'undefined')
			{
				this._sessionList.push(window['insConf'+a][0].sessionName);
			}
		}


  // Various default general/main Web Audio renderer settings

		var _context = null;
		var _masterGainNode = null;
		var _lowpassFilter = null;
		var _compressor = null;
		var _masterDry = null;
		var _masterWet = null;
		var _masterDelaySend = null;
		var _delay = null;
		var _reverb = null;
		var _highpassFilter = null;
		var _highpassFilterFreq = 0;
		this._filterFreq = 22000;
		this._playbackRate = 1;
		this._q = 1;
		this._empty = null;
		var _filterCutoff = 22000;
		var _delayAmount = 0.125;
		this._delayTime = 0;
		var effectsConfig = window.fxConf;
		
    // FX
		this.initialize = function()
		{
			// Create context.
			_context = new AudioContext();

			// Create master gain control.
			_masterGainNode = _context.createGain();
			_masterGainNode.gain.value = 0.7;      


			// create lowpass filter			  			
      //   _lowpassFilter = _context.createBiquadFilter();
		  // _lowpassFilter.frequency.value = 300;
      //   _lowpassFilter.Q.value = 300;
      
      // _masterGainNode.connect(_lowpassFilter);

			// create highpass filter
			// _highpassFilter = _context.createBiquadFilter();
			// _highpassFilter.type = 1;
			// _highpassFilter.frequency.value = _highpassFilterFreq;
      

			// create compressor
			_compressor = _context.createDynamicsCompressor();
			_compressor.treshold = -20;
			_compressor.attack = 1;
			_compressor.release = 250;
			_compressor.ratio = 4;
			_compressor.knee = 5;

			// Create master gain control.
			_compressor.connect(_context.destination); //_context.destination = zone de rendu audio / connect = relie le _compressor à la zone de rendu
			//_lowpassFilter.connect(_compressor);
			//_masterGainNode.connect(_lowpassFilter);
			_masterGainNode.connect(_compressor); // relie le _masterGainNode au _compressor

			window['audio_context'] = _compressor; // _masterGainNode; causes recorder.js:72 Uncaught IndexSizeError: Failed to execute 'connect' on 'AudioNode': output index (0) exceeds number of outputs (0).

			// Create master wet and dry.
			// _masterDry = _context.createGain();
			// _masterWet = _context.createGain();
			// _masterDelaySend = _context.createGain();
			// _masterDry.gain.value = 1;
			// _masterWet.gain.value = 0;

			// Create delay
			// _delay = _context.createDelay();

			// Create reverb
			// _reverb = _context.createConvolver();

			// _compressor.connect(_context.destination);
			// Connect master dry and wet to compressor.
			// _masterDry.connect(_compressor);
			// _masterWet.connect(_compressor);
			// _masterDelaySend.connect(_compressor);

			// Connect delay to master wet.
			// _delay.connect(_masterDelaySend);
			// _reverb.connect(_masterWet);

			// Connect lowpass filter
			// _lowpassFilter.connect(_masterDry);
			// _lowpassFilter.connect(_masterWet);
			// _lowpassFilter.connect(_masterDelaySend);

			// _highpassFilter.connect(_lowpassFilter);
			// _masterGainNode.connect(_highpassFilter);

			// this.setFxValues();

			this.createInstruments();

			/*
				if (window.childRoom==1) {
					this.start();
				} 
			*/

			// console.log(this._audioServerStartTimestamp);
		};


		/*this.setFxValues = function() {

			// _delay.delayTime.value = _delayTime;
			// _masterDelaySend.gain.value = _delayAmount;
			_lowpassFilter.frequency.value = this._filterFreq;
			_lowpassFilter.Q.value = this._q;
			// console.log('_filterFreq', this._filterFreq, _lowpassFilter.frequency.value);
		} */


		this.createInstruments = function()
		{
			_instruments = [];
			
			for(var i = 0; i < this._instrumentsConfig.length; i++)
			{
				var type = this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].type; 
				
				if (type=='control' || type=='gfx') {
					var tracks = [];
				} else {
					if (typeof this._instrumentsConfig[i].patterns !== 'undefined') {
						var pattern = this._instrumentsConfig[i].patterns[this._instrumentsConfig[i].defaultPattern].tracks;
					} else {
						var pattern = null;
					}				
          // 1 "track" corresponds to a (16) step/note sequencer time "line", AKA 1 bar of potential sounding events
					var tracks = this.createTracks(i, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].tracks, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].type, pattern);
				}



				channelInfo = {};
				channelInfo.bpm = this._tempo; 
				channelInfo.serverStartTime = this._audioServerStartTimestamp;
				channelInfo.kickoutTime = this._insKickoutTime;
				channelInfo.noteMin = this._noteMin;
				channelInfo.noteMax = this._noteMax;    
				channelInfo.barOffset = eval('this._insBarOffset'+i); 
				channelInfo.countdownMode = this._countdownMode;

        if ( typeof this._channelName[i] !== 'undefined' ) {
  				channelInfo.channelName = this._channelName[i]['name'];
          channelInfo.channelColor = this._channelName[i]['color']; 
        }

				channelInfo.channelNumber = i;

				channelInfo.sessionName = _self._sessionNumber-1; 
				channelInfo.sessionList = this._sessionList;

				if(typeof this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].inputMode !== 'undefined')
				{
           // inputMode = 'grid': step sequencer vs. 'keyboard': free triggering of notes/pads 
					channelInfo.inputMode = this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].inputMode;
				}

				if (typeof this._channelpatternSeq[i] !== 'undefined')
				{               
					channelInfo.channelPatternSeqList= this._channelpatternSeq[i][this._instrumentsConfig[i].defaultPatternSeq]; //;
					this._patternSequencer.push(channelInfo.channelPatternSeqList);      
				}


//*
        if ( typeof this._channelsongSeq[i] !== 'undefined' ) {           
          channelInfo.channelSongSeqList = this._channelsongSeq[i];
          channelInfo.defaultSong = this._instrumentsConfig[i].defaultSong;
          this._songSequencer.push(channelInfo.channelsongSeqList);

        }
//*/


				channelInfo.patterns = this._patterns;     
				channelInfo.channelPatterns = this._channelPatterns[i];   

        channelInfo.parts = this._parts;     
        channelInfo.channelParts = this._channelParts[i];   


				channelInfo.channelKits = this.getKitNames(i);
				channelInfo.presets = this._presets;     
				channelInfo.channelPresets = this._channelPresets[i];              

				//console.log("_patterns at ins crea: ", this._patterns);
				//console.log("ch name: ", channelInfo.channelName);
				//console.log("ch ptn: ", channelInfo.channelPatterns);

				if ( typeof this._channelPatterns[i] !== 'undefined' && typeof this._channelPatterns[i][this._instrumentsConfig[i].defaultPattern] !== 'undefined' )
				{
					channelInfo.patternId = this._channelPatterns[i][this._instrumentsConfig[i].defaultPattern].id;

					for(var k = 0; k < this._channelPatterns[i].length; k++)
					{
						var chptn = this._channelPatterns[i][k];  
						this._systemPatterns.push(chptn);
					}  

				}


        if ( typeof this._channelParts[i] !== 'undefined' ) {

          for(var k = 0; k < this._channelParts[i].length; k++)
          {
            var chptn = this._channelParts[i][k];  
            this._systemParts.push(chptn);
          }  
        }
				//console.log('sys ptns @ ins creation: ', this._systemPatterns);

				if ( typeof this._channelPresets[i] !== 'undefined' && typeof this._channelPresets[i][this._instrumentsConfig[i].defaultPreset] !== 'undefined' )
				{
					channelInfo.presetId = this._channelPresets[i][this._instrumentsConfig[i].defaultPreset].id;
					channelInfo.preset = this._channelPresets[i][this._instrumentsConfig[i].defaultPreset];

					for(var k = 0; k < this._channelPresets[i].length; k++)
					{
						var chptn = this._channelPresets[i][k];  
						this._systemPresets.push(chptn);
					}  
				}            

				if (typeof this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].instrumentUrl !== 'undefined')
				{
					channelInfo.instrumentUrl = this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].instrumentUrl;
				}   

				var instrument = new mixr.models.Instrument(i, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].name, tracks, 1.0, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].type, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].color, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].kitNumber, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].controls, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].instrumentName, channelInfo); 
				_instruments.push(instrument);
				//console.log('instrument:', tracks); // instrument
			};

			window.availSlots = _instruments.length;
			_availableInstruments = _instruments.concat(); // Join two arrays:
			_self._availableInstruments = _instruments.concat();
			window._availableInstruments = _instruments.concat();
			//console.log('_availableInstruments: ', _availableInstruments);
			//console.log('sys + regular ptns: ', this._systemPatterns, this._patterns);
		};





		this.createTracks = function(instrumentId, tracksConfig, type, pattern)
		{
			//console.log('createTracks', tracksConfig.length);
			var tracks = [];

      if ( typeof tracksConfig !== 'undefined' ) {

			for (var i = 0; i < tracksConfig.length; i++) // bug: sequencer.js:704 Uncaught TypeError: Cannot read property 'length' of undefined
			{
				var config = tracksConfig[i];

  			if (pattern==null) {
  				var patternLine = null;
  			} else {
  				var patternLine = pattern[i];
  				//console.log('ptn line', patternLine);
  			}

				if (type === 'samples') {
					var track = new mixr.models.Track(instrumentId + '-' + i, config.name, patternLine, samplesPath + config.sampleUrl, 1.0); // null
				} else {
					var track = new mixr.models.Track(instrumentId + '-' + i, config.name, patternLine, null, 1.0); //null
					track.note = config.note;
				};
				//console.log('track', track);

				/*
				unuseful to do this now cause 1st channel not connected yet

				if (window.graphixMode==1)
				{
					var notes = [];
					var notesNumber = track.notes.length;

					for(var l = 0; l < notesNumber; l += 1)
					{
						noteInfo = {};
						noteInfo.id = track.id.split('-')[1];
						noteInfo.trackId = track.id
						noteInfo.noteId = l;
						noteInfo.volume = track.notes[l];
					}    

					console.log('create tracks',noteInfo);
			
					if (typeof window['SEQVIEW'] !== 'undefined')
					{
						console.log('upd msg sent');
						window['SEQVIEW'].updateNote(noteInfo); // remove audio stuttering
					}
				}  
				*/
				tracks.push(track);
			} // end of for loop: for (var i = 0; i < tracksConfig.length; i++) {

			return tracks;


      }

		};





		this.getKitNames = function(channelNumber) {
			
			var channelKits = [];
			for (var i = 0; i < this._instrumentsConfig[channelNumber].conf.length; i++) {
				var kit = this._instrumentsConfig[channelNumber].conf[i];
				var kitName = kit.name;
				channelKits.push(kitName);
			}

			return channelKits;
		};



		this.addInstrument = function(instrument)
		{
			_availableInstruments.push(instrument);
			_self._availableInstruments.push(instrument);
			window._availableInstruments.push(instrument);
		};


		this.addPattern = function(data, clientId)
		{
			//console.log('addPattern: ', data);
			var pattern = JSON.parse(data.args.pattern);
			//console.log('data from addPattern fct: ', pattern);
			// if pattern.id does not already exist in _patterns Or replace/override old entry with new data (e.g: preset name changed)
			//_patterns.push(pattern);

			var pushpattern = 0;  

			if (this._patterns.length==0) {
				this._patterns.push(pattern);
			} else if (this._patterns.length>0) {
				
				for ( var j = 0, len = this._patterns.length; j < len; ++j ) {            
					var ptn = this._patterns[j];
					ptn['classs'] = 'session';

					if (ptn.id==pattern.id) {

						var ptnIndex = j;
						var pushpattern = 1;

					} 
    
				} 

				if (pushpattern == 1)
				{
					this._patterns.splice(ptnIndex, 1); // remove old entry
					this._patterns.push(pattern); // update with new entry

				} else /*if (pushpattern == 2)*/
				{
					this._patterns.push(pattern); // add new pattern
				}
			}
			//console.log('_patterns length: ', this._patterns.length, Object.keys(_self._patterns).length);
			//console.log('_patterns', this._patterns);
		};    




		this.addPreset = function(data, clientId)
		{
			//console.log('addPreset', data);
			var preset = JSON.parse(data.args.preset);
			var pushpreset = 0;  

			if (this._presets.length==0)
			{
				this._presets.push(preset);
			}
			else if (this._presets.length>0)
			{
				for(var j = 0, len = this._presets.length; j < len; ++j )
				{            
					var pre = this._presets[j];
					pre['classs'] = 'session';

					if(pre.id==preset.id)
					{
						var preIndex = j;
						var pushpreset = 1;
					}       
				} 

				if (pushpreset == 1)
				{
					this._presets.splice(preIndex, 1); // remove old entry
					this._presets.push(preset); // update with new entry
				}
				else /*if (pushpreset == 2)*/
				{
					this._presets.push(preset); // add new preset
				}
			}
			//console.log(this._presets);
		};    



		this.getNextInstrument = function(clientId, pwd)
		{
			if ( typeof _clients[clientId] !== 'undefined' ) {
				return _clients[clientId];
			} //*/

			//console.log("_availableInstruments", _instruments); // _availableInstruments

			var numAvailableInstruments = _availableInstruments.length;
			
			if ( numAvailableInstruments === 0 ) {
				console.log("No more instruments available");
				return;
			}

			// Do not give Conductor role/instrument unless provided pwd is mopo
			if ( pwd!='mopo' && _availableInstruments[0].instrumentName == 'Conductor' ) {
				var nextInstrument = _availableInstruments[1];
				_availableInstruments.splice(1, 1);
			}
      //*
      else if (pwd !== 'mopo' && pwd !== 'nomopo') // prevent conductor role/device from loading frome here - && pwd !== 2
      {

        var nextInstrument = _instruments[pwd]; // +substract pwd-1
      }
      //*/

			else //if (pwd=='mopo')
			{
				var nextInstrument = _availableInstruments[0]; // get first available instrument
				_availableInstruments.shift(); // and remove it from available instrument list
				// The shift() method removes the first item of an array, and returns that item.
				_self._availableInstruments.shift();
				window._availableInstruments.shift();          
			}



			if (typeof nextInstrument !== 'undefined')
			{
				// Initialize the instrument and call start when ready.
				nextInstrument.initialize(this.start);
				// Pass the context the instrument.
				nextInstrument.setup(_context);

				_clients[clientId] = nextInstrument;
				//console.log("get nxt ins: ", nextInstrument);
				return nextInstrument;
			}
			else
			{
				return;
			}
		};





/*
    this.initAllIns = function(clientId, insId) { // init all default session instruments
      // need instrument > clientId matrix from main room
      // current instrument kit per channel...

      //*
      if (typeof _clients[clientId] !== 'undefined') {
        return _clients[clientId];
      } // /


      var nextInstrument = _instruments[insId]; 

      if (typeof nextInstrument !== 'undefined') {

        // Initialize the instrument and call start when ready.
        nextInstrument.initialize(this.start);
        // Pass the context the instrument.
        nextInstrument.setup(_context);

        _clients[clientId] = nextInstrument;

        //return nextInstrument;

      } else {
        return;
      }
    };
*/




		this.getInstrumentById = function(clientId, insId) {

			//*
			if (typeof _clients[clientId] !== 'undefined') {
				return _clients[clientId];
			} //*/


			var nextInstrument = _instruments[insId]; 

			if (typeof nextInstrument !== 'undefined') {

				// Initialize the instrument and call start when ready.
				nextInstrument.initialize(this.start);
				// Pass the context the instrument.
				nextInstrument.setup(_context);

				_clients[clientId] = nextInstrument;

				//return nextInstrument;

			} else {
				return;
			}
		};


		this.changeChannel = function(clientId)
		{
			/*
			if (typeof _clients[clientId] !== 'undefined') {
			return _clients[clientId];
			} //
			*/

			//console.log("_availableInstruments", _availableInstruments);

			var numAvailableInstruments = _availableInstruments.length;
			if (numAvailableInstruments === 0) {
				console.log("No more instruments available");
				return;
			}

			var nextInstrument = _availableInstruments[0]; // get first available instrument
			_availableInstruments.shift(); // and remove it from available instrument list
			// The shift() method removes the first item of an array, and returns that item.
			_self._availableInstruments.shift();
			window._availableInstruments.shift();



			if (typeof nextInstrument !== 'undefined') {

				// Initialize the instrument and call start when ready.
				nextInstrument.initialize(this.start);
				// Pass the context the instrument.
				nextInstrument.setup(_context);

				//console.log("Released next available instrument", nextInstrument);

				//console.log("_clients", _clients);

				_clients[clientId] = nextInstrument;
				return nextInstrument;

			} else {
				return;
			}

		};




		this.changeSession = function(data, clientId) {
			var sessNumber = parseInt(data.x) + 1;
      console.log("changed session to sessNumber: ", sessNumber);
			window['insConf'] = window['insConf'+sessNumber];
			this['_instrumentsConfig'] = window['insConf'];
			this._sessionNumber = sessNumber;
      //this.createInstruments(); // Update general instruments' object
		};    

		
  // modify instrument object params without reloading instrument, etc... (by channel)
		this.directInfoChange = function(data)
		{ 


    if (typeof _clients[data.client] !== 'undefined') {

			var channelId = _clients[data.client].id;
			
			if (data.args.id==201)
			{ 
				_instruments[channelId].patternSeqState = data.args.ptnSeqState;
				_instruments[channelId].channelInfo.patternSeqState = data.args.ptnSeqState;

			} else if (data.args.id==202) {
				_instruments[channelId].patternEditId = data.args.ptnEditId;
				_instruments[channelId].channelInfo.patternEditId = data.args.ptnEditId;     

      // save current pattern seq state for one channel  
      } else if (data.args.id==204) {
        var ptnSeqObjFromStr = JSON.parse(data.args.currentPtnSeq); 
        _instruments[channelId].channelInfo.currentPtnSeq = ptnSeqObjFromStr; 

      } else if (data.args.id==203 && typeof data.args.ptnEditState !== 'undefined') {
        _instruments[channelId].patternEditState = data.args.ptnEditState;
				_instruments[channelId].channelInfo.patternEditState = data.args.ptnEditState;         
			}
			else
			{
				_instruments[channelId].channelInfo.presetId = data.args.presetId;
				
				if (typeof data.args.preset !== 'undefined')
				{
					//console.log('preset: ', data.args.preset)
					this.addPreset(data, data.client);
				}
			}

      }    
		}





		this.updateNotes = function(data) { // update various notes
			
      if ( typeof _clients[data.client] !== 'undefined' ) {
      
  			var channelId = _clients[data.client].id;

  			// transport patternId (unsaved or saved pattern states) across channel changes  
  			_instruments[channelId].channelInfo.patternId = data.args.patternId;
  			//console.log('upd notes: ', _instruments[channelId].channelInfo.patternId, data);

  			if ( channelId !=1 ) { // beware hardcoded value

  				if ( data.args.classs == 'channel' ) {
            // bug: SyntaxError: Unexpected token u in JSON at position 0 at JSON.parse () at mixr.Sequencer.updateNotes (sequencer.js:1070) 
  					var ptnStorage = JSON.parse(window.chPatternsAtStartup[channelId]); // oriChannelPatterns
  				} else {  
  					var ptnStorage = this._patterns;
  				}        

  				// override with live/ session patterns
  				if ( this._patterns.length > 0 ) {
  					var presets = this._patterns.concat(JSON.parse(window.chPatternsAtStartup[channelId])); //window.channelPresets.concat(presets);
  					presets = presets.filter((set => f => !set.has(f.id) && set.add(f.id))(new Set));

  					var ptnStorage = presets; //this._patterns;
  				}

  				//console.log('ptnStj', ptnStorage, data.args.x ); // data.args.classs, ptnStorage, data.args.x - this._patterns

  				var result = $.grep(ptnStorage, function(e){ return e.id == data.args.x; });


          if ( typeof result[0] !== 'undefined' ) {
    				var trackNumber = result[0].tracks.length; 
          }

  				var channelTrackLength = _instruments[channelId].tracks.length;


  				if ( trackNumber > channelTrackLength ) {
  					var trackNumber = channelTrackLength;
  				} else {
  					var trackNumber = trackNumber;
  				}


  				// first reset played tracks of processed channel
  				var maxTrackNumber = 90; // Beware Hardcoded value! 30
  				for (var n = 0, len = maxTrackNumber; n < len; n += 1) {
  					var notesNumber = 16;//result[0].tracks[n].length;
  					//var traack = result[0].tracks[n];        
  					var notes = [];

  					for (var l = 0; l < notesNumber; l += 1) {
  						if (typeof _instruments[channelId].tracks[n] !== 'undefined') {            
  							_instruments[channelId].tracks[n].notes[l] = 0; 
  						}          
  					}  
  				} 

  				notesObject = [];

  				for (var n = 0, len = trackNumber; n < len; n += 1) {
  					var notesNumber = result[0].tracks[n].length;
  					var traack = result[0].tracks[n];
  					//console.log("notesNumber + traack", notesNumber, traack);          

  					var notes = [];

  					for (var l = 0; l < notesNumber; l += 1) {
  						//notes[l] = traack[l];

  						if (data.args.x=='silence01') { // beware hardcoded : to avoid notes insered just before playHead get played while current played pattern is silence01
  							var nvol = 0;
  						} else {
  							var nvol = traack[l];
  						}

  						_instruments[channelId].tracks[n].notes[l] = nvol; 

  						if (n==0) {
  							//console.log('ins:', channelId, n, l, _instruments[channelId].tracks[n].notes[l]);
  						}

  						noteInfo = {};
  						noteInfo.id = channelId;
  						noteInfo.trackId = channelId+'-'+n;
  						noteInfo.noteId = l;
  						noteInfo.volume = traack[l];


  						if (window.graphixMode==1 && data.args.x!='silence01') {
  							//console.log( data.args);
  							window['SEQVIEW'].updateNote(noteInfo); // remove audio stuttering
  						}    

  						//window['SEQVIEW'].updateNote(noteInfo);
  						//if noteInfo.volume>0 {
  						notesObject.push(noteInfo);            
  						//}
  					}  
  				} 
  			} // end of exclude conductor channel (channel 1 aka 2nd channel)    
      }
		};





		this.updateInstrument = function(data, clientId)
		{ // change(Instrument)Kit


      console.log('this.updateInstrument:', data, clientId);

			//if (typeof data.pattern !== 'undefined') { = do not transform old instrument to new one...

      if (typeof _clients[clientId] !== 'undefined') {  

			//console.log('_clients after:', _clients);
			var trackSet = data.x; // destination kit number (0 | 1) go from instrument 0 to [1] - kitNumber // valueX-109
			var prevKit = _clients[clientId].id; // source kit number aka fetch data from instrument [0] - _clients[clientId].id - InstrumentId

			//console.log("_clients[clientId].id", _clients[clientId].id);
			//console.log("dat ptn + data ptnId: ", data.pattern, data.patternId, data.x);

			if (data.id==998) {
				var patternId = data.patternId;
			} else {
				var patternId = data.x;
			}  


			if (typeof data.pattern !== 'undefined') { // if "change pattern only" msg received
				var trackSet = data.kitNumber; //prevKit;

				if (data.classs=='channel') {
					var ptnStorage = this._systemPatterns;
				} else {  
					var ptnStorage = this._patterns;
				}

				var result = $.grep(ptnStorage, function(e){ return e.id == data.x; });
				//console.log("matchin ptn object", result[0]);   // .tracks          

			} //else {

			//console.log("l1173 debug: ", this._instrumentsConfig[prevKit].conf[trackSet].tracks);  // this._instrumentsConfig[prevKit].conf[trackSet], prevKit, trackSet


    if ( typeof this._instrumentsConfig[prevKit].conf[trackSet] !== 'undefined') {  

			// retrieve track info from destination kit and override source kit with that info
			var tracksUpdate = this.createTracks(prevKit, this._instrumentsConfig[prevKit].conf[trackSet].tracks, this._instrumentsConfig[prevKit].conf[trackSet].type); 



			//}


			channelInfo = {};
			channelInfo.bpm = this._tempo; //window.generalChannelInfo; 
			channelInfo.serverStartTime = this._audioServerStartTimestamp;
			channelInfo.kickoutTime = this._insKickoutTime;
			channelInfo.noteMin = this._noteMin;
			channelInfo.noteMax = this._noteMax;            
			channelInfo.barOffset = eval('this._insBarOffset'+prevKit); //this._insBarOffset[0];  
			channelInfo.countdownMode = this._countdownMode;  
			channelInfo.sessionName = _self._sessionNumber-1; 
			channelInfo.sessionList = this._sessionList;//Serialized;


			if (typeof this._instrumentsConfig[prevKit].conf[trackSet].inputMode !== 'undefined') {
				channelInfo.inputMode = this._instrumentsConfig[prevKit].conf[trackSet].inputMode;
			}        


			if (typeof prevKit !== 'undefined') {   
				//console.log('prevKit', prevKit);
				channelInfo.channelNumber = prevKit;
				channelInfo.channelName = this._channelName[prevKit]['name'];
				channelInfo.channelColor = this._channelName[prevKit]['color'];            
			}
    

			channelInfo.patterns = this._patterns;
			channelInfo.channelPatterns = this._channelPatterns[prevKit];

      channelInfo.parts = this._parts;
      channelInfo.channelParts = this._channelParts[prevKit];

			channelInfo.channelKits = this.getKitNames(prevKit);

			if (typeof data.kitNumber !== 'undefined') { channelInfo.presetId = data.kitNumber; }

			if (typeof data.pattern !== 'undefined' && typeof data.patternId == 'undefined') { channelInfo.patternId = result[0].id; /*data.x*/ var patternRoot = result[0]; } else if (typeof data.patternId !== 'undefined') { channelInfo.patternId = data.patternId; var patternRoot = data.patternId; }
			//console.log("_patterns at kit change: ", this._patterns);

			channelInfo.presets = this._presets;     
			channelInfo.channelPresets = this._channelPresets[prevKit];  
			if (typeof data.presetId !== 'undefined') { channelInfo.presetId = data.presetId; }   


			if (typeof this._instrumentsConfig[prevKit].conf[data.kitNumber].instrumentUrl !== 'undefined') { channelInfo.instrumentUrl = this._instrumentsConfig[prevKit].conf[data.kitNumber].instrumentUrl; }   
			
			if (typeof data.ptnSeq !== 'undefined')
			{
				//console.log('data.ptnSeq: ', data.ptnSeq);

				var ptnSeqObjFromStr = JSON.parse(data.ptnSeq);
				//channelInfo.ptnSeq = data.ptnSeq;
				//channelInfo.channelPatternSeq = [];            
				channelInfo.channelPatternSeqList = ptnSeqObjFromStr.list;
				//this._patternSequencer[prevKit] = channelInfo.channelPatternSeqList;

				channelInfo.patternSeqState = ptnSeqObjFromStr.state;
			}

			if (typeof data.ptnEdit !== 'undefined')
			{
				//console.log('data.ptnEdit: ', data.ptnEdit);

				var ptnEditObjFromStr = JSON.parse(data.ptnEdit);
				channelInfo.patternEditState = ptnEditObjFromStr.state;

				channelInfo.patternEditId = ptnEditObjFromStr.id;          
			}        

			//console.log('insUrl:', this._instrumentsConfig[prevKit].conf[data.kitNumber].instrumentUrl);  // preset id b4 inst change data.presetId

			// override source instrument with destination kit info
			var anextInstrument = new mixr.models.Instrument(prevKit, this._instrumentsConfig[prevKit].conf[trackSet].name, tracksUpdate, 1.0, this._instrumentsConfig[prevKit].conf[trackSet].type, this._instrumentsConfig[prevKit].conf[trackSet].color, this._instrumentsConfig[prevKit].conf[trackSet].kitNumber, this._instrumentsConfig[prevKit].conf[trackSet].controls, this._instrumentsConfig[prevKit].conf[trackSet].instrumentName, channelInfo);
			
			if (anextInstrument.tracks.length > _clients[clientId].tracks.length)
			{
				var trackNumber = _clients[clientId].tracks.length;
			}
			else
			{
				var trackNumber = anextInstrument.tracks.length;
			}

			// console.log('trackNumber::: ', trackNumber);
			
			if ( typeof data.pattern !== 'undefined' && typeof data.patternId == 'undefined' )
			{
				//var pattern = JSON.parse(data.args.pattern);

				//console.log('ptn root: ', patternRoot);

				var trackNumber = patternRoot.tracks.length; // result[0]
				for (var n = 0, len = trackNumber; n < len; n += 1) {
					var notesNumber = patternRoot.tracks[n].length;
					var traack = patternRoot.tracks[n];
					//console.log("notesNumber + traack", notesNumber, traack);

					var notes = [];

					for (var l = 0; l < notesNumber; l += 1) {
						notes[l] = traack[l];
					}  
					//var notes = result[0].tracks[n].getNotes(); // 
					anextInstrument.tracks[n].setNotes(notes);
				}          

			}
			else
			{
				// use source instrument kit as pattern to feed destination kit with note info
				for (var n = 0, len = trackNumber; n < len; n += 1) {
					//var track = _instruments[0].tracks[n];
					var notes = _clients[clientId].tracks[n].getNotes(); // 
					anextInstrument.tracks[n].setNotes(notes);
				}
			}  

			_instruments[prevKit] = anextInstrument;
			//this._instruments[prevKit] = anextInstrument;

			//console.log('kit number', anextInstrument.kitNumber, this._instruments[prevKit].kitNumber);

			// Initialize the instrument and call start when ready.
			anextInstrument.initialize(this.start);
			// Pass the context the instrument.
			anextInstrument.setup(_context);
			//console.log("Updated instrument", anextInstrument);

			_clients[clientId] = anextInstrument;
			//console.log("_clients", _clients);

			//console.log("this._patterns: ", this._patterns);

			return anextInstrument;

      }

      }

		};    



    // This lightweight function replaces this.updatePreset on some case(s)
    this.updatePresetLean = function(data, clientId) {

      if (typeof data.preset !== 'undefined') { 

        if (data.classs=='channel') {
          var preStorage = this._systemPresets;
        } else {  
          var preStorage = this._presets;
        }
        
        var result = $.grep(preStorage, function(e){ return e.id == data.presetId; }); // data.x

        if (typeof result[0] !== 'undefined') { 

          if (typeof window['clockStarted'] !== 'undefined') { 

            var ctrlKeyzz = Object.keys(result[0].controls);

            for ( var j = 0; j < ctrlKeyzz.length; j++ ) {

              newObj = {}  ;

              newObj.x = result[0].controls[ctrlKeyzz[j]];
              newObj.id = ctrlKeyzz[j];

                //window.ratelimit.schedule(function() {
                  //console.log('data', newObj); //
                  this.updateFxParam(newObj, clientId); // data.client   
                //});

            }                       

          }

        //console.log("matchin preset", data, result[0], this._systemPresets, this._presets);   // .tracks          

        } 

      }

    }  



		this.updatePreset = function(data, clientId)
		{ // changePreset

      

			var trackSet = data.kitNumber; // destination kit number (0 | 1) go from instrument 0 to [1] - kitNumber // valueX-109

      if ( typeof data.clientsFromMainRoom !== 'undefined' ) { 

        _clients2 = data.clientsFromMainRoom;
        console.log('this.updatePreset at late coming childroom event', data, clientId ,_clients ); // 

      } else {
        
        _clients2 = _clients;
        console.log('normal preset change event', data, clientId, _clients2);
      }

      


if ( typeof _clients2[clientId] == 'undefined' || _clients2[clientId].id != data.channelId ) {



      var cltKiz = Object.keys(_clients2);



      for ( var ii = 0; ii < cltKiz.length; ii++ ) { 

        var kkey = cltKiz[ii]; 

        if (_clients2[kkey].id == data.channelId) {
          //_clients2[clientId] = _clients2[kkey];
          clientId = kkey;
        }


      }  


if ( typeof _clients2[clientId] != 'undefined' ) {
  _clients2[clientId].kitNumber = trackSet;
}      


console.log('_clients2', _clients2, _clients2[clientId]);
//return;

/*
    _clients2[clientId] = _clients2.filter(function( obj ) { // channelPresets - presets // this.channelInfo.channelPresets
      return obj.id === data.channelId // "2fbdd99d0000";  //
    });      
//*/


  //_clients2[clientId] = $.grep(_clients2, function(e){ return e.id == data.channelId; });


}

      



      if ( typeof _clients2[clientId] !== 'undefined' /*|| !isNaN(clientId)*/ ) {


      // if variable not a number  
      //if ( isNaN(clientId) ) {
			 var prevKit = _clients2[clientId].id; // probably channelId - source kit number aka fetch data from instrument [0] - _clients[clientId].id - InstrumentId
      /*} else {
        var prevKit = clientId;
        _clients[clientId] = _instruments[clientId];
      } */

			if (typeof data.pattern !== 'undefined') { // if "change pattern only" msg received
				var trackSet = data.kitNumber; //prevKit;

				if (data.classs=='channel') {
					var ptnStorage = this._systemPatterns;
				} else {  
					var ptnStorage = this._patterns;
				}
				
				var result = $.grep(ptnStorage, function(e){ return e.id == data.patternId; }); // data.x
				//console.log("matchin ptn object", result[0]);   // .tracks          

			} 

      if ( typeof this._instrumentsConfig[prevKit].conf !== 'undefined' ) { // bug: Uncaught TypeError: Cannot read property 'conf' of undefined
      if ( typeof this._instrumentsConfig[prevKit].conf[trackSet] !== 'undefined' ) { 


			// retrieve track info from destination kit and override source kit with that info // bug: sequencer.js:1427 Uncaught TypeError: Cannot read property 'tracks' of undefined
			var tracksUpdate = this.createTracks(prevKit, this._instrumentsConfig[prevKit].conf[trackSet].tracks, this._instrumentsConfig[prevKit].conf[trackSet].type); 

			channelInfo = {};
			channelInfo.bpm = this._tempo; //window.generalChannelInfo; 
			channelInfo.serverStartTime = this._audioServerStartTimestamp;
			channelInfo.kickoutTime = this._insKickoutTime;
			channelInfo.noteMin = this._noteMin;
			channelInfo.noteMax = this._noteMax;            
			channelInfo.barOffset = eval('this._insBarOffset'+prevKit); //this._insBarOffset[0];  
			channelInfo.countdownMode = this._countdownMode;  
			channelInfo.sessionName = _self._sessionNumber-1; 
			channelInfo.sessionList = this._sessionList;//Serialized;

			if (typeof this._instrumentsConfig[prevKit].conf[trackSet].inputMode !== 'undefined') {
				channelInfo.inputMode = this._instrumentsConfig[prevKit].conf[trackSet].inputMode;
			}             

			if (typeof prevKit !== 'undefined') {   
				//console.log('prevKit', prevKit);
				channelInfo.channelNumber = prevKit;
				channelInfo.channelName = this._channelName[prevKit]['name'];
				channelInfo.channelColor = this._channelName[prevKit]['color'];            
			}

			if (typeof this._channelpatternSeq[prevKit] !== 'undefined') {                 
				channelInfo.channelPatternSeq = this._channelpatternSeq[prevKit][this._instrumentsConfig[prevKit].defaultPatternSeq];               
			}


      if (typeof this._channelsongSeq[prevKit] !== 'undefined') {
        channelInfo.defaultSong = this._instrumentsConfig[prevKit].defaultSong;                 
        //channelInfo.channelSongSeq = this._channelsongSeq[prevKit][this._instrumentsConfig[prevKit].defaultSong];               
        channelInfo.channelSongSeq = this._channelsongSeq;
      }


			channelInfo.patterns = this._patterns;
			channelInfo.channelPatterns = this._channelPatterns[prevKit];


      channelInfo.parts = this._parts;
      channelInfo.channelParts = this._channelParts[prevKit];


			channelInfo.channelKits = this.getKitNames(prevKit);

			if (typeof data.presetId !== 'undefined') { channelInfo.presetId = data.presetId; }

			if (typeof data.pattern !== 'undefined' && typeof data.patternId == 'undefined') { channelInfo.patternId = result[0].id; /*data.x*/ var patternRoot = result[0]; } else if (typeof data.patternId !== 'undefined') { channelInfo.patternId = data.patternId; var patternRoot = data.patternId; }
			
			if (typeof data.patternId !== 'undefined') { channelInfo.patternId = data.patternId; }

			if (typeof this._instrumentsConfig[prevKit].conf[data.kitNumber].instrumentUrl !== 'undefined') { channelInfo.instrumentUrl = this._instrumentsConfig[prevKit].conf[data.kitNumber].instrumentUrl; }   

			channelInfo.presets = this._presets;     
			channelInfo.channelPresets = this._channelPresets[prevKit];     

			if (typeof _instruments[prevKit].patternSeqState !== 'undefined') {  
				channelInfo.patternSeqState = _instruments[prevKit].patternSeqState;
			}    

			//console.log('update preset: ', _instruments[prevKit].patternEditState);


			if (typeof _instruments[prevKit].patternEditState !== 'undefined') {  
				channelInfo.patternEditState = _instruments[prevKit].patternEditState;
			}    

			if (typeof _instruments[prevKit].patternEditId !== 'undefined') {  
				channelInfo.patternEditId = _instruments[prevKit].patternEditId;
			}                          


			if (typeof data.ptnSeq !== 'undefined') {				
				var ptnSeqObjFromStr = JSON.parse(data.ptnSeq);      
				channelInfo.channelPatternSeqList = ptnSeqObjFromStr.list;
			}


			// override source instrument with destination kit info
			var anextInstrument = new mixr.models.Instrument(prevKit, this._instrumentsConfig[prevKit].conf[trackSet].name, tracksUpdate, 1.0, this._instrumentsConfig[prevKit].conf[trackSet].type, this._instrumentsConfig[prevKit].conf[trackSet].color, this._instrumentsConfig[prevKit].conf[trackSet].kitNumber, this._instrumentsConfig[prevKit].conf[trackSet].controls, this._instrumentsConfig[prevKit].conf[trackSet].instrumentName, channelInfo);
			
      //if ( typeof anextInstrument !== 'undefined' ) {

      console.log('anextInstrument', anextInstrument);

			if (anextInstrument.tracks.length > _clients2[clientId].tracks.length) {
				var trackNumber = _clients2[clientId].tracks.length;
			} else {
				var trackNumber = anextInstrument.tracks.length;
			}
			
			if (typeof data.pattern !== 'undefined' && typeof data.patternId == 'undefined') {
				//var pattern = JSON.parse(data.args.pattern);

				var trackNumber = patternRoot.tracks.length; // result[0]
				for (var n = 0, len = trackNumber; n < len; n += 1) {
					var notesNumber = patternRoot.tracks[n].length;
					var traack = patternRoot.tracks[n];

					var notes = [];

					for (var l = 0; l < notesNumber; l += 1) {
						notes[l] = traack[l];
					}  
					anextInstrument.tracks[n].setNotes(notes);
				}          

			} else {

				// use source instrument kit as pattern to feed destination kit with note info
				for (var n = 0, len = trackNumber; n < len; n += 1) {
          if ( typeof _clients2[clientId].tracks[n].getNotes === 'function' ) {
  					var notes = _clients2[clientId].tracks[n].getNotes(); // 
  					anextInstrument.tracks[n].setNotes(notes);
          }
				}

			}  

			_instruments[prevKit] = anextInstrument;

			// Initialize the instrument and call start when ready.
			anextInstrument.initialize(this.start);
			// Pass the context the instrument.
			anextInstrument.setup(_context);  


      //*
      if ( typeof data.clientsFromMainRoom !== 'undefined' ) { 
        console.log('this.updatePreset at late coming childroom event'); // 
      } else {
        console.log('normal preset change event');
        //_clients[clientId] = anextInstrument;
      } //*/

			_clients[clientId] = anextInstrument;

			return anextInstrument;

      //}


    }
  }


}

		};    






		this.updateChannelInfo = function(clientId, order) { 

			console.log('clientId + order: ',clientId, order);


			if (typeof _clients[clientId] !== 'undefined') {

				var channelNumber = _clients[clientId].id; // ! channelNumber ! source kit number aka fetch data from instrument [0] - _clients[clientId].id - InstrumentId

				if (channelNumber!=1) { // do not process conductor role which has no track data associated to it! Beware hardcoded value!

					//console.log('kitNumber', this._instruments[channelNumber].kitNumber);

					var kitNumber = _instruments[channelNumber].kitNumber;

					
					//console.log('upd ch clt id + tracks ',channelNumber, this._instrumentsConfig[channelNumber].conf[kitNumber])

					// retrieve track info from destination kit and override source kit with that info
					var tracksUpdate = this.createTracks(channelNumber, this._instrumentsConfig[channelNumber].conf[kitNumber].tracks, this._instrumentsConfig[channelNumber].conf[kitNumber].type); 

					channelInfo = {};
					channelInfo.bpm = this._tempo; //window.generalChannelInfo; 
					channelInfo.serverStartTime = this._audioServerStartTimestamp;
					channelInfo.kickoutTime = this._insKickoutTime;
					channelInfo.noteMin = this._noteMin;
					channelInfo.noteMax = this._noteMax;           
					channelInfo.barOffset = eval('this._insBarOffset'+channelNumber); //this._insBarOffset[0];  
					channelInfo.countdownMode = this._countdownMode;  
					channelInfo.channelName = this._channelName[channelNumber]['name']; 
					channelInfo.channelNumber = channelNumber;
					channelInfo.channelColor = this._channelName[channelNumber]['color'];
					channelInfo.sessionName = _self._sessionNumber-1; //this._sessionList[;
					channelInfo.sessionList = this._sessionList;//Serialized;

					if (typeof this._instrumentsConfig[channelNumber].conf[trackSet].inputMode !== 'undefined') {
						channelInfo.inputMode = this._instrumentsConfig[channelNumber].conf[trackSet].inputMode;
					}             

					if (typeof this._channelpatternSeq[channelNumber] !== 'undefined') {                 
						channelInfo.channelPatternSeq = this._channelpatternSeq[channelNumber][this._instrumentsConfig[channelNumber].defaultPatternSeq]; // i              
					}

          if (typeof this._channelsongSeq[channelNumber] !== 'undefined') {    
            channelInfo.defaultSong = this._instrumentsConfig[channelNumber].defaultSong;             
            //channelInfo.channelSongSeq = this._channelsongSeq[channelNumber][this._instrumentsConfig[channelNumber].defaultSong]; // i   
            channelInfo.channelSongSeq = this._channelsongSeq;           
          }

					if (typeof _instruments[channelNumber].patternSeqState !== 'undefined') {  
						channelInfo.patternSeqState = _instruments[channelNumber].patternSeqState; // i
					} 

					if (typeof _instruments[channelNumber].patternEditState !== 'undefined') {  
						channelInfo.patternEditState = _instruments[channelNumber].patternEditState; // i
						channelInfo.patternEditId = _instruments[channelNumber].patternEditId;
					}          

					channelInfo.patterns = this._patterns;   
					channelInfo.channelPatterns = this._channelPatterns[channelNumber];

          channelInfo.parts = this._parts;   
          channelInfo.channelParts = this._channelParts[channelNumber];

					channelInfo.channelKits = this.getKitNames(channelNumber);

					if (typeof this._instrumentsConfig[channelNumber].conf[kitNumber].instrumentUrl !== 'undefined') { channelInfo.instrumentUrl = this._instrumentsConfig[channelNumber].conf[kitNumber].instrumentUrl; }   

					//console.log('start time', this._audioServerStartTimestamp);

					// override source instrument with destination kit info
					var anextInstrument = new mixr.models.Instrument(channelNumber, this._instrumentsConfig[channelNumber].conf[kitNumber].name, tracksUpdate, 1.0, this._instrumentsConfig[channelNumber].conf[kitNumber].type, this._instrumentsConfig[channelNumber].conf[kitNumber].color, /*this._instrumentsConfig[channelNumber].conf[kitNumber].kitNumber*/ kitNumber, this._instrumentsConfig[channelNumber].conf[kitNumber].controls, this._instrumentsConfig[channelNumber].conf[kitNumber].instrumentName, channelInfo);
					
					if (anextInstrument.tracks.length > _clients[clientId].tracks.length) {
						var trackNumber = _clients[clientId].tracks.length;
					} else {
						var trackNumber = anextInstrument.tracks.length;
					}

					// use source instrument kit as pattern to feed destination kit with note info
					for (var n = 0, len = trackNumber; n < len; n += 1) {
						//var track = _instruments[0].tracks[n];
						var notes = _clients[clientId].tracks[n].getNotes(); // 
						anextInstrument.tracks[n].setNotes(notes);
					}

					_instruments[channelNumber] = anextInstrument;
					//_self._instruments[channelNumber] = anextInstrument;

					// Initialize the instrument and call start when ready.
					anextInstrument.initialize(this.start);
					// Pass the context the instrument.
					anextInstrument.setup(_context);

					_clients[clientId] = anextInstrument;

					return anextInstrument;
				}  
			} // end of if (typeof _clients[clientId] !== 'undefined')
		};






		this.updateChannelSound = function(clientId, value, opeId)
		{
			if (typeof _clients[clientId]!== 'undefined')
			{
				var channelNumber = _clients[clientId].id;

				// console.log('updateChannelSound: ', channelNumber, clientId, opeId, value);

				if (opeId==0) {
					this._instrumentsSoundModes[channelNumber]=1; //value; beware hardcoded value!
				} else if (opeId==1) {
					this._audioChannelShift[channelNumber]=value;
					
					if (_self._tempo<60) {
						var bpm = 60;
					} else {
						var bpm = _self._tempo;
					}

					var secondsPerBeat = 60.0 / bpm;
					var secondsPerStep = secondsPerBeat/4; // per 32th note    
					var secondsPerUnit = secondsPerStep/16; // 32 // 256

					if (typeof _self._audioChannelShift[channelNumber] !== 'undefined')
					{
						if (_self._audioChannelShift[channelNumber]>0)
						{
							_self._noteTimes[channelNumber] = _self._noteTimes[0] + (secondsPerUnit*_self._audioChannelShift[channelNumber]); // _self._noteTimes[channelNumber]
						}
						else if (_self._audioChannelShift[channelNumber]<0)
						{
							_self._noteTimes[channelNumber] = _self._noteTimes[0] - (secondsPerUnit*_self._audioChannelShift[channelNumber]);
						}
						else
						{
							_self._noteTimes[channelNumber] = _self._noteTimes[0]; // _self._noteTime - 1st sounding channels as time master
							//console.log('ch1 as time master: ', _self._noteTimes[0], _self._noteTimes[2]);
						}
					} 
				}
				//console.log('updateChannelSound: ', clientId, channelNumber, value/*, _self['_instrumentsSoundModes[0]'], _self['_instrumentsSoundModes[1]'], _self['_instrumentsSoundModes[2]']*/);
				//this[paramX] = valueX;
				//console.log("channel soundMode: ", channelNumber, _self._instruments[channelNumber].channelInfo.soundMode /*_instruments, _instruments[channelNumber].channelInfo.soundMode*/);
			} // end of undefined check
		}; // end of func



		this.getRandomInstrument = function(clientId)
		{

			var numAvailableInstruments = _availableInstruments.length;
			if (numAvailableInstruments === 0) {
				console.log("No instruments available");
				return;
			}

			var randomIndex = Math.floor(Math.random() * numAvailableInstruments);
			var randomInstrument = _availableInstruments[randomIndex];
			_availableInstruments.splice(randomIndex, 1);

			// Initialize the instrument and call start when ready.
			randomInstrument.initialize(this.start);
			// Pass the context the instrument.
			randomInstrument.setup(_context);

			//console.log("Released random instrument", randomInstrument);

			_clients[clientId] = randomInstrument;
			return randomInstrument;
		};










    this.updateNote = function(data) {
      //console.log('seq: 2683: update note', data);
      //console.log('_clients: ', data.client); // _clients

      var trackId = data.trackId.split('-')[1];
      var instrumentId = data.trackId.split('-')[0];
      // TODO check the values MTF

      //console.log('data.id etc: ', data, data.id, _instruments[data.id]);

      // sequencer.js:1753 Uncaught TypeError: Cannot read property 'channelInfo' of undefined

      if ( typeof _instruments[data.id].channelInfo !== 'undefined' ) {

        _instruments[data.id].channelInfo.patternId = data.patternId;

        if (typeof _instruments[data.id].tracks[trackId] !== 'undefined') {
          _instruments[data.id].tracks[trackId].notes[data.noteId] = data.volume; // data.id 0
        }

      }

    };


///*
    this.getPatternId = function(data) {
      //console.log('seq: 2683: update note', data);
      //console.log('_clients: ', data.client); // _clients

      //var trackId = data.trackId.split('-')[1];
      //var instrumentId = data.trackId.split('-')[0];

      /*if ( typeof _instruments[data.id].channelInfo !== 'undefined' ) {

        _instruments[data.id].channelInfo.patternId = data.patternId;


      } */

      //console.log(data, _instruments);

      var hw = [_instruments , _clients];
      
      return hw;

      //return _instruments; // [0].tracks[0].notes;

    };
//*/


///*
    this.refreshInsObj = function(data) {
        
      //var channels = Object.keys(data);
      //console.log('this.refreshInsObj: ', data, channels);

      
      var clientsFromMainRoom = data.clients;

      var cltKiz = Object.keys(clientsFromMainRoom);

      var data = data.ptnidmatrix;

      for ( var i = 0; i < data.length; i++ ) {       
      
        var trackId = data[i].id.split('-')[1];
        var instrumentId = data[i].id.split('-')[0];

        var tracks = data[i].tracks;

        var currClt = cltKiz[i];

        //console.log( '_availableInstruments', clientsFromMainRoom[currClt]); // tracks /*data[i].tracks*/ - , _availableInstruments - data[i], 

/*

data2 = {};

data2.kitNumber = 

*/



//*
data[i].clientsFromMainRoom = clientsFromMainRoom;

_self.updatePreset(data[i],  currClt /*data[i].id i*/); // clientsFromMainRoom[ cltKiz[i] ]

// */


/*
      var nextInstrument = _instruments[i]; 

      if ( typeof nextInstrument !== 'undefined' ) {

        // Initialize the instrument and call start when ready.
        nextInstrument.initialize(this.start);
        // Pass the context the instrument.
        nextInstrument.setup(_context);

        //_clients[clientId] = nextInstrument;

        //return nextInstrument;

      } 
//*/




        for ( var numInstru = 0; numInstru < tracks.length; numInstru++ ) { // parcours des instruments

          //console.log(data[i].tracks.notes[numInstru]);
        
          for ( var numPiste = 0; numPiste < tracks[numInstru].notes.length; numPiste++ ) { // parcours des tracks sur un instrument              

            if ( tracks[numInstru].notes[numPiste] !== 'undefined' ) { // vérification que cet instrument a bien des tracks 
            
              if ( tracks[numInstru].notes[numPiste] > 0 ) { // vérification que la note (1 à 16) renvoyée par data.beat est active
              
                if ( _instruments[instrumentId].tracks[numInstru].notes[numPiste] !== 'undefined' ) {
                  _instruments[instrumentId].tracks[numInstru].notes[numPiste] = tracks[numInstru].notes[numPiste];
                  //console.log(_instruments[instrumentId].tracks[numInstru].notes[numPiste], tracks[numInstru].notes[numPiste]);
                }  

              } 
            }
          }
        } 
      }  


      console.log(clientsFromMainRoom, _clients);

      //_instruments = data; // JSON.parse(data.ptnidmatrix);
    };
//*/


    this.updateFxParam = function(data, clientId) { // updateParam

          
      //console.log('limited/throtled call', data.x);
      //console.log('clt id:', _clients[clientId].instrumentName);

      // Populate variable with instrument (ex: AikeWebsynth1) and its channel instance (ex: 0) object
      //var synthInstance2 = _clients[clientId].instrumentName + '_' + _clients[clientId].id;  

      if (typeof _clients[clientId] !== 'undefined') {   
        var synthInstance2 = 'channel_' + data.channelId; // _clients[clientId].id;   
        var synthInstance1 = window[synthInstance2];
      }

      //console.log(data, clientId, _clients, synthInstance1, synthInstance2);  

      //console.log(synthInstance2+' obj before change: ', window[synthInstance2]['controls']);

      if (typeof synthInstance1 !== 'undefined') {

        var controls = window[synthInstance2]['controls']; 

        // if client channel has a controls (knobs) object
        if (_clients[clientId].controls!=0) {    

          for (var j = 0; j < controls.length; j++) {

            if (controls[j].id==data.id) {

              // Prevent Aike synth from muting when user sends empty/void value or enters non numeric values
              var valueXDigitTest = /^\d+$/.test(data.x);

              if (data.x=='' || valueXDigitTest==false) {
                var rawValueX = 1; // 0
              } else {
                var rawValueX = data.x;
              }

              //console.log('rawValueX', rawValueX);              
              //console.log('valueX is digit test', valueXDigitTest);                

              if (controls[j].x.interpolate==0) {
                var valueX = rawValueX; 
              } else {
                var valueX = this.interpolate2(rawValueX, controls[j].x.min, controls[j].x.max, controls[j].x.displayedRangeMin, controls[j].x.displayedRangeMax);  
                //console.log(' interpolatevalueX', valueX); // data.x  
              }
              
              if (controls[j].y) {
                valueY = this.interpolate(data.y, controls[j].y.min, controls[j].y.max);
              }


              // send value to synthInstance object // channel
              window[synthInstance2]['controls'][j].x.value = rawValueX; // data.x: get "raw" data aka participant displayed value
              //console.log('val stored into obj '+synthInstance2, window[synthInstance2]['controls'][j].x.value);
              //console.log('update', _clients[clientId].instrumentName, controls[j].x.param);

              if ( typeof valueX !== 'undefined' || valueX == valueX || !isNaN(valueX) ) {

                if (controls[j].x.param!='[external]') {
                  switch (_clients[clientId].instrumentName) {
                  case 'CWilsoWAMidiSynth':
                    if (valueX==0) { var valueX=1; }
                    eval(synthInstance2+'.'+controls[j].x.param+'('+valueX+')');    //  +0.1 always add+1 to avoid sound crack bugs when value ==0                 
                    break;                       
                  case 'AikeWebsynth1':
                    // value sent as parameter to synth instance object
                    //console.log('log:', synthInstance2+'.'+controls[j].x.param+'('+valueX+')');
                    //synthInstance1.controls[j].x.param+'('+valueX+')';
                    eval(synthInstance2+'.'+controls[j].x.param+'('+valueX+','+String(synthInstance2)+')'); 
                    break;
                  case 'MrSynth':
                    eval(synthInstance2+'.'+controls[j].x.param+'='+valueX); // data.x
                    break;
                  case 'Conductor':
                    break;
                  }    

                  // keep ids that correspond to channel volumes
                  if (data.id<=900 && data.id>=800) {   // data.id>800

                    // make precue mixer tab volume independent aka not affected by volume changes made on conductor tab 
                    if (window.childRoom != 2) {  

                      var chNumber = controls[j].x.param.replace(/\D/g,'');

                      var channelNumber = chNumber; //controls[j].x.param.charAt(7);
                      //console.log('insName', chNumber); // _instruments[channelNumber].instrumentName


                      // Populate variable with instrument (ex: AikeWebsynth1) and its channel instance (ex: 0) object 
                      var synthInstance2 = 'channel_' + channelNumber;  
                      var synthInstance1 = window[synthInstance2];                      

                      //if (controls[j].x.param!='[external]') {
                      if (typeof synthInstance1 !== 'undefined') {
                        switch (_instruments[channelNumber].instrumentName) { // _instruments

                        case 'JoeSullivanDrumSynth':
                          eval(synthInstance2+'.'+controls[j].x.subParams.JoeSullivanDrumSynth+'.gain.value='+valueX*2); //
                          break;
                          
                        case 'AikeWebsynth1':
                          // value sent as parameter to synth instance object
                          eval(synthInstance2+'.'+controls[j].x.subParams.AikeWebsynth1+'('+valueX+')'); //
                          break;
                        case 'CWilsoWAMidiSynth':
                          eval(synthInstance2+'.'+controls[j].x.subParams.CWilsoWAMidiSynth+'('+valueX*100+')'); //
                          break;
                        case 'MrSynth':
                          eval(synthInstance2+'.'+controls[j].x.param+'='+valueX); // data.x
                          break;
                        case 'Sampler':
                          this[controls[j].x.param] = valueX;
                          //console.log('sampler vol:', this[controls[j].x.param]);
                          break; 
                        }
                      } 
                    }  
                  } else {
                    var oldTempo = this._tempo;
                    this[controls[j].x.param] = valueX;

                    //window.lastrecedbpm = valueX;

                    if (data.id==999 && window.childRoom==0) { // if tempo change
                      //console.log('tempi:', oldTempo, this._tempo);
                      clock.timeStretch(_context.currentTime, [uiEvent], oldTempo / this._tempo); 
                      
                    }//

                    //console.log(this[controls[j].x.param],valueX, this._insKickoutTime, this._insBarOffset0);

                    if (controls[j].y) {
                      this[controls[j].y.param] = valueY;
                    }     
                  } 

                  break;                    
                }   

              } else { // end of !isNaN(valueX)    

                console.log('problem happened')  ;

              }
            }
          }         
        } 
      }       
    };


    this.updateSeqVariables = function(varName, varValue)
    { 
      this[varName] = varValue;
    };   

    this.interpolate = function(value, minimum, maximum)
    {
      //console.log('gogo beatCount');
      return minimum + (maximum - minimum) * value;
    };


    this.getTracks = function()
    {
      tracks = [];

      for(var i=0; i<_instruments.length; i++)
      {
        tracks.push(_instruments[i].tracks);
      }

      return tracks;
    }

    this.getSession = function() {
      //console.log('getSession');
      return window['insConf'];
    }











// Sequencing related functions: when to trigger audio events

		this.start = function()
		{
			//console.log('_started', _started);
			//console.log('Started!', this);
			if (_started) return;
			_started = true;
			_noteTime = 0.0;
			this._noteTime = 0.0;

			//console.log('clockMode', this._clockMode, _self._clockMode); 

			if (_self._clockMode == 1)
			{
				_timeGrid = 0.0;

				for (var i = 0; i < _instruments.length; i++)
				{
					_self._noteTimes.push(0.0);
					_self._noteChannelIndex.push(0);
					_self._noteTriggers.push(0);      
				}  
			}

			_startTime = _context.currentTime; // + 0.005;
			this._startTime = _context.currentTime;
			//_self.schedule();

			_self._noteTime = _context.currentTime; // _self._usedStartTime

			// The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
			_self._noteTime -= _startTime;

			if (window.childRoom==1)
			{ // if child room solo
				_startTime = 10
				_self._noteTime = 10;
				console.log('child room solo');
			}  

			var tempo = _self._tempo; // 170

//var tempo = tempo*6; // speed up clock so that it goes 6 times faster to get 24 pulses/quarter note

      //var tempo = tempo; // no midi clock (pulse) mode
			//var signature = 4
			var beatDur = 60/tempo/4 // /4
			var barDur = _self._signature * beatDur
			var beatCount = -1


			if ( window.childRoom == 0 ) {

        window.lastrecedbpm = tempo;

        clock = new WAAClock(_context, {toleranceEarly: 0.1}); // 0.1: needed value to delay main sequencer audio ouput start so that solo child rooms trigger window seq... - 10


/*				
// midi out clock sync: start command
if (typeof midiDevice !== 'undefined') {
	midiDevice.send( [0xFA] );
} 
*/				
				// midiDevice.send([0xF8]);
				window.quarterNotePulse=0;
				window.startOnceCount=0;

				clock.start();

				uiEvent = clock.callbackAtTime(_self.uiNextBeat, _self.nextBeatTime(0))
				.repeat(beatDur)
        .tolerance({late: 1}) // 1 - 100 - 10	
				

			} else {

				// force muting sound (via condition do no pass for this.uiNextBeat func) for note display tab (only visuals' generator no audio generated)  
				if (window.gfxonly != 1)
				{
					window.quarterNotePulse=0;
					window.startOnceCount=0;
				}  
			}
		};




		this.uiNextBeat = function()
		{
			// midiDevice.send([0xFC]); // midi out clock sync: stop command   

			if (window.childRoom==0 && window.barcount==8 && _self._beatCount==0 && window.quarterNotePulse==0 /*&& window.startOnceCount==0*/)
			{ // window.barcount==0 = will only pop once

// midi out clock sync: start command 
/*if ( typeof midiDevice !== 'undefined' ) {
	midiDevice.send( [0xFA] );
} */      
				
				//console.log('midi clock start, beat & bar: ', _self._beatCount, window.barcount);
				window.startOnceCount++;
			}      

/*
// midi clock sync pulse should be emitted 6 times pers 1/16th note or 24 times per quarter note
if ( typeof midiDevice !== 'undefined' ) {
	midiDevice.send([0xF8]);
}  
*/    
			
			//console.log('pulse', window.quarterNotePulse);
			//console.log('bar: ', window.barcount);
			//console.log('window.childRoom: ', window.childRoom);



//if (window.quarterNotePulse==4 && window.childRoom==0 || window.childRoom!=0) { // window.quarterNotePulse==4 for midi clock output audio sync

				//console.log('next beat');

				//if (window.childRoom==1) { console.log('beatCount', _self._beatCount); }
				_self._beatCount = (_self._beatCount + 1) % _self._signature
				_noteIndex = _self._beatCount;

				/*
				$('#pattern td').removeClass('active')
				$('#pattern td:nth-child('+(beatCount+1)+')').addClass('active')
				*/
				
				//*
				if (window.childRoom==0)
				{
					_self.emit(mixr.enums.Events.SEQUENCER_BEAT, _noteIndex); // lighten data transmitted to clients
          window.clockbeat  = _noteIndex;
				} //*/

				// force minimum bpm to 60 so that app does not bug
				if ( this._tempo < 60 ) {
					var bpm = 60;
				} else {
					var bpm = this._tempo;
				}

				// Advance time by a 16th note...
				var secondsPerBeat = 60.0 / bpm; 
				_self._noteTime += 0.25 * secondsPerBeat;

				var currentTime = _context.currentTime;

				// Convert noteTime to context time.
				var contextPlayTime = _noteTime + _startTime;
				//console.log(contextPlayTime, currentTime);

				// adjust sample "click" to happen in sync with beat seq animation by advancing trigger time by 1 beat (16th bar)
				if ( _self._tempo<60 ) {
					var bpm = 60;
				} else {
					var bpm = _self._tempo;
				}
				
				var secondsPerBeat = 60.0 / bpm; // aka quarter note or 1/4 bar
				var contextPlayTimeSamples = contextPlayTime - secondsPerBeat; // 2*(secondsPerBeat/16)
				
				for (var i = 0; i < _instruments.length; i++)
				{ // we might want to replace _instruments with _self._instruments to make it more dynamic?
					if (typeof _self._instrumentsSoundModes[i] == 'undefined' )
					{
						var play = 1;
					}
					else if (typeof _self._instrumentsSoundModes[i] !== 'undefined' && _self._instrumentsSoundModes[i] ==1)
					{
						var play = 1;
					}
					else 
					{
						var play = 0;
					}

					// force muting sound for note display tab (only visuals' generator no audio generated) 
					if (window.gfxonly == 1)
					{
						var play = 0;
					}      

					for (var j = 0; j < _instruments[i].tracks.length; j++)
					{
						var track = _instruments[i].tracks[j];

						// note off on synth when note is even 0,2>14
						if (_noteIndex & 1) {
							var stopStep = 0;
						} else {
							var stopStep = 1;
						}

						var volume = track.notes[_noteIndex];
						
						if ( _instruments[i].type === 'samples' /*&& _instruments[i].isLoaded()*/ ) {

              var loadfunc = _instruments[i].isLoaded;

              if ( typeof loadfunc === "function" ) {
                if ( _instruments[i].isLoaded() ) {
                  if ( volume > 0 && play == 1 ) {
                    _self.playNote(track, contextPlayTimeSamples, volume); // , i - contextPlayTime
                    //console.log('sample play', track, contextPlayTimeSamples, volume);
                  }
                }
              }

						} else if ( _instruments[i].type === 'synth' ) {
							if ( volume > 0 && play == 1 ) { // we 're sure that instrument is loaded 'cause it has some notes associated to it

								_instruments[i].play(track.note); // track.note - track.name for mr synth
                //console.log('synth play', track.note);

							} else if ( volume ==0 && play == 1 ) { /*if (stopStep==1 && volume ==0)*/

                var loadfunc2 = _instruments[i].stop;

                if ( typeof loadfunc2 === "function" ) {
                  _instruments[i].stop(track.note); // track.name
                }  
								
							}
						}

					}
				}
//} // end of 1/6 quarter pulse

			if ( window.childRoom == 0 ) {
				// increment variable
				window.quarterNotePulse++;

				// reset pulse "every 6 times"
				if ( window.quarterNotePulse == 6 ) {
					window.quarterNotePulse=0;
				}  
			}
		};





		this.schedule = function()
		{
			if (_self._clockMode == 1) {
				var currentTime = _context.currentTime;

				//console.log('currentTime', currentTime); 

				// The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
				currentTime -= _self._startTime;
				

				if (_self._tempo<60) {
					var bpm = 60;
				} else {
					var bpm = _self._tempo;
				}

				var secondsPerBeat = 60.0 / bpm;
				
				for (var i = 0; i < _instruments.length; i++)
				{ // we might to replace _instruments with _self._instruments to make it more dynamic?

					while (_self._noteTimes[i] < currentTime + 0.200) { // _noteTime = reference step trigger time

						_self.stepPerChannel(i); // _self._noteTimes[i]
						//_self._noteTrigger = 0;
						_self._noteTriggers[i] = [];// 0;
						for (var j = 0; j < _instruments[i].tracks.length; j++) {
							_self._noteTriggers[i].push(j);
							_self._noteTriggers[i][j]=0;
						}  
					}


					if ( typeof _self._instrumentsSoundModes[i] == 'undefined' ) {
						var play = 1;
					} else if (typeof _self._instrumentsSoundModes[i] !== 'undefined' && _self._instrumentsSoundModes[i] ==1){
						var play = 1;
					} else {
						var play = 0;
					}
					
					// var play = 0; trying to force mute audio generator

					for (var j = 0; j < _instruments[i].tracks.length; j++) {
						var track = _instruments[i].tracks[j];

						// note off on synth when note is even 0-2>14
						if(_noteIndex & 1)
						{ 
							var stopStep = 0;
						} else {
							var stopStep = 1;
						}
						

						if (_instruments[i].type === 'samples' && _instruments[i].isLoaded()) {
							var volume = track.notes[_self._noteChannelIndex[0]]; // use first sounding-sample channel as clock master
							if (volume > 0 && play==1) {

								var contextPlayTime = _self._noteTimes[i] + _self._startTime;
								var contextPlayTimeSamples = contextPlayTime - secondsPerBeat;

								if (_self._noteTriggers[i][j]==0) {									
									_self.playNote(track, contextPlayTimeSamples, volume); // , i - contextPlayTime
								}

								_self._noteTriggers[i][j]++;
							}
						} else if (_instruments[i].type === 'synth') {

							var volume = track.notes[_self._noteChannelIndex[i]]; //i

							if (volume==1 && play==1) { // we 're sure that instrument is loaded 'cause it has some notes associated to it - volume > 0
								_instruments[i].play(track.note); // track.note - track.name for mr synth

							} else if (volume ==0 && play==1) /*if (stopStep==1 && volume ==0)*/ {
								_instruments[i].stop(track.note); // track.name
							}
						}
					}



				}

				// Attempt to synchronize drawing time with sound
				if (_noteTime != _lastDrawTime) {
					_lastDrawTime = _noteTime;
					_self.emit(mixr.enums.Events.SEQUENCER_BEAT, _noteIndex); // lighten data transmitted to clients (when line commented)
				}

				requestAnimationFrame(_self.schedule);

			} else { // if waa clock or initial clock used

				var currentTime = _context.currentTime;

				// The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
				currentTime -= _startTime;

				while (_noteTime < currentTime + 0.200) {  
					// Convert noteTime to context time.
					var contextPlayTime = _noteTime + _startTime;

					// adjust sample "click" to happen in sync with beat seq animation by advancing trigger time by 1 beat (16th bar)
					if (_self._tempo<60) {
						var bpm = 60;
					} else {
						var bpm = _self._tempo;
					}
					var secondsPerBeat = 60.0 / bpm; // aka quarter note or 1/4 bar
					var contextPlayTimeSamples = contextPlayTime - secondsPerBeat; // 2*(secondsPerBeat/16)
					
					for (var i = 0; i < _instruments.length; i++) { // we might to replace _instruments with _self._instruments to make it more dynamic?

						if (typeof _self._instrumentsSoundModes[i] == 'undefined' ) {
							var play = 1;
						} else if (typeof _self._instrumentsSoundModes[i] !== 'undefined' && _self._instrumentsSoundModes[i] ==1) {
							var play = 1;
						} else {
							var play = 0;
						}

						// force muting sound for note display tab (only visuals' generator no audio generated) 
						if (window.gfxonly == 1) {
							var play = 0;
						}

						//console.log('win gfxonly: ', window.gfxonly);

						for (var j = 0; j < _instruments[i].tracks.length; j++) {
							var track = _instruments[i].tracks[j];

							// note off on synth when note is even 0-2>14
							if (_noteIndex & 1) {
								var stopStep = 0;
							} else {
								var stopStep = 1;
							}

							var volume = track.notes[_noteIndex];
							
							if (_instruments[i].type === 'samples' && _instruments[i].isLoaded()) {
								if (volume > 0 && play == 1) {
									_self.playNote(track, contextPlayTimeSamples, volume); // , i - contextPlayTime
								}
							} else if (_instruments[i].type === 'synth') {
								if (volume > 0 && play == 1) { // we 're sure that instrument is loaded 'cause it has some notes associated to it
									_instruments[i].play(track.note); // track.note - track.name for mr synth
								} else if (volume == 0 && play == 1) {
									_instruments[i].stop(track.note); // track.name
								}
							}
						}
						//}
					}

					// Attempt to synchronize drawing time with sound
					if (_noteTime != _lastDrawTime) {
						_lastDrawTime = _noteTime;
						_self.emit(mixr.enums.Events.SEQUENCER_BEAT, _noteIndex); // lighten data transmitted to clients
					}
					_self.step();
				}

				requestAnimationFrame(_self.schedule);
			}

		};



  // This func is used to generate sound for "sampling" instruments
		this.playNote = function(track, noteTime, volume) { /*, channelId*/
			// Create the note
			var voice = _context.createBufferSource();
			voice.buffer = track.getBuffer();

			// Create a gain node.
			var gainNode = _context.createGain();

			// Connect the source to the gain node.
			voice.connect(gainNode);

			//console.log('voice: ', voice);
			voice.playbackRate.value = this._playbackRate;

			// create volume node so that volume can be set per track as opposed to per note velocity
			var volumeNode = _context.createGain();

			// Connect the gain (sample playback via voice > gain > volume) to volume node.
			gainNode.connect(volumeNode);

			// set per track volume
			//volumeNode.gain.value = this._Ins01Volume; // 0.1 use track.id[0], first char of "0-1" to route volume data to right instrument

			var tokoli = track.id.split('-');
			var channelId = tokoli[0]; // track.id.charAt(0);
			//console.log(tokoli[0]); // channelId


			if (typeof window['SEQ']['_insVol'+channelId] !== 'undefined') {
				volumeNode.gain.value = window['SEQ']['_insVol'+channelId];

			} else {
				var f = eval('this._insVol'+channelId);
				if ( typeof f == 'undefined' || f !== f || isNaN(f)   ) {
					var f = 0.3; // 30
				} else {
					var f = eval('this._insVol'+channelId);
				}
				
				volumeNode.gain.value = f; //eval('this._insVol'+channelId); // _insVol0
			}  
			

			// Connect the volume node to the destination. // gain
      //volumeNode.connect(_masterGainNode); // gainNode

       conn = volumeNode.connect(window['audio_context']);

			// Reduce the volume.
			gainNode.gain.value = volume;

			// voice.connect(_context.destination);
			//console.log('noteTime: ', noteTime);

      if (noteTime < 0 ) {
         noteTime = 0.1; 
      }

			voice.start(noteTime); // Uncaught InvalidAccessError: Failed to execute 'start' on 'AudioBufferSourceNode': The start time provided (-0.663311) is less than the minimum bound (0).			
		};





		this.step = function() {

			// force minimum bpm to 60 so that app does not bug
			if (this._tempo<60) {
				var bpm = 60;
			} else {
				var bpm = this._tempo;
			}

			// Advance time by a 16th note...
			var secondsPerBeat = 60.0 / bpm; // _tempo - this._tempo
			_noteTime += 0.25 * secondsPerBeat;
			this._noteTime += 0.25 * secondsPerBeat;

			// 0.03125 = 1/32 = 128th note
			_noteIndex++;

			if (_noteIndex == _loopLength) {
				_noteIndex = 0;
			}
		};





		this.nextBeatTime = function(beatInd) {

			var tempo = _self._tempo; //120
			//var signature = 4
			var beatDur = 60/tempo
			var barDur = _self._signature * beatDur // 

			var currentTime = _context.currentTime
			, currentBar = Math.floor(currentTime / barDur)
			, currentBeat = Math.round(currentTime % barDur)
			if (currentBeat < beatInd) return currentBar * barDur + beatInd * beatDur
			else return (currentBar + 1) * barDur + beatInd * beatDur
		}




		this.stepPerChannel = function(channelNumber) { // /*, channelNoteTime*/

			if (this._tempo<60) {
				var bpm = 60;
			} else {
				var bpm = this._tempo;
			}

			// Advance time by a 16th note...
			var secondsPerBeat = 60.0 / bpm; 
			this._noteTimes[channelNumber] += 0.25 * secondsPerBeat;
			this._noteChannelIndex[channelNumber]++;

			if (this._noteChannelIndex[channelNumber] == _loopLength) {
				this._noteChannelIndex[channelNumber] = 0;
			}


			if (channelNumber==0) {
				if (this._noteTimes[channelNumber] != _lastDrawTime) {
					_lastDrawTime = this._noteTimes[channelNumber];
					_self.emit(mixr.enums.Events.SEQUENCER_BEAT, this._noteChannelIndex[channelNumber]); // lighten data transmitted to clients
				}
			}
		};






		this.timeGrid = function() {

			// force minimum bpm to 60 so that app does not bug
			if (this._tempo<60) {
				var bpm = 60;
			} else {
				var bpm = this._tempo;
			}

			// Advance time by a 128th note...
			var secondsPerBeat = 60.0 / bpm; // _tempo - this._tempo
			_timeGrid += 0.25 * secondsPerBeat; // 0.03125 = 1/32 = 128th note | 0.25 = 16th note			
		};    







		this.initialize();
	};
}());


