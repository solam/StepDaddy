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



/*var startDate = new Date();
var startTimestamp = startDate.getTime();
console.log('model ptn editor receving time:', startTimestamp);*/

      console.log('data', data.channelInfo);

      if (data=='kickOut') {        
        location.reload(true); // reload channel so that it loads channel instrument if available
        console.log('Got a kickOut instruction');
      } else if (data=='waitroom') {
        window.location.replace("waiting-room.html");  
      }
      console.log('Got an instrument', data.id);
      _self.instrument = new mixr.models.Instrument(data.id, data.name, data.tracks, data.volume, data.type, data.color, data.kitNumber, data.controls, data.instrumentName, data.channelInfo); // data.id - 1
      _self.emit(mixr.enums.Events.INSTRUMENT, _self.instrument);

/*
js func that refreshes itself every bar/ second:

t[instrumentNumber]addedtime = startTimestamp + (60/bpmx4) x number of bars

if timeNow < t[instrumentNumber]addedtime
  hide pattern-editor + modifiers
  show 'wait for your turn" + bar countdown ? + opacity value changes every bar to reveal instrument progressively
else  
  hide pattern-editor + modifiers
*/

/*var startDate = new Date();
var startTimestamp = startDate.getTime();
var bpm = 85;
var channelBarOffset = 8; */


var countdownMode = data.channelInfo.countdownMode;
console.log('countdownMode', countdownMode);

if (countdownMode==1) {

var startDate = new Date();
var userStartTime = startDate.getTime();

var startTimestamp = data.channelInfo.serverStartTime; // session start time
     

var bpm = data.channelInfo.bpm;
$("#insname").html(data.instrumentName);
$("#kitname").html(data.name );
$("#bpm").html(bpm + ' bpm');


var channelBarOffset = data.channelInfo.barOffset;
var kickoutBars = data.channelInfo.kickoutTime;
//console.log('server start timeStamp + kickoutBars', startTimestamp, kickoutBars); 

var millisecondsPerBar = (60.0 / bpm)*4000;
var channelOffsetTime = startTimestamp + (millisecondsPerBar*channelBarOffset);

    //var kickoutTime = channelOffsetTime + (millisecondsPerBar*kickoutBars);
//var kickoutTime = userStartTime + (millisecondsPerBar*kickoutBars); // kickOut may happen too early as channelOffsetTime not taken into account



var fadeOutBars = 8;
var fadeOutDelay = millisecondsPerBar*fadeOutBars; // 8 bars

//var barPass = 0;
//var millisecondsPerStep = millisecondsPerBar/4; // per 4th note in fact

var eulowedde = 0;

//console.log(window.newtimer);
clearInterval(window.newtimer); // prevent newtimer from running twice

/*
validate = function(e) {
    if ((e = e || window.event).done) return;
    // code
    e.done = true;
}
*/


window.newtimer = setInterval(function () { // (e)

  //if ( typeof e !== 'undefined' && (e = e || window.event).done ) return;

  //var oneExe = window.localStorage.getItem("oneexe");

  var d = new Date();
  var nowTimeStamp = d.getTime(); 

  //console.log('comp start time: ', channelOffsetTime);
  console.log('server start timeStamp + kickoutBars', startTimestamp, kickoutBars);

  if (nowTimeStamp < channelOffsetTime /*&& nowTimeStamp < (kickoutTime-fadeOutDelay)*/ ) {
    remainingBars = (channelOffsetTime - nowTimeStamp)/millisecondsPerBar;
    var remainingBars = Math.floor(remainingBars);

    //var passCount = (channelBarOffset-barPass)-1;

    if (remainingBars>=1 ) { // (passCount !=0 )
      var passString = remainingBars; //passCount;
      var instructionString = 'Get ready to play in <span id="countdown"></span>'; // for your turn
    } else {
      var passString = "Go!";
      var instructionString = '<span id="countdown"></span>';
    }

    console.log('fade in instrument');
    //var opacityPass = 1-((channelBarOffset-barPass)/channelBarOffset);
    var opacityPass = 1-(remainingBars/channelBarOffset); // 1-0 = destination remainingBars
    $("#pattern-editor").css('opacity',opacityPass);
    $("#instructions").show();
    $("#instructions").html(instructionString);
    $("#countdown").html(passString); //
    
    //$("#pattern-editor").hide();
    //$("#modifiers").hide();
    //barPass++;

  } else if (nowTimeStamp >= channelOffsetTime /*&& nowTimeStamp < (kickoutTime-fadeOutDelay)*/ ) {
    console.log('show instrument');

    if (eulowedde==0) { // only get allowedToPlayStartTime once
      var allowed = new Date();
      window.allowedToPlayStartTime = allowed.getTime();
      //var kickoutTime = allowedToPlayStartTime + (millisecondsPerBar*kickoutBars);
      //alert(window.allowedToPlayStartTime);

      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

      if (navigator.vibrate) {
        navigator.vibrate(500);
      }

    }
    eulowedde++; 

    $("#pattern-editor").css('opacity',1); // except for conductor role
    $("#instructions").hide();
    //$("#modifiers").show();



  } /*else if (nowTimeStamp >= (kickoutTime-fadeOutDelay) ) {

    //console.log('fade out ins');
    remainingBars = (kickoutTime - nowTimeStamp)/millisecondsPerBar;
    var remainingBars = Math.floor(remainingBars);

    //var passCount = (channelBarOffset-barPass)-1;

    if (remainingBars>=1 ) { // (passCount !=0 )
      var passString = remainingBars; //passCount;
      var instructionString = 'Get ready to give your instrument in <span id="countdown"></span>';
    } else {
      var passString = "Bye!";
      var instructionString = '<span id="countdown"></span>';
    }

    //console.log('redirect to waiting room');
    var opacityPass = remainingBars/fadeOutBars; // 1-0 = destination remainingBars
    console.log(opacityPass);
    $("#pattern-editor").css('opacity',opacityPass);
    $("#instructions").html(instructionString);
    $("#countdown").html(passString); 


  } else if (nowTimeStamp >= kickoutTime ) {
    //window.location.href = "http://stackoverflow.com";
    //location.replace("http://stackoverflow.com");
  }  */

//alert(n);

  if (typeof window.allowedToPlayStartTime !== 'undefined') {
    var kickoutTime = window.allowedToPlayStartTime + (millisecondsPerBar*kickoutBars);

    if (nowTimeStamp >= (kickoutTime-fadeOutDelay) && nowTimeStamp < kickoutTime) {

      console.log('fade out instrument');
      remainingBars = (kickoutTime - nowTimeStamp)/millisecondsPerBar;
      var remainingBars = Math.floor(remainingBars);

      if (remainingBars>=1 ) {
        var passString = remainingBars; 
        var instructionString = 'Get ready to let your instrument go in <span id="countdown"></span>';
      } else {
        var passString = "Bye!";
        var instructionString = '<span id="countdown"></span>';
      }

      var opacityPass = remainingBars/fadeOutBars; 
      console.log(opacityPass);
      $("#pattern-editor").css('opacity',opacityPass);
      $("#instructions").show();
      $("#instructions").html(instructionString);
      $("#countdown").html(passString);    

      if (passString == "Bye!") {
        window.location.replace("waiting-room.html");
      }   

    } else if (nowTimeStamp >= kickoutTime ) {
      console.log('redirect to waiting room');
      //window.location.href = "http://stackoverflow.com";
      window.location.replace("waiting-room.html");
    }  

  }



//e.done = true;



}, millisecondsPerBar); // refresh function every second = 1000


} else {
  $("#pattern-editor").css('opacity',1);  
}





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
