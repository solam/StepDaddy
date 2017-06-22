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

    window.ptnEditorModel = connection;

    var _onInstrument = function(data) {



/*var startDate = new Date();
var startTimestamp = startDate.getTime();
console.log('model ptn editor receving time:', startTimestamp);*/

      //console.log('data', data.channelInfo);

      if (data=='kickOut') {        
        location.reload(true); // reload channel so that it loads channel instrument if available
        console.log('Got a kickOut instruction');
      } else if (data=='waitroom') {
        window.location.replace("waiting-room.html");  
      }
      //console.log('Got instrument tracks', data); // data.id

      var traacks = Object.keys(data.tracks); 
      var traacksLength = traacks.length;


      var controols = Object.keys(data.controls); 
      var controolsLength = controols.length;


      // send localStorage "user" patterns into session shared pattern store

//


//console.log('session patterns: ', data.channelInfo.patterns); // .length


if (typeof window.localPatterns == 'undefined') {
  window.localPatterns = [];
}




if (typeof window.localPresets == 'undefined') {
  window.localPresets = [];
}


/*
// count number of local patterns

var patternCount = 0;  

for ( var i = 0, len = localStorage.length; i < len; ++i ) {
  var varName = localStorage.key(i);
  
  if (varName !== null && varName.substring(0, 10) == "Loops-ptn_") {    
    patternCount++;
  }  
}
console.log('patternCount: ', patternCount);
*/



console.log('data.channelInfo', data.channelInfo);


if (typeof window.channelPatterns == 'undefined' && typeof data.channelInfo.channelPatterns !== 'undefined') { 

  if (data.channelInfo.channelPatterns.length>0) { // Beware window.channelPatterns might need to be refreshed across sessions !
    window.channelPatterns = data.channelInfo.channelPatterns;
  }  

}


//*
for ( var i = 0, len = localStorage.length; i < len; ++i ) {
  var varName = localStorage.key(i);
  //console.log('localStorage: ', varName);

  var pushpattern = 0;  
  
  if (varName !== null && varName.substring(0, 10) == "Loops-ptn_") {
      //var sessionRestaurée = JSON.parse(localStorage.getItem('session'));
      var ptnString = localStorage.getItem(varName);
      //console.log('localStorage: ', varName, ptnString);

      
      //_self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: 995, x: 1, y: 0, pattern: ptnString });

      _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 995, x: 1, y: 0, pattern: ptnString });

      //var pushpattern = 0;  
      var ptnObj = JSON.parse(ptnString); // objFromString
      ptnObj['classs'] = 'user';

      if (window.localPatterns.length==0) { // data.channelInfo.patterns
        //_connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 995, x: 1, y: 0, pattern: ptnString });
        window.localPatterns.push(ptnObj);
        //console.log('localStorage 0: ', varName, ptnString);
      } else if (window.localPatterns.length>0) {

        //console.log('localStorage: ', varName, ptnString);

        for ( var j = 0, len2 = window.localPatterns.length; j < len2; ++j ) {  // data.channelInfo.patterns  window.localPatterns.length patternCount       
          var ptn = window.localPatterns[j]; //data.channelInfo.patterns[j];

      //    /*if (ptn.id!=ptnObj.id) {
      //      console.log('session ptns',ptn);
      //    }          
    

          if (ptn.id==ptnObj.id) {

            var ptnIndex = j;
            var pushpattern = 1;
            //console.log('session ptns',ptn);
          }
        }  

     if (pushpattern == 1) {
        //console.log('j: ',j)
        window.localPatterns.splice(ptnIndex, 1); // remove old entry
        window.localPatterns.push(ptnObj); // update with new entry

     } else { // if (pushpattern == 2)
        window.localPatterns.push(ptnObj); // add new pattern
     }



    }  

 } 

  //console.log( localStorage.getItem( localStorage.key( i ) ) );
}

//*/






if (typeof window.channelPresets == 'undefined' && typeof data.channelInfo.channelPresets !== 'undefined') { 

  if (data.channelInfo.channelPresets.length>0) { 
    window.channelPresets = data.channelInfo.channelPresets;
  }  

}

