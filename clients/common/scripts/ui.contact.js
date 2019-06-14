(function() {

  mixr.ui.Contact = function(id, name, container, value, controlObject, channelId, usedLibrary) { // should be button instead of contact

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

      var classs = $('#patterns').find(":selected").attr('class');

      var presetId = $('#presets').find(":selected").val();
      //var patternClass = $('#patterns').find(":selected").attr('class'); // 'user'; // 
      var patternId = $('#patterns').find(":selected").val();


        if (typeof window.stepSeq !== 'undefined') {
          window.ptnSeq = {};
          window.ptnSeq.list = window.patternSequencer;
          window.ptnSeq.state = window.stepSeq;
          var ptnSeqString = JSON.stringify(window.ptnSeq);
        } else {
          var ptnSeqString = 0;
        }

      if (_id==995) {
         var KitNumber = $('#kits').find(":selected").val(); 
         //var patternId = $('#patterns').find(":selected").val();
         window['userPattern']._name_ = $('#pattern-name').val();
         window['userPattern'].id = uuid.v1();

         // put 'name' object key as first key to appear into Webstorage key=>value display
         var alphaAscSortedUserPattern = sortObj(window['userPattern'],'asc');
         var ptnString = JSON.stringify(alphaAscSortedUserPattern); 
         var ptnString = ptnString.replace('_name_', 'name'); 

         //window['userPattern'].name = $('#pattern-name').val();

         console.log('ptnString', ptnString);

        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: $item.find("input").val(), y: 0, pattern: ptnString, classs: classs, kitNumber: KitNumber, triggerMode: 'manual', patternId: window['userPattern'].id, presetId: presetId, ptnSeq: ptnSeqString});
        localStorage.setItem('Loops-ptn_'+window['userPattern'].id, ptnString);
        window.localPatterns.push(window['userPattern']);

        //console.log('userPattern + local ptns at save: ', window['userPattern'], window.localPatterns);

        $itemOption = $('<option class="user" id="option'+window['userPattern'].id+'" value="'+window['userPattern'].id+'">'+window['userPattern']._name_+'</option>');
        $itemOption.appendTo(document.getElementById('patterns'));
        if( $('#patterns').length ) {
          $('#patterns option[value="' + window['userPattern'].id + '"]').prop('selected',true);
          //console.log('ch info: ', data.channelInfo);
        }




        // append newly saved pattern to pattern seq "avail ptns" column

        var containerpatterns = document.getElementById('avail-patterns');

        if (typeof containerpatterns !== 'undefined') { 
          $option = $('<option id="option'+window['userPattern'].id+'" value="'+window['userPattern'].id+'">'+window['userPattern']._name_+'</option>'); // 
          $option.appendTo(containerpatterns);
        }











      } else if (_id==991) {

        var presetClass = $('#presets').find(":selected").attr('class');

        var KitNumber = $('#kits').find(":selected").val(); 
        window['userPreset']._name_ = $('#preset-name').val();
        window['userPreset'].id = uuid.v1();
        
        var alphaAscSortedUserPreset = sortObj(window['userPreset'],'asc');
        var preString = JSON.stringify(alphaAscSortedUserPreset); 
        var preString = preString.replace('_name_', 'name');  

        //window['userPreset'].name = $('#preset-name').val();


        window.allPresets.push(window['userPreset']);

        //console.log('preset controls: ', window['userPreset'].controls); // preString, window['userPreset']

        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: $item.find("input").val(), y: 0, preset: preString, classs: presetClass, kitNumber: KitNumber, triggerMode: 'manual', patternId: patternId, presetId: window['userPreset'].id, ptnSeq: ptnSeqString});
        localStorage.setItem('Loops-pre_'+window['userPreset'].id, preString);
        $itemOption = $('<option class="user" id="option'+window['userPreset'].id+'" value="'+window['userPreset'].id+'">'+window['userPreset']._name_+'</option>');
        $itemOption.appendTo(document.getElementById('presets'));
        if( $('#presets').length ) {
          $('#presets option[value="' + window['userPreset'].id + '"]').prop('selected',true);
        }



    // save song (conductor role)
    } else if (_id==986) {





        var currts = Date.now();

        window['song_'+currts] = {};
        window['song_'+currts].id = uuid.v1();
        window['song_'+currts]._name_ = $('#song-name').val();
        window['song_'+currts].payload = window.partSequencer; // data;

        var alphaAscSortedUserPreset = sortObj(window['song_'+currts],'asc');
        var preString = JSON.stringify(alphaAscSortedUserPreset); 
        var preString = preString.replace('_name_', 'name');  

        localStorage.setItem('Loops-sng_' + window['song_'+currts].id, preString);

        // append song to select option:
        var containersongs = document.getElementById('avail-songs');                

        $option = $('<option id="option'+window['song_'+currts].id+'" value="'+window['song_'+currts].id+'">'+window['song_'+currts]._name_+'</option>'); // 
        $option.prependTo(containersongs);



      // save part (conductor role)  
      } else if (_id==987) {


        /*
        var presetClass = $('#presets').find(":selected").attr('class');

        var KitNumber = $('#kits').find(":selected").val(); 
        */





/*
      var uuidVar = uuid.v1(); // this var is only generated after 1 get instruement event
      window['userPattern'].id=uuidVar; 
      window['userPattern']._name_=data.channelInfo.channelName + '_' +uuidVar.substring(0, 4);
*/        
        
        


        // window.allPresets.push(window['userPreset']);
        

        //console.log('preset controls: ', window['userPreset'].controls); // preString, window['userPreset']

        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id/*, x: $item.find("input").val(), y: 0, preset: preString, classs: presetClass, kitNumber: KitNumber, triggerMode: 'manual', patternId: patternId, presetId: window['userPreset'].id, ptnSeq: ptnSeqString*/});

        


        /*
        $itemOption = $('<option class="user" id="option'+window['userPreset'].id+'" value="'+window['userPreset'].id+'">'+window['userPreset']._name_+'</option>');
        $itemOption.appendTo(document.getElementById('presets'));
        if( $('#presets').length ) {
          $('#presets option[value="' + window['userPreset'].id + '"]').prop('selected',true);
        }
        */


      }









      else {
        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: 1, y: 0}); // , patternId: ptnId, classs: classs
      }



      //console.log('input value changed', $item.find("input").val());
      //_self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: $item.find("input").val(), y: 0}); 

    };


    /**
     * Adds all the listeners to the elements.
     *
     * @private
     * @function
     */
    var _addEventListeners = function(_id) {



    };

    
    var _drawSlider = function(name, usedLibrary) {


var classs = $('#patterns').find(":selected").attr('class');


      $item = $('<div class="ctrlchange button contact" id="button'+ _id +'">'); 



      if (_id==995) {      
        $item.append('<input type="text" class="save" id="pattern-name" value="'+ window['userPattern']._name_ +'"/><label>Type pattern name</label><a href="#" class="trigger-button">Save pattern</a>'); // new <div class="input-container">
      
      } else if (_id==991) {      
        //$item.append('<input type="text" class="save" id="preset-name" value="'+ window['userPreset']._name_ +'"/><label>Type sound name</label><a href="#" class="trigger-button">Save sound</a>'); 
        $item.append('<input type="text" class="save" id="preset-name" value="'+ window['userPreset']._name_ +'"/><label>Type preset name</label><a href="#" class="trigger-button">Save preset</a>');
      
      }  else if (_id==997) {  
        $item.append('<a href="#" class="trigger-button">Change Channel</a>'); // Switch


      } else if (_id==987) {      
        // '+ window['userPart']._name_ +'
        $item.append('<input type="text" class="save" id="part-name" value=""/><label>Type part name</label><a href="#" class="trigger-button">Save part</a>');
      
      } else if (_id==986) {      
        // '+ window['userPart']._name_ +'
        $item.append('<input type="text" class="save" id="song-name" value=""/><label>Type song name</label><a href="#" class="trigger-button">Save song</a>');
      }  


      $item.appendTo($container);

/*

var flag = false;
$("#button"+_id+" a.trigger-button").bind('touchstart click', function(){ //  canvas
  if (!flag) {
    flag = true;
    setTimeout(function(){ flag = false; }, 100);
    _onMouseDown();
    console.log('clicked!');
  }

  return false
});
//*/     

  touchClick("#button"+_id+" a.trigger-button", 'touchstart mousedown', function(e) {
    _onMouseDown();      
  }) 


if (usedLibrary=='Interface') {





/*
window.interfacePanel[_id] = new Interface.Panel({ 
  container:document.querySelector("#button"+_id)
});
window.interfacePanel[_id].background = 'black';
*/


/*
var label = new Interface.Label({ // window.sliderArray[_id]['label'] - window.sliderLabelArray[_id]
  bounds:[0,0.7,.5,.25],
  hAlign:'center',
  vAlign:'bottom',
  value: _value //' ' //
});  */

 var slider = new Interface.Button({ 
  //bounds:[.65,.05,.3,.9],
  bounds:[0,0,1,1],
  //value: _value/100,
  mode:'contact',
  label:'ptn save'/*,

  onvaluechange: function() { 
  //var roundedValue = (this.value*100).toFixed();
  //$("#slider"+_id+" label").html( roundedValue );  


      

      if (_id==995) {
         window['userPattern'].name = $('#pattern-name').val();
         window['userPattern'].id = uuid.v1();
         var ptnString = JSON.stringify(window['userPattern']); 
        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: $item.find("input").val(), y: 0, pattern: ptnString, classs: classs });
        localStorage.setItem('Loops-ptn_'+window['userPattern'].id, ptnString);
        //window.localPatterns.push(window['userPattern']);

        console.log('userPattern + local ptns at save: ', window['userPattern'], window.localPatterns);

        $itemOption = $('<option class="user" id="option'+window['userPattern'].id+'" value="'+window['userPattern'].id+'">'+window['userPattern'].name+'</option>');
        $itemOption.appendTo(document.getElementById('patterns'));
        if( $('#patterns').length ) {
          $('#patterns option[value="' + window['userPattern'].id + '"]').prop('selected',true);
          //console.log('ch info: ', data.channelInfo);
        }
      }




  //_self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: this.value, y: 0});
  console.log('pattern '+ window['userPattern'].name + 'saved');
   } */

});

//window.sliderArray[_id].add(label);

//window.interfacePanel[_id].add(slider); 

//document.querySelector("#button"+_id)
//$("#button"+_id+" a.trigger-button").on('click', _onMouseDown); // span





//$item.append('<label>'+_value+'</label>');
//$item.append('<span>'+name+'</span>');
//$item.css("height", 170);

//console.log('slider id: ',_id);

  







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
