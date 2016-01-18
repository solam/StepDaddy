    window.insConf = [ // channelConf
        /*{
            trackSet: 1,
            type: 'samples',
            color: 'hotpink', // should be bound to trackSet
            name: 'Drum kit', // should be bound to trackSet
            tracks: [
                [{
                    name: '909 Kick',
                    sampleUrl: '12-TR-909/909 KIK2.wav'
                }, {
                    name: '909 Snare',
                    sampleUrl: '12-TR-909/909 SD1.wav'
                // },  {
                //     name: 'Snare long',
                //     sampleUrl: '12-TR-909/909 SD3.wav'
                // }, {
                //     name: 'HiHat',
                //     sampleUrl: '12-TR-909/909 HHCL 1.wav'
                // }, {
                //     name: 'HiHat open',
                //     sampleUrl: '12-TR-909/909 HHOP.wav'
                // },
                ],

                [{
                    name: 'HiHat',
                    sampleUrl: '12-TR-909/909 HHCL 1.wav'
                }, {
                    name: 'Snare long',
                    sampleUrl: '12-TR-909/909 SD3.wav'
                }
                ]

            ]
        }, */


//*
        { trackSet: 1, // 1 - this _self._tempo-109 - defaultKit:
          //kitName: '909 kd/sd',
          conf: [
            {            
              type: 'samples',
              instrumentName: 'Sampler',
              color: 'hotpink', 
              name: '909 Drum', 
              kitNumber: 0,
              tracks: 
                [{
                      name: '909 Kick',
                      sampleUrl: '12-TR-909/909 KIK2.wav'
                  }, {
                      name: '909 Snare',
                      sampleUrl: '12-TR-909/909 SD1.wav'
                }],
      controls: [ // aka preset values
        { // control
          name: 'Change instrument',
          id: 998,

          type: 'input', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'change ins',
              param: '[external]', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 0,
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: '[calc]',
              min: 0,
              max: '[calc]'
          }                
        }]                
            },
            {
              type: 'samples',
              instrumentName: 'Sampler',
              color: 'red', 
              name: '909 Drum 02', 
              kitNumber: 1,
              tracks: [
                {
                    name: 'HiHat',
                    sampleUrl: '12-TR-909/909 HHCL 1.wav'
                }, {
                    name: 'Snare long',
                    sampleUrl: '12-TR-909/909 SD3.wav'
                }
              ],
      controls: [ // aka preset values
        { // control
          name: 'Change instrument',
          id: 998,

          type: 'input', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'change ins',
              param: '[external]', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 1,
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: '[calc]',
              min: 0,
              max: '[calc]'
          }               
        }]
            },

            {
                type: 'samples',
                instrumentName: 'Sampler',
                color: '#deadf0',
                name: 'Percussion',
                kitNumber: 2,
                tracks: [
                    {
                        name: 'Clap',
                        sampleUrl: '12-TR-909/909 CLAP.wav'
                    }, {
                        name: 'Rim',
                        sampleUrl: '12-TR-909/909 RIM.wav'
                    }, {
                        name: 'Tom 1',
                        sampleUrl: '12-TR-909/909 HI.TOM1.wav'
                    }, {
                        name: 'Tom 2',
                        sampleUrl: '12-TR-909/909 HI.TOM2.wav'
                    }
                ],
      controls: [ // aka preset values
        { // control
          name: 'Change instrument',
          id: 998,

          type: 'input', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'change ins',
              param: '[external]', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 2,
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: '[calc]',
              min: 0,
              max: '[calc]'
          }                 
        }]
            }

          ]          
        },
//*/