for ( var i = 0, len = localStorage.length; i < len; ++i ) {
  var varName = localStorage.key(i);
  var pushpreset = 0;  
  
  if (varName !== null && varName.substring(0, 10) == "Loops-pre_") {
      var preString = localStorage.getItem(varName);

      _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 991, x: 1, y: 0, preset: preString });

      var preObj = JSON.parse(preString); 
      preObj['classs'] = 'user';

      //console.log('preString', preString, preObj);

      if (window.localPresets.length==0) { 
        window.localPresets.push(preObj);
      } else if (window.localPresets.length>0) {

        for ( var j = 0, len2 = window.localPresets.length; j < len2; ++j ) {  
          var pre = window.localPresets[j]; 

          if (pre.id==preObj.id) {
            var preIndex = j;
            var pushpreset = 1;
          }
        }  

      if (pushpreset == 1) {
        window.localPresets.splice(preIndex, 1); // remove old entry
        window.localPresets.push(preObj); // update with new entry
      } else { // if (pushpreset == 2)
        window.localPresets.push(preObj); // add new preset
      }
    }  
  } 
}












      window['userPattern'] = {
          //'innfo' : [],
          'tracks' : []
      };
      /*window['userPattern'] = [];
      window['userPattern']['tracks'] = [];*/

      for (var i = 0; i < traacks.length; i++) {
        var track = data.tracks[i];  

        var trackId = track.id.split('-')[1];
        //var instrumentId = track.id.split('-')[0];
        //console.log('ins id', instrumentId); // 
        //window['userPattern']['tracks'][trackId] = track.notes
        window['userPattern'].tracks[trackId] = track.notes
      }  
      //window['userPattern']['info'] = [];
      //window['userPattern']['info']['id']=uuid.v1(); 
      //window['userPattern']['info']['name']='elevator';
      var uuidVar = uuid.v1(); // this var is only generated after 1 get instruement event
      window['userPattern'].id=uuidVar; 
      window['userPattern']._name_=data.channelInfo.channelName + '_' +uuidVar.substring(0, 4); // uuidVar.charAt(0); - traacksLength + 'n_' + 
      window['userPattern'].classs='user';
      //console.log('channel pattern array', window['userPattern']);
      //$('#pattern-name').val(window['userPattern'].name);

      //console.log('chInfo model ptn:', data.channelInfo);


//*
      window['userPreset'] = {
        'controls' : {}
      };

      for (var i = 0; i < controols.length; i++) {
        if (data.controls[i].id>=1 && data.controls[i].id<=200) { // exclude non timbre param controls (ptn, ptnSeq, preset changers)
          var value = data.controls[i].x.value;  
          var id = data.controls[i].id;
          window['userPreset'].controls[id] = value;
        }
      }  
      var uuidVar = uuid.v1(); 
      window['userPreset'].id=uuidVar; 
      window['userPreset']._name_=data.channelInfo.channelName + '_' +uuidVar.substring(0, 4); 
      window['userPreset'].classs='user';

//*/
/*
      window['userPreset'] = {
        'controls' : {}
      };
    window['userPreset']._name_='randomName';
*/

      _self.instrument = new mixr.models.Instrument(data.id, data.name, data.tracks, data.volume, data.type, data.color, data.kitNumber, data.controls, data.instrumentName, data.channelInfo); // data.id - 1
      _self.emit(mixr.enums.Events.INSTRUMENT, _self.instrument);



