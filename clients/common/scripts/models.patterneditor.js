(function() {

  /**
   * The PatternEditor model.
   *
   * @constructor
   * @class PatternEditor
   * @param {mixr.net.Connection} connection The connection for doing the call.
   */
  mixr.models.PatternEditor = function(connection) {

    /**
     * Mixins
     */
    mixr.mixins.Wrapper.call(this);

    var _self = this;

    this.instrument = null;

    //this.getInstrument

    /**
     * The connection
     *
     * @private
     * @type {mixr.net.Connection}
     */
    var _connection = connection;

    var _onInstrument = function(data) {
      if (data=='kickOut') {        
        location.reload(true); // reload channel so that it loads channel instrument if available
        console.log('Got a kickOut instruction');
      } 
      console.log('Got an instrument', data.id);
      _self.instrument = new mixr.models.Instrument(data.id, data.name, data.tracks, data.volume, data.type, data.color, data.kitNumber, data.controls); // data.id - 1
      _self.emit(mixr.enums.Events.INSTRUMENT, _self.instrument);
    };

    var _onSequenceBeat = function(data) {
      _self.emit(mixr.enums.Events.SEQUENCER_BEAT, data);
    };

    var _addEventListeners = function() {
      _connection.on(mixr.enums.Events.INSTRUMENT, _onInstrument);
      _connection.on(mixr.enums.Events.SEQUENCER_BEAT, _onSequenceBeat);
    };

    this.getInstrument = function() {
      _connection.execute(mixr.enums.Events.GET_INSTRUMENT, {});
      return this;
    };

 /*   var returnInstrument = function() {
      return this.instrument;
    };    */

    this.updateNote = function(volume, note, trackId) {
      console.log('instrumentId', this.instrument.id);
      _connection.execute(mixr.enums.Events.NOTE, {
        id: this.instrument.id,
        trackId: trackId,
        noteId: note,
        volume: volume
      });
    };



    this.onModifierChange = function(data) {
      _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, data);
    };


    /**
     * Initializes the model
     *
     * @public
     * @function
     * @return {mixr.controllers.Search} This instance of the controller.
     */
    this.initialize = function() {
      _addEventListeners();
      return this;
    };

  };

}());
