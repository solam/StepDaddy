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
      var presetClass = $('#presets').find(":selected").attr('class');
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


  if ( typeof $container !== 'undefined' ) {    


      if (/*_id==998*/ $container.context.id=='kits') {
      //*  
      var elementId = $('#kits').find(":selected").val();
      var classs = $('#patterns').find(":selected").attr('class'); // 'user'; // 
      var patternId = $('#patterns').find(":selected").val();

      //console.log('id:', $container.attr("id", _id));  

      _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: elementId, y: 0, /*pattern: 1,*/ classs: classs, kitNumber: elementId, patternId: patternId, presetId: presetId, ptnSeq: ptnSeqString}); // presetId
      //*/
      //_self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: kitId, y: 0, preset: 1, /*pattern: 1,*/ classs: patternClass, kitNumber: kitId, patternId: patternId, presetId: presetId});


      } else if ($container.context.id=='patterns' || $container.attr("class")=='pttns') { 


      //console.log('id:', $container.attr("id"));  

      var selectId = $container.attr("id");
    
      // remove [unsaved pattern] option
      if ($('#'+selectId+' option[value="0"]').length>0 ) { // '#patterns =>'#'+selectId+'
        $('#'+selectId+' option[value="0"]').remove();
      }  



      var classs = $('#'+selectId).find(":selected").attr('class');
      var elementId = $('#'+selectId).find(":selected").val();

      var elementName = $('#'+selectId).find(":selected").text();

      

      

    //if ( typeof window.lastrigel !== typeof undefined && window.lastrigel !== elementId || typeof window.lastrigel == typeof undefined ) {   
      if ( typeof window.lastrigel !== 'undefined' && window.lastrigel !== elementId || typeof window.lastrigel === 'undefined' ) {

      //console.log('elementId', elementId, _id);   

      //console.log('selct option value changed', $('#patterns').find(":selected").text() , $('#patterns').find(":selected").val() ); // $item.find("option").val()
      _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: elementId, y: 0, pattern: 1, classs: classs, kitNumber: $('#id998').find("input").val(), patternId: patternId, ptnSeq: ptnSeqString}); 

      window.lastrigel = elementId;
    }

         var attr = $('#'+selectId).find(":selected").attr('data-notemin');

        // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
        if (typeof attr !== typeof undefined && attr !== false) {
          window['notesPerLine'] = {};
          window['notesPerLine'].min = $('#'+selectId).find(":selected").attr('data-notemin');
          window['notesPerLine'].max = $('#'+selectId).find(":selected").attr('data-notemax');

          /*$("#notemin").html('noteMin: '+window['notesPerLine'].min); 
          $("#notemax").html('noteMax: '+window['notesPerLine'].max); */         
        }




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
          //result[0] = window['userPattern'];
          //var trackNumber = result[0].tracks.length;
        }

        //console.log('ddmenu: ', classs, result[0]);
        if ( $('#pattern-editor tr').length > 0 ) {
          var channelId = $('#pattern-editor tr').first().attr('data-id').split('-')[0]; // $('#pattern-editor tr').first().attr('data-id'); 
        //console.log('sys ptns + data: ', this._systemPatterns, data, result[0], channelId);
        } else {
          var channelId = _channelId;
        }

        //console.log('channelId: ', channelId);

        notesObject = [];



      window['userPattern'] = {
          'tracks' : []
      };


if ( top !== self ) { // we are in the iframe
  window.inIframe = 1;
} else { // not an iframe
  window.inIframe = 0;
}


        if ( typeof window.ptnEdit == 'undefined' ) {
          window.ptnEdit = 0; // 0         
        }  

        /*
        // fol. computation/css-js animation too "heavy" for iFrame context: 'causes audio freezes/strutters
        if ( window.inIframe == 1 && window.stepSeq == 1 ) {
          window.ptnEdit = 0; // 3
        } else if ( window.inIframe == 1 && window.stepSeq == 0 ) {
          window.ptnEdit = 0;
        }  
        */

//console.log('selectId', selectId, window.ptnEdit);