if( $('#patterns').length ) {

//console.log('win ptn id: ', window.patternId, data.channelInfo.patternId);


if (typeof window.patternId == 'undefined') {

  window.patternId = [];

}  //else { */


  if (typeof data.channelInfo.patternId !== 'undefined') {
    window.patternId[data.id] = data.channelInfo.patternId;
  } 

  //console.log('win ptn id: ', window.patternId, data.channelInfo.patternId);

  if ( typeof window.patternId[data.id] !== 'undefined' && window.patternId[data.id]==0 ) { // window.patternId[data.id] - data.channelInfo.patternId !== 'undefined' && data.channelInfo.patternId

      $itemOptionUnsaved = $('<option class="user unsaved" id="option00001" value="0">[unsaved pattern]</option>');
      $itemOptionUnsaved.appendTo(document.getElementById('patterns'));
      $('#patterns option[value="0"]').prop('selected',true);

  } else {    

    // by default select pattern of pattern list that matches data.channelInfo.patternId
    $('#patterns option[value="' + data.channelInfo.patternId + '"]').prop('selected',true); // window.patternId
    //$('#patterns option[value="fake-option"]').hide(); //css('visibility', 'hidden');
    //$("#patterns").val($("#patterns option:first").click());  //.val());
    //$('#patterns option:eq(1)').attr('selected', 'selected').trigger('change');

//$('#selpatternedit option[value="' + data.channelInfo.patternId + '"]').prop('selected',true);

  }

  
//}







}







  if (typeof data.channelInfo.patternEditId !== 'undefined') {
    // if event happens in session context
    $('#selpatternedit option[value="' + data.channelInfo.patternEditId + '"]').prop('selected',true);
  } else {
    // if event happens first before session broadcast of data
    $('#selpatternedit option[value="' + data.channelInfo.patternId + '"]').prop('selected',true); // a specific param should be alloted to patternEditId instead of relying on default pattern
  }


if (window.ptnEdit==1) {
  _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 203, ptnEditState: 1});

  window.displayPattern('selpatternedit');
  //console.log('ptnEdit yo yo: ', window['userPatternEdit']);
  
  if (typeof window['userPatternEdit'] !== 'undefined') {
  _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 202, ptnEditId: window['userPatternEdit'].id});
  }

  

  //console.log('patternEditId: ', data.channelInfo.patternEditId, window['userPatternEdit']); // , window.patternId

} else {
  _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 203, ptnEditState: 0});
  
  window.displayPattern('patterns');
  //console.log('ptnEdit taTa: ', window['userPatternEdit']);

}






if (window.stepSeq==1) {
  _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 201, ptnSeqState: 1});  

} else if (window.stepSeq==0) {
  _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 201, ptnSeqState: 0});  
} 






if ( $('#presets').length ) {

  if (typeof data.channelInfo.presetId !== 'undefined') {
    window.presetId = data.channelInfo.presetId;
  } 

  if (window.presetId==0) {

      $itemOptionUnsaved = $('<option class="user unsaved" id="option00001" value="0">[unsaved sound]</option>');
      $itemOptionUnsaved.appendTo(document.getElementById('presets'));
      $('#presets option[value="0"]').prop('selected',true);

  } else {    
    $('#presets option[value="' + window.presetId + '"]').prop('selected',true);
  }

  //console.log('presetId: ', window.presetId, data.channelInfo.presetId);
}






if( $('#kits').length ) {

  /*if (typeof data.channelInfo.presetId == 'undefined') {
    var kiitNuumber = data.kitNumber;
  } else {
    var kiitNuumber = data.channelInfo.presetId;    
  }*/

  var kiitNuumber = data.kitNumber;

  $('#kits option[value="' + kiitNuumber + '"]').prop('selected',true);
  //console.log('ch info: preset id kitNumber ', data.channelInfo.presetId, data.kitNumber, kiitNuumber);
}



if( $('#sessions').length ) {
  var sessOptionId =  data.channelInfo.sessionName;
  console.log('sessOptionId: ', sessOptionId);
  $('#sessions option[value="' + sessOptionId +'"]').prop('selected',true);
}







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

if (data.instrumentName=='Conductor') {
  var countdownMode = 0; // 0: no countdown on conductor
}


console.log('countdownMode', countdownMode /*, data data.channelInfo.channelName*/);

var bpm = data.channelInfo.bpm;

$("#channelname").html(data.channelInfo.channelName);
$("#channelname").css('background', data.channelInfo.channelColor);


  if (data.instrumentName=='AikeWebsynth1') {
    var displayedInsName = 'AWS1';
  } else {
    var displayedInsName = data.instrumentName;
  }

