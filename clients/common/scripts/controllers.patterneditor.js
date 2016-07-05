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
      $('body').addClass(_model.instrument.type);

        //window.insControls = _model.instrument.controls; // var instrument
        //console.log('controls', _model.instrument.controls);

      var table = $('#pattern-editor table');  
      var controllers = $('#modifiers');  

      table.empty(); // deplace code to this.removeTracksAndControllers
      controllers.empty();  // controllers




if ( $('#pattern-editor').hasClass('control') ) {
  console.log('hasClass control');
  $('#pattern-editor').css('height', 0);

}  





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



var kits = _model.instrument.channelInfo.channelKits;   // channelKits    

console.log('kits: ', kits);

if (typeof kits  !== 'undefined') {
  if (kits.length!=0) {    
    window.kits = kits;  
  }  
}        








      var patterns = _model.instrument.channelInfo.patterns;
      window.sessionPatterns = patterns;
      //console.log('patterns ctrl ptn editor: & kits ', patterns); // , kits
      //console.log('local ptns: ', window.localPatterns);


      if (typeof window.localPatterns !== 'undefined') {

        for (var i = 0; i < patterns.length; i++) {

          var result = $.grep(window.localPatterns, function(e){ return e.id == patterns[i].id; });

          if (typeof result[0] !== 'undefined') {
            //var pattern = patterns[i];
            patterns[i]['classs'] = 'user'; // really-user
            //console.log('ptn name: ', patterns[i]['classs'].name);
          }
          //
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

      console.log('ptns obj: ', patterns);











/*
var a = new Interface.Panel({ 
  container:document.querySelector("#modifiers") 
});
var b = new Interface.Slider({
  label: 'vertical slider',  
  bounds:[.05,.05,.3,.9] 
});

a.background = 'black';
a.add(b);*/



        if (_model.instrument.controls!=0) {  

var usedLibrary = 'Interface';

if (usedLibrary=='Interface') {

window.interfacePanel = [];
window.sliderArray = [];
window.sliderLabelArray = [];

/*
window.interfacePanel = new Interface.Panel({ 
  container:document.querySelector("#modifiers")//,
  //useRelativeSizesAndPositions:true 
});
window.interfacePanel.background = 'black';

window.sliderArray = [];
*/




/*
var a = new Interface.Panel({ container:document.querySelector("#modifiers") });            
var multiSlider = new Interface.MultiSlider({ 
  count:7,
  bounds:[.05,.05,.9,.8],
  onvaluechange : function(number, value) {
    multiSliderLabel.setValue( 'num : ' + number + ' , value : ' + value);
  }
});

var multiSliderLabel = new Interface.Label({ 
  bounds:[.05, .9, .9, .1],
  hAlign:"left",
  value:" ",
});

a.background = 'black';
a.add(multiSlider, multiSliderLabel);

for(var i = 0; i < multiSlider.count; i++) {
  //multiSlider.children[i].setValue( Math.random() );
}
        */










}






/*

var modifiers = document.getElementById('modifiers');

    $intPanel = $('<div class="interfacePanel" id="sliderPanel">'); 
    $intPanel.appendTo(modifiers);



var aMulti = new Interface.Panel({ container:document.querySelector("#sliderPanel") });            
var multiSlider = new Interface.MultiSlider({ 
  count:15,
  bounds:[.05,.05,.9,.8],
  onvaluechange : function(number, value) {
    multiSliderLabel.setValue( 'num : ' + number + ' , value : ' + value);
  }
});

var multiSliderLabel = new Interface.Label({ 
  bounds:[.05, .9, .9, .1],
  hAlign:"left",
  value:" ",
});

aMulti.background = 'black';
aMulti.add(multiSlider, multiSliderLabel);
/*
for(var i = 0; i < multiSlider.count; i++) {
  multiSlider.children[i].setValue( Math.random() );
} */

//*/




// if mobile

function is_touch_device() {
  return 'ontouchstart' in window        // works on most browsers 
      || 'onmsgesturechange' in window;  // works on IE10 with some false positives
};
// 



/*

var element = $('#pattern-editor table');

    $addedHtml = $('<tr data-id="3-0" style="background: rgb(0, 161, 0);"><td><h1>Conductor</h1></td><td>01</td><td>02</td><td>03</td><td>04</td><td>05</td><td>06</td><td>07</td><td>08</td><td>09</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td></tr>'); 
    $addedHtml.appendTo(element);
*/



//*

if (is_touch_device()) {




/*

var modifiers = document.getElementById('modifiers');

    $intPanel = $('<div class="interfacePanel" id="sliderPanel">'); 
    $intPanel.appendTo(modifiers);



var a = new Interface.Panel({ 
  container:document.querySelector("#sliderPanel") 
});
var b = new Interface.Slider({
  label: 'vertical slider',  
  bounds:[.05,.05,.3,.9] 
});
var c = new Interface.Slider({ 
  bounds:[.4,.35,.55,.3], 
  label: 'horizontal slider',  
  isVertical:false, 
  value:.5,
});

a.background = 'black';
a.add(b); // ,c


//*/


















$('#sliderPanel canvas').trigger('touchstart');  



var sliderTimer = setInterval(function () {

$('#sliderPanel canvas').trigger('touchstart');

console.log('trying to keep sliders precize and smooth on touch devices');

}, 50); // 100ms: every 10th of a second

}

//*/


//*
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

                console.log('contact');

                window['ctrl'+input] = new mixr.ui.Contact(controls[j].id, controls[j].x.name, container, controls[j].x.value, controls[j], channelId, usedLibrary).initialize();              
                window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);













              } else if (controls[j].type=='ddmenu') {


/*
var kits = _model.instrument.channelInfo.channelKits;   // channelKits    

if (typeof kits  !== 'undefined') {
  if (kits.length!=0) {    
    window.kits = kits;  
  }  
} */



if (controls[j].id==998) {



if (typeof window.kits  !== 'undefined') { // kits

  var kits = window.kits;

  var kit = Object.keys(kits); 
  //console.log('kits + kit: ', kits, kit.length); 

  if (kit.length!=0) {    

    $itemKits = $('<div class="ctrlchange" id="thekits"><select id="kits" name="kits">'); // $itemContainer            
    $itemKits.appendTo(container);
    var containerKits = document.getElementById('kits');


    //window.itemKits = $('<select id="kits" name="kits"></select>');
    //var container = window.itemKits; // document.getElementById('kits');                     
    


    for (var i = 0; i < kits.length; i++) {
      var kit = kits[i];
      var input = 998 + i;// 400 + i; // 3 +  // better use controller id ex 998 as window prefix - 998
      //console.log('input from kits: ', input);

      if (typeof input !== 'undefined') { 
        //console.log('ddmenu params: ', kits[i], kit, channelId);
        window['ctrl'+input] = new mixr.ui.Ddmenu(998, kits[i], containerKits, i, kits, channelId, input).initialize();  
        window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
      } 
    } 

    //console.log('kit0: ', kits[0]);

    $label = $('<label>'+ controls[j].name +'</label>');
    $label.appendTo($itemKits);


    $itemKits = $('</select></div>'); // $itemContainer            
    $itemKits.appendTo(container);



    //$('#modifiers').prepend($itemKits);
  }
}


} else if (controls[j].id==994) {

//*
    if (typeof patterns !== 'undefined') {
      var ptn = Object.keys(patterns); 

        if (ptn.length!=0) {    

                $item = $('<div class="ctrlchange" id="thepatterns"><select id="patterns" name="patterns">'); // $itemContainer            
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

          //$('#pattern-name').val(window['userPattern'].name);

      }
    } 
//*/






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


    if (typeof controls[j].x.option !== 'undefined') {
      var optionsObj = controls[j].x.option; //Object.keys(controls[j].x.option); 
      var options = Object.keys(controls[j].x.option); 
      console.log('option: ',options, optionsObj);

      if (options.length!=0) {    

        $item = $('<div id="id'+controls[j].id+'" class="ctrlchange id'+controls[j].id+'"><select id="selectid'+controls[j].id+'" name="options">'); // $itemContainer    saylekt        
        $item.appendTo(container);

        var containerOptions = document.getElementById('selectid'+controls[j].id);                

        for (var i = 0; i < options.length; i++) {
          var option = options[i];
          var input = 200 + i;

          console.log('option: ', option, options, optionsObj);

          if (typeof input !== 'undefined') { // id, name, container, value, controlObject, channelId, elementId
            window['ctrl'+input] = new mixr.ui.Ddmenu(controls[j].id, optionsObj[i], containerOptions, option, option, channelId, input, controls[j].x.value).initialize();  // controls[j].x.value
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



                 
                /*var kits = _model.instrument.channelInfo.channelKits;   // channelKits     

                if (typeof kits !== 'undefined') { 

                  var kit = Object.keys(kits); 
                  //console.log('kits + kit: ', kits, kit.length); 

                  if (kit.length!=0) {    

                    //console.log('kit container: ', container);

                    //window.itemKits = $('<div class="ctrlchange"><select id="kits" name="kits"></select></div>'); // $itemContainer  - var itemKits - $itemKits 
                    window.itemKits = $('<select id="kits" name="kits"></select>');
                    //window.itemKits.appendTo(container);
                    //window.itemKits = '<div class="ctrlchange"><select id="kits" name="kits">';        
                    
                    //$itemKits.appendTo(document.getElementById('modifiers')); // container
                    //$('#modifiers').append( "<p id='new'>new paragraph yeah !</p>" );
                    //console.log('container parent el: ', container);
                    
                    //var container = document.getElementById('kits');                

                    for (var i = 0; i < kits.length; i++) {
                      var kit = kits[i];
                      var input = controls[j].id + i;// 400 + i; // 3 +  // better use controller id ex 998 as window prefix
                      console.log('input: ', input);

                      if (typeof input !== 'undefined') { 
                        console.log('ddmenu params: ', controls[j].id, kits[i], kit, channelId);
                        window['ctrl'+input] = new mixr.ui.Ddmenu(controls[j].id, kits[i], window.itemKits, i, kits, channelId).initialize();  // container - $itemKits
                        window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
                      } 
                    } 
                    //window.itemKits.append('</select></div>');
                    //$itemKitsEnd //window.itemKits = $('</select></div>'); 
                    //$itemKits.appendTo(container);
                  }
                } */




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

                // if HTML5 canvas blend mode property 'multiply' browser not supported : load simple inputs instead of sliders
                if( gcoCheck==false /*/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)*/ ) {
                  //window['ctrl'+input] = new mixr.ui.Input(controls[j].id, controls[j].x.name, container, controls[j].x.value, controls[j], channelId).initialize();
                  window['ctrl'+input] = new mixr.ui.Slider(controls[j].id, controls[j].x.name, container, controls[j].x.value, controls[j], channelId, usedLibrary, orientation).initialize(); // NexusUI


                } else { 

/*
window.interfacePanel = new Interface.Panel({ 
  container:document.querySelector("#modifiers")//,
  //useRelativeSizesAndPositions:true 
});
window.interfacePanel.background = 'black';

window.sliderArray = []; */




                  window['ctrl'+input] = new mixr.ui.Slider(controls[j].id, controls[j].x.name, container, controls[j].x.value, controls[j], channelId, usedLibrary, orientation).initialize(); // NexusUI
                }
                
                window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
                //alert("slider");
              } else if (controls[j].type=='hidden') {

              } else if (controls[j].type=='multiselect') {





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

        //console.log('pattern: ', pattern);


        // 994, pattern.name, containerPatterns, pattern.id, pattern, channelId, input

        if (typeof input !== 'undefined') { // window[input]
          $option = $('<option id="option'+input+'" value="'+pattern.id+'">'+pattern.name+'</option>'); // $itemContainer - _id            
          $option.appendTo(containerpatterns);
        }



    } // end of for loop



      $label = $('<label>available patterns</label><a href="#" id="add" class="trigger-button">Add ></a>');
      $label.appendTo(availptns); //   $item
      $item = $('</select></div>'); //</div>
      $item.appendTo(container);




  }       

/*
var cbox = $('<div class="roundedTwo"><input type="checkbox" value="None" id="roundedTwo" name="check" checked=""><label for="roundedTwo"></label><span>Check button: ptn seq enabled</span></div>');

var ptnSeq = document.getElementById('pattern-sequencer');
cbox.appendTo(ptnSeq); */


//*
    var channelPatternSeq = _model.instrument.channelInfo.channelPatternSeq; 
    var ctrlchangeParent = document.getElementById('pattern-sequencer');


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

        //console.log('pattern: ', pattern);


        // 994, pattern.name, containerPatterns, pattern.id, pattern, channelId, input

        if (typeof input !== 'undefined') { // window[input]
          $option = $('<option selected id="option'+input+'" value="'+pattern.id+'">'+pattern.name+'</option>'); // $itemContainer - _id   
          //$option.prop('selected',true);         
          $option.appendTo(containerpatterns);
        }



    } // end of for loop

    if (controls[j].x.value==1) {
      window.stepSeq=1;
      var onOffstate = 'On';
    } else {
      window.stepSeq=0;
      var onOffstate = 'Off';
    }

      $label = $('<label>played patterns</label><a href="#" id="remove" class="trigger-button">< Remove</a>');
      $label.appendTo(playedptns); // $item playedptns
      $item = $('</select></div><label>pattern sequencer</label><a href="#" id="ptnseq" class="trigger-button">'+onOffstate+'</a>'); //</div>
      $item.appendTo(ctrlchangeParent);


    if (controls[j].x.value==0) {
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
      $('#pattern-sequencer').css('opacity', 0.3);
    } else {
      window.stepSeq = 1;
      $('#pattern-sequencer').css('opacity', 1);
    }

  });  








      }

    }  
