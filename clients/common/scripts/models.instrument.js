(function() {

  /**
   * The instrument model
   *
   * @constructor
   * @class Instrument
   */
  mixr.models.Instrument = function(id, name, tracks, volume, type, color, kitNumber, controls, instrumentName, channelInfo) {

    /**
     * Mixins
     */
    mixr.mixins.Wrapper.call(this);

    this.id = id.toString() || '';
    this.name = name || '';

    this.kitNumber = kitNumber || 0;
    this.controls = controls || 0;
    this.instrumentName =  instrumentName || '';
    this.channelInfo = channelInfo || {}; //window['SEQ']['_channelInfo']; []

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

        var synthInstanceString = /*this.instrumentName + '_' + */ 'channel_' + this.id;


    //if (typeof window[synthInstanceString]== 'undefined') {  // this condition may fuck up in case of multiple diff kits per channel aka sampler to AWs1 etc...  
        // (at first creation of synth instance) append controls array to synthInstance with control default values from channel config
        switch (this.instrumentName) {
          case 'JoeSullivanDrumSynth':
            window[synthInstanceString] = new jsDrumSynth(context);
            break;             
          case 'CWilsoWAMidiSynth':
            if ( typeof CWilsoWAMidiSynth === 'function' ) {
              window[synthInstanceString] = new CWilsoWAMidiSynth(context);
            }
            break;          
          case 'AikeWebsynth1':
            //console.log('synth obj creation');
            window[synthInstanceString] = new WebSynth(context);
            break;
          case 'MrSynth':
            window[synthInstanceString] = new MrSynth(context);
            break;
          case 'Conductor':
            window[synthInstanceString] = {};
            break;   
          case 'gfx':
            //console.log('gfx');
            window[synthInstanceString] = {};
            break;             
          case 'Sampler':
            window[synthInstanceString] = {};
            break;                        
        }  

    //}   

        // only populate window[synthInstanceString]['controls'] at first instrument creation
        if (typeof window[synthInstanceString]['controls']== 'undefined') { 
          window[synthInstanceString]['controls'] = controls;
          //console.log('controls', controls);
        } 
        var usedControls = controls;

      //} 

      //console.log('win ins strg', synthInstanceString, window[synthInstanceString])

      var instrumentsConfig = window.insConf;

      if (typeof window['channel_1'] === 'object') { // window['Conductor_1'] ! probably bad check as conductor might not be channel_1 !! - window['channel_1'] channel_Conductor - hardcoded value !!!!
        var conductorControls = window['channel_1']['controls']; 
      } else {
        var conductorControls = instrumentsConfig[1].conf[instrumentsConfig[1].trackSet].controls; // ! beware hardcoded value */       
      }    

      for (var j = 0; j < conductorControls.length; j++) {
        var chNumber = conductorControls[j].x.param.replace(/\D/g,'');
        if (chNumber==this.id) {

          if (conductorControls[j].x.interpolate==0) {
            var instrumentInstanceVolume = conductorControls[j].x.value;
          } else {
            var instrumentInstanceVolume = this.interpolate2(conductorControls[j].x.value, conductorControls[j].x.min, conductorControls[j].x.max, conductorControls[j].x.displayedRangeMin, conductorControls[j].x.displayedRangeMax);                  
          }
          //console.log('instrumentInstanceVolume', instrumentInstanceVolume);
        }
       }   


    if (typeof this.channelInfo.presets !== 'undefined' ) {
      if (this.channelInfo.presets.length!=0 && typeof this.channelInfo.channelPresets !== 'undefined') {
        var presets = this.channelInfo.presets; //.concat(this.channelInfo.channelPresets); // mege all use presets in one pool?
      } else {
        var presets = this.channelInfo.channelPresets;
      }        
    }



    //console.log('after ptn save check: ', this.channelInfo.presetId, presets);

    if (typeof presets !== 'undefined' 
    && presets.length>0 // this.channelInfo.presets
    && // channelPresets - presets
    typeof this.channelInfo.presetId !== 'undefined'
    && this.channelInfo.presetId!=0) {

      var taarget = this.channelInfo.presetId;
      var taarget = taarget.toString();

    //console.log('preset: ', taarget);  


    var preset = presets.filter(function( obj ) { // channelPresets - presets // this.channelInfo.channelPresets
      return obj.id == taarget // "2fbdd99d0000";  //
    });

    //console.log('ch preset + preset id: ', this.channelInfo.channelPresets, this.channelInfo.presetId, preset);

    if (typeof preset[0] !== 'undefined') {
    var preset = preset[0].controls;
      //console.log('selPreset, preset pool: ', preset, presets );  //  - this.channelInfo.presets
    }

    var presetMode = 1; // presetMode=0 : kit/InsMode


    } else {
      var presetMode = 0; 
    }





      // load instrument preset for currently processed channel
      if (usedControls.length>0) { //     usedControls!=0

        for (var j = 0; j < usedControls.length; j++) {

          if (usedControls[j].x.interpolate==0) {

            if (presetMode == 1) {

              valueX = preset[usedControls[j].id];
              //console.log('valueX', valueX);
              if (typeof valueX !== 'undefined') {
                window[synthInstanceString]['controls'][j].x.value = valueX; // Solution (to unsaved sound not transported across channel disconnects) found!
              }
            } else {
              valueX = usedControls[j].x.value; 
            }                  
          } 

          if ( typeof valueX !== 'undefined' || valueX == valueX || !isNaN(valueX) ) {
            if (usedControls[j].x.param!='[external]') {
              switch (this.instrumentName) {

                case 'JoeSullivanDrumSynth':
                  if (window.childRoom != 2) { eval(synthInstanceString+'.jsDrumMainvolume.gain.value='+valueX*2); } // data.x 
                  break;

                case 'CWilsoWAMidiSynth':
                  eval(synthInstanceString+'.'+usedControls[j].x.param+'('+valueX+')'); // data.x
                  if (window.childRoom != 2) { eval(synthInstanceString+'.onUpdateVolume('+instrumentInstanceVolume*100+')'); }
                  //eval(synthInstanceString+'.onUpdateVolume('+instrumentInstanceVolume+')'); 
                  break; 

                case 'AikeWebsynth1':
                  // value sent as parameter to synth instance object
                  eval(synthInstanceString+'.'+usedControls[j].x.param+'('+valueX+')'); // data.x
                  //console.log('usedControls', usedControls);
                  // change instrument instance volume
                  if (window.childRoom != 2) { eval(synthInstanceString+'.volume.set('+instrumentInstanceVolume+')'); } // this should only be triggered once not at every control process                      
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
              if (window.childRoom != 2) { window['SEQ']['_insVol'+this.id] = instrumentInstanceVolume; } // 0.15879999;  
              //console.log('window[SEQ]', window['SEQ']['_insVol'+this.id]);
            } 
          }   
        }
      } 




      if (this.type === 'samples') {
        for (var i = 0; i < tracks.length; i++) {
          tracks[i].loadSample(this.trackLoaded, context);
        };
      } else if (this.type === 'synth') {
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
      if (this.type === 'synth') {
       // _synth.setVolume(100);
       //_synth.filter.set_freq(96);
       
        //var synthInstance = this.instrumentName + '_' + this.id;
        var synthInstance = 'channel_' + this.id; // synthInstanceString

      if (typeof window[synthInstance] !== 'undefined') { // window[synthInstance]

        switch (this.instrumentName) {
            case 'JoeSullivanDrumSynth':
              if ( typeof window[synthInstance].play === 'function' ) {
                window[synthInstance].play(note);
              }
                break;          
            case 'CWilsoWAMidiSynth':
                window[synthInstance].noteOn(note, 75, this.id); // old vol: 75
                break;          
            case 'AikeWebsynth1':
              //console.log('id', this.id, window[synthInstance]); 
                //window[synthInstance].setVolume(0.1);
                if (typeof window['awsbug'] == 'undefined' || typeof window['awsbug'] !== 'undefined' && window['awsbug']==0) {
                  if ( window[synthInstance] !== null ) {
                    if ( typeof window[synthInstance].play === 'function' ) {
                      window[synthInstance].play(note); // , String(synthInstance)
                    }
                  }
                  //console.log('note:', synthInstance, note);
                } else if (typeof window['awsbug'] !== 'undefined' && window['awsbug']==1) {
                  //delete window[synthInstance];  
                  //console.log('deleted synth instance:', synthInstance);
                  //window[synthInstance] = new WebSynth(window['audio_context2']);
                  window['awsbug']==0; 
                }
                break;
            case 'MrSynth':
                window[synthInstance].updateFrequency(notes[note]*0.5);
                window[synthInstance].startAttack();
                break;

        }         
      }
               

      }
    };


    /*
    this.setParams = function(paramId, param001) {
      if (this.type === 'synth') {
       //_synth.filter.set_freq(param001-70);

       //mrSynth.volumeNode.gain.value = param001; - wking code

       // create function param loop and case to route param values to their right destinations


      }
    };  
    */



    this.stop = function(note) {
      if (this.type === 'synth') {

        var synthInstance = 'channel_' + this.id; //

        if (typeof window[synthInstance] !== 'undefined') {

          switch (this.instrumentName) {
            case 'JoeSullivanDrumSynth':
              if ( typeof window[synthInstance].stop === 'function' ) {
                window[synthInstance].stop(note);
              }
              break;              
            case 'CWilsoWAMidiSynth':
                window[synthInstance].noteOff(note, this.id);
                break;              
              case 'AikeWebsynth1':
                  //window[synthInstance].setVolume(0);
                  //console.log('syn inst: ',window[synthInstance]);
                  //window[synthInstance].stop(note);
                  break;
              case 'MrSynth':
                  /*window[synthInstance].updateFrequency(notes[note]*0.5);
                  window[synthInstance].startAttack();*/
                  break;
          }         
        }

      }
    };



    this.isLoaded = function() {
      return _isLoaded;
    };

  };

}());
