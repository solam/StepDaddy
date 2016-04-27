(function() {

  mixr.Sequencer = function(conn) {

    /**
     * Mixins
     */
    mixr.mixins.EventTarget.call(this);

    var _clients = {};
    var _instruments = [];
    //this._instruments = _instruments;
    var _availableInstruments = [];
    //this._availableInstruments = _availableInstruments;
    //window._availableInstruments = _availableInstruments;
    var _tracks = {};

    //var _trackSet = {}; // track kit

    var _context = null;
    var _masterGainNode = null;

    var _currentTime = 0;
    var _noteTime = 1;
    var _noteIndex = 0;
    var _startTime = 0;
    //var _tempo = 110;
    

    this._Ins01Volume = 1;

    var startDate = new Date();
    this._audioServerStartTimestamp = startDate.getTime();

    this._countdownMode = 1; // 1: some channel users may have to wait before their patern editor is fully visible (as to delay their contribution to the current session) 
    


    //this._synthFreq = 20;
    var _loopLength = 16;
    var _started = false;
    var _lastDrawTime = -1;

    var _self = this;
    var _clients = {};

    var samplesPath = '../common/resources/';


    this.interpolate2 = function(value, outputMin, outputMax, displayedMin, displayedMax) {
        //console.log('interpolate:', valueX);
        return (outputMin + (outputMax - outputMin) * value) / displayedMax;
        // (0 + (1-0) * 50)100 : 0.5
        // what to do if outputMax is greater than displayedMax ?
    }  


    //var this._instrumentsConfig = window.insConf02;
    //window['insConf'] = window.insConf2;
    this._instrumentsConfig = window.insConf;

    this._tempo = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[7].x.value //109; // 110 // ! hardcoded value: conductor channel + control id may change !

    //this._insVol0 = 0.7; // ch1 vol retrieve from window.insConf (conductor role) via trackset value

    var insVol0X = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[0].x; // ! hardcoded value: conductor channel + control id may change !
    this._insVol0 = this.interpolate2(insVol0X.value, insVol0X.min, insVol0X.max, insVol0X.displayedRangeMin, insVol0X.displayedRangeMax);    

    var insVol2X = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[1].x; // ! hardcoded value: conductor channel may change !
    this._insVol2 = this.interpolate2(insVol2X.value, insVol2X.min, insVol2X.max, insVol2X.displayedRangeMin, insVol2X.displayedRangeMax);

    var insVol3X = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[1].x; // ! hardcoded value: conductor channel may change !
    this._insVol3 = this.interpolate2(insVol3X.value, insVol3X.min, insVol3X.max, insVol3X.displayedRangeMin, insVol3X.displayedRangeMax);

    var insVol4X = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[1].x; // ! hardcoded value: conductor channel may change !
    this._insVol4 = this.interpolate2(insVol4X.value, insVol4X.min, insVol4X.max, insVol4X.displayedRangeMin, insVol4X.displayedRangeMax);    

    var insVol5X = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[1].x; // ! hardcoded value: conductor channel may change !
    this._insVol5 = this.interpolate2(insVol5X.value, insVol5X.min, insVol5X.max, insVol5X.displayedRangeMin, insVol5X.displayedRangeMax);        

    var insVol6X = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[1].x; // ! hardcoded value: conductor channel may change !
    this._insVol6 = this.interpolate2(insVol6X.value, insVol6X.min, insVol6X.max, insVol6X.displayedRangeMin, insVol6X.displayedRangeMax);    

    var insVol7X = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[1].x; // ! hardcoded value: conductor channel may change !
    this._insVol7 = this.interpolate2(insVol7X.value, insVol7X.min, insVol7X.max, insVol7X.displayedRangeMin, insVol7X.displayedRangeMax);                

    //this._insVol2 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[2].x.value;
    console.log("bpm", this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[7].x);

    //this._insBarOffset = [];
    this._insBarOffset0 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[10].x.value; // ! hardcoded value - this._insBarOffset[0]
    this._insBarOffset1 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[11].x.value;
    this._insBarOffset2 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[12].x.value;
    this._insBarOffset3 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[13].x.value;
    this._insBarOffset4 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[14].x.value;
    this._insBarOffset5 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[15].x.value;  
    this._insBarOffset6 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[16].x.value;
    this._insBarOffset7 = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[17].x.value;

    //console.log(this._insBarOffset[0]);


    this._insKickoutTime = this._instrumentsConfig[1].conf[this._instrumentsConfig[1].trackSet].controls[18].x.value; // ! hardcoded value

    this._channelInfo = [];
    this._channelInfo['bpm']=this._tempo;
    this._channelInfo['serverStartTime']=this._audioServerStartTimestamp;
    this._channelInfo['kickoutTime']=this._insKickoutTime;

    //window.generalChannelInfo = this._channelInfo;
    
    //console.log(this._channelInfo);









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

    this.initialize = function() {

        // Create context.
        _context = new AudioContext();
        //window['audio_context'] = _context;

        //window['audio_rec_gal'] = new Recorder(_context);


/*
          TANGUY = new TANGUY(_context); // TANGUYGenerator
          TANGUY.build_synth();
          TANGUY.order_programs();
*/


        // Create master gain control.
        _masterGainNode = _context.createGain();
        _masterGainNode.gain.value = 0.7;

        window['audio_context'] = _masterGainNode; // _context.destination

        //create lowpass filter
        _lowpassFilter = _context.createBiquadFilter();
        _lowpassFilter.frequency.value = 300;
        _lowpassFilter.Q.value = 300;
        // _masterGainNode.connect(_lowpassFilter);

        //create lowpass filter
        // _highpassFilter = _context.createBiquadFilter();
        // _highpassFilter.type = 1;
        // _highpassFilter.frequency.value = _highpassFilterFreq;

        //create compressor
         _compressor = _context.createDynamicsCompressor();
         _compressor.treshold = -20;
         _compressor.attack = 1;
         _compressor.release = 250;
         _compressor.ratio = 4;
         _compressor.knee = 5;


        // Create master gain control.
        _compressor.connect(_context.destination);
        _lowpassFilter.connect(_compressor);

        _masterGainNode.connect(_lowpassFilter);
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

        //connect lowpass filter
        // _lowpassFilter.connect(_masterDry);
        // _lowpassFilter.connect(_masterWet);
        // _lowpassFilter.connect(_masterDelaySend);

        // _highpassFilter.connect(_lowpassFilter);
        // _masterGainNode.connect(_highpassFilter);



        this.setFxValues();

        this.createInstruments();

        //console.log(this._audioServerStartTimestamp);
    };

    this.setFxValues = function() {

        // _delay.delayTime.value = _delayTime;
        // _masterDelaySend.gain.value = _delayAmount;
        _lowpassFilter.frequency.value = this._filterFreq;
        _lowpassFilter.Q.value = this._q;
        // console.log('_filterFreq', this._filterFreq, _lowpassFilter.frequency.value);
    }

    this.createInstruments = function() {
        _instruments = [];
        for (var i = 0; i < this._instrumentsConfig.length; i++) {
            //var tracks = this.createTracks(i, this._instrumentsConfig[i].tracks, this._instrumentsConfig[i].type);
            // this._instrumentsConfig[i].tracks[this._instrumentsConfig[i].trackSet]
            var type = this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].type;
            if (type=='control') {
              var tracks = [];
            } else {
              var tracks = this.createTracks(i, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].tracks, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].type);
            }

            /*var channelInfo = this._channelInfo;
            channelInfo['barOffset']= this._insBarOffset[0]; //i 
            console.log("create ins: ", channelInfo);*/

            channelInfo = {};
            channelInfo.bpm = this._tempo; //window.generalChannelInfo; 
            channelInfo.serverStartTime = this._audioServerStartTimestamp;
            channelInfo.kickoutTime = this._insKickoutTime;
            channelInfo.barOffset = eval('this._insBarOffset'+i); //this._insBarOffset[0]; - 
            channelInfo.countdownMode = this._countdownMode;


            //var instrument = new mixr.models.Instrument(i, this._instrumentsConfig[i].name, tracks, 1.0, this._instrumentsConfig[i].type, this._instrumentsConfig[i].color);
            var instrument = new mixr.models.Instrument(i, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].name, tracks, 1.0, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].type, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].color, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].kitNumber, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].controls, this._instrumentsConfig[i].conf[this._instrumentsConfig[i].trackSet].instrumentName, channelInfo); 
            _instruments.push(instrument);
            //_self._instruments.push(instrument);
            //console.log('instrument:', instrument);
        };

        window.availSlots = _instruments.length;
        _availableInstruments = _instruments.concat(); // Join two arrays:
        _self._availableInstruments = _instruments.concat();
        window._availableInstruments = _instruments.concat();
        //console.log('_availableInstruments: ', _availableInstruments);
    };

    this.createTracks = function(instrumentId, tracksConfig, type) {
        //console.log('createTracks');
        var tracks = [];
        for (var i = 0; i < tracksConfig.length; i++) {
            var config = tracksConfig[i];

            if (type === 'samples') {
                var track = new mixr.models.Track(instrumentId + '-' + i, config.name, null, samplesPath + config.sampleUrl, 1.0);
            } else {
                var track = new mixr.models.Track(instrumentId + '-' + i, config.name, null, null, 1.0);
                track.note = config.note;
                //console.log('track', track);
            };
            tracks.push(track);
        }

        return tracks;
    };

    this.addInstrument = function(instrument) {
        // Reset the notes of all the tracks
      /*  for (var n = 0, len = instrument.tracks.length; n < len; n += 1) {
            var track = instrument.tracks[n];
            instrument.tracks[n].resetNotes()
        } */
        _availableInstruments.push(instrument);
        _self._availableInstruments.push(instrument);
        window._availableInstruments.push(instrument);
    };

    this.getNextInstrument = function(clientId) {
        //*
        if (typeof _clients[clientId] !== 'undefined') {
            return _clients[clientId];
        } //*/

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
          //console.log("get nxt ins: ", nextInstrument);
          return nextInstrument;

        } else {
          return;
        }



        /*
        // Initialize the instrument and call start when ready.
        nextInstrument.initialize(this.start);
        // Pass the context the instrument.
        nextInstrument.setup(_context);

        //console.log("Released next available instrument", nextInstrument);

        //console.log("_clients", _clients);

        _clients[clientId] = nextInstrument;
        return nextInstrument; */
    };




    this.changeChannel = function(clientId) {
        /*
        if (typeof _clients[clientId] !== 'undefined') {
            return _clients[clientId];
        } //*/

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
      window['insConf'] = window['insConf'+data.x];
      this['_instrumentsConfig'] = window['insConf'];
//this.createInstruments(); // Update general instruments' object
    };    


    this.updateInstrument = function(data, clientId) { // change(Instrument)Kit

        console.log('_clients after:', _clients);
        var trackSet = data.x; // destination kit number (0 | 1) go from instrument 0 to [1] - kitNumber // valueX-109
        var prevKit = _clients[clientId].id; // source kit number aka fetch data from instrument [0] - _clients[clientId].id - InstrumentId

        //console.log("_clients[clientId].id", _clients[clientId].id);

        // retrieve track info from destination kit and override source kit with that info
        var tracksUpdate = this.createTracks(prevKit, this._instrumentsConfig[prevKit].conf[trackSet].tracks, this._instrumentsConfig[prevKit].conf[trackSet].type); 

        //var channelInfo = this._channelInfo;
        //channelInfo['barOffset']= this._insBarOffset[0]; // prevKit
        channelInfo = {};
        channelInfo.bpm = this._tempo; //window.generalChannelInfo; 
        channelInfo.serverStartTime = this._audioServerStartTimestamp;
        channelInfo.kickoutTime = this._insKickoutTime;
        channelInfo.barOffset = eval('this._insBarOffset'+prevKit); //this._insBarOffset[0];  
        channelInfo.countdownMode = this._countdownMode;    

        // override source instrument with destination kit info
        var anextInstrument = new mixr.models.Instrument(prevKit, this._instrumentsConfig[prevKit].conf[trackSet].name, tracksUpdate, 1.0, this._instrumentsConfig[prevKit].conf[trackSet].type, this._instrumentsConfig[prevKit].conf[trackSet].color, this._instrumentsConfig[prevKit].conf[trackSet].kitNumber, this._instrumentsConfig[prevKit].conf[trackSet].controls, this._instrumentsConfig[prevKit].conf[trackSet].instrumentName, channelInfo);
    
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

        return anextInstrument;
    };    









    this.updateChannelInfo = function(clientId, order) { 

      console.log('clientId + order: ',clientId, order);
      var channelNumber = _clients[clientId].id; // ! channelNumber ! source kit number aka fetch data from instrument [0] - _clients[clientId].id - InstrumentId

      if (channelNumber!=1) { // do not process conductor role which has no track data associated to it! Beware hardcoded value!

        //console.log('kitNumber', this._instruments[channelNumber].kitNumber);

        var kitNumber = _instruments[channelNumber].kitNumber;

        
        console.log('upd ch clt id + tracks ',channelNumber, this._instrumentsConfig[channelNumber].conf[kitNumber])

        // retrieve track info from destination kit and override source kit with that info
        var tracksUpdate = this.createTracks(channelNumber, this._instrumentsConfig[channelNumber].conf[kitNumber].tracks, this._instrumentsConfig[channelNumber].conf[kitNumber].type); 

        channelInfo = {};
        channelInfo.bpm = this._tempo; //window.generalChannelInfo; 
        channelInfo.serverStartTime = this._audioServerStartTimestamp;
        channelInfo.kickoutTime = this._insKickoutTime;
        channelInfo.barOffset = eval('this._insBarOffset'+channelNumber); //this._insBarOffset[0];  
        channelInfo.countdownMode = this._countdownMode;    

        console.log('start time', this._audioServerStartTimestamp);

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
    };












    this.getRandomInstrument = function(clientId) {
        // if clientId already known from system don't change instrument
        /*if (typeof _clients[clientId] !== 'undefined') {
            return _clients[clientId];
        } */

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

        console.log("Released random instrument", randomInstrument);

        _clients[clientId] = randomInstrument;
        return randomInstrument;
    };

    this.start = function() {
        //console.log('Started!', this);
        if (_started) return;
        _started = true;
        _noteTime = 0.0;
        // _startTime = _context.currentTime + 0.160;
        _startTime = _context.currentTime + 0.005;
        _self.schedule();
    };

    this.schedule = function() {
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
            var contextPlayTimeSamples = contextPlayTime - secondsPerBeat;    // 2*(secondsPerBeat/16)
            //console.log('bpm', bpm);        


            for (var i = 0; i < _instruments.length; i++) { // we might to replace _instruments with _self._instruments to make it more dynamic?


                //console.log('this._Ins01Volume: ', _self._Ins01Volume);

                /*var incr = i+1;
                //var insVolume = '_self_Ins0'+incr+'Volume'; // this will cause problem after 9 instruments aka 010 use '01 - 16' step technique

                if (typeof window['_self_Ins0'+incr+'Volume'] !== 'undefined') { // // this._Ins01Volume
                    console.log('insxx volume: ', window['_self_Ins0'+incr+'Volume']);
                    _instruments[i].setParams(window['_self_Ins0'+incr+'Volume']);
                } */



                

                for (var j = 0; j < _instruments[i].tracks.length; j++) {
                    var track = _instruments[i].tracks[j];

                    //console.log('track.id', track.id);

                        // note off on synth when note is even 0-2.14
                        if(_noteIndex & 1)
                        { 
                          var stopStep = 0;
                        } else {
                          var stopStep = 1;
                        }

                    var volume = track.notes[_noteIndex];
                    if (_instruments[i].type === 'samples' && _instruments[i].isLoaded()) {
                        if (volume > 0) {




                            //console.log('contextPlayTime', contextPlayTime);
                            //console.log('adjusted', contextPlayTime + (secondsPerBeat/16));


                            _self.playNote(track, contextPlayTimeSamples, volume); // , i - contextPlayTime
                        }
                    } else if (_instruments[i].type === 'synth') {

                        if (volume > 0) { // we 're sure that instrument is loaded 'cause it has some notes associated to it
                /*          
                if (i==1) { // only check if instrument loaded
                  _instruments[1].setParams(2,_self._Ins01Volume); // send array of param ids => values INSTEAD
                } */

                            //_instruments[i].setParams(_self._tempo);
                            _instruments[i].play(track.note); // track.note - track.name for mr synth
                        } else /*if (stopStep==1 && volume ==0)*/ {
                            _instruments[i].stop(track.name);
                        }
                    }
                }
            }

            // Attempt to synchronize drawing time with sound
            if (_noteTime != _lastDrawTime) {
                _lastDrawTime = _noteTime;
                _self.emit(mixr.enums.Events.SEQUENCER_BEAT, _noteIndex);
            }

            _self.step();
        }

        requestAnimationFrame(_self.schedule);
    };

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

              var channelId = track.id.charAt(0);


              if (typeof window['SEQ']['_insVol'+channelId] !== 'undefined') {
                volumeNode.gain.value = window['SEQ']['_insVol'+channelId];

              } else {
                volumeNode.gain.value = eval('this._insVol'+channelId); // _insVol0
              }  
              


        // Connect the volume node to the destination. // gain
        volumeNode.connect(_masterGainNode); // gainNode


        // Reduce the volume.
        gainNode.gain.value = volume;

        // voice.connect(_context.destination);
        voice.start(noteTime);
        //console.log('noteTime: ', noteTime);
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
        _noteIndex++;

        if (_noteIndex == _loopLength) {
            _noteIndex = 0;
            // pattern++;
        }
    };

    this.updateNote = function(data) {
        console.log('update note', data);
        //console.log('_clients: ', data.client); // _clients

        var trackId = data.trackId.split('-')[1];
        var instrumentId = data.trackId.split('-')[0];
        // TODO check the values MTF

        console.log('data.id', data.id);

        _instruments[data.id].tracks[trackId].notes[data.noteId] = data.volume; // data.id 0
        //_self._instruments[data.id].tracks[trackId].notes[data.noteId] = data.volume;
        //_instruments[instrumentId].tracks[trackId].notes[data.noteId] = data.volume;

    };

    this.updateFxParam = function(data, clientId) { // updateParam
        
        // Populate variable with instrument (ex: AikeWebsynth1) and its channel instance (ex: 0) object
        var synthInstance2 = _clients[clientId].instrumentName + '_' + _clients[clientId].id;        
        var synthInstance1 = window[synthInstance2];

        //console.log(synthInstance2+' obj before change: ', window[synthInstance2]['controls']);

        if (typeof synthInstance1 !== 'undefined') {

          var controls = window[synthInstance2]['controls']; 
          //var input = 1;

          // if client channel has a controls (knobs) object
          if (_clients[clientId].controls!=0) {    

            for (var j = 0; j < controls.length; j++) {

              if (controls[j].id==data.id) {

                // Prevent aike synth from muting when user sends empty/void value or enters non numeric values
                //var valueX = data.x;
                var valueXDigitTest = /^\d+$/.test(data.x);

                if (data.x=='' || valueXDigitTest==false) {
                  var rawValueX = 0;
                  //var data.x = 0;
                } else {
                  var rawValueX = data.x;
                }
                
                //console.log('valueX is digit test', valueXDigitTest);                

                if (/*controls[j].x.interpolate &&*/ controls[j].x.interpolate==0) {
                  var valueX = rawValueX; //valueX; // data.x;
                } else {
                  //valueX = this.interpolate(data.x, controls[j].x.min, controls[j].x.max);  
                  var valueX = this.interpolate2(rawValueX, controls[j].x.min, controls[j].x.max, controls[j].x.displayedRangeMin, controls[j].x.displayedRangeMax);  
                  console.log('valueX', valueX); // data.x  
                }
              
                if (controls[j].y) {
                  valueY = this.interpolate(data.y, controls[j].y.min, controls[j].y.max);
                }



                // send value to synthInstance object // channel
                //console.log('ctrl block');
                window[synthInstance2]['controls'][j].x.value = rawValueX; // data.x: get "raw" data aka participant displayed value
                //console.log('val stored into obj '+synthInstance2, window[synthInstance2]['controls'][j].x.value);
                //console.log('update', _clients[clientId].instrumentName, controls[j].x.param);

                if (controls[j].x.param!='[external]') {
                  switch (_clients[clientId].instrumentName) {
                    case 'AikeWebsynth1':
                      // value sent as parameter to synth instance object
                      eval(synthInstance2+'.'+controls[j].x.param+'('+valueX+')'); // data.x
                      break;
                    case 'MrSynth':
                      eval(synthInstance2+'.'+controls[j].x.param+'='+valueX); // data.x
                      break;
                    case 'Conductor':
                  }    

                    // keep ids that correspond to channel volumes
                    if (data.id<=900 && data.id>800) {   // data.id>800
                      //var channelNumber = data.id;
                      var channelNumber = controls[j].x.param.charAt(7);
                      //console.log('insName', _instruments[channelNumber].instrumentName);


                      // Populate variable with instrument (ex: AikeWebsynth1) and its channel instance (ex: 0) object
                      var synthInstance2 = _instruments[channelNumber].instrumentName + '_' + channelNumber;  
                      //var synthInstance2 = _self._instruments[channelNumber].instrumentName + '_' + channelNumber;      

                      var synthInstance1 = window[synthInstance2];                      

                      //if (controls[j].x.param!='[external]') {
                        if (typeof synthInstance1 !== 'undefined') {
                          switch (_instruments[channelNumber].instrumentName) { // _instruments
                            case 'AikeWebsynth1':
                              // value sent as parameter to synth instance object
                              eval(synthInstance2+'.'+controls[j].x.subParams.AikeWebsynth1+'('+valueX+')'); // data.x
                              break;
                            case 'MrSynth':
                              eval(synthInstance2+'.'+controls[j].x.param+'='+valueX); // data.x
                              break;
                            case 'Sampler':
                              this[controls[j].x.param] = valueX;
                              break; 
                          }
                        } /*else { // case 'Sampler'
                          this[controls[j].x.param] = valueX;
                        }*/
                      //}

                    } else {
                      this[controls[j].x.param] = valueX;

                      console.log(this[controls[j].x.param],valueX, this._insKickoutTime, this._insBarOffset0);

                      if (controls[j].y) {
                        this[controls[j].y.param] = valueY;
                      }     
                    }    

                    break;                    
                }   
                /*
                // send value to synthInstance object // channel
                //controls[j].x.value = data.x;
                console.log('ctrl block');
                window[synthInstance2]['controls'][j].x.value = valueX;
                //console.log('controls[j].x.value', controls[j].x.value);
                console.log('controls[j].x.value', window[synthInstance2]['controls'][j].x.value);
                */
              }
            }         
          } 
        }
        //window[synthInstance2]['controls'][0].x.value = 44;
        //console.log(synthInstance2+' obj AFTER change: ', window[synthInstance2]['controls']);

        /*
        var fxConfig = effectsConfig[data.id];
        paramX = fxConfig.x.param;
        paramY = fxConfig.y.param;

        if (paramX=='_tempo' || paramX=='_Ins01Volume') { // hardcoded condition
          valueX = data.x;

        } else {
          valueX = this.interpolate(data.x, fxConfig.x.min, fxConfig.x.max);
        }
        valueY = this.interpolate(data.y, fxConfig.y.min, fxConfig.y.max);
        this[paramX] = valueX;
        this[paramY] = valueY;

        console.log('update', paramX, ':', valueX);
        console.log('update', paramY, ':', valueY);
        */

        this.setFxValues();
        //this.createInstruments(); // Update general instruments' object = crashes general audio       
    };


    this.updateSeqVariables = function(varName, varValue) { 
      this[varName] = varValue;
    };   

    this.interpolate = function(value, minimum, maximum) {
        return minimum + (maximum - minimum) * value;
    }

  

    this.initialize();
  };

}());