if (typeof data.channelInfo.instrumentUrl == 'undefined') {


  $("#insname").html('ins: '+displayedInsName); // instru - data.instrumentName
} else {
  $("#insname").html('ins: <a target="_blank" href="'+ data.channelInfo.instrumentUrl +'">'+displayedInsName+'</a>'); // data.instrumentName
}


if (typeof data.channelInfo.noteMin !== 'undefined' ) { // 
  window['conductorNotesPerLine'] = {};
  window['conductorNotesPerLine'].min = data.channelInfo.noteMin;
  window['conductorNotesPerLine'].max = data.channelInfo.noteMax;
  //$("#notemin").html('noteMin: '+data.channelInfo.noteMin); 
  //$("#notemax").html('noteMax: '+data.channelInfo.noteMax);
} 


if (typeof data.channelInfo.inputMode  !== 'undefined' && data.channelInfo.inputMode=='keyboard') {
  var inputMode = data.channelInfo.inputMode;
} else {
  var inputMode = '';
} 
$("#sessionname").html('sess: '+data.channelInfo.sessionList[data.channelInfo.sessionName]); // session
var sessionNumber = Number(data.channelInfo.sessionName)+1;
var channelNumb = Number(data.channelInfo.channelNumber)+1;
window.channelNumber = channelNumb;
$('body').addClass('channel' + channelNumb + ' session'+sessionNumber+' '+inputMode); // data.channelInfo.sessionName

//console.log('session name: ', data.channelInfo.sessionList);

//$("#kitname").html(data.name );
$("#bpm").html(bpm + ' bpm');


console.log('sessionName: ', data.channelInfo.sessionName);
document.title = data.channelInfo.channelName+ ' - ' +data.instrumentName +' - ...Loops';