//*/






   $('#add').click(function() {  


window.patternSequencer = [];

/*return !*/$('#avail-patterns option:selected').clone().appendTo('#played-patterns'); // .remove() - .appendTo('#avail-patterns')

$('#played-patterns option').each(function( index ) {
  var optionObject = {};
  optionObject.name = $(this).text();
  optionObject.id = $(this).attr('value');

  window.patternSequencer[index] = optionObject;
});

//console.log('ptn seq: ',window.patternSequencer);

/*
$('#played-patterns option').each(function( index ) {
var number = index+1;
var number = ('00' + number).substr(-3)// ("0" + number).slice(-2);
var number = number+' - ';

var preText = $( this ).text();
$( this ).text(number+preText)
});*/

    
     
   });  




   $('#remove').click(function() {  

    /*return !*/$('#played-patterns option:selected').remove(); // .appendTo('#avail-patterns')

window.patternSequencer = [];

$('#played-patterns option').each(function( index ) {
  var optionObject = {};
  optionObject.name = $(this).text();
  optionObject.id = $(this).attr('value');

  window.patternSequencer[index] = optionObject;
});

/*
$('#played-patterns option').each(function( index ) {
var number = index+1;
var number = ('00' + number).substr(-2)// ("0" + number).slice(-2);
var number = number+' - ';

var preText = $( this ).text();
$( this ).text(number+preText)
});*/


      
   });  


