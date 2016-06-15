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

                $item = $('<div class="ctrlchange"><select id="patterns" name="patterns">'); // $itemContainer            
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
          $item = $('</select></div>'); // $itemContainer            
          $item.appendTo(container);

          //$('#pattern-name').val(window['userPattern'].name);

      }
    } 
//*/


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

                // if HTML5 canvas blend mode property 'multiply' browser not supported : load simple inputs instead of sliders
                if( gcoCheck==false /*/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)*/ ) {
                  //window['ctrl'+input] = new mixr.ui.Input(controls[j].id, controls[j].x.name, container, controls[j].x.value, controls[j], channelId).initialize();
                  window['ctrl'+input] = new mixr.ui.Slider(controls[j].id, controls[j].x.name, container, controls[j].x.value, controls[j], channelId, usedLibrary).initialize(); // NexusUI


                } else { 

/*
window.interfacePanel = new Interface.Panel({ 
  container:document.querySelector("#modifiers")//,
  //useRelativeSizesAndPositions:true 
});
window.interfacePanel.background = 'black';

window.sliderArray = []; */




                  window['ctrl'+input] = new mixr.ui.Slider(controls[j].id, controls[j].x.name, container, controls[j].x.value, controls[j], channelId, usedLibrary).initialize(); // NexusUI
                }
                
                window['ctrl'+input].on(mixr.enums.Events.MODIFIER_CHANGE, _model.onModifierChange);
                //alert("slider");
              } else if (controls[j].type=='hidden') {

              } 

              //i++;
            }

          } 

















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
