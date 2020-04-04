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

    var _self = this;

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


    var _updateNote = function(data) { // funcToRemove_displayPattern
      $track = $('[data-id="' + data.trackId + '"]');
      $note = $track.find('td').eq(data.noteId + 1);

      //console.log('!updateNote', /*$note,*/ data);

      $note.toggleClass('active', data.volume > 0);
    };  



    var _onNote = function(data) {
      //console.log('ptn edit:', data);
      _model.updateNote(data.volume, data.note, data.trackId, data.patternId);
    };


    /**
     * Shows the view
     * @return {mixr.controllers.PatternEditor} This instance of the controller.
     */
    this.show = function() {
      view.show();
      return this;
    };



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

        

        window.channelTayppe = _model.instrument.type;  

        $('#pattern-editor').removeClass();
        $('#pattern-editor').addClass(_model.instrument.type); // remove '#pattern-editor' div in case of conductor role aka control only "instrument"
        $('body').addClass(_model.instrument.type);

        var table = $('#pattern-editor table');  
        var controllers = $('#modifiers');  

        table.empty(); // deplace code to this.removeTracksAndControllers
        controllers.empty();  // controllers

        if ( $('#pattern-editor').hasClass('control') ) {
          console.log('hasClass control');
          $('#pattern-editor').css('height', 0);
        }  





        var tracks = _model.instrument.tracks;

        //console.log('tracks: ', tracks);
        var container = document.getElementById('modifiers');    
        var controls = _model.instrument.controls;
        window.llccontrols = controls; // lastly loaded channel controls
        var input = 1;
        var channelId = _model.instrument.id;
        window.channelId = channelId;
        var kits = _model.instrument.channelInfo.channelKits;   // channelKits    
        var inputMode = _model.instrument.channelInfo.inputMode;


        if ( inputMode=='grid' && $('body').hasClass('keyboard') ) {
          $('body').removeClass('keyboard').addClass('grid');
        } else if ( inputMode=='keyboard' && $('body').hasClass('grid') ) {
          $('body').removeClass('grid');
        } 


        if (typeof inputMode  !== 'undefined' && inputMode=='keyboard') {
          var tracks = tracks.reverse();
        }  

        for (var i = 0; i < tracks.length; i++) {
          if (typeof inputMode  !== 'undefined' && inputMode=='keyboard') {
            view.addKey(tracks[i], _model.instrument.color);
          } else {
            view.addTrack(tracks[i], _model.instrument.color);
          }                      
        }

        //console.log('inputMode', inputMode);




        if (typeof inputMode  !== 'undefined' && inputMode=='keyboard') {

          window.addEventListener('keydown', keyDown, false);
          window.addEventListener('keyup', keyUp, false);

          touchClick("#keybox", 'touchend mouseup', function(e) {
            if (typeof e.targetTouches  !== 'undefined') {
              //console.log('touchstart');
              touchend(e);
            } else {
              console.log('mouse up');
              pointerUp(e);
            }        
          })

          touchClick("#keybox", 'touchstart mousedown', function(e) {
            if (typeof e.targetTouches  !== 'undefined') {
              //console.log('touchstart');
              touchstart(e);
            } else {
              console.log('mouse down');
              pointerDown(e);
            }        
          })  

        }


        // draw controllers

        //console.log('kits: ', kits);
        if (typeof kits  !== 'undefined') {
          if (kits.length!=0) {    
            window.kits = kits;  
          }  
        }        








        var patterns = _model.instrument.channelInfo.patterns;
        window.sessionPatterns = patterns;

        if (typeof window.localPatterns !== 'undefined') {

          for (var i = 0; i < patterns.length; i++) {

            var result = $.grep(window.localPatterns, function(e){ return e.id == patterns[i].id; });

            if (typeof result[0] !== 'undefined') {
              //var pattern = patterns[i];
              patterns[i]['classs'] = 'user'; // really-user
              //console.log('ptn name: ', patterns[i]['classs'].name);
            }
          }  
        }



        if (patterns.length==0 && typeof window.localPatterns !== 'undefined') {
          if (typeof window.channelPatterns !== 'undefined') {
            var patterns = window.channelPatterns.concat(window.localPatterns);
          } else {
            var patterns = window.localPatterns;
          }
          
        } else if (patterns.length!=0) {

          if (typeof window.channelPatterns !== 'undefined') {
            var patterns = window.channelPatterns.concat(patterns);
          }
        }


        var patterns = patterns.filter((set => p => !set.has(p.id) && set.add(p.id))(new Set));
        //console.log('ptns obj: ', patterns);











        var parts = _model.instrument.channelInfo.parts;
        window.sessionParts = parts;

        if (typeof window.localParts !== 'undefined' && typeof parts !== 'undefined') {

          for (var i = 0; i < parts.length; i++) {

            var result = $.grep(window.localParts, function(e){ return e.id == parts[i].id; });

            if (typeof result[0] !== 'undefined') {
              parts[i]['classs'] = 'user'; // really-user
            }
            //
          }  
        }

        if ( typeof parts !== 'undefined') {  
          if (parts.length==0 && typeof window.localParts !== 'undefined') {
            if (typeof window.channelParts !== 'undefined') {
              var parts = window.channelParts.concat(window.localParts);
            } else {
              var parts = window.localParts;
            }
            
          } else if (parts.length!=0) {

            if (typeof window.channelParts !== 'undefined') {
              var parts = window.channelParts.concat(parts);
            }

          }
          var parts = parts.filter((set => p => !set.has(p.id) && set.add(p.id))(new Set));
        }  

        // temporary line
        //var parts = window.localParts;






        var songs = _model.instrument.channelInfo.songs;
        window.sessionSongs = songs;

        if (typeof window.localSongs !== 'undefined' && typeof songs !== 'undefined') {

          for (var i = 0; i < songs.length; i++) {

            var result = $.grep(window.localSongs, function(e){ return e.id == songs[i].id; });

            if (typeof result[0] !== 'undefined') {
              songs[i]['classs'] = 'user'; // really-user
            }
            //
          }  
        } 


        if ( typeof songs !== 'undefined') {  
          if (songs.length==0 && typeof window.localSongs !== 'undefined') {
            if (typeof window.channelSongs !== 'undefined') {
              var songs = window.channelSongs.concat(window.localSongs);
            } else {
              var songs = window.localSongs;
            }
            
          } else if (songs.length!=0) {

            if (typeof window.channelSongs !== 'undefined') {
              var songs = window.channelSongs.concat(songs);
            }

          }

          var songs = songs.filter((set => p => !set.has(p.id) && set.add(p.id))(new Set));

        }  

        // temporary line
        //var songs = window.localSongs;
        //var songs = window.channelSongs;

        if (typeof window.channelSongs !== 'undefined') {
          var songs = window.channelSongs.concat(window.localSongs);
        } else {
          var songs = window.localSongs;
        }      
        //console.log('556: ', songs);







        if (typeof _model.instrument.channelInfo.presets !== 'undefined') {

          var presets = _model.instrument.channelInfo.presets;
          window.sessionPresets = presets;

          if (typeof window.localPresets !== 'undefined') {
            for (var i = 0; i < presets.length; i++) {
              var result = $.grep(window.localPresets, function(e){ return e.id == presets[i].id; });
              if (typeof result[0] !== 'undefined') {
                presets[i]['classs'] = 'user'; // really-user
              }
            }  
          }

          if (presets.length==0 && typeof window.localPresets !== 'undefined') {
            if (typeof window.channelPresets !== 'undefined') {
              var presets = window.channelPresets.concat(window.localPresets);
            } else {
              var presets = window.localPresets;
            }
            
          } else if (presets.length!=0) {
            if (typeof window.channelPresets !== 'undefined') {
              var presets = presets.concat(window.channelPresets); //window.channelPresets.concat(presets);
            }
          }


          //window.findObjectById(presets, 699);

          // remove duplicate objects by id - for same preset USER preset will ecrabouillate CHANNEL preset      
          presets = presets.filter((set => f => !set.has(f.id) && set.add(f.id))(new Set));

            //console.log('presets', presets, window.localPresets);

          window.allPresets = presets;  
        }




        if (_model.instrument.controls!=0) {  


          //console.log('_model.instrument.type', _model.instrument.type);


          if (typeof presets !== 'undefined' // channelPresets _model.instrument.channelInfo.presets
            //&& _model.instrument.channelInfo.presets.length>0
            && typeof _model.instrument.channelInfo.presetId !== 'undefined'
            && _model.instrument.type!='samples' // temporarily exclude sampler channels from preset check
            && _model.instrument.channelInfo.presetId != 0) {

            var taarget = _model.instrument.channelInfo.presetId;
            var taarget = taarget.toString();

            //var preset = $.grep(this.channelInfo.channelPresets, function(e){ return e.id == this.channelInfo.presetId; });

            var preset = presets.filter(function( obj ) { // _model.instrument.channelInfo.presets
              return obj.id == taarget // "2fbdd99d0000";  //
            });


            if ( typeof preset[0] !== 'undefined' ) {
              window.preset = preset[0].controls;
            }
              //console.log('preset yo-yo: ', preset, window.preset, _model.instrument.channelInfo.presets);  
            var presetMode = 1; // presetMode=0 : kit/InsMode
          } else {
            var presetMode = 0; // presetMode=0 : kit/InsMode
          }










var usedLibrary = 'noUiSlider'; 
//var usedLibrary = 'Interface';

if (usedLibrary=='Interface') {

window.interfacePanel = [];
window.sliderArray = [];
window.sliderLabelArray = [];

}



// if mobile

function is_touch_device() {
  return 'ontouchstart' in window        // works on most browsers 
      || 'onmsgesturechange' in window;  // works on IE10 with some false positives
};
// 




// define array to group all channel volumes into
window['channelVol'] = [];

window.changeParamMode = 'auto'; // synth sliders etc are automatically changed vs. user events: manual

          for (var j = 0; j < controls.length; j++) {

            var input = input + j;

            if (typeof input !== 'undefined') { // window[input]

              if (controls[j].type=='input') {

                window['ctrl'+input] = new mixr.ui.Input(controls[j].id, controls[j].x.name, container, controls[j].x.value, controls[j], channelId).initialize();
                //console.log('input :', window['ctrl'+input], input, j);
                window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
                //console.log('input value: ', controls[j].x.value);

              //*
            } else if (controls[j].type=='contact') {

                //console.log('contact');

                window['ctrl'+input] = new mixr.ui.Contact(controls[j].id, controls[j].x.name, container, controls[j].x.value, controls[j], channelId, usedLibrary).initialize();              
                window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);



              } else if (controls[j].type=='ddmenu') {




if (controls[j].id==998) {



if (typeof window.kits  !== 'undefined') { // kits

  var kits = window.kits;

  var kit = Object.keys(kits); 
  //console.log('kits + kit: ', kits, kit.length); 

  if (kit.length!=0) {    

    $itemKits = $('<div class="ctrlchange" id="thekits"><select id="kits" name="kits">'); // $itemContainer            
    $itemKits.appendTo(container);
    var containerKits = document.getElementById('kits');



    for (var i = 0; i < kits.length; i++) {
      var kit = kits[i];
      var input = 998 + i;// 400 + i; // 3 +  // better use controller id ex 998 as window prefix - 998
      //console.log('input from kits: ', input);

      if (typeof input !== 'undefined') { 
        //console.log('ddmenu params: ', kits[i], kit, channelId);
        window['ctrl'+input] = new mixr.ui.Ddmenu(985, kits[i], containerKits, i, kits, channelId, input).initialize(); // 998: updateInstrument() | 992: old param
        window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
      } 
    } 

    //console.log('kit0: ', kits[0]);

    $label = $('<label>'+ controls[j].name +'</label>');
    $label.appendTo($itemKits);


    $itemKits = $('</select></div>'); // $itemContainer            
    $itemKits.appendTo(container);

  }
}




} else if (controls[j].id==988) {


//*



    if (typeof patterns !== 'undefined') {
      
      var ptn = Object.keys(patterns); 

      if (ptn.length!=0) {    

        $item = $('<div class="ctrlchange cont-pttns" id="patternedit"><select class="pttns" id="selpatternedit" name="selpatternedit">'); //  <div class="ctrlchange" id="thepatterns"><select id="patterns" name="patterns">
        $item.appendTo(container);

        var containerPatterns = document.getElementById('selpatternedit');  // this line has to be changed to  <select class="pttns" id="selpatternedit"'s id            

        for (var i = 0; i < patterns.length; i++) {
          var pattern = patterns[i];
          var input = 2478 + i;

          //console.log('pattern: ', pattern);

          if (typeof input !== 'undefined') { // window[input]
            // mixr.ui.Ddmenu = function(id, name, container, value, controlObject, channelId)
            window['ctrl'+input] = new mixr.ui.Ddmenu(988, pattern.name, containerPatterns, pattern.id, pattern, channelId, input).initialize();  // 
            window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
          } 
        }

        $label = $('<label>'+ controls[j].name +'</label>');
        $label.appendTo($item);

        $item = $('</select></div>'); //
        $item.appendTo(container);
      }    
    } 

    var ctrlchangeParent = document.getElementById('patternedit');





    if (typeof _model.instrument.channelInfo.patternEditState !== 'undefined') { // 
      var patternEditStateValue = _model.instrument.channelInfo.patternEditState; //
    } else {
      var patternEditStateValue = controls[j].y.value;
    }      

    //console.log('ptnEditState: ', patternEditStateValue); // _model.instrument.channelInfo.patternEditState

    if (patternEditStateValue==1) {
      window.ptnEdit=1;
      var patternEditOnOffState = 'On';
      $('#pattern-editor table').toggleClass('ptn-edit');
    } else {
      window.ptnEdit=0;
      var patternEditOnOffState = 'Off';
      //_displayPattern('patterns');
      $('#pattern-editor table').toggleClass('ptn-edit');
    }


      $item = $('<a href="javascript:void(null);" id="ptn-edit-trig" class="trigger-button">'+patternEditOnOffState+'</a>'); //</div>
      $item.appendTo(ctrlchangeParent);


    if (patternEditStateValue==0) {
      $('#patternedit').css('opacity', 0.3);
      $('#ptn-edit-trig').addClass('off');
    }      



  $('#ptn-edit-trig').on('click', function (e) {
      e.preventDefault();
      $(this).text(function (_, text) {
          return text === 'Off' ? 'On' : 'Off';
      }).toggleClass('off');

    if ( $(this).hasClass("off") ) {    
      window.ptnEdit = 0;
      _model.onModifierChange({id: 203, ptnEditState: 0});
      $('#patternedit').css('opacity', 0.3);

      // rétablire 'Play pattern' drawing/graph
      //var selectId = 'patterns';
//_displayPattern('patterns'); 
      window.displayPattern('patterns');  
      $('#pattern-editor table').toggleClass('ptn-edit'); // pattern-edit vs. pattern play 

    } else {
      window.ptnEdit = 1;
      _model.onModifierChange({id: 203, ptnEditState: 1});
      $('#patternedit').css('opacity', 1);
//_displayPattern('selpatternedit');
      window.displayPattern('selpatternedit');
      $('#pattern-editor table').toggleClass('ptn-edit');
    }

  });  





//*/











} else if (controls[j].id==994) {

//*
    if (typeof patterns !== 'undefined') {
      var ptn = Object.keys(patterns); 

        if (ptn.length!=0) {    

                $item = $('<div class="ctrlchange cont-pttns" id="thepatterns"><select class="pttns" id="patterns" name="patterns">'); // $itemContainer            
                $item.appendTo(container);

          var containerPatterns = document.getElementById('patterns');                

          for (var i = 0; i < patterns.length; i++) {
            var pattern = patterns[i];
            var input = 2 + i;

            //console.log('pattern: ', pattern);

            if (typeof input !== 'undefined') { // window[input]
              // mixr.ui.Ddmenu = function(id, name, container, value, controlObject, channelId)
              window['ctrl'+input] = new mixr.ui.Ddmenu(994, pattern.name, containerPatterns, pattern.id, pattern, channelId, input).initialize();  // i  998 (update ins) 994 (update notes)           
              window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);

          } 
        }


          $label = $('<label>'+ controls[j].name +'</label>');
          $label.appendTo($item);


          $item = $('</select></div>'); // $itemContainer            
          $item.appendTo(container);

      }
    } 
//*/



} else if (controls[j].id==992) {

  if (typeof presets !== 'undefined') {
    var ptn = Object.keys(presets); 

    if (ptn.length!=0) {    

      $item = $('<div class="ctrlchange" id="thepresets"><select id="presets" name="presets">'); // $itemContainer            
      $item.appendTo(container);

      var containerPresets = document.getElementById('presets');                

      for (var i = 0; i < presets.length; i++) {
        var preset = presets[i];
        var input = 24 + i;

        if (typeof input !== 'undefined') { 
          window['ctrl'+input] = new mixr.ui.Ddmenu(992, preset.name, containerPresets, preset.id, preset, channelId, input).initialize();  // i  998 (update ins) 994 (update notes) 992 (update preset)             
          window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
        } 
      }

      $label = $('<label>'+ controls[j].name +'</label>');
      $label.appendTo($item);

      $item = $('</select></div>'); 
      $item.appendTo(container);

      // remove [undefined preset] option
      if ($('#presets option[value="undefined"]').length>0 ) {
        $('#presets option[value="undefined"]').remove();
      }  
      
    }
  } 




} else if (controls[j].id==996) {

  var sessions = _model.instrument.channelInfo.sessionList;

  if (typeof sessions !== 'undefined') {
    var sess = Object.keys(sessions); 

    if (sess.length!=0) {    

      $item = $('<div class="ctrlchange" id="thesessions"><select id="sessions" name="sessions">'); // $itemContainer            
      $item.appendTo(container);

      var containersessions = document.getElementById('sessions');                

      for (var i = 0; i < sessions.length; i++) {
        var session = sessions[i];
        var input = 289 + i;

        //console.log('session: ', session);

        if (typeof input !== 'undefined') { // window[input]
          // mixr.ui.Ddmenu = function(id, name, container, value, controlObject, channelId, elementId, selectedOption)
          window['ctrl'+input] = new mixr.ui.Ddmenu(996, session, containersessions, sess[i], session, channelId, input, controls[j].x.value-1).initialize();  // i  998 (update ins) 994 (update notes)           
          window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
        } 
      }

      $label = $('<label>'+ controls[j].name +'</label>');
      $label.appendTo($item);
      $item = $('</select></div>'); 
      $item.appendTo(container);

    }
  } 

} else {

  //console.log('pot ctrl xxx processed');


    if (typeof controls[j].x.option !== 'undefined') {
      var optionsObj = controls[j].x.option; //Object.keys(controls[j].x.option); 
      var options = Object.keys(controls[j].x.option); 
      //console.log('option: ',options, optionsObj);

      if (options.length!=0) {    

        $item = $('<div id="id'+controls[j].id+'" class="ctrlchange ddmenu id'+controls[j].id+'"><select id="selectid'+controls[j].id+'" name="options">'); // $itemContainer    saylekt        
        $item.appendTo(container);

        var containerOptions = document.getElementById('selectid'+controls[j].id);                

        for (var i = 0; i < options.length; i++) {
          var option = options[i];
          var input = 200 + i;

          //console.log('option: ', option, options, optionsObj);


         if (presetMode == 1) {
            var value = window.preset[controls[j].id];
          } else {
            var value = controls[j].x.value;
          } 



          if (typeof input !== 'undefined') { // id, name, container, value, controlObject, channelId, elementId
            window['ctrl'+input] = new mixr.ui.Ddmenu(controls[j].id, optionsObj[i], containerOptions, option, option, channelId, input, value).initialize();  // controls[j].x.value
            window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
          } 
        }

        $label = $('<label>'+ controls[j].name +'</label>');
        $label.appendTo($item);

        $item = $('</select></div>'); 
        $item.appendTo(container);
      }
    } 

}


                //*/
              } else if (controls[j].type=='slider') {

                if (controls[j].direction !== 'undefined') {
                  if (controls[j].direction=='horizontal') {
                    var orientation = 'horizontal';
                  } else {
                    var orientation = 'vertical';
                  }
                } else {
                  var orientation = 'vertical';
                }


                if (controls[j].x.mute !== 'undefined') {
                  if (controls[j].x.mute==1) {
                    var mute = controls[j].x.muteKey; //1;
                  } else {
                    var mute = 0;
                  }
                } else {
                  var mute = 0;
                }


                if (controls[j].x.muteNote !== 'undefined') {
                  if (controls[j].x.mute==1) {
                    var muteNote = controls[j].x.muteNote; //1;
                  } else {
                    var muteNote = 0;
                  }
                } else {
                  var muteNote = 0;
                }                



                if (controls[j].x.solo !== 'undefined') {
                  if (controls[j].x.solo==1) {
                    var solo = controls[j].x.soloKey; //1;
                  } else {
                    var solo = 0;
                  }
                } else {
                  var solo = 0;
                }


                //console.log('mute', mute);

                var displayedRange = [];
                displayedRange['min'] = 0;
                displayedRange['max'] = 100;
                
                if (typeof controls[j].x.displayedRangeMin !== 'undefined' && typeof controls[j].x.displayedRangeMax !== 'undefined') {
                  //if (controls[j].x.displayedRangeMin !== 0 && controls[j].x.displayedRangeMax !== 100) {
                    displayedRange['min'] = controls[j].x.displayedRangeMin;
                    displayedRange['max'] = controls[j].x.displayedRangeMax;
                  //}
                } /*else {
                  displayedRange['min'] = 0;
                  displayedRange['max'] = 100;
                }*/
                
                //console.log('displayedRange', displayedRange, controls[j].x.displayedRangeMin);

                if (presetMode == 1) {
                    var value = window.preset[controls[j].id];
                  } else {
                    var value = controls[j].x.value;
                  }


                  //console.log('value: ', value);

                  if (typeof value == 'undefined') { // typeof window.preset[controls[j]]
                    var value = 0;
                  }
                  //console.log(value/*, window.preset*/);

                // if HTML5 canvas blend mode property 'multiply' browser not supported : load simple inputs instead of sliders
                if( gcoCheck==false /*/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)*/ ) {
                  //window['ctrl'+input] = new mixr.ui.Input(controls[j].id, controls[j].x.name, container, controls[j].x.value, controls[j], channelId).initialize();
                  window['ctrl'+input] = new mixr.ui.Slider(controls[j].id, controls[j].x.name, container, value, controls[j], channelId, usedLibrary, orientation, mute, controls[j].x.midicc, muteNote, displayedRange, solo).initialize(); // NexusUI

                } else { 
                  window['ctrl'+input] = new mixr.ui.Slider(controls[j].id, controls[j].x.name, container, value, controls[j], channelId, usedLibrary, orientation, mute, controls[j].x.midicc, muteNote, displayedRange, solo).initialize(); // NexusUI
                }
                
                window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
                //alert("slider");



              } else if (controls[j].type=='hidden') {

              } else if (controls[j].type=='multiselect') {

if (controls[j].id==9920) {



  if (typeof patterns !== 'undefined') {
    var ptn = Object.keys(patterns); 

    if (ptn.length!=0) {    

      $item = $('<div class="ctrlchange" id="pattern-sequencer"><div id="avail-ptns" class="select-container"><select multiple class="multi" id="avail-patterns" name="avail-patterns">'); // $itemContainer            
      $item.appendTo(container);

      var containerpatterns = document.getElementById('avail-patterns');                
      var availptns = document.getElementById('avail-ptns');

      for (var i = 0; i < patterns.length; i++) {
        var pattern = patterns[i];
        var input = 2890 + i;

        if (typeof input !== 'undefined') { // window[input]
          $option = $('<option id="option'+input+'" value="'+pattern.id+'">'+pattern.name+'</option>'); // $itemContainer - _id            
          $option.appendTo(containerpatterns);
        }
      } // end of for loop



      $label = $('<label>available patterns</label><a href="javascript:void(null);" id="add" class="trigger-button">Add ></a>');
      $label.appendTo(availptns); //   $item
      $item = $('</select></div>'); //</div>
      $item.appendTo(container);
  }       


//*
    var channelPatternSeq = _model.instrument.channelInfo.channelPatternSeqList; //['list']; 
    var ctrlchangeParent = document.getElementById('pattern-sequencer');
    //console.log("channelPatternSeq: ", channelPatternSeq);

    $item = $('<div id="played-ptns" class="select-container played"><select multiple class="multi" id="played-patterns" name="played-patterns">'); // $itemContainer - <div class="ctrlchange" id="played-sequencer">           
    $item.appendTo(ctrlchangeParent); // container   

    var playedptns = document.getElementById('played-ptns');

    if (typeof channelPatternSeq !== 'undefined') {

      window.patternSequencer = channelPatternSeq;

      if (channelPatternSeq.length!=0) {      
        //console.log('channelPatternSeq from ctrl ptn editor js: ', channelPatternSeq);

      var containerpatterns = document.getElementById('played-patterns');                

      for (var i = 0; i < channelPatternSeq.length; i++) {
        var pattern = channelPatternSeq[i];
        var input = 2890 + i;

        if (typeof input !== 'undefined') { // window[input]
          $option = $('<option selected id="option'+input+'" value="'+pattern.id+'">'+pattern.name+'</option>'); // $itemContainer - _id   
          //$option.prop('selected',true);         
          $option.appendTo(containerpatterns);
        }
      } // end of for loop



    }
   } 




    if (typeof _model.instrument.channelInfo.patternSeqState !== 'undefined') {
      var patternSeqStateValue = _model.instrument.channelInfo.patternSeqState;
    } else {
      var patternSeqStateValue = controls[j].x.value;
    }      



var url2 = mixr.Utils.parseURL(location.href);
paraam2 = url2.url.split('/');


//
if ( typeof paraam2[6] !== 'undefined' ) {
  if ( paraam2[6] === 'noptnseq' || paraam2[6] === 'npsmulti' || paraam2[6] === 'npsmultiedt' ) {
    patternSeqStateValue=0;
  }  
}  
// */

/* // online version comment above
if ( typeof paraam2[7] !== 'undefined' ) {
  if ( paraam2[7] === 'noptnseq' || paraam2[7] === 'npsmulti' || paraam2[7] === 'npsmultiedt' ) {
    patternSeqStateValue=0;
  }  
}  
//*/

    //console.log('ptnSEq state: ', patternSeqStateValue, controls[j]); // _model.instrument.channelInfo.patternSeqState

if ( top !== self ) { // we are in the iframe
  window.inIframe = 1;
  $('body').addClass('iframe');
} else { // not an iframe
  window.inIframe = 0;
}    



    if (patternSeqStateValue==1) {
      window.stepSeq=1;
      _model.onModifierChange({id: 201, ptnSeqState: 1});
      var onOffstate = 'On';

      if ( window.inIframe == 1 ) {
        //$('#pattern-editor').hide();
        $('body').addClass('ptnseqon').removeClass('ptnseqoff');
      }      

    } else {
      window.stepSeq=0;
      _model.onModifierChange({id: 201, ptnSeqState: 0});
      var onOffstate = 'Off';

      if ( window.inIframe == 1 ) {
        //$('#pattern-editor').show();
        $('body').addClass('ptnseqoff').removeClass('ptnseqon');
      }      

    }

      $label = $('<label>played patterns</label><a href="javascript:void(null);" id="remove" class="trigger-button">< Remove</a>');
      $label.appendTo(playedptns); // $item playedptns
      $item = $('</select></div><label>pattern sequencer</label><a href="javascript:void(null);" id="ptnseq" class="trigger-button">'+onOffstate+'</a>'); //</div>
      $item.appendTo(ctrlchangeParent);


    if (patternSeqStateValue==0) {
      $('#pattern-sequencer').css('opacity', 0.3);
      $('#ptnseq').addClass('off');
    }      



  $('#ptnseq').on('click', function (e) {
      e.preventDefault();
      $(this).text(function (_, text) {
          return text === 'Off' ? 'On' : 'Off';
      }).toggleClass('off');

    if ( $(this).hasClass("off") ) {    
      window.stepSeq = 0;
      _model.onModifierChange({id: 201, ptnSeqState: 0});


      if ( window.inIframe == 1 ) {
        //$('#pattern-editor').show();
        $('body').addClass('ptnseqoff').removeClass('ptnseqon');
      }   


      $('#pattern-sequencer').css('opacity', 0.3);
    } else {
      window.stepSeq = 1;
      _model.onModifierChange({id: 201, ptnSeqState: 1});

      if ( window.inIframe == 1 ) {
        //$('#pattern-editor').hide();
        $('body').addClass('ptnseqon').removeClass('ptnseqoff');
      }   


      $('#pattern-sequencer').css('opacity', 1);
    }

  });  






/*

      }

    }  
*/



//*/






   $('#add').click(function(e) {  

    e.preventDefault(); // prevent browser from scrolling to the top of the screen and adding hash to url - https://stackoverflow.com/questions/20215248/prevent-href-link-from-changing-the-url-hash https://stackoverflow.com/questions/20571757/using-javascript-prevent-scroll-on-empty-url-hash-change

    window.patternSequencer = [];

    /*return !*/$('#avail-patterns option:selected').clone().appendTo('#played-patterns'); // .remove() - .appendTo('#avail-patterns')

    $('#played-patterns option').each(function( index ) {
      var optionObject = {};
      optionObject.name = $(this).text();
      optionObject.id = $(this).attr('value');

      window.patternSequencer[index] = optionObject;
    });


    var ptnSeqString = JSON.stringify(window.patternSequencer);

    //_connection.execute(mixr.enums.Events.MODIFIER_CHANGE, {id: 204, currentPtnSeq: window.patternSequencer});
    _model.onModifierChange({id: 204, currentPtnSeq: ptnSeqString});

    //console.log('ptn seq: ',window.patternSequencer);

     //$('html, body').scrollTop($("#pattern-sequencer").offset().top);
     /*$('html, body').animate({
      scrollTop: $("#pattern-sequencer").offset().top
     }, 1); */
    
     
   });  




   $('#remove').click(function(e) {  

    e.preventDefault(); // prevent browser from scrolling to the top of the screen and asshing hash to url - https://stackoverflow.com/questions/20215248/prevent-href-link-from-changing-the-url-hash https://stackoverflow.com/questions/20571757/using-javascript-prevent-scroll-on-empty-url-hash-change

    /*return !*/$('#played-patterns option:selected').remove(); // .appendTo('#avail-patterns')

window.patternSequencer = [];

$('#played-patterns option').each(function( index ) {
  var optionObject = {};
  optionObject.name = $(this).text();
  optionObject.id = $(this).attr('value');

  window.patternSequencer[index] = optionObject;
});

var ptnSeqString = JSON.stringify(window.patternSequencer);
_model.onModifierChange({id: 204, currentPtnSeq: ptnSeqString});

   //$('html, body').scrollTop($("#pattern-sequencer").offset().top);
       $('html, body').animate({
        scrollTop: $("#pattern-sequencer").offset().top
    }, 1); 

      
   });  


  } // end of if (typeof patterns !== 'undefined') {



// part seq
} else if (controls[j].id==9953) {

  if (typeof parts !== 'undefined') {

    var par = Object.keys(parts); 

    //console.log(parts);

    if (par.length!=0) {    

      $item = $('<div class="ctrlchange" id="part-sequencer"><div id="avail-pars" class="select-container"><select multiple class="multi" id="avail-parts" name="avail-parts">'); //
      $item.appendTo(container);

      var containerparts = document.getElementById('avail-parts');                
      var availpars = document.getElementById('avail-pars');

      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        var input = 3890 + i;

        if (typeof input !== 'undefined') { // 
          $option = $('<option id="option'+input+'" value="'+part.id+'">'+part.name+'</option>'); // 
          $option.appendTo(containerparts);
        }

      } // end of for loop

      $label = $('<label>available parts</label><a href="javascript:void(null);" id="add" class="trigger-button">Add ></a>');
      $label.appendTo(availpars); //   
      $item = $('</select></div>'); //
      $item.appendTo(container);
    
    }       


var channelPartSeq = _model.instrument.channelInfo.channelParts; // channelPartSeqList; //
    var ctrlchangeParent = document.getElementById('part-sequencer');

    $item = $('<div id="played-pars" class="select-container played"><div id="played-parts">');
    
    $item.appendTo(ctrlchangeParent); // 

    var playedpars = document.getElementById('played-pars');

    if (typeof channelPartSeq !== 'undefined' && typeof nonExistingVariableToDisableProcessingOfThisCodeBlock !== 'undefined') {

      window.partSequencer = channelPartSeq;

      if (channelPartSeq.length!=0) {      

        var containerparts = document.getElementById('played-parts');                

        for (var i = 0; i < channelPartSeq.length; i++) {
          var part = channelPartSeq[i];
          //var input = 3890 + i;
          var uuadi = uuid.v1();

          if (typeof input !== 'undefined') { // 
            $option = $('<div class="option" id="op_'+uuadi+'"><span value="'+part.id+'">'+part.name+'</span><input class="barloopnb" type="text" id="bl_'+uuadi+'" value="1"/><div class="roundedTwo"><input type="checkbox" value="None" class="roonded parsel" id="ps_'+uuadi+'" name="partsel" /><label for="ps_'+uuadi+'"></label></div></div>');
            $option.appendTo(containerparts);
          }        
        } // end of for loop


      } // end of if (channelPartSeq.length!=0) {
    } // end of if (typeof channelPartSeq !== 'undefined') { 

$label = $('<label>played parts</label><a href="javascript:void(null);" id="remove" class="trigger-button">< Remove</a>');
$label.appendTo(playedpars); // $item playedpars





  $('#add').click(function(e) {  

    e.preventDefault(); // prevent browser from scrolling to the top of the screen and asshing hash to url - https://stackoverflow.com/questions/20215248/prevent-href-link-from-changing-the-url-hash https://stackoverflow.com/questions/20571757/using-javascript-prevent-scroll-on-empty-url-hash-change

    window.partSequencer = [];

    $('#avail-parts option:selected').each(function( index ) {

      var part = {};
      part.name = $(this).text();
      part.id = $(this).attr('value');
      var uuadi = uuid.v1();

            $option2 = $('<div class="option" id="op_'+uuadi+'"><span value="'+part.id+'">'+part.name+'</span><input class="barloopnb" type="text" id="bl_'+uuadi+'" value="1"/><div class="roundedTwo"><input type="checkbox" value="None" class="roonded parsel" id="ps_'+uuadi+'" name="partsel" /><label for="ps_'+uuadi+'"></label></div></div>');
            $option2.appendTo('#played-parts');
    });
    

    $('#played-parts .option span').each(function( index ) {
      var optionObject = {};
      optionObject.name = $(this).text();
      optionObject.id = $(this).attr('value');
      var blId = $(this).parent().attr('id').slice(3);
      //console.log(blId);
      optionObject.barloop = $('#bl_'+ blId).val(); // $('#bl_'+ optionObject.id).val(); // $('#bl_'+ optionObject.id).attr('value'); // 2; // 
      optionObject.barelapsed = 0;
      optionObject.uid = blId;

      window.partSequencer[index] = optionObject;
    });

    $('html, body').animate({
      scrollTop: $("#part-sequencer").offset().top
    }, 1); 





$(".barloopnb").on("change paste keyup", function() {

  var adi1 = $(this).parent().attr('id').slice(3); 
  var adi = $('#op_'+adi1+' span').attr('value');

  var barlpbn = $(this).val();

  $.each(window.partSequencer, function() {
    //console.log(this, window.partSequencer); 
    if (this.id === adi && this.uid === adi1) {
      this.barloop = barlpbn;
    }
  });

}); 







         
  });  









  $('#remove').click(function(e) {  

    e.preventDefault(); // prevent browser from scrolling to the top of the screen and adding hash to url - https://stackoverflow.com/questions/20215248/prevent-href-link-from-changing-the-url-hash https://stackoverflow.com/questions/20571757/using-javascript-prevent-scroll-on-empty-url-hash-change

    $('#played-parts .option .roonded').each(function( index ) {

      var adddi = $(this).attr('id').slice(3);
    
      if ( $(this).is(":checked") ) {
        //console.log(adddi);
        $('#played-parts #op_'+adddi).remove();
      }    
    });



    window.partSequencer = [];



    $('#played-parts .option span').each(function( index ) {
      var optionObject = {};
      optionObject.name = $(this).text();
      optionObject.id = $(this).attr('value');

      var blId = $(this).parent().attr('id').slice(3);
      optionObject.barloop = $('#bl_'+ blId).val();      

      optionObject.barelapsed = 0;
      optionObject.uid = blId;

      window.partSequencer[index] = optionObject;
    });





    $('html, body').animate({
      scrollTop: $("#part-sequencer").offset().top
    }, 1); 



$(".barloopnb").on("change paste keyup", function() {

  var adi1 = $(this).parent().attr('id').slice(3); 
  var adi = $('#op_'+adi1+' span').attr('value');

  var barlpbn = $(this).val();

  $.each(window.partSequencer, function() {
    //console.log(this, window.partSequencer); 
    if (this.id === adi && this.uid === adi1) {
      this.barloop = barlpbn;
    }
  });

}); 




      
  });  


  } // end of if (typeof patterns !== 'undefined') {



} else if (controls[j].id==9952) {

  if (typeof songs !== 'undefined') {

    var son = Object.keys(songs); 

    if (son.length!=0) {    

      $item = $('<div class="ctrlchange" id="song-sequencer"><div id="avail-sons" class="select-container"><select multiple class="multi" id="avail-songs" name="avail-songs">'); //
      $item.appendTo(container);

      var containersongs = document.getElementById('avail-songs');                
      var availpars = document.getElementById('avail-sons');

      for (var i = 0; i < songs.length; i++) {
        var song = songs[i];
        var input = 4890 + i;

        if (typeof input !== 'undefined') { // 
          $option = $('<option id="option'+input+'" value="'+song.id+'">'+song.name+'</option>'); // 
          $option.appendTo(containersongs);
        }

      } // end of for loop

      $label = $('<label>available songs</label><a href="javascript:void(null);" id="add-song" class="trigger-button">Add ></a>');
      $label.appendTo(availpars); //   
      $item = $('</select></div>'); //
      $item.appendTo(container);
    
    }       


    var channelsongSeq = _model.instrument.channelInfo.channelSongSeqList; //

    var defaultSong = _model.instrument.channelInfo.defaultSong;

    //console.log(channelsongSeq);

    var ctrlchangeParent = document.getElementById('song-sequencer');

    $item = $('<div id="played-sons" class="select-container played"><div id="played-songs">');
    
    $item.appendTo(ctrlchangeParent); // 

    var playedpars = document.getElementById('played-sons');

    if ( typeof channelsongSeq !== 'undefined' && typeof defaultSong !== 'undefined' ) {

      window.songSequencer = channelsongSeq;

      if (channelsongSeq.length!=0) {      

        var containersongs = document.getElementById('played-songs');                

        //for (var i = 0; i < channelsongSeq.length; i++) {
          //var song = channelsongSeq[i];
          var song = channelsongSeq[defaultSong]; 
          //var input = 4890 + i;
          var input = 4890;

          if (typeof input !== 'undefined') { // 
            $option = $('<div class="option" id="op_'+song.id+'"><span value="'+song.id+'">'+song.name+'</span><input class="barloopnb" type="text" id="bl_'+song.id+'" value="1"/><div class="roundedTwo"><input type="checkbox" value="None" class="roonded parsel" id="ps_'+song.id+'" name="songsel" /><label for="ps_'+song.id+'"></label></div></div>');
            $option.appendTo(containersongs);
          }        
        //} // end of for loop







    window.partSequencer = [];


    Object.keys(channelsongSeq[defaultSong].payload).forEach(function(k, i) {

      //console.log(k,i, channelsongSeq[defaultSong].payload[i]);

      var part = {};
      part.name = channelsongSeq[defaultSong].payload[i].name;
      part.id = channelsongSeq[defaultSong].payload[i].id;
      part.barloop = channelsongSeq[defaultSong].payload[i].barloop;
      part.barelapsed = 0;
      var uuadi = uuid.v1();
      part.uid = uuadi;


      $option2 = $('<div class="option" id="op_'+uuadi+'"><span value="'+part.id+'">'+part.name+'</span><input class="barloopnb" type="text" id="bl_'+uuadi+'" value="'+part.barloop+'"/><div class="roundedTwo"><input type="checkbox" value="None" class="roonded parsel" id="ps_'+uuadi+'" name="partsel" /><label for="ps_'+uuadi+'"></label></div></div>');
      $option2.appendTo('#played-parts');

      window.partSequencer[i] = part;
    });


$(".barloopnb").on("change paste keyup", function() {

  var adi1 = $(this).parent().attr('id').slice(3); 
  var adi = $('#op_'+adi1+' span').attr('value');

  var barlpbn = $(this).val();

  $.each(window.partSequencer, function() {
    //console.log(this, window.partSequencer); 
    if (this.id === adi && this.uid === adi1) {
      this.barloop = barlpbn;
    }
  });

}); 



      } // end of if (channelsongSeq.length!=0) {
    } // end of if (typeof channelsongSeq !== 'undefined') { 

    $label = $('<label>played songs</label><a href="javascript:void(null);" id="remove-song" class="trigger-button">< Remove</a>');
    $label.appendTo(playedpars); // $item playedpars





    $('#add-song').click(function(e) { 

      e.preventDefault(); // prevent browser from scrolling to the top of the screen and adding hash to url - https://stackoverflow.com/questions/20215248/prevent-href-link-from-changing-the-url-hash https://stackoverflow.com/questions/20571757/using-javascript-prevent-scroll-on-empty-url-hash-change 

      window.songSequencer = [];

      $('#avail-songs option:selected').each(function( index ) {

        var song = {};
        song.name = $(this).text();
        song.id = $(this).attr('value');

        $option2 = $('<div class="option" id="op_'+song.id+'"><span value="'+song.id+'">'+song.name+'</span><input class="barloopnb" type="text" id="bl_'+song.id+'" value="1"/><div class="roundedTwo"><input type="checkbox" value="None" class="roonded parsel" id="ps_'+song.id+'" name="songsel" /><label for="ps_'+song.id+'"></label></div></div>');
        $option2.appendTo('#played-songs');

      });

      //var selSong = song;

      $('#played-songs .option span').each(function( index ) {
        var optionObject = {};
        optionObject.name = $(this).text();
        optionObject.id = $(this).attr('value');

        var blId = $(this).parent().attr('id').slice(3);
        optionObject.barloop = $('#bl_'+ blId).val();   
        //optionObject.barloop = $('#bl_'+ optionObject.id).val(); // $('#bl_'+ optionObject.id).attr('value'); // 2; // 
        optionObject.barelapsed = 0;
        optionObject.uid = blId;

        window.songSequencer[index] = optionObject;
      });

      $('html, body').animate({
        scrollTop: $("#song-sequencer").offset().top
      }, 1); 

                  //*

                  if ( typeof songs !== 'undefined' ) {

                    for (var i = 0; i < songs.length; i++) {
                      var result = $.grep(songs, function(e){ return e.id == window.songSequencer[0].id; });
                    }  
                  }   
                  //*/


/*
    // loading a song wipes previous loaded parts from other songs or manually loaded              
    $('#played-parts .option .roonded').each(function( index ) {
      var adddi = $(this).attr('id').slice(3);
      $('#played-parts #op_'+adddi).remove();
    });
*/



//*

    window.partSequencer = [];

    //console.log(songs);


    Object.keys(result[0].payload).forEach(function(k, i) {

      //console.log(k,i, channelsongSeq[defaultSong].payload[i]);

      var part = {};
      part.name = result[0].payload[i].name;
      part.id = result[0].payload[i].id;
      part.barloop = result[0].payload[i].barloop;
      part.barelapsed = 0;
      var uuadi = uuid.v1();
      part.uid = uuadi;

      $option2 = $('<div class="option" id="op_'+uuadi+'"><span value="'+part.id+'">'+part.name+'</span><input class="barloopnb" type="text" id="bl_'+uuadi+'" value="'+part.barloop+'"/><div class="roundedTwo"><input type="checkbox" value="None" class="roonded parsel" id="ps_'+uuadi+'" name="partsel" /><label for="ps_'+uuadi+'"></label></div></div>');
      $option2.appendTo('#played-parts');

      window.partSequencer[i] = part;
    });
//*/




$(".barloopnb").on("change paste keyup", function() {

  var adi1 = $(this).parent().attr('id').slice(3); 
  var adi = $('#op_'+adi1+' span').attr('value');

  var barlpbn = $(this).val();

  $.each(window.partSequencer, function() {
    //console.log(this, window.partSequencer); 
    if (this.id === adi && this.uid === adi1) {
      this.barloop = barlpbn;
    }
  });

}); 

           
    });  



    $('#remove-song').click(function(e) {

      e.preventDefault(); // prevent browser from scrolling to the top of the screen and adding hash to url - https://stackoverflow.com/questions/20215248/prevent-href-link-from-changing-the-url-hash https://stackoverflow.com/questions/20571757/using-javascript-prevent-scroll-on-empty-url-hash-change  

      $('#played-songs .option .roonded').each(function( index ) {

        var adddi = $(this).attr('id').slice(3);
      
        if ( $(this).is(":checked") ) {
          //console.log(adddi);
          $('#played-songs #op_'+adddi).remove();
        }
      

      });

      window.songSequencer = [];

      $('#played-songs .option span').each(function( index ) {
        var optionObject = {};
        optionObject.name = $(this).text();
        optionObject.id = $(this).attr('value');


        var blId = $(this).parent().attr('id').slice(3);
        optionObject.barloop = $('#bl_'+ blId).val();   
        optionObject.barelapsed = 0;
        optionObject.uid = blId;

        window.partSequencer[index] = optionObject;
      });

      //console.log(window.songSequencer);


      $('html, body').animate({
        scrollTop: $("#song-sequencer").offset().top
      }, 1); 




$(".barloopnb").on("change paste keyup", function() {

  var adi1 = $(this).parent().attr('id').slice(3); 
  var adi = $('#op_'+adi1+' span').attr('value');

  var barlpbn = $(this).val();

  $.each(window.partSequencer, function() {
     console.log(this, window.partSequencer); 
    if (this.id === adi && this.uid === adi1) {
      this.barloop = barlpbn;
    }
  });

});  

    });  


  } // end of if (typeof patterns !== 'undefined') {


}  






          } // end of controls[j].type== checks

        } // end of if (typeof input !== 'undefined') {


} // end of controls loop




