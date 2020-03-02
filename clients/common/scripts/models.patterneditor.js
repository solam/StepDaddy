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

    /**
     * The connection
     *
     * @private
     * @type {mixr.net.Connection}
     */
    var _connection = connection;
    window.ptnEditorModel = connection;



    var _onInstrument = function(data) {

      //window.puppetMaster = 0;

      window.instrumentdata = data;

      //console.log('data', data.channelInfo);

      if (data=='kickOut TEMPORARILY DISABLED') {        
        //location.reload(true); // reload channel so that it loads channel instrument if available
        console.log('Got a kickOut instruction');
      } else if (data=='waitroom') {
        //window.location.replace("waiting-room.html");  
      } 


      if ( typeof data !== 'undefined' ) { 
        //*
        if ( typeof data.bpm !== 'undefined' ) {            
          //console.log('bpm, bar:', data.bpm, data.bar);
          $("#bpm").html(data.bpm + ' bpm');

          // receiving bar pulse from sound gen client
          _loClock();

          var data = undefined;
          return;
        }  
        //*/



      if ( typeof data[0] !== 'undefined' ) {

        //window.puppetMaster = 0;

        if ( typeof data[0].channelId !== 'undefined' && $('body').hasClass('control') ) {  

          var currts = Date.now();

          window['part_'+currts] = {};
          window['part_'+currts].id = uuid.v1();
          window['part_'+currts]._name_ = $('#part-name').val();
          window['part_'+currts].payload = data;

          var partName = $('#part-name').val();

          var alphaAscSortedUserPreset = sortObj(window['part_'+currts],'asc');
          var preString = JSON.stringify(alphaAscSortedUserPreset); 
          var preString = preString.replace('_name_', 'name');  

          localStorage.setItem('Loops-par_' + window['part_'+currts].id, preString);


          // append part to select option:

          var containerparts = document.getElementById('avail-parts');                

          //if (typeof input !== 'undefined') { // 
            $option = $('<option id="option'+window['part_'+currts].id+'" value="'+window['part_'+currts].id+'">'+partName+'</option>'); // window['part_'+currts].name 
            $option.prependTo(containerparts);
          //}

          var data = undefined;          
        } 
        

      } else if ( typeof data.ptnSeqList !== 'undefined' ) { // data[0].channelId


          if ( typeof window.puppetMaster == 'undefined' ) {
            window.puppetMaster = 1;
          } else {
            window.puppetMaster = window.puppetMaster + 1;
          }
            
          //console.log('window.step: ', window.step);

          //if ( window.step == 14 ) {
            // puppy mastah changes "played patterns" from pattern sequencer
            var containerpatterns = document.getElementById('played-patterns'); 
            $('#played-patterns').empty(); // find('option').remove().end()     

            window.patternSequencer = [];

            for ( var k = 0; k < data.ptnSeqList.length; k++ ) {
              window.patternSequencer.push(data.ptnSeqList[k]);

              var pattern = data.ptnSeqList[k];
              var input = 2890 + k;

              if (typeof input !== 'undefined') { // window[input]
                $option = $('<option selected id="option'+input+'" value="'+pattern.id+'">'+pattern.name+'</option>'); //
                //$option.prop('selected',true);         
                $option.appendTo(containerpatterns);
              }
            }  
          //}

          window.patternSequencerOri = (JSON.parse(JSON.stringify(window.patternSequencer))); 

          
          // when puppet master mode off (when no part is being played) unset fol. variables so that user regains control over kit & preset change
          // so that user may save a patternList + specific preset per channel for saving of part
          //if (window.localParts.length>0) {
            window.nextKit = data.kitId;
            window.nextPreset = data.presetId;
          /*} else {
            delete window.nextKit;
            delete window.nextPreset;
          } */

          //console.log('puppet mast: ', window.puppetMaster /*window.localParts, window.nextKit, window.nextPreset*/);


          window.barcount = data.bar;

          // conductor "clock" resyncs channel instrument's internal clock  
          if (isEvenStrict(data.bar) ) {
            window.oddeven = 0;
          } else {
            window.oddeven = 1;
          }

          window.clockts = data.clockts;      

          var data = undefined;
          return;          
        } /*else {
          window.puppetMaster = 0;
        }*/



/*
        if ( typeof data.bpm !== 'undefined' ) {            
          //console.log('bpm, bar:', data.bpm, data.bar);
          $("#bpm").html(data.bpm + ' bpm');

          // receiving bar pulse from sound gen client
          _loClock();

          var data = undefined;
          return;
        }  
*/



      }  



      if (typeof data !== 'undefined' && data !== null && typeof data === 'object') {
        if (typeof data !== 'undefined' ) {
          if (typeof data.tracks !== 'undefined' ) {
            var traacks = Object.keys(data.tracks); 
            var traacksLength = traacks.length;

            var controols = Object.keys(data.controls); 
            var controolsLength = controols.length;
          }
        }
      }
      //console.log('Got instrument tracks', traacksLength);
      // send localStorage "user" patterns into session shared pattern store

      //console.log('session patterns: ', data.channelInfo.patterns); // .length


      if (typeof window.localPatterns == 'undefined') {
        window.localPatterns = [];
      }

      if (typeof window.localParts == 'undefined') {
        window.localParts = [];
      }

      if (typeof window.localSongs == 'undefined') {
        window.localSongs = [];
      }

      if (typeof window.localPresets == 'undefined') {
        window.localPresets = [];
      }




      //console.log('data.channelInfo', data.channelInfo);

      if ( typeof data !== 'undefined' ) {

        if ( typeof data.channelInfo !== 'undefined' ) {

          if (typeof window.channelPatterns == 'undefined' && typeof data.channelInfo.channelPatterns !== 'undefined') { 

            if (data.channelInfo.channelPatterns.length>0) { // Beware window.channelPatterns might need to be refreshed across sessions !
              window.channelPatterns = data.channelInfo.channelPatterns;
            }  
          }

          if (typeof window.channelParts == 'undefined' && typeof data.channelInfo.channelParts !== 'undefined') { 

            if (data.channelInfo.channelParts.length>0) { // Beware window.channelParts might need to be refreshed across sessions !
              window.channelParts = data.channelInfo.channelParts;
            }  
          }

          if (typeof window.channelSongs == 'undefined' && typeof data.channelInfo.channelSongSeqList !== 'undefined') { 

            if (data.channelInfo.channelSongSeqList.length>0) { //
              window.channelSongs = data.channelInfo.channelSongSeqList;
            }  
          }
        }
      }


      //*
      for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        var varName = localStorage.key(i);
        //console.log('localStorage: ', varName);
        var pushpattern = 0;  
        var pushpart = 0;
        
        if (varName !== null && varName.substring(0, 10) == "Loops-ptn_") {
            var ptnString = localStorage.getItem(varName);
            _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 995, x: 1, y: 0, pattern: ptnString });

            var ptnObj = JSON.parse(ptnString); // objFromString
            ptnObj['classs'] = 'user';

            if (window.localPatterns.length==0) { // data.channelInfo.patterns
              window.localPatterns.push(ptnObj);
              //console.log('localStorage 0: ', varName, ptnString);
            } else if (window.localPatterns.length>0) {

              for ( var j = 0, len2 = window.localPatterns.length; j < len2; ++j ) {  // data.channelInfo.patterns  window.localPatterns.length patternCount       
                var ptn = window.localPatterns[j]; //data.channelInfo.patterns[j];

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

       } else if (varName !== null && varName.substring(0, 10) == "Loops-par_") {

            var parString = localStorage.getItem(varName);
            var parObj = JSON.parse(parString); //
            parObj['classs'] = 'user';

            if (window.localParts.length==0) { //
              window.localParts.push(parObj);
            } else if (window.localParts.length>0) {

              for ( var j = 0, len2 = window.localParts.length; j < len2; ++j ) {  // 
                var par = window.localParts[j]; //  
          
                if (par.id==parObj.id) {
                  var parIndex = j;
                  var pushpart = 1;
                }
              }  

           if (pushpart == 1) {
              window.localParts.splice(parIndex, 1); // remove old entry
              window.localParts.push(parObj); // update with new entry

           } else { // if (pushpart == 2)
              window.localParts.push(parObj); // add new part
           }
          }  


       } else if (varName !== null && varName.substring(0, 10) == "Loops-sng_") {

            var parString = localStorage.getItem(varName);

            var parObj = JSON.parse(parString); //
            parObj['classs'] = 'user';

            if (window.localSongs.length==0) { //
              window.localSongs.push(parObj);
            } else if (window.localSongs.length>0) {

              for ( var j = 0, len2 = window.localSongs.length; j < len2; ++j ) {  // 
                var par = window.localSongs[j]; //  
          
                if (par.id==parObj.id) {
                  var parIndex = j;
                  var pushpart = 1;
                }
              }  

           if (pushpart == 1) {
              window.localSongs.splice(parIndex, 1); // remove old entry
              window.localSongs.push(parObj); // update with new entry

           } else { // if (pushpart == 2)
              window.localSongs.push(parObj); // add new part
           }
          }  
       } 
        //console.log( localStorage.getItem( localStorage.key( i ) ) );
      }

      //*/

      if ( typeof data !== 'undefined' ) {

        if ( typeof data.channelInfo !== 'undefined' ) {
          if (typeof window.channelPresets == 'undefined' && typeof data.channelInfo.channelPresets !== 'undefined') { 
            if (data.channelInfo.channelPresets.length>0) { 
              window.channelPresets = data.channelInfo.channelPresets;
            }  
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



        if ( typeof traacks !== 'undefined') {       
          for (var i = 0; i < traacks.length; i++) {
            var track = data.tracks[i];  
            var trackId = track.id.split('-')[1];
            window['userPattern'].tracks[trackId] = track.notes
          }  
        }



        if ( typeof data.channelInfo !== 'undefined') {    
          var uuidVar = uuid.v1(); // this var is only generated after 1 get instrument event
          window['userPattern'].id=uuidVar; 
          window['userPattern']._name_=data.channelInfo.channelName + '_' +uuidVar.substring(0, 4); // uuidVar.charAt(0); - traacksLength + 'n_' + 
          window['userPattern'].classs='user';
        }



        if ( typeof controols !== 'undefined') {

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

          _self.instrument = new mixr.models.Instrument(data.id, data.name, data.tracks, data.volume, data.type, data.color, data.kitNumber, data.controls, data.instrumentName, data.channelInfo); // data.id - 1
          _self.emit(mixr.enums.Events.INSTRUMENT, _self.instrument);

        }


        if (typeof data.channelInfo !== 'undefined') {

          if ( $('#patterns').length ) {
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
            }
          }


          if (typeof data.channelInfo.patternEditId !== 'undefined') {
            // if event happens in session context
            $('#selpatternedit option[value="' + data.channelInfo.patternEditId + '"]').prop('selected',true);
          } else {
            // if event happens first before session broadcast of data
            $('#selpatternedit option[value="' + data.channelInfo.patternId + '"]').prop('selected',true); // a specific param should be alloted to patternEditId instead of relying on default pattern
          }
        }  


        if (window.ptnEdit==1) {
          _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 203, ptnEditState: 1});

          window.displayPattern('selpatternedit');
          //console.log('ptnEdit yo yo: ', window['userPatternEdit']);
          
          if (typeof window['userPatternEdit'] !== 'undefined') {
          _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 202, ptnEditId: window['userPatternEdit'].id});
          }

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




        if (typeof data.channelInfo !== 'undefined') {

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
        }



        if ( $('#kits').length ) {
          var kiitNuumber = data.kitNumber;
          $('#kits option[value="' + kiitNuumber + '"]').prop('selected',true);
          //console.log('ch info: preset id kitNumber ', data.channelInfo.presetId, data.kitNumber, kiitNuumber);
        }



        if ( $('#sessions').length ) {
          var sessOptionId =  data.channelInfo.sessionName;
          //console.log('sessOptionId: ', sessOptionId);
          $('#sessions option[value="' + sessOptionId +'"]').prop('selected',true);
        }


        // forcibly disable rotation mode so that editor mode is solid and channels do not go offline all of a sudden
        var codeSection = 'disabled';

        if (typeof data.channelInfo !== 'undefined' /*&& codeSection !== 'disabled'*/) {

          var countdownMode = data.channelInfo.countdownMode;

          if (data.instrumentName=='Conductor') {
            var countdownMode = 0; // 0: no countdown on conductor
          }

          window.gfxMode = 'local'; // vs. global

          if (data.instrumentName=='gfx') {  
            window['instrumentType'] = 'gfx';
            new Graphismes().initialize();
          }

          //console.log('countdownMode', countdownMode /*, data data.channelInfo.channelName*/);

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


          //console.log('sessionName: ', data.channelInfo.sessionName);
          document.title = data.channelInfo.channelName+ ' - ' +data.instrumentName +' - ...Loops';


          if ( codeSection == 'disabled') {
            var countdownMode = 0;
          }  







          // 'Coutdown mode = rotation of instruments for each user' management
          if (countdownMode==1) {

            var startDate = new Date();
            var userStartTime = startDate.getTime();

            var startTimestamp = data.channelInfo.serverStartTime; // session start time
                 
            var channelBarOffset = 0; // data.channelInfo.barOffset; force no bar offsets!!!!
            var kickoutBars = data.channelInfo.kickoutTime;
            //console.log('server start timeStamp + kickoutBars', startTimestamp, kickoutBars); 

            console.log('channelBarOffset', channelBarOffset);

            var millisecondsPerBar = (60.0 / bpm)*4000;
            var channelOffsetTime = startTimestamp + (millisecondsPerBar*channelBarOffset);

            var fadeOutBars = 8;
            var fadeOutDelay = millisecondsPerBar*fadeOutBars; // 8 bars

            var eulowedde = 0;

            //console.log(window.newtimer);
            clearInterval(window.newtimer); // prevent newtimer from running twice



            window.newtimer = setInterval(function () { // (e)

              var d = new Date();
              var nowTimeStamp = d.getTime(); 

              //console.log('comp start time: ', channelOffsetTime);
              //console.log('server start timeStamp + kickoutBars', startTimestamp, kickoutBars);

              if (nowTimeStamp < channelOffsetTime /*&& nowTimeStamp < (kickoutTime-fadeOutDelay)*/ ) {
                remainingBars = (channelOffsetTime - nowTimeStamp)/millisecondsPerBar;
                var remainingBars = Math.floor(remainingBars);

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

              } else if (nowTimeStamp >= channelOffsetTime /*&& nowTimeStamp < (kickoutTime-fadeOutDelay)*/ ) {
                console.log('show instrument');

                if (eulowedde==0) { // only get allowedToPlayStartTime once
                  var allowed = new Date();
                  window.allowedToPlayStartTime = allowed.getTime();

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
              } 

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
                    //window.location.replace("waiting-room.html");
                  }   

                } else if (nowTimeStamp >= kickoutTime && window.channelTayppe!='control') { // && window.channelTayppe!='control'
                  console.log('redirect to waiting room');
                  //window.location.href = "http://stackoverflow.com";
                  //window.location.replace("waiting-room.html");
                }  
              }
            }, millisecondsPerBar); // refresh function every second = 1000


          } else {
            $("#pattern-editor").css('opacity',1);  
          }
        }
      } // end of if ( typeof data !== 'undefined' ) {
    };





    var _onSequenceBeat = function(data) {

      if ( window.inIframe == 0) {
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
      } // end of if ( window.inIframe == 0) {    

              


      var check02 = window.localStorage.getItem("check02");

      var localBeat = data.beat;
      window.step = data.beat;

      /*if (data.beat==14) {
        localBeat = 15;
      }*/

      var currTarget = localBeat + 2;
      var lastTarget = localBeat +1; // +1; | -2: playhead at 1+5+9+13

      if (currTarget==2) {
        lastTarget = 17; // 17 | 14: playhead at 1+5+9+13
      }


      //console.log('tr: ', $('tr:nth-child(1) td:nth-child(1)').text())

      if ( window.inIframe == 0) {

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


        if ( data.beat==0 ) {
          $('th:nth-child(1)').text(data.bar);
        }
        

        if (typeof check02 !== 'undefined' && check02==1 || typeof check02 == 'undefined' || check02==null) {

          var $thCurrTarget = $('th:nth-child(' + (currTarget) + ')');
          var $thLastTarget = $('th:nth-child(' + (lastTarget) + ')');

          if (typeof $thCurrTarget.attr("id") == 'undefined') {
            $thCurrTarget.attr("bgcolor", "darkgrey");   //.addClass('beat'); ="#FF0000"      
          }

          if (typeof $thLastTarget.attr("id") == 'undefined') {
            $thLastTarget.attr("bgcolor", "#000000");  //.removeClass('beat');
          }
        } // end of check02
      } // end of if ( window.inIframe == 0) {


      if ( $('body').hasClass('control')  ) {

      /*
            forIn(window['autoinc'], function(val, key, o) { 
              if (window['autoinc'][key]['state']== 1 ) {
                var incTime = $('#inc'+key).attr('data-inctime');

                if (incTime==2) {
                    var timeArray = [2,4,6,8];
                } else  if (incTime==8) {
                    var timeArray = [8];
                }

              }
                
            });
      */

            //$.inArray( 8, timeArray )

      }      


      if ($('body').hasClass('control') && data.beat==15 /* && data.bar==8*/) {

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


            var incTime = $('#inc'+key).attr('data-inctime');

            if (incTime==2) {
                var timeArray = [2,4,6,8];
            } else  if (incTime==8) {
                var timeArray = [8];
            } else  if (incTime==1) {
                var timeArray = [1,2,3,4,5,6,7,8];
            } else  if (incTime==4) {
                var timeArray = [4,8];
            }        


            if ( timeArray.indexOf(data.bar) !=-1 ) { // $.inArray( data.bar, timeArray )==0
              //console.log( data.bar, timeArray );
              $('#input'+key).val(newVal); //.blur(); //.trigger(jQuery.Event('keypress', { keycode: 13 }));
              $('#slider'+key).trigger("update"); //trigger("change"); - .on('update');    

              if ( !$('#pattern-editor').hasClass('control') ) {

                // send all controller/preset params at each individual param change
                //var presetClass = $('#presets').find(":selected").attr('class');
                //var KitNumber = $('#kits').find(":selected").val(); 

                var presetId = $('#presets').find(":selected").val();
                
                if (typeof window.channelPresets !== 'undefined') {
                  if (window.channelPresets.length > 0) { // 
                  
                    window['userPreset']._name_ = window.channelPresets[0].name;//$('#preset-name').val();
                    window['userPreset'].id = window.channelPresets[0].id;//uuid.v1();
                    
                    var alphaAscSortedUserPreset = sortObj(window['userPreset'],'asc');
                    var preString = JSON.stringify(alphaAscSortedUserPreset); 
                    var preString = preString.replace('_name_', 'name');  
                  }
                }
              }    

              // _self.emit
              _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: key, x: newVal, y: 0, presetId: presetId, preset: preString});         

            }          
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


      if (data.beat==90 && window.stepSeq==1) { // data.beat==15     


        //* // this section causes sound greeches!!!!!
        var KitNumber = $('#kits').find(":selected").val(); 
        var presetId = $('#presets').find(":selected").val(); 


        if ( typeof window.nextKit !== 'undefined' && $('#kits').length > 0) {
          // beware changing kit means re-rendering instrument object which causes audio griches/slowdowns : try to change this param as less ass possible
          if ( KitNumber != window.nextKit ) {    
            //console.log('puppet master changes kit to: ', window.nextKit);
            $('select#kits option[value="'+window.nextKit+'"]').prop('selected',true).trigger('change');                
          }          
        }  


        if ( typeof window.nextPreset !== 'undefined' && $('#presets').length > 0 ) {
            window.loadedPresets = [];

            // make sure preset wanted by puppet mastah actually exists
            $('#presets option').each(function( index ) {
              window.loadedPresets[index] = $(this).attr('value');
            });


            if ( presetId != window.nextPreset && window.loadedPresets.indexOf(window.nextPreset) != -1 ) {
              //console.log('puppet master changes preset to: ', window.nextPreset, window.loadedPresets.indexOf(window.nextPreset));
              $('select#presets option[value="'+window.nextPreset+'"]').prop('selected',true).trigger('change');  
            }       
          }  


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


          if ( window.inIframe == 0) {

            if (typeof window.patternSequencer[nextPlayedPattern] !== 'undefined') {

              // hardcoded default silence pattern id
              if (window.patternSequencer[nextPlayedPattern].id!= 'silence01') {
                $('#pattern-editor tr td:not(:first)').not('.active').not('.notepitch').addClass('playedbar');
                $('#pattern-editor tr').addClass('play');
                //.css('background', '#222');
                
              } else {
                $('#pattern-editor tr td:not(:first)').not('.active').not('.notepitch').removeClass('playedbar');
                $('#pattern-editor tr').removeClass('play');
                //.css('background', '#000');
              }
            }
          }

          window.playedPatternOrder = nextPlayedPattern;

          if ( typeof window.patternSequencer[nextPlayedPattern] !== 'undefined') {
            $('select#patterns option[value="'+window.patternSequencer[nextPlayedPattern].id+'"]').prop('selected',true).trigger('change'); // 01627d00-3d18-11e6-bd11-650c5a0c542f // window.patternSequencer[0].id
          }            
        }          
      } else if (data.beat==90 && window.stepSeq==0) {
        $('#pattern-editor tr td').removeClass('playedbar');       
      }








        // if (data.beat==14
        if (data.beat==30 && $('body').hasClass('control') /*|| data.beat==15 && $('body').hasClass('control')*/ /*&& window.stepSeq==1*/) { //
          if (typeof window.partSequencer !== 'undefined') {

            switch(window.partSequencer.length) {
              /*case 2:        
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
                break; */       
              default:
                //rotate(window.partSequencer,1);
                //var nextPlayedPattern=0;
            } 


            if ( typeof window.playedPartOrder !== 'undefined') {
            } else {
              window.playedPartOrder = 0;
            }  



            if ( typeof window.partSequencer[window.playedPartOrder] !== 'undefined') {

              if ( window.playedPartOrder == window.partSequencer.length-1 ) {
                //var indexxx = 0;
                window.playedPartOrder = 0;
              } /*else {
                var indexxx = window.playedPartOrder;
              }*/
              

              window.partSequencer[window.playedPartOrder].barelapsed = window.partSequencer[window.playedPartOrder].barelapsed+1;


              if ( window.partSequencer[window.playedPartOrder].barelapsed == window.partSequencer[window.playedPartOrder].barloop 
              // avoid perpetual loop aka drift from system constraint(s)  
              || window.partSequencer[window.playedPartOrder].barelapsed > window.partSequencer[window.playedPartOrder].barloop ) {


                $('#played-parts .option span[value="'+window.partSequencer[window.playedPartOrder].id+'"]').removeClass('selected');

                rotate(window.partSequencer,1);

                // previous part's bar loop counter is reset
                window.partSequencer[window.playedPartOrder].barelapsed = 0;

                $('#played-parts .option span[value="'+window.partSequencer[window.playedPartOrder].id+'"]').addClass('selected');

                var aValue = localStorage.getItem('Loops-par_' + window.partSequencer[window.playedPartOrder].id); 

                if ( typeof aValue == 'undefined' || aValue === null ) {

                  if (typeof window.channelParts !== 'undefined' ) {
                    for (var i = 0; i < window.channelParts.length; i++) {
                      var result = $.grep(window.channelParts, function(e){ return e.id == window.partSequencer[window.playedPartOrder].id; });

                      if (typeof result[0] !== 'undefined') {
                        var aValue = JSON.stringify(result[0]);
                      }
                    }  
                  }   
                }  

                //console.log(window.partSequencer[window.playedPartOrder].name, aValue, window.step);
                _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 986, part: aValue});

              }
            }        
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



    this.updateNote = function(volume, note, trackId, patternId) {
      //console.log('instrumentId', this.instrument.id);

      // do not send note update to sound engine if in pattern edit mode (vs. pattern played mode)  
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

      if ( window.stepSeq==0 && typeof window.ptnEdit == 'undefined' ) {
        window.ptnEdit = 0;         
      }  


      if (window.stepSeq==0 && window.ptnEdit==0) {
        //console.log('windowuserPattern', window['userPattern']);
        window['userPattern'].tracks[traackId][note] = volume;
      }


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


if (typeof window.patternSequencer[window.playedPatternOrder] !== 'undefined') {

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
                //console.log('ptn found', classs);
                break;
           }
        }

        if(!added) ptnStorage.push(window['userPatternEdit']); 

         window.ptnSeq = {};
         window.ptnSeq.list = window.patternSequencer;
         window.ptnSeq.state = window.stepSeq;
         var ptnSeqString = JSON.stringify(window.ptnSeq);
         //console.log('ptnSeqString', ptnSeqString, window.ptnSeq);

        _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 995, x: KitNumber, y: 0, pattern: ptnString, classs: classs, kitNumber: KitNumber, triggerMode: 'NOmanual', patternId: patternId, presetId: presetId, ptnSeq: ptnSeqString}); // window['userPatternEdit'].id
        

        if (typeof patternId !== 'undefined') { // window['userPatternEdit'].id
          //localStorage.setItem('Loops-ptn_'+patternId, ptnString); // window['userPatternEdit'].id
        }
      }
    };



    this.onModifierChange = function(data) {
       //console.log('ptn editor ModifierChange: ', data); 
      _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, data);
    };




    var _selectPattern = function() {
      nextPlayedPattern = window.playedPatternOrder
      $('select#patterns option[value="'+window.patternSequencer[nextPlayedPattern].id+'"]').prop('selected',true).trigger('change');
    };



    var _clockMonitor = function() {
          // trying to approximately sync all channel instrument clocks assuming they receive message around the same time + their respective process time is ~ equivalent
/*
          if (Date.now() > window.clockts + 1900 && Date.now() < window.clockts + 1971 && typeof window.lastts === 'undefined'

            || Date.now() > window.clockts + 1900 && Date.now() < window.clockts + 1971 && window.lastts !== window.clockts) {
            clearInterval(window.localClock);
            window.localClock = window.setInterval(_loClock, 1900);
            console.log('clear local clock at: ', window.clockts, Date.now());
            window.lastts = window.clockts;
          }
*/
          //
    };



    var _loClockConductor = function() {

      if ( typeof window.partSequencer !== 'undefined' ) {

        if ( typeof window.playedPartOrder !== 'undefined') {
        } else {
          window.playedPartOrder = 0;
        }  

        if ( typeof window.partSequencer[window.playedPartOrder] !== 'undefined') {

          if ( window.playedPartOrder == window.partSequencer.length-1 ) {
            window.playedPartOrder = 0;
          } 
          
          window.partSequencer[window.playedPartOrder].barelapsed = window.partSequencer[window.playedPartOrder].barelapsed+1;


          //console.log(window.playedPartOrder, window.partSequencer[window.playedPartOrder].name, ' - nb of bar(s) elapsed:', window.partSequencer[window.playedPartOrder].barelapsed);
   

          if ( window.partSequencer[window.playedPartOrder].barelapsed == window.partSequencer[window.playedPartOrder].barloop 
          // avoid perpetual loop aka drift from system constraint(s)  
          || window.partSequencer[window.playedPartOrder].barelapsed > window.partSequencer[window.playedPartOrder].barloop ) {


            $('#played-parts .option span[value="'+window.partSequencer[window.playedPartOrder].id+'"]').removeClass('selected');

            rotate(window.partSequencer,1);

            // bar count rounds from bar1 to bar8
            if (window.barcount == 64) {
              window.barcount = 0;
            }

            window.barcount++;

            // previous part's bar loop counter is reset
            window.partSequencer[window.playedPartOrder].barelapsed = 0;
            
            $('#played-parts .option span[value="'+window.partSequencer[window.playedPartOrder].id+'"]').addClass('selected');

            var aValue = localStorage.getItem('Loops-par_' + window.partSequencer[window.playedPartOrder].id); 

            //console.log(aValue);

            if ( aValue /*typeof aValue !== null*/ ) {

              var aValueObj = JSON.parse(aValue);
              aValueObj.bar = window.barcount;
              aValueObj.clockts = Date.now();
              var aValue = JSON.stringify(aValueObj);

            }

            if ( typeof aValue === 'undefined' || aValue === null) {
              if (typeof window.channelParts !== 'undefined' ) {
                for (var i = 0; i < window.channelParts.length; i++) {
                  var result = $.grep(window.channelParts, function(e){ return e.id == window.partSequencer[window.playedPartOrder].id; });

                  if ( typeof result[0] !== 'undefined' ) {
                    result[0].bar = window.barcount;
                    result[0].clockts = Date.now();
                    //console.log(result[0]);
                    var aValue = JSON.stringify(result[0]);
                  }
                }  
              }   
            }  

            //console.log(window.partSequencer[window.playedPartOrder].name, aValue, window.step);
            _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 986, part: aValue});

            // resend parts to compensate possible drift between main clock (sound gen) and local clock (conductor control)
            /*window.setTimeout(function () {    
              _connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 986, part: aValue});
            }, 200);   */            

          }
        }            
      }   
    };



    var _loClockChannel = function() {

      //$('th:nth-child(1)').text(window.barcount);


      if ( typeof window.oddeven == 'undefined' ) {
        window.oddeven = 0;

      } else {
        if (window.oddeven == 1) {
          window.oddeven = 0;
        } else {
          window.oddeven = 1;
        }
      }

      //console.log(window.oddeven);

        if (window.stepSeq==1) { 

        //* // this section causes sound greeches!!!!!

        // when puppet master mode off (when no part is being played) unset fol. variables so that user regains control over kit & preset change
        // so that user may save a patternList + specific preset per channel for saving of part
        //if (window.localParts.length>0) {
        if ( typeof window.puppetMaster !== 'undefined' ) {
          if ( typeof window.puppetMasterLocClockSide == 'undefined' ) {   
            if ( window.puppetMaster == 2 ) {
              window.puppetMasterLocClockSide = 1;            
            }          
          } else {
            window.puppetMasterLocClockSide = window.puppetMasterLocClockSide + 1;



            if (window.puppetMasterLocClockSide !== window.puppetMaster - 1) { // window.localParts.length>0

            //} else {
              delete window.nextKit;
              delete window.nextPreset;
              delete window.puppetMasterLocClockSide;
              delete window.puppetMaster;
            }   



          }       
        }

         

        //window.puppetMasterLocClockSide = window.puppetMaster;

        //console.log('local parts: ', window.localParts, window.nextKit, window.nextPreset, window.puppetMaster, window.puppetMasterLocClockSide);


        var KitNumber = $('#kits').find(":selected").val(); 
        var presetId = $('#presets').find(":selected").val(); 


        if ( typeof window.nextKit !== 'undefined' && $('#kits').length > 0) {
          // beware changing kit means re-rendering instrument object which causes audio griches/slowdowns : try to change this param as less ass possible
          if ( KitNumber != window.nextKit ) {    
            //console.log('puppet master changes kit to: ', window.nextKit);
            $('select#kits option[value="'+window.nextKit+'"]').prop('selected',true).trigger('change');                
          }          
        }  


        if ( typeof window.nextPreset !== 'undefined' && $('#presets').length > 0 ) {

          window.loadedPresets = [];

          // make sure preset wanted by puppet mastah actually exists
          $('#presets option').each(function( index ) {
            window.loadedPresets[index] = $(this).attr('value');
          });

          if ( presetId != window.nextPreset && window.loadedPresets.indexOf(window.nextPreset) != -1 ) {
            //console.log('puppet master changes preset to: ', window.nextPreset, window.loadedPresets.indexOf(window.nextPreset));
            $('select#presets option[value="'+window.nextPreset+'"]').prop('selected',true).trigger('change');  
          }       

        }  


        if (typeof window.patternSequencer !== 'undefined') {

          var nextPlayedPattern=0;            

          if ( window.inIframe == 0) {

            if (typeof window.patternSequencer[nextPlayedPattern] !== 'undefined') {
              // hardcoded default silence pattern id
              if (window.patternSequencer[nextPlayedPattern].id!= 'silence01') {
                $('#pattern-editor tr td:not(:first)').not('.active').not('.notepitch').addClass('playedbar');
                $('#pattern-editor tr').addClass('play');
                //.css('background', '#222');
                
              } else {
                $('#pattern-editor tr td:not(:first)').not('.active').not('.notepitch').removeClass('playedbar');
                $('#pattern-editor tr').removeClass('play');
                //.css('background', '#000');
              }
            }
          }


          if ( typeof window.patternSequencer !== 'undefined' ) {

            if ( typeof window.ptnindex == 'undefined' ) {
              window.ptnindex = 0;
            }


            if ( window.oddeven == 0 && window.ptnindex == 0) {
              nextPlayedPattern = 0;
            } else /*if ( window.ptnindex !== 0 )*/ {
              nextPlayedPattern = window.ptnindex+1;
              window.ptnindex++;
            }


            if ( window.ptnindex > window.patternSequencer.length-2 ) { // && window.oddeven == 0
              window.ptnindex = 0;
            } else {

            }

            //console.log('next pattern index, window.ptnindex, ptnSeq length: ', nextPlayedPattern, window.ptnindex, window.patternSequencer.length);

          }

          window.playedPatternOrder = nextPlayedPattern;

          if ( typeof window.patternSequencer[nextPlayedPattern] !== 'undefined') {

            // no repeat mode
            //if ( window.patternSequencer.length > 8 && window.ptnindex < window.patternSequencer.length-1 || window.patternSequencer.length < 8) {
              $('select#patterns option[value="'+window.patternSequencer[nextPlayedPattern].id+'"]').prop('selected',true).trigger('change'); // 01627d00-3d18-11e6-bd11-650c5a0c542f // window.patternSequencer[0].id
            /*} else {
              $('select#patterns option[value="2fb82950-36f3-11e6-aa68-d355ddb21e83"]').prop('selected',true).trigger('change');
            } */
            // resend pattern to compensate possible drift between main clock (sound gen) and local clock (channel instrument)
            //window.setTimeout(_selectPattern, 400); // 400 // use bar/4 aka "quarter note"


            if ( typeof window.patternSequencerOri !== 'undefined' ) {
              for (var i = 0; i < window.patternSequencerOri.length; i++) {

                if ( window.patternSequencerOri[i].id == window.patternSequencer[window.playedPatternOrder].id ) {
                  var ptnIndeks = i;
                }
              }  
            } 
          }              
        }    

      } else if (  window.stepSeq==0 ) {
        $('#pattern-editor tr td').removeClass('playedbar');         
      }

    };



    var _loClock = function() {
      if ( $('body').hasClass('control') ) {
        _loClockConductor();
        // send 0/1 signal odd even barCount signal to slave local clocks
      } else {
        _loClockChannel();
      } 
      //console.log('tick');
    };



    /**
     * Initializes the model
     *
     * @public
     * @function
     * @return {mixr.controllers.Search} This instance of the controller.
     */
    this.initialize = function() {

      // local clock useful for when round trip time is too long
      window.barcount = 0;
      //window.localClock = window.setInterval(_loClock, 1900); // 126+: 1905 126.17: 1902

      _addEventListeners();
      return this;
    };

  };

}());