/*
window.stepTimer = setInterval(function () {

  console.log(window.patternSequencer); //, window.sequencerBeat
        if (window.sequencerBeat==15) {          
          if (typeof window.patternSequencer !== 'undefined') {
            rotate(window.patternSequencer,1);
            //console.log('stuff happens', window.patternSequencer);
            $('select#patterns option[value="'+window.patternSequencer[0].id+'"]').prop('selected',true).trigger('change'); // 01627d00-3d18-11e6-bd11-650c5a0c542f
          }          
        } 
}, 100);
*/


              //i++;
            } 

          } // end of controls[j].type== checks

        } // end of if (typeof input !== 'undefined') {


} // end of controls loop


$(".ctrlchange.slider.horizontal").first().addClass('first');




$('#kits option').each(function( index ) {
//console.log( index + ": " + $( this ).text() );

var number = index+1;
var number = ('000' + number).substr(-3)// ("0" + number).slice(-2);
var number = number+' - ';

var preText = $( this ).text();
$( this ).text(number+preText)
});

$('#patterns option').each(function( index ) {
var number = index+1;
var number = ('000' + number).substr(-3)// ("0" + number).slice(-2);
var number = number+' - ';

var preText = $( this ).text();
$( this ).text(number+preText)
});


$('#sessions option').each(function( index ) {
var number = index+1;
var number = ('000' + number).substr(-3)// ("0" + number).slice(-2);
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


//console.log('int panel:', window.interfacePanel);
//window.interfacePanel.add(window.sliderArray['800'],window.sliderArray['801']);   


          //*/
        /*
        var input = new mixr.ui.Input(2, 'Tempo', container).initialize();
        input.on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
        //*/


        //_conn.execute(mixr.enums.Events.MODIFIER_CHANGE, data);
    //*/

    //window.nx;

/*
  // get all canvases on the page and add them to the manager
  var allcanvi = document.getElementsByTagName("canvas");
  for (i=0;i<allcanvi.length;i++) nx.transform(allcanvi[i]);

  if (nx.isTouchDevice) {
    document.addEventListener("touchmove", nx.blockMove, true);
    document.addEventListener("touchstart", nx.blockMove, true);
  }
  
  nx.onload();

  nx.startPulse();
*/



        } // end of if (_model.instrument.controls!=0) 





/*
var kits = _model.instrument.channelInfo.channelKits;   // channelKits    

if (typeof kits  !== 'undefined') {
  if (kits.length!=0) {    
    window.kits = kits;  
  }  
}

if (typeof window.kits  !== 'undefined') { // kits

  var kits = window.kits;

  var kit = Object.keys(kits); 
  //console.log('kits + kit: ', kits, kit.length); 

  if (kit.length!=0) {    

    $itemKits = $('<div class="ctrlchange" id="thekits"><select id="kits" name="kits">'); // $itemContainer            
    $itemKits.appendTo(container);
    var containerKits = document.getElementById('kits');


    //window.itemKits = $('<select id="kits" name="kits"></select>');
    //var container = window.itemKits; // document.getElementById('kits');                     
    


    for (var i = 0; i < kits.length; i++) {
      var kit = kits[i];
      var input = 998 + i;// 400 + i; // 3 +  // better use controller id ex 998 as window prefix - 998
      //console.log('input from kits: ', input);

      if (typeof input !== 'undefined') { 
        //console.log('ddmenu params: ', kits[i], kit, channelId);
        window['ctrl'+input] = new mixr.ui.Ddmenu(998, kits[i], containerKits, i, kits, channelId, input).initialize();  
        window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
      } 
    } 

    $itemKits = $('</select></div>'); // $itemContainer            
    $itemKits.appendTo(container);
    //$('#modifiers').prepend($itemKits);
  }
}
//*/








/*
//$('#modifiers').append( "<p id='new'>new paragraph after render</p>" ); 
console.log('itemKit: ', window.itemKits);
//window.itemKits.append('</select></div>');

var kitsDivContainer = $('<div class="ctrlchange" id="id998"></div>');

//var kitsEl = window.itemKits.appendTo(kitsDivContainer);

var kitsEl = kitsDivContainer.append(window.itemKits);

$('#modifiers').prepend(kitsEl);
*/



















      






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
