(function() {

  mixr.ui.Slider = function(id, name, container, value, controlObject, channelId, usedLibrary, orientation, mute, midicc, muteNote, displayedRange, solo) {

    /**
     * Mixins
     */
    mixr.mixins.Wrapper.call(this);

    /**
     * A reference to this instance
     *
     * @private
     * @type {mixr.ui.Input}
     */
    var _self = this;

    var _ctrlObj = controlObject;
    var _value = value;
    var _id = id;
    var _name = name;
    var _channelId = channelId;
    var _usedLibrary = usedLibrary;
    var _orientation = orientation;
    var _mute = mute;
    var _midicc = midicc;
    var _muteNote = muteNote;

    var _solo = solo;
    var _displayedRange = displayedRange;
    
    
    var $container = $(container);
    var $item;
    var _timeoutId;

    /**
     * This objecvt will hold all the references to ui elements.
     *
     * @private
     * @type {Object}
     */
    var _ui = {};

    var _onMouseDown = function() {
      //$item.on('touchmove', _onMouseMove);
      //console.log('input value changed', 'input value changed');
      console.log('input value changed', $item.find("input").val());
      //alert($item.val());
//      _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: $item.find("input").val(), y: 0}); // 2 - $item.val()
      /*$('body').on('touchend', _onMouseUp);
      $('body').on('touchcancel', _onMouseUp);*/
    };


    /**
     * Adds all the listeners to the elements.
     *
     * @private
     * @function
     */
    var _addEventListeners = function(_id) {
      //$item.on('change', _onMouseDown);
      //$(window).on('resize', _onResize);
        //$item.find("canvas")


if (usedLibrary=='noUiSlider') {





var keypressSlider = document.getElementById('slider'+_id),
  input = document.getElementById('input'+_id);

noUiSlider.create(keypressSlider, {
  start: _value,
  step: 1,
  animate: false,
  animationDuration: 0,
  format: wNumb({
      decimals: 0/*,
      thousand: '.',
      postfix: ' (US $)',*/
    }),
  orientation: "vertical",
  direction: 'rtl',
  connect: "lower",
  range: {
    'min': _displayedRange['min'], //0,
    /*'20%': [ 300, 100 ],
    '50%': [ 800, 50 ],*/
    'max': _displayedRange['max'], //100
  }
});


window['oldSliVal'+_id] = _value;

keypressSlider.noUiSlider.on('update', function( values, handle ) {
  input.value = values[handle];


  
  //console.log('input val: ', values[handle], window['oldSliVal'+_id] /*input.value*/);




if (typeof document.getElementById('presets') !== 'undefined' && window.changeParamMode=='manual') {

      if ($('#presets option[value="0"]').length>0 ) {
        $('#presets option[value="0"]').remove();
      }

      $itemOptionUnsaved = $('<option class="user unsaved" id="option00001" value="0">[unsaved sound]</option>');
      $itemOptionUnsaved.appendTo(document.getElementById('presets'));
      $('#presets option[value="0"]').prop('selected',true);

}

  var presetId = $('#presets').find(":selected").val();

  var skwerotedValue = Math.floor(input.value);


  if (skwerotedValue!==0) { // exclude muting operation from being reced as old slider value before level cut operation
    window['oldSliVal'+_id] = skwerotedValue;
  } 


  //window['userPreset'].controls[_id]={};


  if (typeof window['userPreset'] !== 'undefined') { 
    window['userPreset'].controls[_id]=skwerotedValue;
  }

  
  if (typeof window['SEQ'] !== 'undefined') {

    var chId = ('' + _id).substr(-1);

    var synthInstanceString = 'AikeWebsynth1' + '_' + chId; // bad: hardcoded instrument type


    if (typeof window[synthInstanceString] !== 'undefined') {
      eval(synthInstanceString+'.volume.set('+skwerotedValue/100+')');
      console.log('aikeWS1', skwerotedValue/100 );
    } else {
      window['SEQ']['_insVol'+chId] = skwerotedValue/100;
      console.log('sampler', skwerotedValue/100 );
    }

    //console.log('skwerotedValue', skwerotedValue, chId );

  } else {
    _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: skwerotedValue, y: 0, presetId: presetId});    
  }
  

  
});

input.addEventListener('change', function(){
  var vall = Math.floor(this.value);

  if (vall!==0) {
    window['oldSliVal'+_id] = Math.floor(this.value);
  }    
  
  keypressSlider.noUiSlider.set([null, Math.floor(this.value) ]); // parseInt(this.value,10) // this.value.replace(/\.00$/,'')
  
});



// Listen to keydown events on the input field.
input.addEventListener('keydown', function( e ) {

  // Convert the string to a number.
  var value = Number( keypressSlider.noUiSlider.get() ),
    sliderStep = keypressSlider.noUiSlider.steps()

  // Select the stepping for the first handle.
  sliderStep = sliderStep[0];

  // also use -/+ if available on moble devices

  // 13 is enter,
  // 38 is key up,
  // 40 is key down.
  switch ( e.which ) {
    case 13:
      keypressSlider.noUiSlider.set(Math.floor(this.value));
      window['oldSliVal'+_id] = Math.floor(this.value);
      break;
    case 38:
      keypressSlider.noUiSlider.set( value + sliderStep[1] );
      window['oldSliVal'+_id] = Math.floor(value) + sliderStep[1];
      break;
    case 40:
      keypressSlider.noUiSlider.set( value - sliderStep[1] );
      window['oldSliVal'+_id] = Math.floor(value) - sliderStep[1];
      break;
  }
});

if (_mute!=0) { // _mute==1

var mute = document.getElementById('mute'+_id);

mute.addEventListener('click', function(){
  currSliVal = keypressSlider.noUiSlider.get();

  if (currSliVal!=0) {
    window['oldSliVal'+_id] = currSliVal;
    keypressSlider.noUiSlider.set( 0 );
  } else {
    keypressSlider.noUiSlider.set(window['oldSliVal'+_id]);
  }

  
});



document.addEventListener("keydown", function(e) {
  //console.log(event.which);
  if (e.which==_mute) {

    currSliVal = keypressSlider.noUiSlider.get();

    if (currSliVal!=0) {
      window['oldSliVal'+_id] = currSliVal;
      keypressSlider.noUiSlider.set( 0 );
    } else {
      keypressSlider.noUiSlider.set(window['oldSliVal'+_id]);
    }

  }
});





}

if (_midicc!=0) {

window['midicc'+_midicc] = function( number, value ) { // controller
  //console.log('_midicc', number, _midicc, value, _id);

  if (number==_midicc) {
    //keypressSlider.noUiSlider.set(value*100);
    document.getElementById('slider'+_id).noUiSlider.set(value*100);
  }

/*
  switch(number) {
  case _midicc:
    keypressSlider.noUiSlider.set(value);
    return;
  case 0x0a:
  } */
};

}





if (_muteNote!=0) {

window['muteNote'+_muteNote] = function( number, value ) { // controller
  //console.log('_muteNote', number, _muteNote, value, _id);

  if (number==_muteNote) {
    currSliVal = keypressSlider.noUiSlider.get();

    if (currSliVal!=0) {
      window['oldSliVal'+_id] = currSliVal;
      keypressSlider.noUiSlider.set( 0 );
    } else {
      keypressSlider.noUiSlider.set(window['oldSliVal'+_id]);
    }
  }


};

}



if (_solo!=0) {

  window['channelVol'][_id] = keypressSlider;
  //window['channelVol'+]=keypressSlider;


  var solo = document.getElementById('solo'+_id);

  solo.addEventListener('click', function(){

    
    /*for (var i = 0; i < window['channelVol'].length; i++) {


    }  */


    if ( $('#solo'+_id).hasClass('active') ) {
      window['channelVol'][_id].solo = 0;
      $('#solo'+_id).removeClass('active');
      //window['channelVol'][_id].noUiSlider.set(window['oldSliVal'+_id]);

      forIn(window['channelVol'], function(val, key, o) { // o = object
        if (val.solo!==1) {
          //val.noUiSlider.set(window['oldSliVal'+key]);
          val.noUiSlider.set( 0 );
          //console.log('olslival: ',window['oldSliVal'+key], key);
        } 
      });

      if ( $('.solos').hasClass('active') ) {

      } else { // if no solo button is active anymore restore all previous recorded audio channel levels

        forIn(window['channelVol'], function(val, key, o) { // o = object
          if (val.solo!==1) {
            val.noUiSlider.set(window['oldSliVal'+key]);
          } 
        });

      }


    } else {
      $('#solo'+_id).addClass('active');
      window['channelVol'][_id].solo = 1;
      window['channelVol'][_id].noUiSlider.set(window['oldSliVal'+_id]);

      forIn(window['channelVol'], function(val, key, o) { // o = object
        if (val.solo!==1) {
          val.noUiSlider.set( 0 );
        } /*else {
          val.noUiSlider.set(window['oldSliVal'+key]);
        }*/
        //console.log('o', o);
      });

    }

    





    /*currSliVal = keypressSlider.noUiSlider.get();

    if (currSliVal!=0) {
      window['oldSliVal'+_id] = currSliVal;
      keypressSlider.noUiSlider.set( 0 );
    } else {
      keypressSlider.noUiSlider.set(window['oldSliVal'+_id]);
    }*/

    //console.log(window['channelVol']);
    
  });

}





} else if (usedLibrary=='Interface') {

} else {
        

        var sliderId= 'slider'+_id;
        //console.log(sliderId);

        
        window[sliderId].on('*', function(data) {
        // data will be an object with x and y properties (data.x and data.y)
        //alert(data.x);
        //console.log(data.value);
        var skwerotedValue = Math.floor(data.value);
        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: skwerotedValue, y: 0});
        }); 

        //eval('slider'+_id+'.on("x", function(data){alert(data);});');

}

    };

    
    var _drawSlider = function(name, usedLibrary) {

//console.log('usedLibrary', usedLibrary);

if (usedLibrary=='noUiSlider') {

      $item = $('<div class="ctrlchange slider noui" id="ctrl'+ _id +'"><div class="cont-noui-slider DDDDslider '+_orientation+'" id="slider'+ _id +'"></div><input id="input'+ _id +'" type="text">'); // conntainer $itemContainer
      
      

      if (_mute!=0) { // _mute==1
        $mute = $('<span class="mutes" id="mute'+ _id +'">M</span><span class="solos" id="solo'+ _id +'">S</span></div>');
        $mute.appendTo($item);
        //console.log($item);
      } else {
        $mute = $('</div>');
        $mute.appendTo($item);
      }


      $item.append('<div class="infoContainer"><span>'+name+'</span></div>');

      $item.appendTo($container);


} else if (usedLibrary!='noUiSlider') {

      $item = $('<div class="ctrlchange slider '+_orientation+'" id="slider'+ _id +'"><div class="canvas-container">'); // $itemContainer
      //$item = $('<input>');
      $item.appendTo($container);


} 

if (usedLibrary=='Interface') {

//eval('slider'+_id+'='+_value);  

/*
var leftShift = '.'+_id%10; //.charAt(2);
var leftShift = Number(leftShift);
console.log('leftShift', leftShift);

window.sliderArray[_id] = new Interface.Slider({
  label: 'vertical slider'+_id,  
  bounds:[.05,leftShift,.1,.9] 
});

console.log('sider id: ',_id);

window.interfacePanel.add(window.sliderArray[_id]);  
*/




                  if (_orientation=='horizontal') {
                    var isVerticalCheck = false;
                  } else {
                    var isVerticalCheck = true;
                  }


window.interfacePanel[_id] = new Interface.Panel({ 
  container:document.querySelector("#slider"+_id+"."+_orientation+" .canvas-container")//,
  //useRelativeSizesAndPositions:true 
});
window.interfacePanel[_id].background = 'black';
/*
var label = new Interface.Label({ // window.sliderArray[_id]['label'] - window.sliderLabelArray[_id]
  bounds:[0,0.7,.5,.25],
  hAlign:'center',
  vAlign:'bottom',
  value: _value //' ' //
});  
*/
 var slider = new Interface.Slider({ // window.sliderArray[_id]
  //label: 'vertical slider'+_id,  
  //bounds:[0,0,0.75,0.75],
  bounds:[0,0,1,1], // [0.05,0.05,0.95,0.95]
  value: _value/100,
  //target: window.sliderLabelArray[_id], key:'setValue' // label
  isVertical:isVerticalCheck, 

  onvaluechange: function() { 
  //label.setValue( (this.value*100).toFixed() );
  var roundedValue = (this.value*100).toFixed();
  $("#slider"+_id+" label").html( roundedValue );  
  _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: roundedValue, y: 0});

   } // window.sliderLabelArray[_id]

  /*onvaluechange : function() { // value
    window.sliderLabelArray[_id].setValue(value*100); // (value*100).toFixed()
  } */

});