window.changeParamMode = 'manual'; // now that params have been auto changed, future param changes are assumed to be from user events




$( ".ctrlchange.ddmenu" ).wrapAll( "<div class='ddmenucont' />");

if ( $('body').hasClass('session5') ) {

  $( '.ddmenucont' ).css( "clear", "both" ); // #modifiers 

} else {

/*
$(".ctrlchange.slider.horizontal").first().addClass('first');
$( ".ctrlchange.slider.noui:first" ).css( "clear", "both" );
$( ".ctrlchange.slider.noui" ).eq( 7 ).css( "clear", "both" );*/


}







var windowHeight = $(window).height();

var rowsCount = $('#pattern-editor table tr').length;

if (rowsCount>=9) {
  var ptnHeight = 0.85*windowHeight;
} else {
  var ptnHeight = 0.7*windowHeight;
}

// don't force height of pattern editor aka "piano" notes if device is displayed within song editor via iFrame Resizer js lib
if ( 'parentIFrame' in window ) {

  //$('#pattern-editor').css('height', '100px');
  
} else {

  //$('#pattern-editor').css('height', '20px');

  // comment fol/line when using c1_c7_majorSharp scale aka a lot of displayed notes
  //$('#pattern-editor').css('height', ptnHeight);

}


$('#kits option').each(function( index ) {
//console.log( index + ": " + $( this ).text() );

var number = index+1;
var number = ('00' + number).substr(-2)// ("0" + number).slice(-2);
var number = number+' - ';

var preText = $( this ).text();
$( this ).text(number+preText)
});

$('#patterns option').each(function( index ) {
var number = index+1;
var number = ('00' + number).substr(-2)// ("0" + number).slice(-2);
var number = number+' - ';

var preText = $( this ).text();
$( this ).text(number+preText)
});


$('#presets option').each(function( index ) {
var number = index+1;
var number = ('00' + number).substr(-2)// ("0" + number).slice(-2);
var number = number+' - ';

var preText = $( this ).text();
$( this ).text(number+preText)
});


$('#sessions option').each(function( index ) {
var number = index+1;
var number = ('00' + number).substr(-2)// ("0" + number).slice(-2);
var number = number+' - ';

var preText = $( this ).text();
$( this ).text(number+preText)
});


$('#played-patterns option').each(function( index ) {
var number = index+1;
var number = ('00' + number).substr(-2)// ("0" + number).slice(-2);
var number = number+' - ';

var preText = $( this ).text();
$( this ).text(number+preText)
});


        } // end of if (_model.instrument.controls!=0) 
      });



      _model.on(mixr.enums.Events.SEQUENCER_BEAT, function(beat) { // , bar
        view.drawPlayhead(beat);
        //console.log(bar);
      });



      // listen for note change event
      _model.getInstrument();

      return this;
    };

  };

}());
