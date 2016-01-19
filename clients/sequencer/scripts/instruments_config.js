window.insConf = [ // channelConf

{ channelName: 'Channel 1: drums',  
  trackSet: 0, // defaultKit
  conf: [ // kits 

    { type: 'samples', // (kitType) : conductor, samples, synth,...
      instrumentName: 'Sampler', 
      name: 'TheCheebacabra1', // (kitName)
      kitNumber: 0, // number 
      color: 'rgba(253, 118, 8, 1)', // (kitColor)
      tracks: [
        { name: 'Tom 3',
          sampleUrl: 'TheCheebacabra1/tom3.wav'            
        },
        { name: 'Tom 2',
          sampleUrl: 'TheCheebacabra1/tom2.wav'            
        },
        { name: 'Tom 1',
          sampleUrl: 'TheCheebacabra1/tom1.wav'            
        },  
        { name: 'Snare',
          sampleUrl: 'TheCheebacabra1/snare.wav'            
        },
        { name: 'Hihat',
          sampleUrl: 'TheCheebacabra1/hihat.wav'            
        },
        { name: 'Kick',
          sampleUrl: 'TheCheebacabra1/kick.wav'            
        }                      
      ],
      controls: [ 
        { name: '[Kit change]',
          id: 998,
          type: 'input', // slider, dial/rotary_knob, switch_button                                  
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 0,
            stepSize: 0, 
            interpolate: 0, // 0: off | 1: on                   
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        }
      ]            
    }, // close kit

    { type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'CR78', 
      kitNumber: 1, 
      color: 'rgba(253, 118, 8, 0.95)', 
      tracks: [
        {
          name: 'Tom 3',
          sampleUrl: 'CR78/tom3.wav'            
        },
        {
          name: 'Tom 2',
          sampleUrl: 'CR78/tom2.wav'            
        },
        {
          name: 'Tom 1',
          sampleUrl: 'CR78/tom1.wav'            
        },  
        {
          name: 'Snare',
          sampleUrl: 'CR78/snare.wav'            
        },
        {
          name: 'Hihat',
          sampleUrl: 'CR78/hihat.wav'            
        },
        {
          name: 'Kick',
          sampleUrl: 'CR78/kick.wav'            
        }                      
      ],
      controls: [ 
        { name: '[Kit change]',
          id: 998,
          type: 'input', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 1,
            stepSize: 0, 
            interpolate: 0, 
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        }
      ]            
    }, 

    { type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'breakbeat13', 
      kitNumber: 2, 
      color: 'rgba(253, 118, 8, 0.9)', 
      tracks: [
        {
          name: 'Tom 3',
          sampleUrl: 'breakbeat13/tom3.wav'            
        },
        {
          name: 'Tom 2',
          sampleUrl: 'breakbeat13/tom2.wav'            
        },
        {
          name: 'Tom 1',
          sampleUrl: 'breakbeat13/tom1.wav'            
        },  
        {
          name: 'Snare',
          sampleUrl: 'breakbeat13/snare.wav'            
        },
        {
          name: 'Hihat',
          sampleUrl: 'breakbeat13/hihat.wav'            
        },
        {
          name: 'Kick',
          sampleUrl: 'breakbeat13/kick.wav'            
        }                      
      ],
      controls: [ 
        { name: '[Kit change]',
          id: 998,
          type: 'input', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 2,
            stepSize: 0, 
            interpolate: 0, 
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        }
      ]            
    },   

    { type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'LINN', 
      kitNumber: 3, 
      color: 'rgba(253, 118, 8, 0.85)', 
      tracks: [
        {
          name: 'Tom 3',
          sampleUrl: 'LINN/tom3.wav'            
        },
        {
          name: 'Tom 2',
          sampleUrl: 'LINN/tom2.wav'            
        },
        {
          name: 'Tom 1',
          sampleUrl: 'LINN/tom1.wav'            
        },  
        {
          name: 'Snare',
          sampleUrl: 'LINN/snare.wav'            
        },
        {
          name: 'Hihat',
          sampleUrl: 'LINN/hihat.wav'            
        },
        {
          name: 'Kick',
          sampleUrl: 'LINN/kick.wav'            
        }                      
      ],
      controls: [ 
        { name: '[Kit change]',
          id: 998,
          type: 'input', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 3,
            stepSize: 0, 
            interpolate: 0, 
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        }
      ]            
    },  

    { type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Kit8', 
      kitNumber: 4, 
      color: 'rgba(253, 118, 8, 0.8)', 
      tracks: [
        {
          name: 'Tom 3',
          sampleUrl: 'Kit8/tom3.wav'            
        },
        {
          name: 'Tom 2',
          sampleUrl: 'Kit8/tom2.wav'            
        },
        {
          name: 'Tom 1',
          sampleUrl: 'Kit8/tom1.wav'            
        },  
        {
          name: 'Snare',
          sampleUrl: 'Kit8/snare.wav'            
        },
        {
          name: 'Hihat',
          sampleUrl: 'Kit8/hihat.wav'            
        },
        {
          name: 'Kick',
          sampleUrl: 'Kit8/kick.wav'            
        }                      
      ],
      controls: [ 
        { name: '[Kit change]',
          id: 998,
          type: 'input', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 4,
            stepSize: 0, 
            interpolate: 0, 
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        }
      ]            
    }              

  ] // close kits
}, // close channel

















//*
{ // channel
  channelName: 'Channel 2: conductor', // name
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
          name: 'Channel 1 volume',
          id: 800,

          type: 'input', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'Channel 1 volume',
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

        // Channel 2 = conductor role

        { 
          name: 'Channel 3 volume',
          id: 802,

          type: 'input', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'Channel 3 volume',
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

        { 
          name: 'Channel 4 volume',
          id: 803,
          type: 'input',                             
          x: {
              name: 'Channel 4 volume',
              param: '_insVol3', 
              subParams: { 
                AikeWebsynth1: 'volume.set' 
              },                   
              value: 50,
              stepSize: 0, 
              interpolate: 1, 
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        }, 

        { 
          name: 'Channel 5 volume',
          id: 804,
          type: 'input',                             
          x: {
              name: 'Channel 5 volume',
              param: '_insVol4', 
              subParams: { 
                AikeWebsynth1: 'volume.set' 
              },                   
              value: 50,
              stepSize: 0, 
              interpolate: 1, 
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        }, 

        { 
          name: 'Channel 6 volume',
          id: 805,
          type: 'input',                             
          x: {
              name: 'Channel 6 volume',
              param: '_insVol5', 
              subParams: { 
                AikeWebsynth1: 'volume.set' 
              },                   
              value: 50,
              stepSize: 0, 
              interpolate: 1, 
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        }, 

        { 
          name: 'Channel 7 volume',
          id: 806,
          type: 'input',                             
          x: {
              name: 'Channel 7 volume',
              param: '_insVol6', 
              subParams: { 
                AikeWebsynth1: 'volume.set' 
              },                   
              value: 50,
              stepSize: 0, 
              interpolate: 1, 
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        }, 

        { 
          name: 'Channel 8 volume',
          id: 807,
          type: 'input',                             
          x: {
              name: 'Channel 8 volume',
              param: '_insVol7', 
              subParams: { 
                AikeWebsynth1: 'volume.set' 
              },                   
              value: 50,
              stepSize: 0, 
              interpolate: 1, 
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
              value: 85, // 100 - 85
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 60,
              displayedRangeMax: 400,
              min: 60,
              max: 400
          }               
        },

        { // control
          name: 'Channel change',
          id: 997,

          type: 'input', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },   
          x: {
              name: 'Channel change',
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
























{ channelName: 'Channel 3: bass', // channelName = "bass, high pitch sounds etc" - insName
  //channelType: 'instrument', // conductor
  trackSet: 0, // defaultKit -   Number - // defaultInstrumentPreset
  conf: [ // kits channelConfiguration kitConfiguration 

  


            {            
            type: 'samples', // instrumentType - presetType
            instrumentName: 'Sampler', //  kitName

            name: 'Bass DRY synth', // preset/kitName
            kitNumber: 0, // number // preset/kitNumber            
            color: 'rgba(0, 171, 157, 1)', // preset/kitColor

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

            color: 'rgba(0, 171, 157, 0.95)',
            name: 'Nordic Lead', // preset name
            kitNumber: 1,

            tracks: [
              { name: 'C2',
                note: -9 // ? -8
              },  
              { name: 'B1',
                note: -10
              }, 
              { name: 'A1',
                note: -12
              }, 
              { name: 'G1',
                note: -14
              }, 
              { name: 'F1',
                note: -16
              },   
              { name: 'E1',
                note: -17
              }, 
              { name: 'D1',
                note: -19
              },  
              { name: 'C1',
                note: -21
              }                                                                               
              /*{
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
              } */
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




  ] // close channel conf

}, // close channel
//*/














{ channelName: 'Channel 4: c2>c3',  
  trackSet: 0, 
  conf: [ 
    { type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      color: 'rgba(0, 161, 0, 1)',
name: '', 
      kitNumber: 0,
      tracks: [
        { name: 'C3',
          note:  3
        },  
        { name: 'B2',
          note:  2
        }, 
        { name: 'A2',
          note:  0
        }, 
        { name: 'G2',
          note: -2
        }, 
        { name: 'F2',
          note: -4
        },   
        { name: 'E2',
          note: -5
        }, 
        { name: 'D2',
          note: -7
        },  
        { name: 'C2',
          note: -9
        } 
      ],
      controls: [ 
        { name: '[Kit change]',
          id: 998,
          type: 'input', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 0,
            stepSize: 0, 
            interpolate: 0, 
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        },    
        { name: 'osc1 vol',
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
        { name: 'osc1 waveform',
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
        { name: 'osc2 vol',
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
        { name: 'osc2 waveform',
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
        { name: 'osc2 pitch',
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
        { name: 'env attack',
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
        { name: 'env decay',
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
        { name: 'env sustain',
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
        { name: 'env release',
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
        { name: 'filter cutoff',
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
        { name: 'filter resonance',
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
        { name: 'filter eg amount',
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
        { name: 'filter env attack',
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
        { name: 'filter env decay',
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
        { name: 'filter env sustain',
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
        { name: 'filter env release',
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
      ] // end of kit controls
    } // end of kit
  ] // end of kits
}, // end of channel


















{ channelName: 'Channel 5: c3>c4',  
  trackSet: 0, 
  conf: [ 
    { type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      color: 'rgba(237, 49, 104, 1)',
name: '', 
      kitNumber: 0,
      tracks: [
        { name: 'C4',
          note:  15
        },  
        { name: 'B3',
          note:  14
        }, 
        { name: 'A3',
          note:  12
        }, 
        { name: 'G3',
          note:  10
        }, 
        { name: 'F3',
          note:  8
        },   
        { name: 'E3',
          note:  7   
        }, 
        { name: 'D3',
          note:  5
        },  
        { name: 'C3',
          note:  3
        } 
      ],
      controls: [ 
        { name: '[Kit change]',
          id: 998,
          type: 'input', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 0,
            stepSize: 0, 
            interpolate: 0, 
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        },    
        { name: 'osc1 vol',
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
        { name: 'osc1 waveform',
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
        { name: 'osc2 vol',
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
        { name: 'osc2 waveform',
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
        { name: 'osc2 pitch',
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
        { name: 'env attack',
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
        { name: 'env decay',
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
        { name: 'env sustain',
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
        { name: 'env release',
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
        { name: 'filter cutoff',
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
        { name: 'filter resonance',
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
        { name: 'filter eg amount',
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
        { name: 'filter env attack',
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
        { name: 'filter env decay',
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
        { name: 'filter env sustain',
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
        { name: 'filter env release',
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
      ] // end of kit controls
    } // end of kit
  ] // end of kits
}, // end of channel



















{ channelName: 'Channel 6: c4>c5',  
  trackSet: 0, 
  conf: [ 


    { type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Spacedrum: chromatic', 
      kitNumber: 0, 
      color: 'rgba(253, 206, 31, 1)', 
      tracks: [
        { name: 'C5',
          sampleUrl: 'spacedrum/Chro13C5.mp3'
        },  
        { name: 'B4',
          sampleUrl: 'spacedrum/Chro12B4.mp3'
        }, 
        { name: 'A4',
          sampleUrl: 'spacedrum/Chro10A4.mp3'
        }, 
        { name: 'G4',
          sampleUrl: 'spacedrum/Chro8G4.mp3'
        }, 
        { name: 'F4',
          sampleUrl: 'spacedrum/Chro6F4.mp3'
        },   
        { name: 'E4',
          sampleUrl: 'spacedrum/Chro5E4.mp3'   
        }, 
        { name: 'D4',
          sampleUrl: 'spacedrum/Chro3D4.mp3'
        },  
        { name: 'C4',
          sampleUrl: 'spacedrum/Chro1C4.mp3'
        }                     
      ],
      controls: [ 
        { name: '[Kit change]',
          id: 998,
          type: 'input', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 0,
            stepSize: 0, 
            interpolate: 0, 
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        }
      ]            
    }, 

    { type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Spacedrum: 8notesDiatoAm', 
      kitNumber: 1, 
      color: 'rgba(253, 206, 31, 0.95)',
      tracks: [
        { name: 'A4',
          sampleUrl: 'spacedrum/8notesDiatoAmV4A4.mp3'
        }, 
        { name: 'G4',
          sampleUrl: 'spacedrum/8notesDiatoAmV4G4.mp3'
        }, 
        { name: 'F4',
          sampleUrl: 'spacedrum/8notesDiatoAmV4F4.mp3'
        },   
        { name: 'E4',
          sampleUrl: 'spacedrum/8notesDiatoAmV4E4.mp3'   
        }, 
        { name: 'D4',
          sampleUrl: 'spacedrum/8notesDiatoAmV4D4.mp3'
        },  
        { name: 'C4',
          sampleUrl: 'spacedrum/8notesDiatoAmV4C4.mp3'
        },   
        { name: 'B3',
          sampleUrl: 'spacedrum/8notesDiatoAmV4B3.mp3'
        },  
        { name: 'A3',
          sampleUrl: 'spacedrum/8notesDiatoAmV4A3.mp3'
        },                           
      ],
      controls: [ 
        { name: '[Kit change]',
          id: 998,
          type: 'input', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 1,
            stepSize: 0, 
            interpolate: 0, 
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        }
      ]            
    },     

    { type: 'samples', 
      instrumentName: 'Sampler', 
      color: 'rgba(253, 206, 31, 0.9)', //color: '#AADB53',
      name: 'Lead synth',
      kitNumber: 2, 
      //color: 'rgba(253, 118, 8, 1)', 
      tracks: [
        { name: 'Bb4',
          sampleUrl: 'spacedrum/6notesBb4V4.mp3'
        }, 
        { name: 'G4',
          sampleUrl: 'spacedrum/6notesG4V4.mp3'
        }, 
        { name: 'F4',
          sampleUrl: 'spacedrum/6notesF4V4.mp3'
        },   
        { name: 'D4',
          sampleUrl: 'spacedrum/6notesD4V4.mp3'
        },  
        { name: 'C4',
          sampleUrl: 'spacedrum/6notesC4V4.mp3'
        },   
        { name: 'Bb3',
          sampleUrl: 'spacedrum/6notesBb3V4.mp3'
        },                          
      ],
      controls: [ 
        { name: '[Kit change]',
          id: 998,
          type: 'input', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 2,
            stepSize: 0, 
            interpolate: 0, 
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        }
      ]            
    },      


    { type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Lead synth', 
      kitNumber: 3, 
      color: 'rgba(253, 118, 8, 0.85)', 
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
      ],
      controls: [ 
        { name: '[Kit change]',
          id: 998,
          type: 'input', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 3,
            stepSize: 0, 
            interpolate: 0, 
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        }
      ]            
    },




    { type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      color: 'rgba(253, 206, 31, 0.8)',
name: '', 
      kitNumber: 4,
      tracks: [
        { name: 'C5',
          note:  27
        },  
        { name: 'B4',
          note:  26
        }, 
        { name: 'A4',
          note:  24
        }, 
        { name: 'G4',
          note:  22
        }, 
        { name: 'F4',
          note:  20
        },   
        { name: 'E4',
          note:  19   
        }, 
        { name: 'D4',
          note:  17
        },  
        { name: 'C4',
          note:  15
        } 
      ],
      controls: [ 
        { name: '[Kit change]',
          id: 998,
          type: 'input', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 4,
            stepSize: 0, 
            interpolate: 0, 
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        },    
        { name: 'osc1 vol',
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
        { name: 'osc1 waveform',
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
        { name: 'osc2 vol',
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
        { name: 'osc2 waveform',
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
        { name: 'osc2 pitch',
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
        { name: 'env attack',
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
        { name: 'env decay',
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
        { name: 'env sustain',
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
        { name: 'env release',
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
        { name: 'filter cutoff',
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
        { name: 'filter resonance',
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
        { name: 'filter eg amount',
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
        { name: 'filter env attack',
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
        { name: 'filter env decay',
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
        { name: 'filter env sustain',
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
        { name: 'filter env release',
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
      ] // end of kit controls
    } // end of kit
  ] // end of kits
}, // end of channel






















{ channelName: 'Channel 7: c5>c6',  
  trackSet: 0, 
  conf: [ 
    { type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      color: 'rgba(226, 0, 6, 1)',
name: '', 
      kitNumber: 0,
      tracks: [
        { name: 'C6',
          note:  39
        },  
        { name: 'B5',
          note:  38
        }, 
        { name: 'A5',
          note:  36
        }, 
        { name: 'G5',
          note:  34
        }, 
        { name: 'F5',
          note:  32
        },   
        { name: 'E5',
          note:  31   
        }, 
        { name: 'D5',
          note:  29
        },  
        { name: 'C5',
          note:  27
        } 
      ],
      controls: [ 
        { name: '[Kit change]',
          id: 998,
          type: 'input', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 0,
            stepSize: 0, 
            interpolate: 0, 
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        },    
        { name: 'osc1 vol',
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
        { name: 'osc1 waveform',
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
        { name: 'osc2 vol',
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
        { name: 'osc2 waveform',
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
        { name: 'osc2 pitch',
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
        { name: 'env attack',
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
        { name: 'env decay',
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
        { name: 'env sustain',
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
        { name: 'env release',
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
        { name: 'filter cutoff',
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
        { name: 'filter resonance',
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
        { name: 'filter eg amount',
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
        { name: 'filter env attack',
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
        { name: 'filter env decay',
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
        { name: 'filter env sustain',
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
        { name: 'filter env release',
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
      ] // end of kit controls
    } // end of kit
  ] // end of kits
}, // end of channel















{ channelName: 'Channel 8: c6>c7',  
  trackSet: 0, 
  conf: [ 
    { type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      color: 'rgba(149, 55, 166, 1)',
name: '', 
      kitNumber: 0,
      tracks: [
        { name: 'C7',
          note:  51
        },  
        { name: 'B6',
          note:  50
        }, 
        { name: 'A6',
          note:  48
        }, 
        { name: 'G6',
          note:  46
        }, 
        { name: 'F6',
          note:  44
        },   
        { name: 'E6',
          note:  43  
        }, 
        { name: 'D6',
          note:  41
        },  
        { name: 'C6',
          note:  39
        } 
      ],
      controls: [ 
        { name: '[Kit change]',
          id: 998,
          type: 'input', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 0,
            stepSize: 0, 
            interpolate: 0, 
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        },    
        { name: 'osc1 vol',
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
        { name: 'osc1 waveform',
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
        { name: 'osc2 vol',
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
        { name: 'osc2 waveform',
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
        { name: 'osc2 pitch',
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
        { name: 'env attack',
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
        { name: 'env decay',
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
        { name: 'env sustain',
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
        { name: 'env release',
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
        { name: 'filter cutoff',
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
        { name: 'filter resonance',
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
        { name: 'filter eg amount',
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
        { name: 'filter env attack',
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
        { name: 'filter env decay',
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
        { name: 'filter env sustain',
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
        { name: 'filter env release',
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
      ] // end of kit controls
    } // end of kit
  ] // end of kits
} // end of channel


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