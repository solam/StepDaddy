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
     * This object will hold all the references to ui elements.
     *
     * @private
     * @type {Object}
     */
    var _ui = {};

    /*var _onMouseDown = function() {
      console.log('input value changed', $item.find("input").val());
    }; */


    /**
     * Adds all the listeners to the elements.
     *
     * @private
     * @function
     */
    var _addEventListeners = function(_id) {

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

          var presetId = $('#presets').find(":selected").val();

          var skwerotedValue = Math.floor(input.value);

          //console.log('skwerotedValue', skwerotedValue);

          if (skwerotedValue!==0) { // exclude muting operation from being reced as old slider value before level cut operation
            window['oldSliVal'+_id] = skwerotedValue;
          } 


          if (typeof window['userPreset'] !== 'undefined') { 
            window['userPreset'].controls[_id]=skwerotedValue;
          }

          
          if (typeof window['SEQ'] !== 'undefined') {

            var chId = ('' + _id).substr(-1);

            //var synthInstanceString = 'AikeWebsynth1' + '_' + chId; // bad: hardcoded instrument type
            var synthInstanceString = 'channel_' + chId;


            if ( typeof window[synthInstanceString] !== 'undefined' ) {
              //console.log('window[synthInstanceString]', window[synthInstanceString], chId, skwerotedValue, synthInstanceString, window[synthInstanceString].constructor.name); // , window[synthInstanceString].feg.a_delta
            

              if ( typeof window[synthInstanceString].feg !== 'undefined' ) { // window[synthInstanceString].feg.a_delta
                //eval(window[synthInstanceString]+'.volume.volume.gain.value='+skwerotedValue/100);
                window[synthInstanceString].volume.set(skwerotedValue/100);
                //console.log('window[synthInstanceString]', synthInstanceString, window[synthInstanceString] );
              }       


              if ( typeof window[synthInstanceString].moQuadruple !== 'undefined' ) { 
                window[synthInstanceString].onUpdateVolume(skwerotedValue);
              }         


              if ( typeof window[synthInstanceString].jsDrumMainvolume !== 'undefined' ) { 
                window[synthInstanceString].jsDrumMainvolume.gain.value=skwerotedValue/100;
              }  


              if ( typeof window[synthInstanceString].pcKeyHandler !== 'undefined' ) {                            
              //case 'fspaAudioWorkletPolySynth':
                      var chNumber = '';                       

                        eval(synthInstanceString+'.processor'+chNumber+'.port.postMessage({ id: "masterAmp", value: '+skwerotedValue/100+', minValue: 0, maxValue: 1})');
              //break;         
              console.log('skwerotedValue', skwerotedValue/100);                      
              }

            
           } 

//eval(window['channel_2']+'.volume.set(0)'); - window['channel_2'].volume.set(0.1);


/*
                  if (data.id<=900 && data.id>=800) {   // data.id>800

                    // make precue mixer tab volume independent aka not affected by volume changes made on conductor tab 
                    if (window.childRoom != 2) {  

                      var chNumber = controls[j].x.param.replace(/\D/g,'');

                      var channelNumber = chNumber; //controls[j].x.param.charAt(7);
                      //console.log('insName', chNumber); // _instruments[channelNumber].instrumentName


                      // Populate variable with instrument (ex: AikeWebsynth1) and its channel instance (ex: 0) object 
                      var synthInstance2 = 'channel_' + channelNumber;  
                      var synthInstance1 = window[synthInstance2];                      

                      //if (controls[j].x.param!='[external]') {
                      if (typeof synthInstance1 !== 'undefined') {
                        switch (_instruments[channelNumber].instrumentName) { // _instruments

                        case 'JoeSullivanDrumSynth':
                          eval(synthInstance2+'.'+controls[j].x.subParams.JoeSullivanDrumSynth+'.gain.value='+valueX*2); //
                          break;
                          
                        case 'AikeWebsynth1':
                          // value sent as parameter to synth instance object
                          eval(synthInstance2+'.'+controls[j].x.subParams.AikeWebsynth1+'('+valueX+')'); //
                          break;
                        case 'CWilsoWAMidiSynth':
                          eval(synthInstance2+'.'+controls[j].x.subParams.CWilsoWAMidiSynth+'('+valueX*100+')'); //
                          break;
                        case 'MrSynth':
                          eval(synthInstance2+'.'+controls[j].x.param+'='+valueX); // data.x
                          break;
                        case 'Sampler':
                          this[controls[j].x.param] = valueX;
                          //console.log('sampler vol:', this[controls[j].x.param]);
                          break; 
                        }
                      } 
                    }  
                  }
*/            


            if (typeof window[synthInstanceString] !== 'undefined') {
                switch (window[synthInstanceString].constructor.name) {

                  case 'jsDrumSynth':
                    eval(window[synthInstanceString]+'.jsDrumMainvolume.gain.value='+skwerotedValue/100); // data.x
                    break;

                  case 'CWilsoWAMidiSynth':
                    eval(window[synthInstanceString]+'.onUpdateVolume('+skwerotedValue+')');
                    break; 

                  case 'WebSynth':
                    eval(window[synthInstanceString]+'.volume.set('+skwerotedValue/100+')');
                    //console.log('aikeWS1', skwerotedValue/100 );                     
                  break;

              case 'fspaAudioWorkletPolySynth':
                      var chNumber = '';                       

                        eval(window[synthInstanceString]+'.processor'+chNumber+'.port.postMessage({ id: "masterAmp", value: '+skwerotedValue/100+', minValue: 0, maxValue: 1})');
              console.log('skwerotedValue', skwerotedValue/100);  

              break;    


                  /*case 'MrSynth':
                    eval(synthInstanceString+'.'+usedControls[j].x.param+'='+valueX); // data.x
                    break;*/

                  case 'Object':
                    window['SEQ']['_insVol'+chId] = skwerotedValue/100;
                    console.log('winSeq: ', window['SEQ']['_insVol'+chId]);
                    //console.log('sampler', skwerotedValue/100 );
                  break;                 
                }
            }

          } else {

            if ( !$('#pattern-editor').hasClass('control') ) {

              // send all controller/preset params at each individual param change
              //var presetClass = $('#presets').find(":selected").attr('class');
              //var KitNumber = $('#kits').find(":selected").val(); 
              
              if (typeof window.channelPresets !== 'undefined') {
                if (window.channelPresets.length > 0) { // 
                
                  window['userPreset']._name_ = window.channelPresets[0].name;//$('#preset-name').val();
                  window['userPreset'].id = window.channelPresets[0].id;//uuid.v1();
                  
                  var alphaAscSortedUserPreset = sortObj(window['userPreset'],'asc');
                  var preString = JSON.stringify(alphaAscSortedUserPreset); 
                  var preString = preString.replace('_name_', 'name');  
                }
              }
            }   

if (typeof _ctrlObj.x.minValue !== 'undefined') {


    Object.getOwnPropertyNames(Math).forEach(p => self[p] = Math[p]);

    var traitedVal = input.value/100;

    let mi = _ctrlObj.x.minValue, ma = _ctrlObj.x.maxValue, range = ma - mi;
    //let v = (skwerotedValue / range) ** (1 / _ctrlObj.x.exp) * 100;
    let v2 = mi + pow(traitedVal, 1) * range;

    var skwerotedValue = v2;
    //console.log(input.value, v2); // v, 




  if (typeof _ctrlObj.x.exp !== 'undefined') {

    Object.getOwnPropertyNames(Math).forEach(p => self[p] = Math[p]);

    var traitedVal = input.value/100;

    let mi = _ctrlObj.x.minValue, ma = _ctrlObj.x.maxValue, range = ma - mi;
    //let v = (skwerotedValue / range) ** (1 / _ctrlObj.x.exp) * 100;
    let v2 = mi + pow(traitedVal, _ctrlObj.x.exp) * range;

    var skwerotedValue = v2;
    //console.log(input.value, v2); // v, 


  }  


  if (typeof _ctrlObj.x.step !== 'undefined') {


    if ( _ctrlObj.x.step == 0.25 ) {
      var skwerotedValue = (Math.round(skwerotedValue * 4) / 4).toFixed(2);;
      //console.log(skwerotedValue); // v, 
    } else if ( _ctrlObj.x.step == 1 ) {
      var skwerotedValue = Math.round(input.value);
      //console.log(skwerotedValue);

    }  

  }  


  


}



        if (typeof window.presetTrigger !== 'undefined') {

          if ( window.presetTrigger == 'manual' ) {

            if ($('#presets option[value="0"]').length>0 ) {
              $('#presets option[value="0"]').remove();
            }

            $itemOptionUnsaved = $('<option class="user unsaved" id="option00001" value="0">[unsaved preset]</option>');
            $itemOptionUnsaved.appendTo(document.getElementById('presets'));
            $('#presets option[value="0"]').prop('selected',true);

          }

        } else {

            if ($('#presets option[value="0"]').length>0 ) {
              $('#presets option[value="0"]').remove();
            }

            $itemOptionUnsaved = $('<option class="user unsaved" id="option00001" value="0">[unsaved preset]</option>');
            $itemOptionUnsaved.appendTo(document.getElementById('presets'));
            $('#presets option[value="0"]').prop('selected',true);

        }

            /* should only be processed if manual action happened not automated triggering 
            // user action takes precedence over puppet master slavery/control over user's ptnSeq
            window.asserv = 0;   
            */

            // ir would be good to send slider values at conductor role page load ( so that channel volumes are set whatever channel instrument is loaded)
            //console.log(skwerotedValue, _id);

            _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: skwerotedValue, y: 0, presetId: presetId, preset: preString, channelId: window.channelId});    
          }    
        });


        input.addEventListener('change', function() {
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



      if (typeof _ctrlObj.x.autoValIncMode !== 'undefined') {
        var incM = document.getElementById('inc'+_id);

        incM.addEventListener('click', function() {

          if ( $('#inc'+_id).hasClass('active') ) {      
            $('#inc'+_id).removeClass('active');
            window['autoinc'][_id]= [];
            window['autoinc'][_id]['state']= 0;

          } else {
            $('#inc'+_id).addClass('active');
            window['autoinc'][_id]= [];
            window['autoinc'][_id]['state']= 1;
          }    
        });
      }  



      if (_solo!=0) {

        window['channelVol'][_id] = keypressSlider;
        var solo = document.getElementById('solo'+_id);

        solo.addEventListener('click', function() {

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

        console.log('skwerotedValue 517', skwerotedValue);

        _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: skwerotedValue, y: 0});
        }); 

        //eval('slider'+_id+'.on("x", function(data){alert(data);});');
      }
    };

    
    var _drawSlider = function(name, usedLibrary) {

      //console.log('usedLibrary', usedLibrary);

      if (usedLibrary=='noUiSlider') {

        $item = $('<div class="ctrlchange slider noui" id="ctrl'+ _id +'"><div class="cont-noui-slider DDDDslider '+_orientation+'" id="slider'+ _id +'"></div><input id="input'+ _id +'" type="text">'); // conntainer $itemContainer
        
        if (typeof _ctrlObj.x.autoValIncMode !== 'undefined') {

          if (_ctrlObj.x.autoValIncMode==1) {
            var actState= ' active';
            window['autoinc'][_id]= [];
            window['autoinc'][_id]['state']= 1;          
          } 

          $autoInc = $('<span data-id="'+_id+'" data-inctype="'+_ctrlObj.x.autoValIncBy+'" data-inctime="'+_ctrlObj.x.autoValIncTime+'" class="autoinc'+ actState +'" id="inc'+ _id +'">I</span>'); // data- attributes to span element for time & increment type
          $autoInc.appendTo($item);
        } else {
          //$autoInc = '';
        }      

        if (_mute!=0) { // _mute==1
          $mute = $('<span class="mutes" id="mute'+ _id +'">M</span><span class="solos" id="solo'+ _id +'">S</span></div>'); // '+autoInc+'
          $mute.appendTo($item);
          //console.log($item);
        } else {
          $mute = $('</div>');
          $mute.appendTo($item);
        }

        $item.append('<div class="infoContainer"><span title="'+_ctrlObj.name+'">'+name+'</span></div>');
        $item.appendTo($container);


      } else if (usedLibrary!='noUiSlider') {

        $item = $('<div class="ctrlchange slider '+_orientation+'" id="slider'+ _id +'"><div class="canvas-container">'); // $itemContainer
        $item.appendTo($container);
      } 



      if (usedLibrary=='Interface') {

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

            console.log('roundedValue', roundedValue);
            _self.emit(mixr.enums.Events.MODIFIER_CHANGE, {id: _id, x: roundedValue, y: 0});
           } 

        });

        window.interfacePanel[_id].add(slider/*, label*/); // window.sliderArray[_id]

        $item.append('<div class="infoContainer"><label>'+_value+'</label><span title="'+_ctrlObj.name+'">'+name+'</span></div>');



      } else if (usedLibrary!='noUiSlider') {

        var instrumentsConfig = window.insConf;
        $item.append('<canvas nx="slider" id="slider'+_id+'" min="0" max="100" label="'+name+'"></canvas>');                
        $item.appendTo($container);

        //alert(nx); Following does not pass on mobile
        // get all canvases on the page and add them to the manager
        var allcanvi = document.getElementsByTagName("canvas");
        for (i=0;i<allcanvi.length;i++) nx.transform(allcanvi[i]);

        eval('slider'+_id+'.val.value='+_value);
        eval('slider'+_id+'.draw()');
        eval('window.slider'+_id+'=slider'+_id);        
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