//window.sliderArray[_id].add(label);



/*
var hbox = new Interface.HBox({ 
  bounds:[0,0,1,1]
})

window.interfacePanel[_id].add( hbox);
hbox.add( slider); */

window.interfacePanel[_id].add(slider/*, label*/); // window.sliderArray[_id]

$item.append('<div class="infoContainer"><label>'+_value+'</label><span>'+name+'</span></div>');
//$item.append('<span>'+name+'</span>');
//$item.css("height", 180); /* 170*/

console.log('slider id: ',_id);

  







} else if (usedLibrary!='noUiSlider') {









      var instrumentsConfig = window.insConf;

      // following value calculation code should be out of INPUT !!!!
      /*if (_id>=800 && _id<809) {
        var instrumentsConfig = window.insConf;        
        var channelId = _id.toString();//"'"+_id+"'";
        var channelId = channelId.charAt(channelId.length-1); // channelId.charAt(2);        
        console.log('slider conf: ', instrumentsConfig);
        var bgColor = instrumentsConfig[channelId].conf[instrumentsConfig[channelId].trackSet].color;
        $item.append('<input value="'+_value+'" style="background:'+bgColor+';">');
      } else { */
        //$item.append('<input value="'+_value+'">');  
        $item.append('<canvas nx="slider" id="slider'+_id+'" min="0" max="100" label="'+name+'"></canvas>');        
      //}

      /*if (_id==998) {      
        var channelKitNumber = instrumentsConfig[_channelId].conf.length-1;
        $item.append('<label>'+name+' (0>'+channelKitNumber+')</label>');
      } else {
        $item.append('<label>'+name+'</label>');
      }  */
      
      $item.appendTo($container);

      //console.log('nx obj:', nx);
//      window.nx;
      //alert('mobile check 01');

      //alert(nx); Following does not pass on mobile
  // get all canvases on the page and add them to the manager
  var allcanvi = document.getElementsByTagName("canvas");
  for (i=0;i<allcanvi.length;i++) nx.transform(allcanvi[i]);

  //alert('mobile check 02');
/*
  if (nx.isTouchDevice) {
    document.addEventListener("touchmove", nx.blockMove, true);
    document.addEventListener("touchstart", nx.blockMove, true);
  }*/
  
    //nx.onload = function() {
        //alert('mobile check 03');
        eval('slider'+_id+'.val.value='+_value);
        eval('slider'+_id+'.draw()');

        eval('window.slider'+_id+'=slider'+_id);
        //console.log('nexus obj:', eval('slider'+_id));
    //  } 

    /*slider700.on('*', function(data) {
    console.log('slider data', data);
});*/
  //nx.startPulse();



/*
      //
*/

}

    };    

    var _setup = function(_id) {
      _addEventListeners(_id);
    };

    /**
     * Initializes the component
     *
     * @private
     * @function
     * @return {mixr.ui.Search} A reference to this instance.
     */
    this.initialize = function() {
      _drawSlider(_name, _usedLibrary);
      _setup(_id);
      return this;
    };

  };

}());
