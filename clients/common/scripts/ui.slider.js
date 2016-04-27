(function() {

  mixr.ui.Slider = function(id, name, container, value, controlObject, channelId) {

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
      _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: $item.find("input").val(), y: 0}); // 2 - $item.val()
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
        

        var sliderId= 'slider'+_id;
        console.log(sliderId);

        
        window[sliderId].on('*', function(data) {
        // data will be an object with x and y properties (data.x and data.y)
        //alert(data.x);
        console.log(data.value);
        var skwerotedValue = Math.floor(data.value);
        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: skwerotedValue, y: 0});
        }); 

        //eval('slider'+_id+'.on("x", function(data){alert(data);});');



    };

    
    var _drawSlider = function(name) {
      $item = $('<div class="ctrlchange">'); // $itemContainer
      //$item = $('<input>');

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
      _drawSlider(_name);
      _setup(_id);
      return this;
    };

  };

}());