if (countdownMode==1) {

var startDate = new Date();
var userStartTime = startDate.getTime();

var startTimestamp = data.channelInfo.serverStartTime; // session start time
     




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

// mute channel = not allowed to sound
//_connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 993, x: 0, y: 0});


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

      /*navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

      if (navigator.vibrate) {
        navigator.vibrate(500);
      } */
      // allow channel to sound
      _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 993, x: 1, y: 0});

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

      if (typeof window.channelTayppe == 'undefined') {
        window.channelTayppe = 'probsullivandrums';
      }    

    if (nowTimeStamp >= (kickoutTime-fadeOutDelay) && nowTimeStamp < kickoutTime) {

      console.log('fade out instrument');
      remainingBars = (kickoutTime - nowTimeStamp)/millisecondsPerBar;
      var remainingBars = Math.floor(remainingBars);

      if (remainingBars>=2 ) { // >2
        var passString = remainingBars; 
        var instructionString = 'Get ready to let your instrument go in <span id="countdown"></span>';
        var kickedOut = 0;
      } else if (remainingBars>=1 ) {  // <=2
        var passString = "Bye!";
        var kickedOut = 0;
        var instructionString = '<span id="countdown"></span>';
      } else {
        var passString = "Bye!";
        var kickedOut = 1;
        var instructionString = '<span id="countdown"></span>';
      }

      var opacityPass = remainingBars/fadeOutBars; 
      console.log(opacityPass);
      $("#pattern-editor").css('opacity',opacityPass);
      $("#instructions").show();
      $("#instructions").html(instructionString);
      $("#countdown").html(passString);    

      if (typeof window.channelTayppe == 'undefined') {
        window.channelTayppe = 'probsullivandrums';
      }

      if (kickedOut == 1 /*passString == "Bye!"*/ && window.channelTayppe!='control' ) { // $('#pattern-editor').not.hasClass('control') // 
        window.location.replace("waiting-room.html");
      }   

    } else if (nowTimeStamp >= kickoutTime && window.channelTayppe!='control') { // && window.channelTayppe!='control'
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

    

        //window.sequencerBeat = data;


  var check02 = window.localStorage.getItem("check02");

  if (typeof check02 !== 'undefined' && check02==1 || typeof check02 == 'undefined' || check02==null) {



if (data.beat==0 || data.beat==4 || data.beat==8 || data.beat==12) {       

        var localBeat = data.beat;

        /*if (data.beat==14) {
          localBeat = 15;
        }*/

        var currTarget = localBeat + 2;
        var lastTarget = localBeat -2; // +1; | -2: playhead at 1+5+9+13

        if (currTarget==2) {
          lastTarget = 14; // 17 | 14: playhead at 1+5+9+13
        }

        var $thCurrTarget = $('th:nth-child(' + (currTarget) + ')');
        var $thLastTarget = $('th:nth-child(' + (lastTarget) + ')');


        $('th:nth-child(1)').text(data.bar);

        if (typeof $thCurrTarget.attr("id") == 'undefined') {
          $thCurrTarget.attr("bgcolor", "darkgrey");   //.addClass('beat'); ="#FF0000"      
        }

        if (typeof $thLastTarget.attr("id") == 'undefined') {
          $thLastTarget.attr("bgcolor", "#000000");  //.removeClass('beat');
        }

        //console.log('seqBeat', lastTarget );        // data.beat, $thCurrTarget.attr("id")
}

}

      /*$tds.on('webkitAnimationEnd', function () {
        $tds.removeClass('beat');
      });
      $tds.addClass('beat');*/


if ($('body').hasClass('control') && data.beat==15 && data.bar==8) {

/*
window['autoinc'].forEach(function(element) {
  console.log(element);
}); */

      forIn(window['autoinc'], function(val, key, o) { 
        if (window['autoinc'][key]['state']== 1 ) {
          //var incTime = $('#inc'+key).attr('data-inctime');
          var incType = $('#inc'+key).attr('data-inctype');
          var oldVal = $('#input'+key).val();
          var newVal = Number(oldVal)+Number(incType);
          $('#input'+key).val(newVal);
          $('#slider'+key).trigger("change");  
          //console.log('autoInc: ', incType, oldVal, newVal);        
        }
          
      });

/*for (var c=0; c<window['autoinc'].length; c++) {

window['autoinc'][_id]['state']== 1;  */

/*var oldTempoValue = $('#id999 input').val();
var newTempoValue = Number(oldTempoValue)+1;
$('#id999 input').val(newTempoValue);
$('#id999').trigger("change");*/



}


        if (data.beat==15 && window.stepSeq==1) { // data.beat==15         
          if (typeof window.patternSequencer !== 'undefined') {

            switch(window.patternSequencer.length) {
              case 2:        
                if (isEvenStrict(data.bar) ) {
                  var nextPlayedPattern=1;
                } else {
                  var nextPlayedPattern=0;
                }
                break;
              case 4:
                if (data.bar<5) {
                  var nextPlayedPattern=Number(data.bar)-1;
                } else {
                  var nextPlayedPattern=Number(data.bar)-5;
                }
                break;
              case 8:
                var nextPlayedPattern=Number(data.bar)-1;
                break;        
              default:
                rotate(window.patternSequencer,1);
                var nextPlayedPattern=0;
            } 

            // hardcoded defautl silence pattern id
            if (window.patternSequencer[nextPlayedPattern].id!= 'silence01') {
              $('#pattern-editor tr td:not(:first)').not('.active').not('.notepitch').addClass('playedbar')
              //.css('background', '#222');
              
            } else {
              $('#pattern-editor tr td:not(:first)').not('.active').not('.notepitch').removeClass('playedbar')
              //.css('background', '#000');
            }



            window.playedPatternOrder = nextPlayedPattern;
            //rotate(window.patternSequencer,1);
            //console.log('bar pops:', data.bar); // window.patternSequencer
            $('select#patterns option[value="'+window.patternSequencer[nextPlayedPattern].id+'"]').prop('selected',true).trigger('change'); // 01627d00-3d18-11e6-bd11-650c5a0c542f // window.patternSequencer[0].id
          }          
        } 


      _self.emit(mixr.enums.Events.SEQUENCER_BEAT, data.beat);
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

    this.updateNote = function(volume, note, trackId, patternId) {
      //console.log('instrumentId', this.instrument.id);

    // do not send note update to sound engine if in pattern edit mode (vs. pattern playd mode)  
    if ( !$('#pattern-editor table').hasClass("ptn-edit") ) {      
      _connection.execute(mixr.enums.Events.NOTE, {
        id: this.instrument.id,
        trackId: trackId,
        noteId: note,
        volume: volume,
        patternId: patternId
      });
    } 


      //console.log('update note happened at l714 model ptn editor', window['userPattern']);



      var traackId = trackId.split('-')[1];      





/*

      if (window.ptnEdit==1) {
        //window['userPattern'].tracks = window['userPatternEdit'].tracks;
        window['userPatternEdit'].tracks[traackId][note] = volume;
        var classs = window['userPatternEdit'].classs;
        var elementId = window['userPatternEdit'].id;
        var el = window['userPatternEdit'];
      } else {
        window['userPattern'].tracks[traackId][note] = volume;
        var classs = window['userPattern'].classs;
        var elementId = window['userPattern'].id;
        var el = window['userPattern'];
      }


        if (classs=='channel') {
          var ptnStorage = window.channelPatterns;
        } else if (classs=='session') {       
          var ptnStorage = window.sessionPatterns;   
        } else {  
          var ptnStorage = window.localPatterns;
        }   


        /*var result = $.grep(ptnStorage, function(e){ return e.id == elementId; });
        if (typeof result[0] !== 'undefined') {
          console.log('update ptn gfx with no page refresh: ', result[0]);
          //var trackNumber = result[0].tracks.length; 
        } else {
          //var trackNumber = 0;
        } /


        var added = false;
        for(var i=0;i<ptnStorage.length; i++){
           if(ptnStorage[i].id === el.id){
                ptnStorage.splice(i,1,el);
                added = true;
                console.log('ptn found');
                break;
           }
        }

        if(!added) ptnStorage.push(el);        


        console.log('class pattern', classs, ptnStorage, window['userPatternEdit']); // , trackId, note, volume - 'changed channel pattern', window['userPattern']


      // at each note update on the grid: update window['userPattern']
      
      */
      





      if (window.stepSeq==1 && window.ptnEdit==0) {

        //console.log('windowuserPattern', window['userPattern']);

window['userPattern'].tracks[traackId][note] = volume;

         var classs = $('#patterns').find(":selected").attr('class');
         var presetId = $('#presets').find(":selected").val();    
         var patternId = $('#patterns').find(":selected").val();
         var KitNumber = $('#kits').find(":selected").val(); 
         
         //window['userPattern']._name_ = 'ch' + window.channelNumber + '_bar' + window.playedPatternOrder +'_onTheFly';
         var dispNumb = Number(window.playedPatternOrder)+1;
         window['userPattern']._name_ = 'bar' + dispNumb + '_ch' + window.channelNumber +'_onTheFly';
         window['userPattern'].id = 'ch' + window.channelNumber + '_bar' + dispNumb /*window.playedPatternOrder*/ +'_onTheFly';

         // put 'name' object key as first key to appear into Webstorage key=>value display
         var alphaAscSortedUserPattern = sortObj(window['userPattern'],'asc');
         var ptnString = JSON.stringify(alphaAscSortedUserPattern); 
         var ptnString = ptnString.replace('_name_', 'name'); 

         window.patternSequencer[window.playedPatternOrder].id = window['userPattern'].id;
         window.patternSequencer[window.playedPatternOrder].name = 'bar' + dispNumb + '_ch' + window.channelNumber +'_onTheFly';


         window.ptnSeq = {};
         window.ptnSeq.list = window.patternSequencer;
         window.ptnSeq.state = window.stepSeq;
         var ptnSeqString = JSON.stringify(window.ptnSeq);
         //console.log('ptnSeqString', ptnSeqString, window.ptnSeq);

        _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 995, x: KitNumber, y: 0, pattern: ptnString, classs: classs, kitNumber: KitNumber, triggerMode: 'manual', patternId: window['userPattern'].id, presetId: presetId, ptnSeq: ptnSeqString}); // 
        
        localStorage.setItem('Loops-ptn_'+window['userPattern'].id, ptnString);


        $itemOption = $('<option class="user" id="option'+window['userPattern'].id+'" value="'+window['userPattern'].id+'">'+window['userPattern']._name_+'</option>');
        $itemOption.appendTo(document.getElementById('patterns'));
        if( $('#patterns').length ) {
          $('#patterns option[value="' + window['userPattern'].id + '"]').prop('selected',true);
        }


      } else if (/*window.stepSeq==1 &&*/ window.ptnEdit==1) {

if (typeof window['userPatternEdit'] == 'undefined') { console.log('return'); return; }

window['userPattern'].tracks = window['userPatternEdit'].tracks;
window['userPatternEdit'].tracks[traackId][note] = volume;


         //console.log('l797 ptn edit:', window['userPatternEdit']); //  - window.patternSequencer

         var classs = 'user';//$('#selpatternedit').find(":selected").attr('class');
         var presetId = $('#presets').find(":selected").val();    
         var patternId = $('#selpatternedit').find(":selected").val();
         var KitNumber = $('#kits').find(":selected").val(); 

         window['userPatternEdit'].name = $('#selpatternedit').find(":selected").text();
         window['userPatternEdit'].id = patternId;
         window['userPatternEdit'].classs = classs;

         //console.log('yop: ', $('#selpatternedit').find(":selected").attr('data-notemin'));

         var dataNoteMin = $('#selpatternedit').find(":selected").attr('data-notemin');
         

         if (typeof dataNoteMin !== 'undefined') {
           window['userPatternEdit'].notenb = [];
           window['userPatternEdit'].notenb[0] = $('#selpatternedit').find(":selected").attr('data-notemin');
           window['userPatternEdit'].notenb[1] = $('#selpatternedit').find(":selected").attr('data-notemax');        
        } 

         var ptnString = JSON.stringify(window['userPatternEdit']);



        if (classs=='channel') {
          var ptnStorage = window.channelPatterns;
        } else if (classs=='session') {       
          var ptnStorage = window.sessionPatterns;   
        } else {  
          var ptnStorage = window.localPatterns;
        }   


        var added = false;
        for(var i=0;i<ptnStorage.length; i++){
           if(ptnStorage[i].id === window['userPatternEdit'].id){
                ptnStorage.splice(i,1,window['userPatternEdit']);
                added = true;
                console.log('ptn found', classs);
                break;
           }
        }

        if(!added) ptnStorage.push(window['userPatternEdit']); 


         
         //window.patternSequencer[window.playedPatternOrder].id = window['userPatternEdit'].id;
         //window.patternSequencer[window.playedPatternOrder].name = window['userPatternEdit'].name;


         window.ptnSeq = {};
         window.ptnSeq.list = window.patternSequencer;
         window.ptnSeq.state = window.stepSeq;
         var ptnSeqString = JSON.stringify(window.ptnSeq);
         //console.log('ptnSeqString', ptnSeqString, window.ptnSeq);

        _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 995, x: KitNumber, y: 0, pattern: ptnString, classs: classs, kitNumber: KitNumber, triggerMode: 'NOmanual', patternId: patternId, presetId: presetId, ptnSeq: ptnSeqString}); // window['userPatternEdit'].id
        

if (typeof patternId !== 'undefined') { // window['userPatternEdit'].id
  //localStorage.setItem('Loops-ptn_'+patternId, ptnString); // window['userPatternEdit'].id
}

        /*$itemOption = $('<option class="user" id="option'+window['userPatternEdit'].id+'" value="'+window['userPatternEdit'].id+'">'+window['userPatternEdit'].name+'</option>');
        $itemOption.appendTo(document.getElementById('patterns'));
        if( $('#patterns').length ) {
          $('#patterns option[value="' + window['userPattern'].id + '"]').prop('selected',true);
        } */

      }




    };



    this.onModifierChange = function(data) {
       //console.log('ptn editor ModifierChange: ', data); 
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
