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


      if (_id==995) {
         var KitNumber = $('#kits').find(":selected").val(); 
         //var patternId = $('#patterns').find(":selected").val();
         window['userPattern'].name = $('#pattern-name').val();
         window['userPattern'].id = uuid.v1();
         var ptnString = JSON.stringify(window['userPattern']); 
        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: $item.find("input").val(), y: 0, pattern: ptnString, classs: classs, kitNumber: KitNumber, triggerMode: 'manual', patternId: window['userPattern'].id});
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
        $item.append('<input type="text" id="pattern-name" value="'+ window['userPattern'].name +'"/><label>pattern name</label><a href="#" class="trigger-button">TRIGGER</a>');
      }  


      $item.appendTo($container);


if (usedLibrary=='Interface') {






window.interfacePanel[_id] = new Interface.Panel({ 
  container:document.querySelector("#button"+_id)
});
window.interfacePanel[_id].background = 'black';
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

window.interfacePanel[_id].add(slider); 

//document.querySelector("#button"+_id)
//$("#button"+_id+" a.trigger-button").on('click', _onMouseDown); // span


var flag = false;
$("#button"+_id+" a.trigger-button").bind('touchstart click', function(){
  if (!flag) {
    flag = true;
    setTimeout(function(){ flag = false; }, 100);
    _onMouseDown();
  }

  return false
});



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
