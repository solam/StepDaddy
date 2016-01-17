(function() {

  /**
   * The instrument model
   *
   * @constructor
   * @class Instrument
   */
  mixr.models.Instrument = function(id, name, tracks, volume, type, color, kitNumber, controls, instrumentName) {

    /**
     * Mixins
     */
    mixr.mixins.Wrapper.call(this);

    this.id = id.toString() || '';
    this.name = name || '';

    this.kitNumber = kitNumber || 0;
    this.controls = controls || 0;
    this.instrumentName =  instrumentName || '';

    this.tracks = tracks || [];
    this.volume = volume || 0;
    this.type = type || 'samples';
    this.color = color || '#C8DEC0';

    this.available = true;
    this.numTracksLoaded = 0;

    var _self = this;
    var _readyCallback = null;
    var _isLoaded = false;
    var _synth = null; 

    this.interpolate2 = function(value, outputMin, outputMax, displayedMin, displayedMax) {
        //console.log('interpolate:', valueX);
        return (outputMin + (outputMax - outputMin) * value) / displayedMax;
        // (0 + (1-0) * 50)100 : 0.5
        // what to do if outputMax is greater than displayedMax ?
    }      

    /**
     * Initializes the model
     *
     * @public
     * @function
     * @return {mixr.controllers.Intrument} This instance of the model.
     */
    this.initialize = function(readyCallback) {
      _readyCallback = readyCallback;
      return this;
    };

    this.setup = function(context) {


      var synthInstanceString = this.instrumentName + '_' + this.id;

      // get control data from dynamic object
      if (/*window[synthInstanceString] !== null &&*/ typeof window[synthInstanceString] === 'object' /*|| window[synthInstanceString].constructor === Array*/) {
        //console.log(synthInstanceString+' object: ', window[synthInstanceString]);

        // if synthInstance already exists load control values from object attached array   
        var usedControls = window[synthInstanceString]['controls'];

      // get control data from static file (ins_config.js)
      } else { 

        // (at first creation of synth instance) append controls array to synthInstance with control default values from channel config
        switch (this.instrumentName) {
          case 'AikeWebsynth1':
            window[synthInstanceString] = new WebSynth(context);
            break;
          case 'MrSynth':
            window[synthInstanceString] = new MrSynth(context);
            break;
          case 'Conductor':
            window[synthInstanceString] = {};
            break;   
          case 'Sampler':
            window[synthInstanceString] = {};
            break;                        
        }  

        window[synthInstanceString]['controls'] = controls;
        var usedControls = controls;        
      } 


      var instrumentsConfig = window.insConf;

      if (typeof window['Conductor_1'] === 'object') {
        var conductorControls = window['Conductor_1']['controls']; 
      } else {
        var conductorControls = instrumentsConfig[1].conf[instrumentsConfig[1].trackSet].controls; // ! beware hardcoded value */       
      }    

      for (var j = 0; j < conductorControls.length; j++) {
        if (conductorControls[j].x.param.charAt(7)==this.id) {
          // = controls[j].x.value;

          if (conductorControls[j].x.interpolate==0) {
            var instrumentInstanceVolume = conductorControls[j].x.value;
          } else {
            var instrumentInstanceVolume = this.interpolate2(conductorControls[j].x.value, conductorControls[j].x.min, conductorControls[j].x.max, conductorControls[j].x.displayedRangeMin, conductorControls[j].x.displayedRangeMax);                  
          }
          //console.log('instrumentInstanceVolume', instrumentInstanceVolume);
        }
       }   

       
/*
        //console.log('window[Conductor_1]: ', window['Conductor_1']);
        //
      } else {

    
    var insVol2X = instrumentsConfig[1].conf[instrumentsConfig[1].trackSet].controls[2].x;

      }
*/

      //console.log('window[synthInstanceString]: ', window[synthInstanceString]);

      // load instrument preset for currently processed channel
      if (usedControls.length>0) { //     usedControls!=0

        for (var j = 0; j < usedControls.length; j++) {

                if (usedControls[j].x.interpolate==0) {
                  valueX = usedControls[j].x.value;
                } else {
                  //valueX = this.interpolate(data.x, usedControls[j].x.min, usedControls[j].x.max);  
                  //_sequencer = new mixr.Sequencer(); // replace with local function
                  valueX = this.interpolate2(valueX, usedControls[j].x.min, usedControls[j].x.max, usedControls[j].x.displayedRangeMin, usedControls[j].x.displayedRangeMax);  
                  //console.log('valueX', valueX);   
                }

                if (usedControls[j].x.param!='[external]') {
                  switch (this.instrumentName) {
                    case 'AikeWebsynth1':
                      // value sent as parameter to synth instance object
                      eval(synthInstanceString+'.'+usedControls[j].x.param+'('+valueX+')'); // data.x
                      //console.log('usedControls', usedControls);
                      // change instrument instance volume
                      eval(synthInstanceString+'.volume.set('+instrumentInstanceVolume+')'); // this should only be triggered once not at every control process                      
                      break;
                    case 'MrSynth':
                      eval(synthInstanceString+'.'+usedControls[j].x.param+'='+valueX); // data.x
                      break;
                    case 'Sampler':
                      // change seq object variable value                      
                      //console.log('window[SEQ]', window['SEQ']);
                      break;                     
                  }
                } else if (usedControls[j].x.param=='[external]' && this.instrumentName=='Sampler') {
                  //window[synthInstanceString]

                  // set channel volume to channel Sampler instance via duplicated sequencer object
                  window['SEQ']['_insVol'+this.id] = instrumentInstanceVolume; // 0.15879999;  
                  //console.log('window[SEQ]', window['SEQ']['_insVol0']);
                } 



          /*if (typeof synthInstance !== 'undefined') {
            eval(synthInstance+'.'+usedControls[j].x.param+'('+usedControls[j].x.value+')'); // this line seems to be ok only for AikeWebsynth1 ? 'switch case' statement required?
          } */
        }
      } 




      if (this.type === 'samples') {
        for (var i = 0; i < tracks.length; i++) {
          tracks[i].loadSample(this.trackLoaded, context);
        };
      } else if (this.type === 'synth') {
        //console.log('>>> Create synth');
        console.log('Synth '+synthInstanceString+' ready.');
        _isLoaded = true;
        _readyCallback();
      }
    };

    this.trackLoaded = function(track) {
      _self.numTracksLoaded++;
      if (_self.numTracksLoaded == _self.tracks.length) {
        console.log('All samples loaded.');
        _isLoaded = true;
        _readyCallback();
      }
    };

    this.play = function(note) {
      if (this.type === 'synth' /*&& _synth*/) {
       // _synth.setVolume(100);
       //_synth.filter.set_freq(96);
       
        var synthInstance = this.instrumentName + '_' + this.id;

        switch (this.instrumentName) {
            case 'AikeWebsynth1':
                window[synthInstance].play(note);
                break;
            case 'MrSynth':
                window[synthInstance].updateFrequency(notes[note]*0.5);
                window[synthInstance].startAttack();
                break;

        }         

               

       //AikeSynth.play(note);

        //var event = { data: [{},50]};
        //TANGUY.gate_on(event);

        //console.log('track name: ', note);



/* wking code

    //mrSynth.updateFrequency(notes.note*0.5);
    //mrSynth.filterNode.frequency.value = 50+(notes[note]*3); //800+note;//(note * 200);
    mrSynth.filterNode.Q.value = 3;
    //mrSynth.set_cutoff(400);
    console.log('cutoff freq: ', mrSynth.filterNode.frequency.value);
    //mrSynth.filterNode.Q.value = (note/10);    
    mrSynth.updateFrequency(notes[note]*0.5);

    mrSynth.startAttack();        
    //mrSynth.startDecay();
*/
      }
    };

    this.setParams = function(paramId, param001) {
      if (this.type === 'synth' /*&& _synth*/) {
       //_synth.filter.set_freq(param001-70);

       //mrSynth.volumeNode.gain.value = param001; - wking code

       // create function param loop and case to route param values to their right destinations


      }
    };    

    this.stop = function(note) {
      if (this.type === 'synth' /*&& _synth*/) {
       // _synth.setVolume(0);
       // _synth.stop();
       //mrSynth.updateFrequency(notes[note]*0.5);
       //mrSynth.startDecay();
       //mrSynth.startAttack();

      }
    };

    this.isLoaded = function() {
      return _isLoaded;
    };

  };

}());
