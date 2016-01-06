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
      if (this.type === 'samples') {
        for (var i = 0; i < tracks.length; i++) {
          tracks[i].loadSample(this.trackLoaded, context);
        };
      } else if (this.type === 'synth') {
          console.log('>>> Create synth');

     /*   controls[0].x.value = 2400; 
        
        console.log('controls: ', controls); */


        var synthInstanceString = this.instrumentName + '_' + this.id;

//*    
        if (/*window[synthInstanceString] !== null &&*/ typeof window[synthInstanceString] === 'object') {

        //console.log('window[synthInstanceString]: ', window[synthInstanceString]);

         // if synthInstance already exists load control values from object attached array   
         var usedControls = window[synthInstanceString]['controls'];

        } else { 

        // (at first creation of synth instance) append controls array to synthInstance with control default values from channel config



switch (this.instrumentName) {
    case 'AikeWebsynth1':
        window[synthInstanceString] = new WebSynth(context);
        break;
    case 'MrSynth':
        window[synthInstanceString] = new MrSynth(context);
        break;

} 





        
        window[synthInstanceString]['controls'] = controls;
        var usedControls = controls;


        } 
//*/

        console.log('window[synthInstanceString]: ', window[synthInstanceString]);


        //console.log('window[synthInstanceString]: ', window[synthInstanceString]); 


        //window[synthInstanceString] = new WebSynth(context);

        //AikeSynth = new WebSynth(context);
        //var controls = _clients[clientId].controls;
        var input = 1;

        if (usedControls!=0) {    

         for (var j = 0; j < usedControls.length; j++) {


                if (typeof synthInstance !== 'undefined') {
                  eval(synthInstance+'.'+usedControls[j].x.param+'('+usedControls[j].x.value+')');
                }

          }
        }   


          /*
          AikeSynth = new WebSynth(context);
          AikeSynth.filter.set_freq(1); // 32
          AikeSynth.filter.set_q(16); // 4
          AikeSynth.vco2.set_fine(53.2); 
          AikeSynth.vco2.set_fine(48); 
          AikeSynth.filter.set_amount(30); 
          AikeSynth.eg.set_d(12); 

          //*/


          // load synth default preset from synth controls

          
          //console.log('WebSynth: ', WebSynth);

          //TANGUY = new TANGUY(context); // TANGUYGenerator

/*
TANGUY = {

    synth: context,

    // Defaults
    program_number: 0,
    octave_shift: 0,
    osc1_master_pitch: 440,
    osc2_master_pitch: 444.18,
    bend: 0,
    legato: false,
    playing: []

};



          TANGUY.build_synth();
          TANGUY.order_programs();*/

          //console.log('Tanguy: ', TANGUY);



//mrSynth = new MrSynth(context); - working code

          //window.mrSynth = mrSynth; // add instance increment : window.mrSynth1...2...





          console.log('Synth ready.');
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