if (window.ptnEdit==0 && selectId=='patterns' || window.ptnEdit==1 && selectId=='selpatternedit') {


        if ( typeof window['userPatternEdit'] !== 'undefined' && window.ptnEdit==1 ) {
          //delete window['userPatternEdit'];          
        }  

        // first reset grid
        var availTrackNumber = $("#pattern-editor table tr").length;
        //console.log('availTrackNumber: ', availTrackNumber);

        for (var n = 0, len = availTrackNumber; n < len; n += 1) {
          var notesNumber = 16;
          window['userPattern'].tracks[n] = [];

          if (window.ptnEdit==1 ) {
            window['userPatternEdit'] = { 'tracks' : [] }; 
            window['userPatternEdit'].name = elementName;
            window['userPatternEdit'].id = elementId;
            window['userPatternEdit'].classs = classs;
            window['userPatternEdit'].tracks[n] = [];
          }

          //console.log('win usr ptn: ', window['userPattern']);

          for (var l = 0; l < notesNumber; l += 1) {
            noteInfo = {};
            noteInfo.id = channelId;
            noteInfo.trackId = channelId+'-'+n;
            noteInfo.noteId = l;
            noteInfo.volume = 0;
            window['userPattern'].tracks[n][l]=0;

/*if ( window.inIframe == 0 || window.inIframe == 1 && window.stepSeq == 0) {            
  _updateNote(noteInfo); // updateNote(noteInfo);
} */

if ( window.inIframe == 0 ) { // if window.inIframe == 1 use rate limiter to draw notes slower as not too fuckup/ cause glitches on sound           
  _updateNote(noteInfo); 
} else if ( window.inIframe == 1 && window.stepSeq == 0 ) {
  //window.ratelimitPresetChange.schedule(function() {  
    _updateNote(noteInfo);
    //window.sleep(100); // dump experiment: will freeze browser!!
  //});  
}



            //console.log('noteInfo: ',noteInfo);
          }  
        } 



if ( typeof result !== 'undefined' ) {

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

              if (window.ptnEdit==1) {
                window['userPatternEdit'].tracks[n][l]=traack[l];
              }

              //window['SEQVIEW'].updateNote(noteInfo);
              //if noteInfo.volume>0 {
              //notesObject.push(noteInfo);            
              //}




if ( window.inIframe == 0 ) { // if window.inIframe == 1 use rate limiter to draw notes slower as not too fuckup/ cause glitches on sound           
  _updateNote(noteInfo); 
} else if ( window.inIframe == 1 && window.stepSeq == 0 ) {
  //window.ratelimitPresetChange.schedule(function() {  
    _updateNote(noteInfo);
  //});  
}
              //console.log('noteInfo at ddmenu change: ',noteInfo);

            }  
            //var notes = result[0].tracks[n].getNotes(); // 
            //anextInstrument.tracks[n].setNotes(notes);

          }
        } 




    }    



}






      } else if ($container.context.id=='presets') { 
    
      // remove [unsaved preset] option
      if ($('#presets option[value="0"]').length>0 ) {
        $('#presets option[value="0"]').remove();
      }  

      // remove [undefined preset] option
      if ($('#presets option[value="undefined"]').length>0 ) {
        $('#presets option[value="undefined"]').remove();
      }  


      /*if (window.ptnEdit==1) {
      _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: 201, ptnEditState: 1});
      } else if (window.ptnEdit==0) {
      _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: 201, ptnEditState: 0});  
      }  */

  /*    
      $("#ctrl1 #input1").val(5);

      $( "#input1" ).trigger( "focus" );


var e = jQuery.Event("keydown");
e.which = 13; // # Some key code value
$("#ctrl1 #input1").trigger(e); 
/

var xTriggered = 0;
$( "#input1" ).keydown(function( event ) {
  if ( event.which == 13 ) {
   event.preventDefault();
  }
  //xTriggered++;
  //var msg = "Handler for .keydown() called " + xTriggered + " time(s).";
  //$.print( msg, "html" );
  //$.print( event );
});
/*
var e = jQuery.Event("keydown");
e.which = 13;/
$("#input1").focus().val('15'); //.keydown(); //.trigger(e);

var elem = document.getElementById('input1');

elem.addEventListener('keydown', (event) => {
  console.log(`key: ${event.key} has been pressed down`);
});

elem.dispatchEvent(new KeyboardEvent('keydown',  {'key':'Enter'}));

//$('#input1').focus().trigger({type: 'keydown', which: 13, keyCode: 13});

/*
var e = $.Event( "keypress", { which: 13 } );
$('#input1').trigger(e);/

e = $.Event('keyup');
e.keyCode= 13; // enter
$('input#input1').trigger(e);



var keypressSlider = document.getElementById('slider1');
keypressSlider.noUiSlider.set(50);

*/


var controls = window.llccontrols;



                //
  var taarget = presetId;
  var taarget = taarget.toString();


var preset = window.allPresets.filter(function( obj ) { // _model.instrument.channelInfo.presets
  return obj.id == taarget // "2fbdd99d0000";  //
});

//console.log(preset, preset[0].controls[1]);





if ( controls != 0 && preset[0] !=0 && typeof preset[0] !== 'undefined') {

          for ( var j = 0; j < controls.length; j++ ) {

              var input = input + j;

              if (controls[j].type=='ddmenu') {



var valll = preset[0].controls[controls[j].id];
            $('#selectid'+controls[j].id+' option[value='+valll+']').prop('selected',true);


              } else if (controls[j].type=='slider') {

                var keypressSlider = document.getElementById('slider'+controls[j].id);
                keypressSlider.noUiSlider.set(preset[0].controls[controls[j].id]);




              } 

           } // end for loop

}







      //console.log('selct option value changed', $('#presets').find(":selected").text() , $('#presets').find(":selected").val(), presetId ); // $item.find("option").val()
      _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id,/*, x: 0, y: 0,*/ preset: 1, pattern: 1, classs: presetClass/*patternClass*/, kitNumber: kitId, patternId: patternId, presetId: presetId, ptnSeq: ptnSeqString}); 

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
      
} // end of variable check (not undefined)

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

//* // commented may 6 '19
        $($container).off('change', _onMouseDown).on('change', _onMouseDown,function(e) {
          if(e.handled !== true) { // This will prevent event triggering more then once
            //console.log('select element linked to change action');
            e.handled = true;
            _onMouseDown(e);
          }
        }); 
//*/

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

      if (typeof controlObject !== 'undefined' && controlObject !== null) {

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


        if (typeof controlObject.notenb !== 'undefined') {
          var cusElNoteNb = 'data-notemin="'+controlObject.notenb[0]+'" data-notemax="'+controlObject.notenb[1]+'"'; //
        } else {
          var cusElNoteNb = '';
        } 

        



        $item = $('<option '+selected+' class="'+drawClass+'" id="option'+_elementId+'" value="'+value+'"'+cusElNoteNb+'>'+name+'</option>'); // $itemContainer - _id
        //var instrumentsConfig = window.insConf;
        //$item.append('<canvas nx="slider" id="slider'+_id+'" min="0" max="100" label="'+name+'"></canvas>');  
        //$item.append('<option id="slider'+_id+'" value="'+_id+'">'+name+'</option>');  
              
        $item.appendTo($container);
        //console.log('dollar cont:', $container);

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
      _drawController(_name);
      _setup(_id);
      return this;
    };

  };

}());