//*
{ // channel
  channelName: 'Conductor Role', // name
  //channelType: 'conductor', // type
  trackSet: 0, // defaultKit = default instrument/control kit

  conf: [ // kits = kitConfiguration 
    { // kit            
      type: 'control', // = kitType
      instrumentName: 'Conductor', 

      name: 'Conductor Ctrl 01', // = kitName
      kitNumber: 0, // number = kitNumber            
      color: '#51ACBD', // = kitColor
      
      controls: [ // aka preset values                                    
        { 
          name: 'Ch1 volume',
          id: 800,

          type: 'input', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'Ch1 volume',
              param: '_insVol0', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 100,
              stepSize: 0, // crénelage   
              interpolate: 1, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        },

        { 
          name: 'Ch3 volume',
          id: 802,

          type: 'input', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'Ch3 volume',
              param: '_insVol2', // [external] = does not change timbre generator param

              subParams: { 
                AikeWebsynth1: 'volume.set' 
              }, 

              midicc: 0,                      
              value: 50,
              stepSize: 0, // crénelage   
              interpolate: 1, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        },

        { // control
          name: 'Tempo',
          id: 999,

          type: 'input', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },   
          x: {
              name: 'BPM',
              param: '_tempo', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 100,
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 60,
              displayedRangeMax: 400,
              min: 60,
              max: 400
          }               
        },

        { // control
          name: 'ChannelChange',
          id: 997,

          type: 'input', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },   
          x: {
              name: 'ChannelChange',
              param: '[external]', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 0,
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: 1,
              min: 0,
              max: 1
          }                 
        }        

      ] // end of controls
    } // end of kit
  ] // end of kits
}, // end of channel
//*/









        { 
          channelName: 'Channel 2', // channelName = "bass, high pitch sounds etc" - insName
          //channelType: 'instrument', // conductor
          trackSet: 1, // defaultKit -   Number - // defaultInstrumentPreset
          conf: [ // kits channelConfiguration kitConfiguration 



            {            
            type: 'samples', // instrumentType - presetType
            instrumentName: 'Sampler', //  kitName

            name: 'Bass DRY synth', // preset/kitName
            kitNumber: 0, // number // preset/kitNumber            
            color: '#51ACBD', // preset/kitColor

            tracks: [
                {
                    name: 'C#',
                    sampleUrl: 'bassdry/Bass3_8.mp3'
                    // trackColor: '#c0ffee', // to differentiate percussive & pitch notes
                },
                {
                    name: 'H',
                    sampleUrl: 'bassdry/Bass3_7.mp3'
                },
                {
                    name: 'A',
                    sampleUrl: 'bassdry/Bass3_6.mp3'
                },
                {
                    name: 'F#',
                    sampleUrl: 'bassdry/Bass3_5.mp3'
                },
                {
                    name: 'E',
                    sampleUrl: 'bassdry/Bass3_4.mp3'
                },
                {
                    name: 'C#',
                    sampleUrl: 'bassdry/Bass3_3.mp3'
                }, {
                    name: 'H',
                    sampleUrl: 'bassdry/Bass3_2.mp3'
                },
                {
                    name: 'A',
                    sampleUrl: 'bassdry/Bass3_1.mp3'
                }
            ],

      controls: [ // aka preset values
        { // control
          name: 'Change instrument',
          id: 998,

          type: 'input', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'change ins',
              param: '[external]', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 0,
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: '[calc]',
              min: 0,
              max: '[calc]'
          }/*,
          y: {
              name: '',
              param: '_empty',
              min: 0,
              max: 1
          } */                 
        }]            

          }, 
          { // Kit
            type: 'synth',
            instrumentName: 'AikeWebsynth1', // aike_ws_01

            color: '#c0ffee',
            name: 'Nordic Lead', // preset name
            kitNumber: 1,

            tracks: [
              {
               name: 'A3',
               // color: '#c0ffee', // to differentiate percussive & pitch notes
               note: 0
              }, {
               name: 'C3',
               note: 3
              }, {
               name: 'D3',
               note: 5
              }, {
               name: 'E3',
               note: 7
              }, {
               name: 'G3',
               note: 10
              }, {
               name: 'A4',
               note: 12
              }, {
               name: 'C4',
               note: 15
              }, {
               name: 'D4',
               note: 17
              }, {
               name: 'E4',
               note: 19
              }, {
               name: 'G4',
               note: 21
              }
            ],

            controls: [ // aka preset values


                //*
                {
                 name: 'ins kit',
                 // color params
                 id: 998,
                 type: 'input', // slider, dial/rotary_knob, switch_button
                 direction: 0, // 'horizontal', 'vertical' for sliders
                  x: {
                      interpolate: 0, // 0: off | 1: on
                      name: 'Change ins', // ins kit
                      param: '[external]', // name of function or object path - eg.set_a
                      midicc: 1,                      
                      value: 1,
                      stepSize: 1, // crénelage                      
                      displayedRangeMin: '[calc]',
                      displayedRangeMax: '[calc]',
                      min: '[calc]',
                      max: '[calc]'
                  }/*,
                  y: {
                      name: '',
                      param: '_empty',
                      min: 0,
                      max: 1
                  }*/                 
                },
                //*/


/*
                {
                 name: 'cutoff freq',
                 // color params
                 id: 0,
                 type: 'input', // slider, dial/rotary_knob, switch_button
                 direction: 0, // 'horizontal', 'vertical' for sliders
                  x: {
                      interpolate: 0, // 0: off | 1: on
                      name: 'cutoff freq',
                      param: 'filter.set_freq', // name of function or object path - AikeWebsynth01.filter.set_freq
                      midicc: 0,                      
                      value: 10, // 70
                      stepSize: 0, // crénelage                      
                      displayedRangeMin: 0,
                      displayedRangeMax: 100,
                      min: 0.5,
                      max: 2
                  }                 
                },



                {
                 name: 'vco1 gain',
                 // color params
                 id: 3,
                 type: 'input', // slider, dial/rotary_knob, switch_button
                 direction: 0, // 'horizontal', 'vertical' for sliders
                  x: {
                      interpolate: 0, // 0: off | 1: on
                      name: 'vco1 gain', // ins kit
                      param: 'vco1.set_gain', // name of function or object path
                      midicc: 1,                      
                      value: 70,
                      stepSize: 0, // crénelage                      
                      displayedRangeMin: 0,
                      displayedRangeMax: 100,
                      min: 0,
                      max: 100
                  },
                  y: {
                      name: '',
                      param: '_empty',
                      min: 0,
                      max: 1
                  }                 
                },

                {
                 name: 'vco2 gain',
                 // color params
                 id: 4,
                 type: 'input', // slider, dial/rotary_knob, switch_button
                 direction: 0, // 'horizontal', 'vertical' for sliders
                  x: {
                      interpolate: 0, // 0: off | 1: on
                      name: 'vco2 gain', // ins kit
                      param: 'vco2.set_gain', // name of function or object path
                      midicc: 1,                      
                      value: 50,
                      stepSize: 0, // crénelage                      
                      displayedRangeMin: 0,
                      displayedRangeMax: 100,
                      min: 0,
                      max: 100
                  },
                  y: {
                      name: '',
                      param: '_empty',
                      min: 0,
                      max: 1
                  }                 
                },

                {
                 name: 'env decay',
                 // color params
                 id: 5,
                 type: 'input', // slider, dial/rotary_knob, switch_button
                 direction: 0, // 'horizontal', 'vertical' for sliders
                  x: {
                      interpolate: 0, // 0: off | 1: on
                      name: 'env decay', // ins kit
                      param: 'eg.set_d', // name of function or object path
                      midicc: 1,                      
                      value: 10, // -6
                      stepSize: 0, // crénelage                      
                      displayedRangeMin: 0,
                      displayedRangeMax: 100,
                      min: 0,
                      max: 100
                  },
                  y: {
                      name: '',
                      param: '_empty',
                      min: 0,
                      max: 1
                  }                 
                },
*/
   







/*

CTL_Volume.set
WebSynth.setVolume  

VCO.set_glide_on
VCO.set_glide_time 
VCO.set_goal_pitch */

/*this.wet = 0.2;
this.delaytime = 0.8; */

/*
    this.delay1.delayTime.value = this.delaytime * 0.5;
    this.delay2.delayTime.value = this.delaytime * 1.0;
    this.gain1.gain.value = this.wet * 0.25;
    this.gain2.gain.value = this.wet * 0.125;
*/    











                { 
                  name: 'osc1 vol',
                  id: 1,
                  type: 'input',                                    
                  x: {
                    name: 'osc1 vol',
                    param: 'vco1.set_gain',                     
                    value: 30,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },

                { 
                  name: 'osc1 waveform',
                  id: 2,
                  type: 'input',                                    
                  x: {
                    name: 'osc1 waveform',
                    param: 'vco1.set_wave',                     
                    value: 1,
                    stepSize: 1, 
                    interpolate: 0, 
                    min: 0,
                    max: 2 // 124                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },  

                { 
                  name: 'osc2 vol',
                  id: 3,
                  type: 'input',                                    
                  x: {
                    name: 'osc2 vol',
                    param: 'vco2.set_gain',                     
                    value: 80,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },

                { 
                  name: 'osc2 waveform',
                  id: 4,
                  type: 'input',                                    
                  x: {
                    name: 'osc2 waveform',
                    param: 'vco2.set_wave',                     
                    value: 0,
                    stepSize: 1, 
                    interpolate: 0, 
                    min: 0,
                    max: 2                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },     

                { 
                  name: 'osc2 pitch',
                  id: 5,
                  type: 'input',                                    
                  x: {
                    name: 'osc2 pitch',
                    param: 'vco2.set_pitch',                     
                    value: 0, // -30 for high pitcehd notes
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },  



                { 
                  name: 'env attack',
                  id: 6,
                  type: 'input',                                    
                  x: {
                    name: 'env attack',
                    param: 'eg.set_a',                     
                    value: 0,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },   

                { 
                  name: 'env decay',
                  id: 7,
                  type: 'input',                                    
                  x: {
                    name: 'env decay',
                    param: 'eg.set_d',                     
                    value: 25,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },   

                { 
                  name: 'env sustain',
                  id: 8,
                  type: 'input',                                    
                  x: {
                    name: 'env sustain',
                    param: 'eg.set_s',                     
                    value: 10,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },   

                { 
                  name: 'env release',
                  id: 9,
                  type: 'input',                                    
                  x: {
                    name: 'env release',
                    param: 'eg.set_r',                     
                    value: 0,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },                                                                                                             



                { 
                  name: 'filter cutoff',
                  id: 10,
                  type: 'input',                                    
                  x: {
                    name: 'filter cutoff',
                    param: 'filter.set_freq',                     
                    value: 65,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },  

                { 
                  name: 'filter resonance',
                  id: 11,
                  type: 'input',                                    
                  x: {
                    name: 'filter resonance',
                    param: 'filter.set_q',                     
                    value: 10,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },  
                /*
                { 
                  name: 'filter eg',
                  id: 12,
                  type: 'input',                                    
                  x: {
                    name: 'filter eg',
                    param: 'filter.set_eg',                     
                    value: 50,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                }, */ 

                { 
                  name: 'filter eg amount',
                  id: 13,
                  type: 'input',                                    
                  x: {
                    name: 'filter eg amount',
                    param: 'filter.set_amount',                     
                    value: 30,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },  



                { 
                  name: 'filter env attack',
                  id: 14,
                  type: 'input',                                    
                  x: {
                    name: 'filter env attack',
                    param: 'feg.set_a',                     
                    value: 0,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },   

                { 
                  name: 'filter env decay',
                  id: 15,
                  type: 'input',                                    
                  x: {
                    name: 'filter env decay',
                    param: 'feg.set_d',                     
                    value: 30,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },   

                { 
                  name: 'filter env sustain',
                  id: 16,
                  type: 'input',                                    
                  x: {
                    name: 'filter env sustain',
                    param: 'feg.set_s',                     
                    value: 82,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                },   

                { 
                  name: 'filter env release',
                  id: 17,
                  type: 'input',                                    
                  x: {
                    name: 'filter env release',
                    param: 'feg.set_r',                     
                    value: 0,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,
                  }                
                }


                /*
                { 
                  name: '',
                  id: 6,

                  type: 'input', 
                  //direction: 0, 
                  //colors: { 
                  //  fg: '#51ACBD' // foregroundColor
                  //},          
                            
                  x: {
                    name: '',
                    param: '', 

                    //subParams: { 
                    //  AikeWebsynth1: 'volume.set' 
                    //}, 

                    //midicc: 0,                      
                    value: 50,
                    //stepSize: 0, 
                    interpolate: 0, 
                    //min: 0,
                    //max: 100                    
                    //displayedRangeMin: 0,
                    //displayedRangeMax: 100,

                  }                
                }, */                    

              ] // end of Kit controls              
          },


//*

          {
            type: 'synth',
            instrumentName: 'MrSynth', // aike_ws_01

            color: '#c0ffee',
            name: 'MrSynth preset 01', // preset name
            kitNumber: 2,

            tracks: [
                {
                 name: 'A3',
                 // color: '#c0ffee', // to differentiate percussive & pitch notes
                 note: 'A3'
                }, {
                 name: 'C3',
                 note: 'C3'
                }, {
                 name: 'D3',
                 note: 'D3'
                }
            ],

            controls: [ // aka preset values
                {
                 name: 'cutoff freq',
                 // color params
                 id: 0,
                 type: 'input', // slider, dial/rotary_knob, switch_button
                 direction: 0, // 'horizontal', 'vertical' for sliders
                  x: {
                      name: 'cutoff freq',
                      param: 'filterNode.frequency.value', // name of function or object path - AikeWebsynth01.filter.set_freq
                      midicc: 0,                      
                      value: 43,
                      stepSize: 0, // crénelage                      
                      displayedRangeMin: 0,
                      displayedRangeMax: 100,
                      min: 0.5,
                      max: 2
                  },
                  y: {
                      name: '',
                      param: '_empty',
                      min: 0,
                      max: 1
                  }                 
                },
                {
                 name: 'ins kit',
                 // color params
                 id: 998,
                 type: 'input', // slider, dial/rotary_knob, switch_button
                 direction: 0, // 'horizontal', 'vertical' for sliders
                  x: {
                      name: 'Change ins', // ins kit
                      param: '[external]', // name of function or object path // lfoNode.frequency.value
                      midicc: 1,                      
                      value: 2,
                      stepSize: 1, // crénelage                      
                      displayedRangeMin: 'calc',
                      displayedRangeMax: 'calc',
                      min: 'calc',
                      max: 'calc'
                  },
                  y: {
                      name: '',
                      param: '_empty',
                      min: 0,
                      max: 1
                  }                 
                }                       

              ]

        }

  ] // close channel conf

}, // close channel
//*/





/*

        { 
          channelName: 'Channel 3', // channelName = "bass, high pitch sounds etc" - insName
          trackSet: 1, // defaultKit -   Number - // defaultInstrumentPreset
          conf: [ // kits channelConfiguration kitConfiguration 

          {
            type: 'synth',
            instrumentName: 'AikeWebsynth1', // aike_ws_01

            color: '#c0ffee',
            name: 'Nordic Lead', // preset name
            kitNumber: 0,

            tracks: [
                {
                 name: 'A3',
                 // color: '#c0ffee', // to differentiate percussive & pitch notes
                 note: 0
                }, {
                 name: 'C3',
                 note: 3
                }, {
                 name: 'D3',
                 note: 5
                }, {
                 name: 'E3',
                 note: 7
                }, {
                 name: 'G3',
                 note: 10
                }, {
                 name: 'A4',
                 note: 12
                }, {
                 name: 'C4',
                 note: 15
                }, {
                 name: 'D4',
                 note: 17
                }, {
                 name: 'E4',
                 note: 19
                }, {
                 name: 'G4',
                 note: 21
                }
            ],

            controls: [ // aka preset values
                {
                 name: 'cutoff freq',
                 // color params
                 id: 0,
                 type: 'input', // slider, dial/rotary_knob, switch_button
                 direction: 0, // 'horizontal', 'vertical' for sliders
                  x: {
                      name: 'cutoff freq',
                      param: 'filter.set_freq', // name of function or object path - AikeWebsynth01.filter.set_freq
                      midicc: 0,                      
                      value: 10,
                      stepSize: 0, // crénelage                      
                      displayedRangeMin: 0,
                      displayedRangeMax: 100,
                      min: 0.5,
                      max: 2
                  },
                  y: {
                      name: '',
                      param: '_empty',
                      min: 0,
                      max: 1
                  }                 
                },

                {
                 name: 'ins kit',
                 // color params
                 id: 2,
                 type: 'input', // slider, dial/rotary_knob, switch_button
                 direction: 0, // 'horizontal', 'vertical' for sliders
                  x: {
                      name: 'Tempo', // ins kit
                      param: 'eg.set_a', // name of function or object path
                      midicc: 1,                      
                      value: 0,
                      stepSize: 1, // crénelage                      
                      displayedRangeMin: 'calc',
                      displayedRangeMax: 'calc',
                      min: 'calc',
                      max: 'calc'
                  },
                  y: {
                      name: '',
                      param: '_empty',
                      min: 0,
                      max: 1
                  }                 
                },

                

                                 {
                 name: 'vco1 gain',
                 // color params
                 id: 3,
                 type: 'input', // slider, dial/rotary_knob, switch_button
                 direction: 0, // 'horizontal', 'vertical' for sliders
                  x: {
                      name: 'vco1 gain', // ins kit
                      param: 'vco1.set_gain', // name of function or object path
                      midicc: 1,                      
                      value: 30,
                      stepSize: 0, // crénelage                      
                      displayedRangeMin: 0,
                      displayedRangeMax: 100,
                      min: 0,
                      max: 100
                  },
                  y: {
                      name: '',
                      param: '_empty',
                      min: 0,
                      max: 1
                  }                 
                },

                                 {
                 name: 'vco2 gain',
                 // color params
                 id: 4,
                 type: 'input', // slider, dial/rotary_knob, switch_button
                 direction: 0, // 'horizontal', 'vertical' for sliders
                  x: {
                      name: 'vco2 gain', // ins kit
                      param: 'vco2.set_gain', // name of function or object path
                      midicc: 1,                      
                      value: 20,
                      stepSize: 0, // crénelage                      
                      displayedRangeMin: 0,
                      displayedRangeMax: 100,
                      min: 0,
                      max: 100
                  },
                  y: {
                      name: '',
                      param: '_empty',
                      min: 0,
                      max: 1
                  }                 
                },


                                                     {
                 name: 'env decay',
                 // color params
                 id: 5,
                 type: 'input', // slider, dial/rotary_knob, switch_button
                 direction: 0, // 'horizontal', 'vertical' for sliders
                  x: {
                      name: 'env decay', // ins kit
                      param: 'eg.set_d', // name of function or object path
                      midicc: 1,                      
                      value: 10,
                      stepSize: 0, // crénelage                      
                      displayedRangeMin: 0,
                      displayedRangeMax: 100,
                      min: 0,
                      max: 100
                  },
                  y: {
                      name: '',
                      param: '_empty',
                      min: 0,
                      max: 1
                  }                 
                }   






            ]


          },



         {
            type: 'synth',
            instrumentName: 'MrSynth', // aike_ws_01

            color: '#c0ffee',
            name: 'MrSynth preset 01', // preset name
            kitNumber: 1,

            tracks: [
                {
                 name: 'A3',
                 // color: '#c0ffee', // to differentiate percussive & pitch notes
                 note: 'A3'
                }, {
                 name: 'C3',
                 note: 'C3'
                }, {
                 name: 'D3',
                 note: 'D3'
                }
            ],

            controls: [ // aka preset values
                {
                 name: 'cutoff freq',
                 // color params
                 id: 0,
                 type: 'input', // slider, dial/rotary_knob, switch_button
                 direction: 0, // 'horizontal', 'vertical' for sliders
                  x: {
                      name: 'cutoff freq',
                      param: 'filterNode.frequency.value', // name of function or object path - AikeWebsynth01.filter.set_freq
                      midicc: 0,                      
                      value: 89,
                      stepSize: 0, // crénelage                      
                      displayedRangeMin: 0,
                      displayedRangeMax: 100,
                      min: 0.5,
                      max: 2
                  },
                  y: {
                      name: '',
                      param: '_empty',
                      min: 0,
                      max: 1
                  }                 
                },
                {
                 name: 'ins kit',
                 // color params
                 id: 2,
                 type: 'input', // slider, dial/rotary_knob, switch_button
                 direction: 0, // 'horizontal', 'vertical' for sliders
                  x: {
                      name: 'Tempo', // ins kit
                      param: 'lfoNode.frequency.value', // name of function or object path
                      midicc: 1,                      
                      value: 0,
                      stepSize: 1, // crénelage                      
                      displayedRangeMin: 'calc',
                      displayedRangeMax: 'calc',
                      min: 'calc',
                      max: 'calc'
                  },
                  y: {
                      name: '',
                      param: '_empty',
                      min: 0,
                      max: 1
                  }                 
                }                                      

              ]

        }          



          ]    

        } 









        /*,
        {
            type: 'samples',
            color: '#AADB53',
            name: 'Lead synth',
            tracks: [
                {
                    name: 'A',
                    sampleUrl: 'lead1/Synth1_8.mp3'
                }, {
                    name: 'H',
                    sampleUrl: 'lead1/Synth1_7.mp3'
                },
                {
                    name: 'C#',
                    sampleUrl: 'lead1/Synth1_6.mp3'
                },
                {
                    name: 'E',
                    sampleUrl: 'lead1/Synth1_5.mp3'
                },
                {
                    name: 'F#',
                    sampleUrl: 'lead1/Synth1_4.mp3'
                },
                {
                    name: 'A',
                    sampleUrl: 'lead1/Synth1_3.mp3'
                },
                {
                    name: 'H',
                    sampleUrl: 'lead1/Synth1_2.mp3'
                },
                {
                    name: 'C#',
                    sampleUrl: 'lead1/Synth1_1.mp3'
                }
            ]
        },*/
        /*
        {
            type: 'samples',
            color: '#517CBD',
            name: 'Bass synth',
            tracks: [
                {
                    name: 'C#',
                    sampleUrl: 'bass/Bass1_8.mp3'
                },
                {
                    name: 'H',
                    sampleUrl: 'bass/Bass1_7.mp3'
                },
                {
                    name: 'A',
                    sampleUrl: 'bass/Bass1_6.mp3'
                },
                {
                    name: 'F#',
                    sampleUrl: 'bass/Bass1_5.mp3'
                },
                {
                    name: 'E',
                    sampleUrl: 'bass/Bass1_4.mp3'
                },
                {
                    name: 'C#',
                    sampleUrl: 'bass/Bass1_3.mp3'
                },
                {
                    name: 'H',
                    sampleUrl: 'bass/Bass1_2.mp3'
                },
                {
                    name: 'A',
                    sampleUrl: 'bass/Bass1_1.mp3'
                }

            ]
        },
        */
        /*{
            type: 'samples',
            color: '#BD5181',
            name: 'Voice',
            tracks: [
                {
                    name: 'Music',
                    sampleUrl: 'voice/Voice1_1.mp3'
                }, {
                    name: 'Hack',
                    sampleUrl: 'voice/Voice1_2.mp3'
                }, {
                    name: 'Day',
                    sampleUrl: 'voice/Voice1_3.mp3'
                }, {
                    name: 'At',
                    sampleUrl: 'voice/Voice1_4.mp3'
                }, {
                    name: 'Spotify',
                    sampleUrl: 'voice/Voice1_5.mp3'
                }
            ]
        },*/
/*        {
            type: 'synth',
            color: '#c0ffee',
            name: 'Nordic Lead',
            tracks: [
                {
                 name: 'A2',
                 note: 0
                }, {
                 name: 'C2',
                 note: 3
                }, {
                 name: 'D2',
                 note: 5
                }, {
                 name: 'E2',
                 note: 7
                }, {
                 name: 'G2',
                 note: 10
                }, {
                 name: 'A3',
                 note: 12
                }, {
                 name: 'C3',
                 note: 15
                }, {
                 name: 'D3',
                 note: 17
                }, {
                 name: 'E3',
                 note: 19
                }, {
                 name: 'G3',
                 note: 21
                }
            ]
          } */
          //,
        // {
        //     type: 'samples',
        //     color: '#deadf0',
        //     name: 'Percussion',
        //     tracks: [
        //         {
        //             name: 'Clap',
        //             sampleUrl: '12-TR-909/909 CLAP.wav'
        //         }, {
        //             name: 'Rim',
        //             sampleUrl: '12-TR-909/909 RIM.wav'
        //         }, {
        //             name: 'Tom 1',
        //             sampleUrl: '12-TR-909/909 HI.TOM1.wav'
        //         }, {
        //             name: 'Tom 2',
        //             sampleUrl: '12-TR-909/909 HI.TOM2.wav'
        //         }
        //     ]
        // }
/*,{
            type: 'synth',
            color: '#c0ffee',
            name: 'Nordic Lead',
            tracks: [
                {
                 name: 'A2',
                 note: 0
                }, {
                 name: 'C2',
                 note: 3
                }, {
                 name: 'D2',
                 note: 5
                }, {
                 name: 'E2',
                 note: 7
                }, {
                 name: 'G2',
                 note: 10
                }, {
                 name: 'A3',
                 note: 12
                }, {
                 name: 'C3',
                 note: 15
                }, {
                 name: 'D3',
                 note: 17
                }, {
                 name: 'E3',
                 note: 19
                }, {
                 name: 'G3',
                 note: 21
                }
            ]
          } */        
    ];








window.fxConf = [
        {
            id: 0,
            name: 'Playback',
            x: {
                name: 'Freq',
                param: '_filterFreq',
                min: 200,
                max: 22000
            },
            y: {
                name: 'Q',
                param: '_q',
                min: 0,
                max: 5
            }
        }, {
            id: 1,
            name: 'Playback',
            x: {
                name: 'Freq',
                param: '_playbackRate',
                min: 0.5,
                max: 2
            },
            y: {
                name: '',
                param: '_empty',
                min: 0,
                max: 1
            }
        }, {
            id: 2,
            name: 'Tempo',
            x: {
                name: 'Tempo',
                param: '_tempo',
                min: 60,
                max: 400
            },
            y: {
                name: '',
                param: '_empty',
                min: 0,
                max: 1
            }
        }

        , {
            id: 3,
            name: 'Ins01Volume',
            x: {
                name: 'Ins01Volume',
                param: '_Ins01Volume',
                min: 60,
                max: 400
            },
            y: {
                name: '',
                param: '_empty',
                min: 0,
                max: 1
            }
        }

    ];    