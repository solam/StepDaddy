(function() {

  /**
   * The Input class is responsible for the search UI component
   *
   * @constructor
   * @class Input
   * @param {Object} element The element of this specific fx panel.
   */
  mixr.ui.Input = function(id, name, container, value, controlObject, channelId) {

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
/*var $itemTempo;
    var _width = 0;
    var _height = 0;
    var _xValue = 0;
    var _yValue = 0;*/
    var _timeoutId;

    /**
     * This objecvt will hold all the references to ui elements.
     *
     * @private
     * @type {Object}
     */
    var _ui = {};
/*
    var _onMouseMove = function(event) {

      var touches = event.originalEvent.targetTouches;

      if (touches.length > 0) {

        var itemWidth = _width;
        var itemHeight = _height;

        _xValue = touches[0].clientX - $item.offset().left;
        _yValue = touches[0].clientY - $item.offset().top;

        //normalization
        _xValue = Math.floor((100 / itemWidth) * _xValue) * 0.01;
        _yValue = 1 - Math.floor((100 / itemHeight) * _yValue) * 0.01;

        _xValue = Math.max(0, _xValue);
        _xValue = Math.min(1, _xValue);

        _yValue = Math.max(0, _yValue);
        _yValue = Math.min(1, _yValue);

        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: _xValue, y: _yValue});

        clearTimeout(timer);
        var timer = setTimeout(function () {
          $('label', $item).text(Math.round(_xValue*100)/100 + ' - ' + Math.round(_yValue*100)/100);
        }, 0);
      }

    }; */

    var _onMouseDown = function() {
      //$item.on('touchmove', _onMouseMove);
      //console.log('input value changed', 'input value changed');
      //console.log('input value changed', $item.find("input").val());
      //alert($item.val());

      var classs = $('#patterns').find(":selected").attr('class');

      if (_id==995) {
         var KitNumber = $('#kits').find(":selected").val(); 
         window['userPattern'].name = $('#pattern-name').val();
         window['userPattern'].id = uuid.v1();
         var ptnString = JSON.stringify(window['userPattern']); // ptnString
         //console.log('ptn', ); // window['userPattern'], ptnString
        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: $item.find("input").val(), y: 0, pattern: ptnString, classs: classs, kitNumber: KitNumber, triggerMode: 'manual' });
        localStorage.setItem('Loops-ptn_'+window['userPattern'].id, ptnString);

      } else {
          if( $('#patterns').length ) {
            var ptnId = $('#patterns').find(":selected").val();            
          } else {
            var ptnId = 0;
          }
        console.log('input change:', $item.find("input").val(), _id);  
        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: $item.find("input").val(), y: 0, patternId: ptnId, classs: classs}); // 2 - $item.val()
      }
      /*$('body').on('touchend', _onMouseUp);
      $('body').on('touchcancel', _onMouseUp);*/
    };
/*
    var _onMouseUp = function() {
      $item.off('touchmove', _onMouseMove);
    };

    var _onResize = function() {

      if (_timeoutId) {
        clearTimeout(_timeoutId);
      }

      _timeoutId = setTimeout(function() {
        _width = $item.width();
        _height = $item.height();
      }, 300);

    }; */

    /**
     * Adds all the listeners to the elements.
     *
     * @private
     * @function
     */
    var _addEventListeners = function() {
      $item.on('change', _onMouseDown); //  - click
      //$(window).on('resize', _onResize);
    };

/*
    var _draw = function() {
      $item = $('<div>').attr('class', 'fx-panel').attr('id', 'panel_' + _id);
      $item.append('<label>' + _name + '</label>');
      $item.appendTo($container);
    }; */

    
    var _drawTempoInput = function(name) {
      $item = $('<div class="ctrlchange" id="id'+_id+'">'); // $itemContainer
      //$item = $('<input>');

      if (_id==995) {      
        $item.append('<input type="text" id="pattern-name" value="'+ window['userPattern'].name +'"/><label>Enter pattern name to be saved</label>');
        //$('#pattern-name').val(window['userPattern'].name);
        //console.log('ptn name: ', window['userPattern'].name)
      }      

      var instrumentsConfig = window.insConf; // beware hardcoded value!

      // following value calculation code should be out of INPUT !!!!
      if (_id>=800 && _id<809) {
        var instrumentsConfig = window.insConf;
        
        var channelId = _id.toString();//"'"+_id+"'";
        var channelId = channelId.charAt(channelId.length-1); // channelId.charAt(2);

        
        //console.log('instrumentsConfig: ', instrumentsConfig);
        var bgColor = instrumentsConfig[channelId].conf[instrumentsConfig[channelId].trackSet].color;
        $item.append('<input value="'+_value+'" style="background:'+bgColor+';">');
      } else {
        $item.append('<input value="'+_value+'">');  
      }

      if (_id==998) {      
        console.log('input insconf: ', instrumentsConfig, window.insConf);
        var channelKitNumber = instrumentsConfig[_channelId].conf.length-1;
        $item.append('<label>'+name+' (0>'+channelKitNumber+')</label>');
      } else {
        $item.append('<label>'+name+'</label>');
      }  
      
      $item.appendTo($container);
    };    

    var _setup = function() {
      _addEventListeners();
    };

    /**
     * Initializes the component
     *
     * @private
     * @function
     * @return {mixr.ui.Search} A reference to this instance.
     */
    this.initialize = function() {
      //_draw();
      _drawTempoInput(_name);
      _setup();
      //_onResize();
      return this;
    };

  };

}());
