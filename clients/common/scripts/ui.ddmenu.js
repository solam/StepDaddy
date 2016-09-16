(function() {

  mixr.ui.Ddmenu = function(id, name, container, value, controlObject, channelId, elementId, selectedOption) {

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
    var _elementId = elementId;
    var _selectedOption = selectedOption;

    /**
     * This objecvt will hold all the references to ui elements.
     *
     * @private
     * @type {Object}
     */
    var _ui = {};


    var _updateNote = function(data) {
      $track = $('[data-id="' + data.trackId + '"]');
      $note = $track.find('td').eq(data.noteId + 1);

      //console.log('!updateNote', /*$note,*/ data);

      $note.toggleClass('active', data.volume > 0);
    };    

    var _onMouseDown = function(event) {

      //console.log('cont context id: ', $container.context.id);

      /*console.log('input value changed', $item.find("input").val());
      _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: $item.find("input").val(), y: 0}); // 2 - $item.val() */

      event.stopPropagation();
      //console.log('change recognized', event);


      var kitId = $('#kits').find(":selected").val();
      var presetId = $('#presets').find(":selected").val();
      var patternClass = $('#patterns').find(":selected").attr('class'); // 'user'; // 
      var patternId = $('#patterns').find(":selected").val();


      if (typeof window.stepSeq !== 'undefined') {
        window.ptnSeq = {};
        window.ptnSeq.list = window.patternSequencer;
        window.ptnSeq.state = window.stepSeq;
        var ptnSeqString = JSON.stringify(window.ptnSeq);
      } else {
        var ptnSeqString = 0;
      } 


      if (/*_id==998*/ $container.context.id=='kits') {
      //*  
      var elementId = $('#kits').find(":selected").val();
      var classs = $('#patterns').find(":selected").attr('class'); // 'user'; // 
      var patternId = $('#patterns').find(":selected").val();



      _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: elementId, y: 0, /*pattern: 1,*/ classs: classs, kitNumber: elementId, patternId: patternId, presetId: presetId, ptnSeq: ptnSeqString}); // presetId
      //*/
      //_self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: kitId, y: 0, preset: 1, /*pattern: 1,*/ classs: patternClass, kitNumber: kitId, patternId: patternId, presetId: presetId});


      } else if ($container.context.id=='patterns') { 
    
      // remove [unsaved pattern] option
      if ($('#patterns option[value="0"]').length>0 ) {
        $('#patterns option[value="0"]').remove();
      }  



      var classs = $('#patterns').find(":selected").attr('class');
      var elementId = $('#patterns').find(":selected").val();

      //console.log('selct option value changed', $('#patterns').find(":selected").text() , $('#patterns').find(":selected").val() ); // $item.find("option").val()
      _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: elementId, y: 0, pattern: 1, classs: classs, kitNumber: $('#id998').find("input").val(), patternId: patternId, ptnSeq: ptnSeqString}); 


        if (classs=='channel') {
          var ptnStorage = window.channelPatterns;
        } else if (classs=='session') {       
          var ptnStorage = window.sessionPatterns;   
        } else {  
          var ptnStorage = window.localPatterns;
        }        

        var result = $.grep(ptnStorage, function(e){ return e.id == elementId; });
        if (typeof result[0] !== 'undefined') {
          var trackNumber = result[0].tracks.length; 
        } else {
          var trackNumber = 0;
        }



        var channelId = $('#pattern-editor tr').first().attr('data-id').split('-')[0]; // $('#pattern-editor tr').first().attr('data-id'); 
        //console.log('sys ptns + data: ', this._systemPatterns, data, result[0], channelId);

        notesObject = [];



      window['userPattern'] = {
          'tracks' : []
      };

        // first reset grid
        var availTrackNumber = $("#pattern-editor table tr").length;
        //console.log('availTrackNumber: ', availTrackNumber);

        for (var n = 0, len = availTrackNumber; n < len; n += 1) {
          var notesNumber = 16;
          window['userPattern'].tracks[n] = [];
          //console.log('win usr ptn: ', window['userPattern']);

          for (var l = 0; l < notesNumber; l += 1) {
            noteInfo = {};
            noteInfo.id = channelId;
            noteInfo.trackId = channelId+'-'+n;
            noteInfo.noteId = l;
            noteInfo.volume = 0;
            window['userPattern'].tracks[n][l]=0;
            _updateNote(noteInfo);
            //console.log('noteInfo: ',noteInfo);
          }  
        } 



        //console.log('trk nb: ', trackNumber);

        // than fill grid with corresponding data
        for (var n = 0, len = availTrackNumber; n < len; n += 1) { // trackNumber

          if (typeof result[0].tracks[n] !== 'undefined') {
            
            var notesNumber = result[0].tracks[n].length;
            var traack = result[0].tracks[n];
            //console.log("notesNumber + traack", notesNumber, traack);

            //var traackId = traack.id.split('-')[1];
             //traack.notes;

            //var notes = [];

            for (var l = 0; l < notesNumber; l += 1) {
              //notes[l] = traack[l];
              //_instruments[channelId].tracks[n].notes[l] = traack[l];
              //console.log("track, note, volume: ", n, l, traack[l]);

              noteInfo = {};
              noteInfo.id = channelId;
              noteInfo.trackId = channelId+'-'+n;
              noteInfo.noteId = l;
              noteInfo.volume = traack[l];

              window['userPattern'].tracks[n][l]=traack[l];

              //window['SEQVIEW'].updateNote(noteInfo);
              //if noteInfo.volume>0 {
              //notesObject.push(noteInfo);            
              //}


              _updateNote(noteInfo);
              //console.log('noteInfo: ',noteInfo);

            }  
            //var notes = result[0].tracks[n].getNotes(); // 
            //anextInstrument.tracks[n].setNotes(notes);

          }
        } 









      } else if ($container.context.id=='presets') { 
    
      // remove [unsaved preset] option
      if ($('#presets option[value="0"]').length>0 ) {
        $('#presets option[value="0"]').remove();
      }  





      //console.log('selct option value changed', $('#presets').find(":selected").text() , $('#presets').find(":selected").val() ); // $item.find("option").val()
      _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id,/*, x: 0, y: 0,*/ preset: 1, pattern: 1, classs: patternClass, kitNumber: kitId, patternId: patternId, presetId: presetId, ptnSeq: ptnSeqString}); 

