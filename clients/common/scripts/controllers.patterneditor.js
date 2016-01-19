(function() {

  /**
   * The PatternEditor controller is responsible for handling all the commands
   *
   * @constructor
   * @class PatternEditor
   */
  mixr.controllers.PatternEditor = function(model) {

    /**
     * Mixins
     */
    mixr.mixins.Wrapper.call(this);

    /**
     * An array holding all the search ui elements.
     *
     * @private
     * @type {mixr.views.PatternEditor}
     */
    var view;
    var instrument;

    /**
     * The model for this controller
     *
     * @private
     * @type {mixr.models.Search}
     */
    var _model = model || {};

    var _onNote = function(data) {
      _model.updateNote(data.volume, data.note, data.trackId);
    };

    /**
     * Shows the view
     * @return {mixr.controllers.PatternEditor} This instance of the controller.
     */
    this.show = function() {
      view.show();
      return this;
    };

/*
    this.returnInstrument = function() {
      return instrument; // 'yo'; 
    }; */


    /**
     * Initializes the controller
     *
     * @public
     * @function
     * @return {mixr.controllers.PatternEditor} This instance of the controller.
     */
    this.initialize = function() {
      _model.initialize();

      view = new mixr.views.PatternEditor($('#pattern-editor'))
        .initialize()
        .on(mixr.enums.Events.NOTE, _onNote);



      _model.on(mixr.enums.Events.INSTRUMENT, function () {

        

      $('#pattern-editor').removeClass();
      $('#pattern-editor').addClass(_model.instrument.type); // remove '#pattern-editor' div in case of cunductor role aka control only "instrument"

        //window.insControls = _model.instrument.controls; // var instrument
        //console.log('controls', _model.instrument.controls);

      var table = $('#pattern-editor table');  
      var controllers = $('#modifiers');  

      table.empty(); // deplace code to this.removeTracksAndControllers
      controllers.empty();  // controllers


        var tracks = _model.instrument.tracks;
        for (var i = 0; i < tracks.length; i++) {
          view.addTrack(tracks[i], _model.instrument.color);
        }

        // draw controllers

        //console.log('_model.ins:', _model.instrument.id);
//*
        var container = document.getElementById('modifiers');    
        var controls = _model.instrument.controls;
        var input = 1;
        var channelId = _model.instrument.id;

        if (_model.instrument.controls!=0) {    
//*
          for (var j = 0; j < controls.length; j++) {

            var input = input + j;

            window[input] = new mixr.ui.Input(controls[j].id, controls[j].x.name, container, controls[j].x.value, controls[j], channelId).initialize();
            window[input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
            //console.log('input value: ', controls[j].x.value);


          } 
          //*/
        /*
        var input = new mixr.ui.Input(2, 'Tempo', container).initialize();
        input.on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
        //*/


        //_conn.execute(mixr.enums.Events.MODIFIER_CHANGE, data);
    //*/

        }


      });

      _model.on(mixr.enums.Events.SEQUENCER_BEAT, function(beat) {
        view.drawPlayhead(beat);
      });



      // listen for note change event
      _model.getInstrument();

      return this;
    };

  };

}());
