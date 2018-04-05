(function() {

  /**
   * The PatternEditor class is responsible for the search UI component
   *
   * @constructor
   * @class PatternEditor
   * @param {Object} id The id of this specific connection.
   */
  mixr.views.PatternEditor = function(item) {

    /**
     * Mixins
     */
    mixr.mixins.Wrapper.call(this);

    var _self = this;

    var trackCount = 0;

    var $item = item;
    var $table = $item.find('table');
    var $keyboard = $item.find('div');// document.getElementById('keybox');

    //var $itemAddClass = $item.addClass( "myClass yourClass" );
    //var controllers = document.getElementById('modifiers');

    var _onToggleNote = function() {

      //if (trackCount === 0) {
       // _renderHeader(16);
      //}



      

      if (window.stepSeq==1) {
/*
         var classs = $('#patterns').find(":selected").attr('class');
         var presetId = $('#presets').find(":selected").val();    
         var patternId = $('#patterns').find(":selected").val();
         var KitNumber = $('#kits').find(":selected").val(); 
         
         window['userPattern']._name_ = 'ch' + window.channelNumber + '_bar' + window.playedPatternOrder +'_onTheFly';
         window['userPattern'].id = 'ch' + window.channelNumber + '_bar' + window.playedPatternOrder +'_onTheFly';

         // put 'name' object key as first key to appear into Webstorage key=>value display
         var alphaAscSortedUserPattern = sortObj(window['userPattern'],'asc');
         var ptnString = JSON.stringify(alphaAscSortedUserPattern); 
         var ptnString = ptnString.replace('_name_', 'name'); 



        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: 995, x: KitNumber, y: 0, pattern: ptnString, classs: classs, kitNumber: KitNumber, triggerMode: 'manual', patternId: window['userPattern'].id, presetId: presetId});
        
        localStorage.setItem('Loops-ptn_'+window['userPattern'].id, ptnString);


        $itemOption = $('<option class="user" id="option'+window['userPattern'].id+'" value="'+window['userPattern'].id+'">'+window['userPattern']._name_+'</option>');
        $itemOption.appendTo(document.getElementById('patterns'));
        if( $('#patterns').length ) {
          $('#patterns option[value="' + window['userPattern'].id + '"]').prop('selected',true);
        } */

      } else {

        if ($('#patterns option[value="0"]').length>0 ) {
          $('#patterns option[value="0"]').remove();
        }

        $itemOptionUnsaved = $('<option class="user unsaved" id="option00001" value="0">[unsaved pattern]</option>');
        $itemOptionUnsaved.appendTo(document.getElementById('patterns'));
        $('#patterns option[value="0"]').prop('selected',true);

      }


      var noteIndex = $(this).index();

      if (noteIndex === 0) return;

      noteIndex--; // compensate for label




      //var activeNotesPerLine = $('.' + myclassname).length;

      
      //$("#pattern-editor tr[data-id='0-0'] td.active").length;


      // limit number of notes allowed per line for user
      var adi = $(this).parent().data('id');
      //var maxPossNotes = $("#pattern-editor tr[data-id='"+adi+"'] td").length;

      if (typeof window['notesPerLine'] !== 'undefined') { // kill when loading pattern without noteLimitation param
        var notesAllowed = window['notesPerLine'].max;
        var notesAllowedMin = window['notesPerLine'].min;

      } else if (typeof window['conductorNotesPerLine'] !== 'undefined') { // .min
        var notesAllowed = window['conductorNotesPerLine'].max;
        var notesAllowedMin = window['conductorNotesPerLine'].min;
      } else {
        var notesAllowed = 16;
        var notesAllowedMin = 0;
      }

      $("#notemin").html('noteMin: '+notesAllowedMin); 
      $("#notemax").html('noteMax: '+notesAllowed);         

      
      var activeNotes = $("#pattern-editor tr[data-id='"+adi+"'] td.active").length;

      //window.activeNotes = activeNotes;
      window.notesAllowedMin = notesAllowedMin;
      window.notesAllowedMax = notesAllowed;
      
      //console.log('active, min, max:',  activeNotes , notesAllowedMin, notesAllowed);

      if (activeNotes == notesAllowedMin && activeNotes == notesAllowed && notesAllowedMin == notesAllowed && $(this).hasClass('active')) {
//freezePtn = 1; //solution A
freezePtn = 0; //solution B
        //console.log('freeze! ');
        //alert('block ptn edition');
      } else {
        freezePtn = 0;
      }




      /*if ( $(this).hasClass('active') ) {
        if (activeNotes == notesAllowedMin) {
          var clickedNoteWasActive = 1;
        }

        
      } else {
        var clickedNoteWasActive = 0;
      } */

      



      /* solution A
      if ( $(this).hasClass('active') && activeNotes > notesAllowedMin && activeNotes < notesAllowed && activeNotes != notesAllowedMin && freezePtn == 0) { // && notesAllowedMin > activeNotes - && activeNotes+1 > notesAllowedMin - 
        //console.log('clickedNoteWasActive', activeNotes, notesAllowedMin);
        $(this).removeClass('active');
        var isItOn = 0;
      } else if (    activeNotes < notesAllowed && freezePtn == 0) { // !$(this).hasClass('active') && && activeNotes >= notesAllowedMin-1 - && activeNotes != notesAllowedMin - && freezePtn == 0
        $(this).addClass('active');
        var isItOn = 1;
      } //*/


      // solution B
      if ( $(this).hasClass('active') && activeNotes != notesAllowedMin ) { // >
        $(this).removeClass('active');
        var isItOn = 0;
      } else if ( !$(this).hasClass('active') && activeNotes < notesAllowed ) { 
        $(this).addClass('active').removeClass('playedbar');
        var isItOn = 1;
      }      




/*
      if ( /*$(this).hasClass('active') &&/ activeNotes > notesAllowedMin && activeNotes < notesAllowed) { // && notesAllowedMin > activeNotes - &&/ activeNotes+1 > notesAllowedMin - && freezePtn == 0
        console.log('remPass:',  activeNotes);
        $(this).removeClass('active');
        var isItOn = 0;
      } 

      if ( activeNotes > notesAllowedMin && activeNotes < notesAllowed) { // !$(this).hasClass('active') && && activeNotes >= notesAllowedMin-1 - && activeNotes != notesAllowedMin - && freezePtn == 0
        console.log('addPass:',  activeNotes);
        $(this).addClass('active');
        var isItOn = 1;
      }
*/


      

        //var isItOn = $(this).toggleClass('active').hasClass('active');
        //console.log('You clicked me dude', this, noteIndex, $(this).parent().index(), isItOn ? 1 : 0);    

      //if ( !$('#pattern-editor table').hasClass("ptn-edit") ) {

      if ( freezePtn == 0) {  
        _self.emit(mixr.enums.Events.NOTE, {
          volume: isItOn ? 1 : 0,
          note: noteIndex,
          trackId: $(this).parent().data('id'),
          patternId: $('#patterns').find(":selected").val()
        });
      }  

      //}  



    };



    /**
     * Adds all the listeners to the elements.
     *
     * @private
     * @function
     */
    var _addEventListeners = function() {
      $table.on('click', 'td', _onToggleNote);
    };






    /*
    var _startPlayHead = function () {
      var playheadDuration = 60 / 120 * 4;
      var $playhead = $('#playhead');
      $playhead.css('-webkit-animation-duration', playheadDuration + 's');
    };
    */
    this.drawPlayhead = function (beat) {
      //console.log('beat', beat);
      /*var $tds = $('th:nth-child(' + (beat + 2) + ')');
      $tds.on('webkitAnimationEnd', function () {
        $tds.removeClass('beat');
      });
      $tds.addClass('beat');*/
    };


    this.addTrack = function (track, color) {
      //console.log('addTrack', track);
  
      // Check if we already have a row for that track
      if ($table.find('tr[data-id="' + track.id + '"]').length > 0) {
        return;
      }

      if (trackCount === 0) {
        _renderHeader(track.notes.length); // 
        //console.log('trk note length:', track.notes.length);
      }

      var $row = $('<tr>').attr('data-id', track.id);

      $row.append($('<td class="notepitch"><h1>' + track.name + '</h1></td>'));

      for (var i = 0; i < track.notes.length; i++) {
        var $td = $('<td>');
        var number = i+1;
        var stepNumber = '0' +number;
        var stepNumber = stepNumber.slice(-2);
        //$td.append(i+1);
        $td.append(stepNumber);
        if (track.notes[i] === 1) {
          $td.addClass('active');
        }
        $row.append($td);
      }

      $row.css('background', color);
      $table.append($row);
      trackCount++;
    };



    this.addKey = function (track, color) {
      //console.log('addTrack', track);
  
      // Check if we already have a key for that track
      //if ($keyboard.find('span[class="trk' + track.id + '"]').length > 0) {
      if ($keyboard.find('span[id="k' + track.note + '"]').length > 0) {        
        return;
      }

      if (trackCount === 0) {
        _renderHeader(track.notes.length);
      }

      var $key = $('<span>').attr('class', 'white key trk'+track.id).attr('id', 'k'+track.note);

      $key.append($('<span>' + track.name + '</span>'));

      /*for (var i = 0; i < track.notes.length; i++) {
        var $td = $('<td>');
        var number = i+1;
        var stepNumber = '0' +number;
        var stepNumber = stepNumber.slice(-2);
        //$td.append(i+1);
        $td.append(stepNumber);
        if (track.notes[i] === 1) {
          $td.addClass('active');
        }
        $row.append($td);
      } */

      $key.css('background', color);
      $keyboard.append($key);
      trackCount++;
    };



    var _renderHeader = function (length) {
      var $head = $('<thead>');
      for (var i = 0; i < length+1; i++) {
        var $th = $('<th>');
        $head.append($th);
      }

      //$head.children().eq(0).attr('id', 'playhead');

      $table.append($head);

      //console.log('$head', $head);
    };

    /**
     * Shows an HTML element
     * @return {mixr.views.PatternEditor} A reference to this instance.
     */
    this.show = function() {
      $item.show();

      //_startPlayHead();

      return this;
    };

    /**
     * Initializes the component
     *
     * @private
     * @function
     * @return {mixr.views.PatternEditor} A reference to this instance.
     */
    this.initialize = function() {
      _addEventListeners();
      return this;
    };

  };

}());