/*
        if (classs=='channel') {
          var preStorage = window.channelPresets;
        } else if (classs=='session') {       
          var preStorage = window.sessionPresets;   
        } else {  
          var preStorage = window.localPresets;
        }        

        var result = $.grep(preStorage, function(e){ return e.id == elementId; });
        if (typeof result[0] !== 'undefined') {
          var trackNumber = result[0].tracks.length; 
        } else {
          var trackNumber = 0;
        }


/*
      window['userPreset'] = {
          'controls' : []
      }; */





      } else { 

        var optionValue = $('#'+$container.context.id).find(":selected").val();
        window['userPreset'].controls[_id] = optionValue;
        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: optionValue}); // , y: 0, patternId: ptnId, classs: classs



      } // end of id discrimination
      


    };


    /**
     * Adds all the listeners to the elements.
     *
     * @private
     * @function
     */
    var _addEventListeners = function(_id) {
      
        /*var sliderId= 'slider'+_id;
        console.log(sliderId);
        
        window[sliderId].on('*', function(data) {

        console.log(data.value);
        var skwerotedValue = Math.floor(data.value);
        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: skwerotedValue, y: 0});
        }); */

      //$item.on('change', _onMouseDown);


        $($container).off('change', _onMouseDown).on('change', _onMouseDown,function(e) {
          if(e.handled !== true) { // This will prevent event triggering more then once
            //console.log('select element linked to change action');
            e.handled = true;
            _onMouseDown(e);
          }
        }); 


/*
      if (_id==998) {
        //$('#kits').on('change', _onMouseDown);
        //console.log('event link made');

        $('#kits').off('change', _onMouseDown).on('change', _onMouseDown,function(e) {
          if(e.handled !== true) { // This will prevent event triggering more then once
            console.log('select element linked to change action');
            e.handled = true;
            _onMouseDown(e);
          }
        }); 


      } else {
        //$('#patterns').on('change', _onMouseDown);   

        $('#patterns').off('change', _onMouseDown).on('change', _onMouseDown,function(e) {
          if(e.handled !== true) { // This will prevent event triggering more then once
            console.log('select element linked to change action');
            e.handled = true;
            _onMouseDown(e);
          }
        }); 

      } 
*/
     // $item.on('change', _onMouseDown);

/*
$( "#kits" ).one( "change", function() {
_onMouseDown();
}); */








/*
$('#kits').on('change', '#kits',function(e) {
        if(e.handled !== true) // This will prevent event triggering more then once
        {
            console.log('select element linked to change action');
            e.handled = true;
        }
    }); 
*/



    };
    
    var _drawController = function(name) {

      //console.log('ddmenu cont: ', $container.context.id);

      //console.log('ctrl obj ', controlObject);

      if (typeof controlObject.classs !== 'undefined') {
        var drawClass = controlObject.classs; //'class="'+value.classs+'"';
      } else {
        var drawClass = 'random';
      } 

      if (_selectedOption==value) {
        var selected = 'selected';
      } else {
        var selected = '';
      }

      $item = $('<option '+selected+' class="'+drawClass+'" id="option'+_elementId+'" value="'+value+'">'+name+'</option>'); // $itemContainer - _id
      //var instrumentsConfig = window.insConf;
      //$item.append('<canvas nx="slider" id="slider'+_id+'" min="0" max="100" label="'+name+'"></canvas>');  
      //$item.append('<option id="slider'+_id+'" value="'+_id+'">'+name+'</option>');  
            
      $item.appendTo($container);
      //console.log('dollar cont:', $container);
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
      _drawController(_name);
      _setup(_id);
      return this;
    };

  };

}());
