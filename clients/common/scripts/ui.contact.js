(function() {

  // user interface on/off switch/trigger button
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
     * This object will hold all the references to ui elements.
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

      // save pattern
      if (_id==995) {
        var KitNumber = $('#kits').find(":selected").val(); 
        //var patternId = $('#patterns').find(":selected").val();
        window['userPattern']._name_ = $('#pattern-name').val();
        window['userPattern'].id = uuid.v1();

        // put 'name' object key as first key to appear into Webstorage key=>value display
        var alphaAscSortedUserPattern = sortObj(window['userPattern'],'asc');
        var ptnString = JSON.stringify(alphaAscSortedUserPattern); 
        var ptnString = ptnString.replace('_name_', 'name'); 

         //console.log('ptnString', ptnString);

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

      // save preset
      } else if (_id==991) {

        var presetClass = $('#presets').find(":selected").attr('class');

        var KitNumber = $('#kits').find(":selected").val(); 
        
        window['userPreset'].id = uuid.v1();
        //userPresetReformatted = window['userPreset'];

        userPresetReformatted = {};

        window['userPreset']._name_ = $('#preset-name').val();
        userPresetReformatted.name = $('#preset-name').val();
        //userPresetReformatted._name_ = $('#preset-name').val();

        // clone object properties here to avoid UI fuckups (aka when changing preset via drop down menu slider setup & sound rendering does not change)
        userPresetReformatted.classs = 'user'; // channel
        userPresetReformatted.controls = JSON.parse(JSON.stringify(window['userPreset'].controls));
        userPresetReformatted.id = JSON.parse(JSON.stringify(window['userPreset'].id));

        delete window['userPreset'].iplname;
        
        var alphaAscSortedUserPreset = sortObj(window['userPreset'],'asc');
        var preString = JSON.stringify(alphaAscSortedUserPreset); 
        var preString = preString.replace('_name_', 'name');  


        //userPresetReformatted._name_ = null;
        //unset(userPresetReformatted._name_);
        //delete userPresetReformatted._name_;

        //window.allPresets.push(window['userPreset']);
        window.allPresets.push(userPresetReformatted);

        window.allPresets = window.allPresets.filter((set => f => !set.has(f.id) && set.add(f.id))(new Set));
        window.allPresets = window.allPresets.filter(function(val){return val});

        //console.log('presets', window.allPresets);

        //console.log('preset controls: ', window['userPreset'].controls); // preString, window['userPreset']

        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: $item.find("input").val(), y: 0, preset: preString, classs: presetClass, kitNumber: KitNumber, triggerMode: 'manual', patternId: patternId, presetId: window['userPreset'].id, ptnSeq: ptnSeqString});
        localStorage.setItem('Loops-pre_'+window['userPreset'].id, preString);
        $itemOption = $('<option class="user" id="option'+window['userPreset'].id+'" value="'+window['userPreset'].id+'">'+window['userPreset']._name_+'</option>');
        $itemOption.appendTo(document.getElementById('presets'));
        if( $('#presets').length ) {
          // so that preset id is populated, to allow saving part right after preset creation (no need to refresh page/channel - manually change preset)  
          $('#presets option[value="' + window['userPreset'].id + '"]').prop('selected',true).trigger('change');;
        }



        



      // save song (conductor role)
      } else if (_id==986) {

        var currts = Date.now();

        window['song_'+currts] = {};
        window['song_'+currts].id = uuid.v1();
        window['song_'+currts]._name_ = $('#song-name').val();





  partOrderMatrix = [];
  $("#played-parts .option").each(function( index ) {  
    //partOrderMatrix[index] = this.uid;
    var aaddii = $(this).attr('id').slice(3);
    partOrderMatrix.push(aaddii);
  });  


  mixerInfoMatrix = {};
  $("#modifiers .ctrlchange input").each(function( index ) {  
    var aaddii2 = this.id; // $(this).attr('id'); // .slice(3);
    //var prefiks7436 = $(this).attr('id')
    //partOrderMatrix.push(aaddii);

    //console.log(this.id);

    //*
    if ( aaddii2.substring(0,5) == 'input' ) {
      mixerInfoMatrix[aaddii2] = $(this).val();
      //mixerInfoMatrix.aaddii2 = $(this).val();
    } 
    //*/

    
    
    /*if ( aaddii2 == 'input99' ) {
      return false;
    } */

  });  

  window['song_'+currts].mixerInfo = mixerInfoMatrix;

  //console.log(mixerInfoMatrix); // partOrderMatrix


  //partCounter = 0;      

  $.each(window.partSequencer, function() {          
    //if (this.uid ==  
    this.order = partOrderMatrix.indexOf(this.uid)+1;
    //partCounter;    
    //console.log(this); 
    //partCounter = partCounter + 1;
  });    

// use object.order as object ordering criteria


// Trying not to fuck up current playback of parts
window.PartSeqAtSongSave = JSON.parse(JSON.stringify(window.partSequencer));

window.PartSeqAtSongSave.sort(function(a, b) {
  return parseFloat(a.order) - parseFloat(b.order);
});

  //console.log(window.partSequencer);


        window['song_'+currts].payload = window.PartSeqAtSongSave; // data; // window.partSequencer is a dynamic array used for parts' playback: array order may nor reflect initial saved part sequence by user

        var alphaAscSortedUserPreset = sortObj(window['song_'+currts],'asc'); // properties/params of object are alpha sorted (only for top/1st level in case of nested objects)
        var preString = JSON.stringify(alphaAscSortedUserPreset); 
        var preString = preString.replace('_name_', 'name');  

        localStorage.setItem('Loops-sng_' + window['song_'+currts].id, preString);

        // append song to select option:
        var containersongs = document.getElementById('avail-songs');                

        $option = $('<option id="option'+window['song_'+currts].id+'" value="'+window['song_'+currts].id+'">'+window['song_'+currts]._name_+'</option>'); // 
        $option.prependTo(containersongs);


        // Save song to file section // We can only save and export to.json file a song for which its parts, patterns & presets where previously saved to localstorage by user
        // it's not possible to resave a song that was loaded through ins_conf.js (song for which its parts, patterns & presets where not saved into localstorage)
//*
        var paarts = Object.keys(window.partSequencer);

        //var paartCount = 0;

        var partArray = [];
        var presetArray = [];
        var patternArray = [];

        for ( var i = 0; i < paarts.length; i++ ) {
          var partInSongOrder = window.partSequencer[i];           
          var partFromLocStor = localStorage.getItem('Loops-par_' + partInSongOrder.id);
          //partArray.push(partFromLocStor);

          var partStrToJsObj = JSON.parse(partFromLocStor);

          if ( partStrToJsObj != null ) {
            partArray.push(partStrToJsObj);
          }

          if ( partStrToJsObj != null ) {

            var partChannels = Object.keys(partStrToJsObj.payload);

            for ( var j = 0; j < partChannels.length; j++ ) {
              var channelInPart = partStrToJsObj.payload[j];      

              if ( typeof channelInPart.presetId !== 'undefined' ) {

                var preFromLocStor = localStorage.getItem('Loops-pre_' + channelInPart.presetId);
                var pretStrToJsObj = JSON.parse(preFromLocStor);

                if ( pretStrToJsObj != null ) {
                  presetArray.push(pretStrToJsObj);
                }

              }

              if ( typeof channelInPart.ptnSeqList !== 'undefined' ) {

                var chPatterns = Object.keys(channelInPart.ptnSeqList);

                for ( var k = 0; k < chPatterns.length; k++ ) {
                  var patternnn = channelInPart.ptnSeqList[k];  

                  var ptnFromLocStor = localStorage.getItem('Loops-ptn_' + patternnn.id);
                  var ptntStrToJsObj = JSON.parse(ptnFromLocStor);
                  
                  if ( ptntStrToJsObj != null ) {
                    patternArray.push(ptntStrToJsObj);
                  }
                }
              }
            }  
          }
        }  
        //console.log(getUnique(patternArray,'id'));
        //console.log(removeDuplicates(patternArray, 'id'));
        //console.log(removeDuplicates(presetArray, 'id'));
        //console.log(removeDuplicates(partArray, 'id'));


        var noDupPattern = removeDuplicates(patternArray, 'id');

        noDupPattern.forEach(function (element) {
          element.classs = "channel";
        });       

        var noDupPreset = removeDuplicates(presetArray, 'id');

        noDupPreset.forEach(function (element) {
          element.classs = "channel";
        });     

        //console.log(noDupPattern, noDupPreset);

        alphaAscSortedUserPreset.parts = removeDuplicates(partArray, 'id');
        alphaAscSortedUserPreset.patterns = noDupPattern;
        alphaAscSortedUserPreset.presets = noDupPreset;

        var songStr = JSON.stringify(alphaAscSortedUserPreset); 
        var songStr = songStr.replace('_name_', 'name');  

        //var text = document.getElementById("text-val").value;
        var filename = window['song_'+currts]._name_+".json";
        
        download(filename, songStr);


      // save part (conductor role)  
      } else if (_id==987) {
        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id/*, x: $item.find("input").val(), y: 0, preset: preString, classs: presetClass, kitNumber: KitNumber, triggerMode: 'manual', patternId: patternId, presetId: window['userPreset'].id, ptnSeq: ptnSeqString*/});
      } else {
        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: 1, y: 0}); // , patternId: ptnId, classs: classs
      }

    };



    /**
     * Adds all the listeners to the elements.
     *
     * @private
     * @function
     */
    //var _addEventListeners = function(_id) {
    //};


    
    var _drawSlider = function(name, usedLibrary) {

      var classs = $('#patterns').find(":selected").attr('class');
      $item = $('<div class="ctrlchange button contact" id="button'+ _id +'">'); 

      if (_id==995) {      
        $item.append('<input type="text" class="save" id="pattern-name" value="'+ window['userPattern']._name_ +'"/><label>Type pattern name</label><a href="javascript:void(null);" class="trigger-button">Save pattern</a>'); // new <div class="input-container">
      
      } else if (_id==991) {      
        //$item.append('<input type="text" class="save" id="preset-name" value="'+ window['userPreset']._name_ +'"/><label>Type sound name</label><a href="#" class="trigger-button">Save sound</a>'); 
        $item.append('<input type="text" class="save" id="preset-name" value="'+ window['userPreset'].iplname +'"/><label>Type preset name</label><a href="javascript:void(null);" class="trigger-button">Save preset</a>'); // 
      
      }  else if (_id==997) {  
        $item.append('<a href="javascript:void(null);" class="trigger-button">Change Channel</a>'); // Switch

      } else if (_id==987) {      
        // '+ window['userPart']._name_ +'
        $item.append('<input type="text" class="save" id="part-name" value=""/><label>Type part name</label><a href="javascript:void(null);" class="trigger-button">Save part</a>'); // <a href="#"
      
      } else if (_id==986) {      
        // '+ window['userPart']._name_ +'
        $item.append('<input type="text" class="save" id="song-name" value=""/><label>Type song name</label><a href="javascript:void(null);" class="trigger-button">Save & DL song</a>'); // <a href="#"
      }  

      $item.appendTo($container);

      touchClick("#button"+_id+" a.trigger-button", 'touchstart mousedown', function(e) {
        e.preventDefault();
        _onMouseDown();      
      }) 


      if (usedLibrary=='Interface') {

         var slider = new Interface.Button({ 
          //bounds:[.65,.05,.3,.9],
          bounds:[0,0,1,1],
          //value: _value/100,
          mode:'contact',
          label:'ptn save'
        });

      } 

    };    



    //var _setup = function(_id) {
    //  _addEventListeners(_id);
    //};

    /**
     * Initializes the component
     *
     * @private
     * @function
     * @return {mixr.ui.Search} A reference to this instance.
     */
    this.initialize = function() {
      _drawSlider(_name, _usedLibrary);
      //_setup(_id);
      return this;
    };

  };

}());
