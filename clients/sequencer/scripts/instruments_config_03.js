
window.insConf3 = [ // channelConf

// orange channel






{ sessionName: 'The Chase',
  channelName: 'Ch1 | Drums',  
  trackSet: 3, // defaultKit or might always be first object of patterns array
  //*
  defaultPattern: 1, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    //{"name":"dnb rythm", "classs":"channel", "id":"d969fe00-19c6-11e6-a327-f59272915189", "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]},
    {"name":"4/4 kick",     "classs":"channel", "id":"81a98180-1887-11e6-8ebb-edf93ea0958c", "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]]},    
    {"name":"Kick + snare", "classs":"user", "id":"2b2e0600-3d85-11e6-a2d1-8bcd79be09f2", "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]]},
    {"name":"Kick + hat + snare","classs":"user","id":"1c7bb480-3d86-11e6-a2d1-8bcd79be09f2", "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]]}    
  ],  
  //*/

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
        { name: 'Change preset',
          id: 998,
          type: 'ddmenu', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 1,
            interpolate: 0, 
          }                 
        },

        { name: 'Change pattern',
          id: 994,
          type: 'ddmenu', 
          x: {
            name: 'Change pattern change',
            param: '[external]', 
            value: 0,
            interpolate: 0, 
          }                 
        },        

        { 
          name: 'Save pattern',
          id: 995,
          type: 'contact', // nexus push button
          direction: 0, 
          colors: { 
            fg: '#51ACBD' 
          },   
          x: {
              name: 'Type new pattern name', // Enter pattern name to be saved
              param: '[external]',                     
              value: 0,
              interpolate: 0 
          }                 
        }
      ] // end of controls             
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
        { name: 'Change preset',
          id: 998,
          type: 'ddmenu', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 1,
            interpolate: 0, 
          }                 
        },

        { name: 'Change pattern',
          id: 994,
          type: 'ddmenu', 
          x: {
            name: 'Change pattern change',
            param: '[external]', 
            value: 0,
            interpolate: 0, 
          }                 
        },        

        { 
          name: 'Save pattern',
          id: 995,
          type: 'contact', // nexus push button
          direction: 0, 
          colors: { 
            fg: '#51ACBD' 
          },   
          x: {
              name: 'Type new pattern name', // Enter pattern name to be saved
              param: '[external]',                     
              value: 0,
              interpolate: 0 
          }                 
        }
      ] // end of controls            
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
        { name: 'Change preset',
          id: 998,
          type: 'ddmenu', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 1,
            interpolate: 0, 
          }                 
        },

        { name: 'Change pattern',
          id: 994,
          type: 'ddmenu', 
          x: {
            name: 'Change pattern change',
            param: '[external]', 
            value: 0,
            interpolate: 0, 
          }                 
        },        

        { 
          name: 'Save pattern',
          id: 995,
          type: 'contact', // nexus push button
          direction: 0, 
          colors: { 
            fg: '#51ACBD' 
          },   
          x: {
              name: 'Type new pattern name', // Enter pattern name to be saved
              param: '[external]',                     
              value: 0,
              interpolate: 0 
          }                 
        }
      ] // end of controls            
    },   

    { type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'LINN (GM - The Chase adjusted)', 
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
          sampleUrl: 'LINN/snare_gm_chase.wav'            
        },
        {
          name: 'Hihat',
          sampleUrl: 'LINN/hihat.wav'            
        },
        {
          name: 'kick_gm_chase',
          sampleUrl: 'LINN/kick_gm_chase.wav'            
        }                      
      ],
      controls: [ 
        { name: 'Change preset',
          id: 998,
          type: 'ddmenu', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 1,
            interpolate: 0, 
          }                 
        },

        { name: 'Change pattern',
          id: 994,
          type: 'ddmenu', 
          x: {
            name: 'Change pattern change',
            param: '[external]', 
            value: 0,
            interpolate: 0, 
          }                 
        },        

        { 
          name: 'Save pattern',
          id: 995,
          type: 'contact', // nexus push button
          direction: 0, 
          colors: { 
            fg: '#51ACBD' 
          },   
          x: {
              name: 'Type new pattern name', // Enter pattern name to be saved
              param: '[external]',                     
              value: 0,
              interpolate: 0 
          }                 
        }
      ] // end of controls          
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
        { name: 'Change preset',
          id: 998,
          type: 'ddmenu', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 1,
            interpolate: 0, 
          }                 
        },

        { name: 'Change pattern',
          id: 994,
          type: 'ddmenu', 
          x: {
            name: 'Change pattern change',
            param: '[external]', 
            value: 0,
            interpolate: 0, 
          }                 
        },        

        { 
          name: 'Save pattern',
          id: 995,
          type: 'contact', // nexus push button
          direction: 0, 
          colors: { 
            fg: '#51ACBD' 
          },   
          x: {
              name: 'Type new pattern name', // Enter pattern name to be saved
              param: '[external]',                     
              value: 0,
              interpolate: 0 
          }                 
        }
      ] // end of controls              
    },     

    { type: 'samples', 
      instrumentName: 'Sampler', 
      name: '909', 
      kitNumber: 5, 
      color: 'rgba(253, 118, 8, 0.7)', // (kitColor)
      tracks: [
        /*{ name: 'Cymbal',
          sampleUrl: 'Drums/Ah1 Ride.wav'            
        },
        { name: 'Rimshot',
          sampleUrl: 'Drums/Ch1 RimShot.wav'            
        },*/      
        { name: 'Rimshot',
          sampleUrl: '12-TR-909/909 RIM.wav'            
        },
        { name: 'Opened hihat',
          sampleUrl: '12-TR-909/909 HHOP.wav'            
        },
        { name: 'Clap',
          sampleUrl: '12-TR-909/909 CLAP.wav'            
        },  
        { name: 'Snare',
          sampleUrl: '12-TR-909/909 SD10.wav'            
        },
        { name: 'Closed hihat',
          sampleUrl: '12-TR-909/909 HHCL 1.wav'            
        },
        { name: 'Kick',
          sampleUrl: '12-TR-909/909 KIK2.wav' // 909 KIK7           
        }                      
      ],
      controls: [ 
        { name: 'Change preset',
          id: 998,
          type: 'ddmenu', 
          x: {
            name: 'Kit change',
            param: '[external]', 
            value: 1,
            interpolate: 0, 
          }                 
        },

        { name: 'Change pattern',
          id: 994,
          type: 'ddmenu', 
          x: {
            name: 'Change pattern change',
            param: '[external]', 
            value: 0,
            interpolate: 0, 
          }                 
        },        

        { 
          name: 'Save pattern',
          id: 995,
          type: 'contact', // nexus push button
          direction: 0, 
          colors: { 
            fg: '#51ACBD' 
          },   
          x: {
              name: 'Type new pattern name', // Enter pattern name to be saved
              param: '[external]',                     
              value: 0,
              interpolate: 0 
          }                 
        }
      ] // end of controls             
    } 

  ] // close kits
}, // close channel










// black channel

//*
{ // channel
  channelName: 'Ch2 | Conductor', // name
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

          type: 'slider', // slider, dial/rotary_knob, switch_button      
          direction: 'horizontal', // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'Channel 1 volume',
              param: '_insVol0', // [external] = does not change timbre generator param
              subParams: { 
                AikeWebsynth1: 'volume.set' 
              },               
              midicc: 0,                      
              value: 55,
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

          type: 'slider', // slider, dial/rotary_knob, switch_button      
          direction: 'horizontal', // 'horizontal', 'vertical' for sliders    
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
              value: 28,
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
          type: 'slider',  
          direction: 'horizontal',                           
          x: {
              name: 'Channel 4 volume',
              param: '_insVol3', 
              subParams: { 
                AikeWebsynth1: 'volume.set' 
              },                   
              value: 25, // 30
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
          type: 'slider',
          direction: 'horizontal',                             
          x: {
              name: 'Channel 5 volume',
              param: '_insVol4', 
              subParams: { 
                AikeWebsynth1: 'volume.set' 
              },                   
              value: 18, // 23
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
          type: 'slider', 
          direction: 'horizontal',                            
          x: {
              name: 'Channel 6 volume',
              param: '_insVol5', 
              subParams: { 
                AikeWebsynth1: 'volume.set' 
              },                   
              value: 22, // 30
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
          type: 'slider',  
          direction: 'horizontal',                           
          x: {
              name: 'Channel 7 volume',
              param: '_insVol6', 
              subParams: { 
                AikeWebsynth1: 'volume.set' 
              },                   
              value: 25,
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
          type: 'slider',   
          direction: 'horizontal',                          
          x: {
              name: 'Channel 8 volume',
              param: '_insVol7', 
              subParams: { 
                AikeWebsynth1: 'volume.set' 
              },                   
              value: 35, // 40
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
              value: 126, // 100 - 85 - 123 - 60 - 170
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

          type: 'hidden', // slider, dial/rotary_knob, switch_button      
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
        }, 

                        { // control
          name: 'Change session',
          id: 996,

          type: 'ddmenu', 
          direction: 0, 
          colors: { 
            fg: '#51ACBD' 
          },   
          x: {
              name: 'Session destination',
              param: '[external]', 
              midicc: 0,                      
              value: 1,
              stepSize: 0, 
              interpolate: 0 
              //displayedRangeMin: 0,
              //displayedRangeMax: 1,
              //min: 0,
              //max: 1
          }                 
        },


/*
{ 
          name: 'Save Pattern',
          id: 995,

          type: 'input', // nexus push button
          direction: 0, 
          colors: { 
            fg: '#51ACBD' 
          },   
          x: {
              name: 'Save Pattern',
              param: '[external]', 
              midicc: 0,                      
              value: 0,
              stepSize: 0, 
              interpolate: 0 
          }                 
        },
*/


        { 
          name: 'C1 start bar offset',
          id: 700,

          type: 'hidden', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'C1 start bar offset',
              param: '_insBarOffset0', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 0,
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        },   

        { 
          name: 'C2 start bar offset',
          id: 701,

          type: 'hidden', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'C2 start bar offset',
              param: '_insBarOffset1', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 0,
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        },        

        { 
          name: 'C3 start bar offset',
          id: 702,

          type: 'hidden', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'C3 start bar offset',
              param: '_insBarOffset2', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 0, // 8
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        },   

        { 
          name: 'C4 start bar offset',
          id: 703,

          type: 'hidden', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'C4 start bar offset',
              param: '_insBarOffset3', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 32, // 12
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        }, 

        { 
          name: 'C5 start bar offset',
          id: 704,

          type: 'hidden', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'C5 start bar offset',
              param: '_insBarOffset4', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 16,
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        }, 

        { 
          name: 'C6 start bar offset',
          id: 705,

          type: 'hidden', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'C6 start bar offset',
              param: '_insBarOffset5', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 24,
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        },   

        { 
          name: 'C7 start bar offset',
          id: 706,

          type: 'hidden', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'C7 start bar offset',
              param: '_insBarOffset6', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 32,
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        },  

        { 
          name: 'C8 start bar offset',
          id: 707,

          type: 'hidden', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'C8 start bar offset',
              param: '_insBarOffset7', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 40,
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        },                                                

        { 
          name: 'General Bar kickout time',
          id: 699,

          type: 'input', // slider, dial/rotary_knob, switch_button      
          direction: 0, // 'horizontal', 'vertical' for sliders    
          colors: { // color params
            fg: '#51ACBD' // foregroundColor
          },          
                    
          x: {
              name: 'Channel rotation time (in bars)', // General kickout time 
              param: '_insKickoutTime', // [external] = does not change timbre generator param
              midicc: 0,                      
              value: 90, // 90 ? don't 
              stepSize: 0, // crénelage   
              interpolate: 0, // 0: off | 1: on                   
              displayedRangeMin: 0,
              displayedRangeMax: 100,
              min: 0,
              max: 1
          }                
        },     



        

      ] // end of controls //*/
    } // end of kit
  ] // end of kits
}, // end of channel
//*/









{ sessionName: 'The Chase',
  channelName: 'Ch3 | Bassline',  
  trackSet: 0, 
  defaultPattern: 1, 
  patterns: [ // channel patterns
    {"name":"reset",      "classs":"channel", "id":"2fb82950-36f3-11e6-aa68-d355ddb21e83", "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"bassline a", "classs":"channel", "id":"712cc380-3d17-11e6-bd11-650c5a0c542f", "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0],[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"bassline b", "classs":"channel", "id":"01627d00-3d18-11e6-bd11-650c5a0c542f", "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0],[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]]}
  ],  

  defaultPatternSeq: 0, 
  patternSeq: [     
    [ {"name":"bassline a", "classs":"channel", "id":"712cc380-3d17-11e6-bd11-650c5a0c542f"},
      {"name":"bassline a", "classs":"channel", "id":"01627d00-3d18-11e6-bd11-650c5a0c542f"} ]
  ], 

  conf: [ // kits 

              { // Kit
            type: 'synth',
            instrumentName: 'AikeWebsynth1', // aike_ws_01
            url:'http://aikelab.net/websynth/',

            color: 'rgba(0, 171, 157, 0.95)',
            name: '303 square bass', // preset name
            kitNumber: 1,     



      tracks: [
        { name: 'D#3',
          note:  10
        },       
        { name: 'C3',
          note:  7
        },  
        { name: 'A#2',
          note:  5
        }, 
        { name: 'G2',
          note:  2
        }, 
        { name: 'F2',
          note:  0
        }
      ],

/*
            tracks: [
              { name: 'C2',
                note: -5 
              },  
              { name: 'B1',
                note: -6
              }, 
              { name: 'A1',
                note: -8
              }, 
              { name: 'G1',
                note: -10
              }, 
              { name: 'F1',
                note: -12
              },   
              { name: 'E1',
                note: -13
              }, 
              { name: 'D1',
                note: -15
              },  
              { name: 'C1',
                note: -17
              }                                                                               
            ],
*/
            controls: [ // aka preset values


                //
        { name: 'Change preset',
          id: 998,
          type: 'ddmenu', // ddmenu  - slider, dial/rotary_knob, switch_button                                  
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
        },

        { name: 'Change pattern',
          id: 994,
          type: 'ddmenu', 
          x: {
            name: 'Pattern change',
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


        { 
          name: 'Pattern sequencer',
          id: 992,

          type: 'multiselect', // nexus push button
          direction: 0, 
          colors: { 
            fg: '#51ACBD' 
          },   
          x: {
              name: 'Save Sequence',
              param: '[external]', 
              midicc: 0,                      
              value: 1, // pattern Seq enable or disable at startup = 0: off | 1: On
              stepSize: 0, 
              interpolate: 0 
          }                 
        }, 


        { 
          name: 'Save Pattern',
          id: 995,

          type: 'contact', // nexus push button
          direction: 0, 
          colors: { 
            fg: '#51ACBD' 
          },   
          x: {
              name: 'Save Pattern',
              param: '[external]', 
              midicc: 0,                      
              value: 0,
              stepSize: 0, 
              interpolate: 0 
          }                 
        },


       


           


                { 
                  name: 'osc1 waveform',
                  id: 1,
                  type: 'ddmenu',                                    
                  x: {
                    name: 'osc1 waveform',
                    param: 'vco1.set_wave',                     
                    value: 1,
                    stepSize: 1, 
                    interpolate: 0, 
                    min: 0,
                    max: 2, // 124        
                    option: {
                      0: 'triangle',
                      1: 'sawtooth',                     
                      2: 'square',
                    }  

                  }                
                },  

                { 
                  name: 'osc2 waveform',
                  id: 2,
                  type: 'ddmenu',                                    
                  x: {
                    name: 'osc2 waveform',
                    param: 'vco2.set_wave',                     
                    value: 2,
                    stepSize: 1, 
                    interpolate: 0, 
                    min: 0,
                    max: 2,
                    option: {
                      0: 'triangle',
                      1: 'sawtooth',                     
                      2: 'square',
                    }                                          

                  }                
                }, 


                { 
                  name: 'osc1 vol',
                  id: 3,
                  type: 'slider',                                    
                  x: {
                    name: 'osc1 vol',
                    param: 'vco1.set_gain',                     
                    value: 0,
                    //stepSize: 0, 
                    interpolate: 0, 

                  }                
                },

  


                { 
                  name: 'osc2 vol',
                  id: 4,
                  type: 'slider',                                    
                  x: {
                    name: 'osc2 vol',
                    param: 'vco2.set_gain',                     
                    value: 35,
                    //stepSize: 0, 
                    interpolate: 0, 

                  }                
                },

  

                { 
                  name: 'osc2 pitch',
                  id: 5,
                  type: 'slider',                                    
                  x: {
                    name: 'osc2 pitch',
                    param: 'vco2.set_pitch',                     
                    value: 76, // -30 for high pitcehd notes
                    //stepSize: 0, 
                    interpolate: 0, 

                  }                
                },  



                { 
                  name: 'env attack',
                  id: 6,
                  type: 'slider',                                    
                  x: {
                    name: 'env attack',
                    param: 'eg.set_a',                     
                    value: 0,
                    //stepSize: 0, 
                    interpolate: 0, 

                  }                
                },   

                { 
                  name: 'env decay',
                  id: 7,
                  type: 'slider',                                    
                  x: {
                    name: 'env decay',
                    param: 'eg.set_d',                     
                    value: 5,
                    //stepSize: 0, 
                    interpolate: 0, 

                  }                
                },   

                { 
                  name: 'env sustain',
                  id: 8,
                  type: 'slider',                                    
                  x: {
                    name: 'env sustain',
                    param: 'eg.set_s',                     
                    value: 0,
                    //stepSize: 0, 
                    interpolate: 0, 

                  }                
                },   

                { 
                  name: 'env release',
                  id: 9,
                  type: 'slider',                                    
                  x: {
                    name: 'env release',
                    param: 'eg.set_r',                     
                    value: 0,
                    //stepSize: 0, 
                    interpolate: 0, 

                  }                
                },                                                                                                             



                { 
                  name: 'filter cutoff',
                  id: 10,
                  type: 'slider',                                    
                  x: {
                    name: 'filter cutoff',
                    param: 'filter.set_freq',                     
                    value: 0,
                    //stepSize: 0, 
                    interpolate: 0, 

                  }                
                },  

                { 
                  name: 'filter resonance',
                  id: 11,
                  type: 'slider',                                    
                  x: {
                    name: 'filter resonance',
                    param: 'filter.set_q',                     
                    value: 75,
                    //stepSize: 0, 
                    interpolate: 0, 

                  }                
                },  
                


                { 
                  name: 'filter eg amount',
                  id: 13,
                  type: 'slider',                                    
                  x: {
                    name: 'filter eg amount',
                    param: 'filter.set_amount',                     
                    value: 100,
                    //stepSize: 0, 
                    interpolate: 0, 

                  }                
                },  



                { 
                  name: 'filter env attack',
                  id: 14,
                  type: 'slider',                                    
                  x: {
                    name: 'filter env attack',
                    param: 'feg.set_a',                     
                    value: 0,
                    //stepSize: 0, 
                    interpolate: 0, 

                  }                
                },   

                { 
                  name: 'filter env decay',
                  id: 15,
                  type: 'slider',                                    
                  x: {
                    name: 'filter env decay',
                    param: 'feg.set_d',                     
                    value: 0,
                    //stepSize: 0, 
                    interpolate: 0, 

                  }                
                },   

                { 
                  name: 'filter env sustain',
                  id: 16,
                  type: 'slider',                                    
                  x: {
                    name: 'filter env sustain',
                    param: 'feg.set_s',                     
                    value: 0,
                    //stepSize: 0, 
                    interpolate: 0, 

                  }                
                },   

                { 
                  name: 'filter env release',
                  id: 17,
                  type: 'slider',                                    
                  x: {
                    name: 'filter env release',
                    param: 'feg.set_r',                     
                    value: 0,
                    //stepSize: 0, 
                    interpolate: 0, 

                  }                
                }


                  

              ] // end of Kit controls              
          },

  ] // close kits
}, // close channel









//*


// blue channel











































// Green to blue channel

{ channelName: 'Ch4 | Synth',  

  defaultPattern: 1, 
  patterns: [ // channel patterns
    {"name":"reset",      "classs":"channel", "id":"2fb82950-36f3-11e6-aa68-d355ddb21e83", "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0]],"id":"572d2ef0-3d91-11e6-84c0-b547c9d0b2b6","name":"synth melodie A","classs":"channel"},    
    {"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"id":"96c47af0-3d91-11e6-84c0-b547c9d0b2b6","name":"synth melodie B","classs":"channel"},
    {"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0]],"id":"566cda40-3d93-11e6-82c4-d3134be48290","name":"try C","classs":"channel"},
{"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"id":"id-solo-84c0-b547c9d0b2b6","name":"synth melodie C","classs":"channel"}


  ], 

  defaultPatternSeq: 0, 
  patternSeq: [     
    [ //{"id":"572d2ef0-3d91-11e6-84c0-b547c9d0b2b6","name":"synth melodie A"},
      {"id":"566cda40-3d93-11e6-82c4-d3134be48290","name":"try C"},
      {"id":"96c47af0-3d91-11e6-84c0-b547c9d0b2b6","name":"synth melodie B"},
      {"id":"566cda40-3d93-11e6-82c4-d3134be48290","name":"try C"},
      {"id":"id-solo-84c0-b547c9d0b2b6","name":"synth melodie C"} ]
  ], 

  trackSet: 1, 
  conf: [ 

    { type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      color: 'rgba(253, 206, 31, 0.8)',
      name: 'etoufed synth', 
      kitNumber: 0,
      tracks: [
        { name: 'C5',
          note:  31
        },  
        { name: 'B4',
          note:  30
        }, 
        { name: 'A4',
          note:  28
        }, 
        { name: 'G4',
          note:  26
        }, 
        { name: 'F4',
          note:  24
        },   
        { name: 'E4',
          note:  23   
        }, 
        { name: 'D4',
          note:  21
        },  
        { name: 'C4',
          note:  19
        } 
      ],
      controls: [ 
{ name: 'Instrument',
          id: 998,
          type: 'ddmenu', 
          x: {
            name: 'Instrument',
            param: '[external]', 
            value: 0,
            stepSize: 0, 
            interpolate: 0, // 0: off | 1: on                   
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        },

        { name: 'Pattern',
          id: 994,
          type: 'ddmenu', 
          x: {
            name: 'Pattern',
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


        { 
          name: 'Pattern sequencer',
          id: 992,

          type: 'multiselect', // nexus push button
          direction: 0, 
          colors: { 
            fg: '#51ACBD' 
          },   
          x: {
              name: 'Save Sequence',
              param: '[external]', 
              midicc: 0,                      
              value: 0, // pattern Seq enable or disable at startup = 0: off | 1: On
              stepSize: 0, 
              interpolate: 0 
          }                 
        }, 


        { 
          name: 'Save Pattern',
          id: 995,

          type: 'contact', 
          direction: 0, 
          colors: { 
            fg: '#51ACBD' 
          },   
          x: {
              name: 'Save Pattern',
              param: '[external]', 
              midicc: 0,                      
              value: 0,
              stepSize: 0, 
              interpolate: 0 
          }                 
        },    
        { name: 'osc1 vol',
          id: 1,
          type: 'slider',                                    
          x: {
            name: 'osc1 vol',
            param: 'vco1.set_gain',                     
            value: 25,
            interpolate: 0, 
          }                
        },
        { name: 'osc1 waveform',
          id: 2,
          type: 'ddmenu',                                    
          x: {
            name: 'osc1 waveform',
            param: 'vco1.set_wave',                     
            value: 1,
            stepSize: 1, 
            interpolate: 0, 
            min: 0,
                    option: {
                      0: 'triangle',
                      1: 'sawtooth',                     
                      2: 'square',
                    },               
            max: 2 // 124                    
          }                
        },  
        { name: 'osc2 vol',
          id: 3,
          type: 'slider',                                    
          x: {
            name: 'osc2 vol',
            param: 'vco2.set_gain',                     
            value: 70,
            interpolate: 0, 
          }                
        },
        { name: 'osc2 waveform',
          id: 4,
          type: 'ddmenu',                                    
          x: {
            name: 'osc2 waveform',
            param: 'vco2.set_wave',                     
            value: 0,
            stepSize: 1, 
            interpolate: 0, 
            min: 0,
                    option: {
                      0: 'triangle',
                      1: 'sawtooth',                     
                      2: 'square',
                    },               
            max: 2                    
          }                
        },     
        { name: 'osc2 pitch',
          id: 5,
          type: 'slider',                                    
          x: {
            name: 'osc2 pitch',
            param: 'vco2.set_pitch',                     
            value: 0, // -30 for high pitcehd notes
            interpolate: 0, 
          }                
        },  
        { name: 'env attack',
          id: 6,
          type: 'slider',                                    
          x: {
            name: 'env attack',
            param: 'eg.set_a',                     
            value: 0,
            interpolate: 0, 
          }                
        },   
        { name: 'env decay',
          id: 7,
          type: 'slider',                                    
          x: {
            name: 'env decay',
            param: 'eg.set_d',                     
            value: 20,
            interpolate: 0, 
          }                
        },   
        { name: 'env sustain',
          id: 8,
          type: 'slider',                                    
          x: {
            name: 'env sustain',
            param: 'eg.set_s',                     
            value: 50,
            interpolate: 0, 
          }                
        },   
        { name: 'env release',
          id: 9,
          type: 'slider',                                    
          x: {
            name: 'env release',
            param: 'eg.set_r',                     
            value: 0,
            interpolate: 0, 
          }                
        },                                                                                                             
        { name: 'filter cutoff',
          id: 10,
          type: 'slider',                                    
          x: {
            name: 'filter cutoff',
            param: 'filter.set_freq',                     
            value: 60,
            interpolate: 0, 
          }                
        },  
        { name: 'filter resonance',
          id: 11,
          type: 'slider',                                    
          x: {
            name: 'filter resonance',
            param: 'filter.set_q',                     
            value: 90,
            interpolate: 0, 
          }                
        },   
        { name: 'filter eg amount',
          id: 13,
          type: 'slider',                                    
          x: {
            name: 'filter eg amount',
            param: 'filter.set_amount',                     
            value: 35,
            interpolate: 0, 
          }                
        },  
        { name: 'filter env attack',
          id: 14,
          type: 'slider',                                    
          x: {
            name: 'filter env attack',
            param: 'feg.set_a',                     
            value: 50,
            interpolate: 0, 
          }                
        },   
        { name: 'filter env decay',
          id: 15,
          type: 'slider',                                    
          x: {
            name: 'filter env decay',
            param: 'feg.set_d',                     
            value: 0,
            interpolate: 0, 
          }                
        },   
        { name: 'filter env sustain',
          id: 16,
          type: 'slider',                                    
          x: {
            name: 'filter env sustain',
            param: 'feg.set_s',                     
            value: 0,
            interpolate: 0, 
          }                
        },   
        { name: 'filter env release',
          id: 17,
          type: 'slider',                                    
          x: {
            name: 'filter env release',
            param: 'feg.set_r',                     
            value: 0,
            interpolate: 0, 
          }                
        }
      ] // end of kit controls
    }, // end of kit








    { type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      color: 'rgba(226, 0, 6, 1)',
      name: 'short decay high pitched', 
      kitNumber: 1,
      tracks: [
        { name: 'D#7',
          note:  58
        },       
        { name: 'D7',
          note:  57
        }, 
        { name: 'C7',
          note:  55
        },               
        { name: 'A#6',
          note:  53
        },       
        { name: 'G6',
          note:  50
        },       
        { name: 'F6',
          note:  48
        },      
        { name: 'D#6',
          note:  45
        },       
        { name: 'D6',
          note:  44
        }, 
        { name: 'C6',
          note:  43
        },           
        { name: 'A#5',
          note:  41   
        }, 
      ],
      controls: [ 
{ name: 'Instrument',
          id: 998,
          type: 'ddmenu', 
          x: {
            name: 'Instrument',
            param: '[external]', 
            value: 0,
            stepSize: 0, 
            interpolate: 0, // 0: off | 1: on                   
            displayedRangeMin: 0,
            displayedRangeMax: '[calc]',
            min: 0,
            max: '[calc]'
          }                 
        },

        { name: 'Pattern',
          id: 994,
          type: 'ddmenu', 
          x: {
            name: 'Pattern',
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


        { 
          name: 'Pattern sequencer',
          id: 992,

          type: 'multiselect', // nexus push button
          direction: 0, 
          colors: { 
            fg: '#51ACBD' 
          },   
          x: {
              name: 'Save Sequence',
              param: '[external]', 
              midicc: 0,                      
              value: 1, // pattern Seq enable or disable at startup = 0: off | 1: On
              stepSize: 0, 
              interpolate: 0 
          }                 
        }, 


        { 
          name: 'Save Pattern',
          id: 995,

          type: 'contact', 
          direction: 0, 
          colors: { 
            fg: '#51ACBD' 
          },   
          x: {
              name: 'Save Pattern',
              param: '[external]', 
              midicc: 0,                      
              value: 0,
              stepSize: 0, 
              interpolate: 0 
          }                 
        },    
        { name: 'osc1 vol',
          id: 1,
          type: 'slider',                                    
          x: {
            name: 'osc1 vol',
            param: 'vco1.set_gain',                     
            value: 20,
            interpolate: 0, 
          }                
        },
        { name: 'osc1 waveform',
          id: 2,
          type: 'ddmenu',                                    
          x: {
            name: 'osc1 waveform',
            param: 'vco1.set_wave',                     
            value: 1,
            stepSize: 1, 
            interpolate: 0, 
            min: 0,
                    option: {
                      0: 'triangle',
                      1: 'sawtooth',                     
                      2: 'square',
                    },               
            max: 2 // 124                    
          }                
        },  
        { name: 'osc2 vol',
          id: 3,
          type: 'slider',                                    
          x: {
            name: 'osc2 vol',
            param: 'vco2.set_gain',                     
            value: 35,
            interpolate: 0, 
          }                
        },
        { name: 'osc2 waveform',
          id: 4,
          type: 'ddmenu',                                    
          x: {
            name: 'osc2 waveform',
            param: 'vco2.set_wave',                     
            value: 0,
            stepSize: 1, 
            interpolate: 0, 
            min: 0,
                    option: {
                      0: 'triangle',
                      1: 'sawtooth',                     
                      2: 'square',
                    },               
            max: 2                    
          }                
        },     
        { name: 'osc2 pitch',
          id: 5,
          type: 'slider',                                    
          x: {
            name: 'osc2 pitch',
            param: 'vco2.set_pitch',                     
            value: 75, // -30 for high pitcehd notes
            interpolate: 0, 
          }                
        },  
        { name: 'env attack',
          id: 6,
          type: 'slider',                                    
          x: {
            name: 'env attack',
            param: 'eg.set_a',                     
            value: 0,
            interpolate: 0, 
          }                
        },   
        { name: 'env decay',
          id: 7,
          type: 'slider',                                    
          x: {
            name: 'env decay',
            param: 'eg.set_d',                     
            value: 10,
            interpolate: 0, 
          }                
        },   
        { name: 'env sustain',
          id: 8,
          type: 'slider',                                    
          x: {
            name: 'env sustain',
            param: 'eg.set_s',                     
            value: 60,
            interpolate: 0, 
          }                
        },   
        { name: 'env release',
          id: 9,
          type: 'slider',                                    
          x: {
            name: 'env release',
            param: 'eg.set_r',                     
            value: 0,
            interpolate: 0, 
          }                
        },                                                                                                             
        { name: 'filter cutoff',
          id: 10,
          type: 'slider',                                    
          x: {
            name: 'filter cutoff',
            param: 'filter.set_freq',                     
            value: 75,
            interpolate: 0, 
          }                
        },  
        { name: 'filter resonance',
          id: 11,
          type: 'slider',                                    
          x: {
            name: 'filter resonance',
            param: 'filter.set_q',                     
            value: 40,
            interpolate: 0, 
          }                
        },  
        { name: 'filter eg amount',
          id: 13,
          type: 'slider',                                    
          x: {
            name: 'filter eg amount',
            param: 'filter.set_amount',                     
            value: 40,
            interpolate: 0, 
          }                
        },  
        { name: 'filter env attack',
          id: 14,
          type: 'slider',                                    
          x: {
            name: 'filter env attack',
            param: 'feg.set_a',                     
            value: 15,
            interpolate: 0, 
          }                
        },   
        { name: 'filter env decay',
          id: 15,
          type: 'slider',                                    
          x: {
            name: 'filter env decay',
            param: 'feg.set_d',                     
            value: 0,
            interpolate: 0, 
          }                
        },   
        { name: 'filter env sustain',
          id: 16,
          type: 'slider',                                    
          x: {
            name: 'filter env sustain',
            param: 'feg.set_s',                     
            value: 0,
            interpolate: 0, 
          }                
        },   
        { name: 'filter env release',
          id: 17,
          type: 'slider',                                    
          x: {
            name: 'filter env release',
            param: 'feg.set_r',                     
            value: 0,
            interpolate: 0, 
          }                
        }
      ] // end of kit controls
    }, // end of kit
 

  ] // end of kits
} /*, // end of channel
















// Pink channel

{ channelName: 'Channel 5: melodic percussions (c3>c4)',  
  trackSet: 1, 
  conf: [ 
  
//     { type: 'synth',
//       instrumentName: 'AikeWebsynth1', 
//       color: 'rgba(237, 49, 104, 1)',
// name: '', 
//       kitNumber: 0,
//       tracks: [
//         { name: 'C4',
//           note:  15
//         },  
//         { name: 'B3',
//           note:  14
//         }, 
//         { name: 'A3',
//           note:  12
//         }, 
//         { name: 'G3',
//           note:  10
//         }, 
//         { name: 'F3',
//           note:  8
//         },   
//         { name: 'E3',
//           note:  7   
//         }, 
//         { name: 'D3',
//           note:  5
//         },  
//         { name: 'C3',
//           note:  3
//         } 
//       ],
//       controls: [ 
//         { name: '[Kit change]',
//           id: 998,
//           type: 'input', 
//           x: {
//             name: 'Kit change',
//             param: '[external]', 
//             value: 0,
//             stepSize: 0, 
//             interpolate: 0, 
//             displayedRangeMin: 0,
//             displayedRangeMax: '[calc]',
//             min: 0,
//             max: '[calc]'
//           }                 
//         },    
//         { name: 'osc1 vol',
//           id: 1,
//           type: 'input',                                    
//           x: {
//             name: 'osc1 vol',
//             param: 'vco1.set_gain',                     
//             value: 30,
//             //stepSize: 0, 
//             interpolate: 0, 
//             //min: 0,
//             //max: 100                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },
//         { name: 'osc1 waveform',
//           id: 2,
//           type: 'input',                                    
//           x: {
//             name: 'osc1 waveform',
//             param: 'vco1.set_wave',                     
//             value: 1,
//             stepSize: 1, 
//             interpolate: 0, 
//             min: 0,
//             max: 2 // 124                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },  
//         { name: 'osc2 vol',
//           id: 3,
//           type: 'input',                                    
//           x: {
//             name: 'osc2 vol',
//             param: 'vco2.set_gain',                     
//             value: 80,
//             //stepSize: 0, 
//             interpolate: 0, 
//             //min: 0,
//             //max: 100                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },
//         { name: 'osc2 waveform',
//           id: 4,
//           type: 'input',                                    
//           x: {
//             name: 'osc2 waveform',
//             param: 'vco2.set_wave',                     
//             value: 0,
//             stepSize: 1, 
//             interpolate: 0, 
//             min: 0,
//             max: 2                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },     
//         { name: 'osc2 pitch',
//           id: 5,
//           type: 'input',                                    
//           x: {
//             name: 'osc2 pitch',
//             param: 'vco2.set_pitch',                     
//             value: 0, // -30 for high pitcehd notes
//             //stepSize: 0, 
//             interpolate: 0, 
//             //min: 0,
//             //max: 100                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },  
//         { name: 'env attack',
//           id: 6,
//           type: 'input',                                    
//           x: {
//             name: 'env attack',
//             param: 'eg.set_a',                     
//             value: 0,
//             //stepSize: 0, 
//             interpolate: 0, 
//             //min: 0,
//             //max: 100                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },   
//         { name: 'env decay',
//           id: 7,
//           type: 'input',                                    
//           x: {
//             name: 'env decay',
//             param: 'eg.set_d',                     
//             value: 25,
//             //stepSize: 0, 
//             interpolate: 0, 
//             //min: 0,
//             //max: 100                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },   
//         { name: 'env sustain',
//           id: 8,
//           type: 'input',                                    
//           x: {
//             name: 'env sustain',
//             param: 'eg.set_s',                     
//             value: 10,
//             //stepSize: 0, 
//             interpolate: 0, 
//             //min: 0,
//             //max: 100                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },   
//         { name: 'env release',
//           id: 9,
//           type: 'input',                                    
//           x: {
//             name: 'env release',
//             param: 'eg.set_r',                     
//             value: 0,
//             //stepSize: 0, 
//             interpolate: 0, 
//             //min: 0,
//             //max: 100                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },                                                                                                             
//         { name: 'filter cutoff',
//           id: 10,
//           type: 'input',                                    
//           x: {
//             name: 'filter cutoff',
//             param: 'filter.set_freq',                     
//             value: 65,
//             //stepSize: 0, 
//             interpolate: 0, 
//             //min: 0,
//             //max: 100                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },  
//         { name: 'filter resonance',
//           id: 11,
//           type: 'input',                                    
//           x: {
//             name: 'filter resonance',
//             param: 'filter.set_q',                     
//             value: 10,
//             //stepSize: 0, 
//             interpolate: 0, 
//             //min: 0,
//             //max: 100                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },  

//         { name: 'filter eg amount',
//           id: 13,
//           type: 'input',                                    
//           x: {
//             name: 'filter eg amount',
//             param: 'filter.set_amount',                     
//             value: 30,
//             //stepSize: 0, 
//             interpolate: 0, 
//             //min: 0,
//             //max: 100                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },  
//         { name: 'filter env attack',
//           id: 14,
//           type: 'input',                                    
//           x: {
//             name: 'filter env attack',
//             param: 'feg.set_a',                     
//             value: 0,
//             //stepSize: 0, 
//             interpolate: 0, 
//             //min: 0,
//             //max: 100                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },   
//         { name: 'filter env decay',
//           id: 15,
//           type: 'input',                                    
//           x: {
//             name: 'filter env decay',
//             param: 'feg.set_d',                     
//             value: 30,
//             //stepSize: 0, 
//             interpolate: 0, 
//             //min: 0,
//             //max: 100                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },   
//         { name: 'filter env sustain',
//           id: 16,
//           type: 'input',                                    
//           x: {
//             name: 'filter env sustain',
//             param: 'feg.set_s',                     
//             value: 82,
//             //stepSize: 0, 
//             interpolate: 0, 
//             //min: 0,
//             //max: 100                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         },   
//         { name: 'filter env release',
//           id: 17,
//           type: 'input',                                    
//           x: {
//             name: 'filter env release',
//             param: 'feg.set_r',                     
//             value: 0,
//             //stepSize: 0, 
//             interpolate: 0, 
//             //min: 0,
//             //max: 100                    
//             //displayedRangeMin: 0,
//             //displayedRangeMax: 100,
//           }                
//         }
//       ] // end of kit controls
//     }, // end of kit





    { type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Marimba', 
      kitNumber: 0, 
      color: 'rgba(237, 49, 104, 0.95)',
      tracks: [
        { name: 'C4',
          sampleUrl: 'Marimba/C4.wav'
        },  
        { name: 'B3',
          sampleUrl: 'Marimba/B3.wav'
        }, 
        { name: 'A3',
          sampleUrl: 'Marimba/A3.wav'
        }, 
        { name: 'G3',
          sampleUrl: 'Marimba/G3.wav'
        }, 
        { name: 'F3',
          sampleUrl: 'Marimba/F3.wav'
        },   
        { name: 'E3',
          sampleUrl: 'Marimba/E3.wav'   
        }, 
        { name: 'D3',
          sampleUrl: 'Marimba/D3.wav'
        },  
        { name: 'C3',
          sampleUrl: 'Marimba/C3.wav'
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
      name: 'Spacedrum: chromatic', 
      kitNumber: 1, 
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
      name: 'Spacedrum: 8notesDiatoAm', 
      kitNumber: 2, 
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
    
    // { type: 'samples', 
    //   instrumentName: 'Sampler', 
    //   color: 'rgba(253, 206, 31, 0.9)', //color: '#AADB53',
    //   name: 'Lead synth',
    //   kitNumber: 2, 
    //   //color: 'rgba(253, 118, 8, 1)', 
    //   tracks: [
    //     { name: 'Bb4',
    //       sampleUrl: 'spacedrum/6notesBb4V4.mp3'
    //     }, 
    //     { name: 'G4',
    //       sampleUrl: 'spacedrum/6notesG4V4.mp3'
    //     }, 
    //     { name: 'F4',
    //       sampleUrl: 'spacedrum/6notesF4V4.mp3'
    //     },   
    //     { name: 'D4',
    //       sampleUrl: 'spacedrum/6notesD4V4.mp3'
    //     },  
    //     { name: 'C4',
    //       sampleUrl: 'spacedrum/6notesC4V4.mp3'
    //     },   
    //     { name: 'Bb3',
    //       sampleUrl: 'spacedrum/6notesBb3V4.mp3'
    //     },  
    //     // 2 random redondant notes added for 8 note pattern compatibility
    //     { name: 'G4',
    //       sampleUrl: 'spacedrum/6notesG4V4.mp3'
    //     },  
    //     { name: 'D4',
    //       sampleUrl: 'spacedrum/6notesD4V4.mp3'
    //     }                                         
    //   ],
    //   controls: [ 
    //     { name: '[Kit change]',
    //       id: 998,
    //       type: 'input', 
    //       x: {
    //         name: 'Kit change',
    //         param: '[external]', 
    //         value: 2,
    //         stepSize: 0, 
    //         interpolate: 0, 
    //         displayedRangeMin: 0,
    //         displayedRangeMax: '[calc]',
    //         min: 0,
    //         max: '[calc]'
    //       }                 
    //     }
    //   ]            
    // },      
    








  ] // end of kits
}, // end of channel

















// Yellow cheesy channel: guitar, synth lead, etc

{ channelName: 'Channel 6: c4>c5',  
  trackSet: 1, 
  conf: [ 


    
    // { type: 'samples', 
    //   instrumentName: 'Sampler', 
    //   name: 'Lead synth', 
    //   kitNumber: 0, 
    //   color: 'rgba(253, 118, 8, 0.85)', 
    //   tracks: [
    //     {
    //         name: 'B4',
    //         sampleUrl: 'lead1/Synth1_8.mp3'
    //     }, {
    //         name: 'A4',
    //         sampleUrl: 'lead1/Synth1_7.mp3'
    //     },
    //     {
    //         name: 'F#4',
    //         sampleUrl: 'lead1/Synth1_6.mp3'
    //     },
    //     {
    //         name: 'E4',
    //         sampleUrl: 'lead1/Synth1_5.mp3'
    //     },
    //     {
    //         name: 'C#4',
    //         sampleUrl: 'lead1/Synth1_4.mp3'
    //     },
    //     {
    //         name: 'B3',
    //         sampleUrl: 'lead1/Synth1_3.mp3'
    //     },
    //     {
    //         name: 'A3',
    //         sampleUrl: 'lead1/Synth1_2.mp3'
    //     },
    //     {
    //         name: 'F#3',
    //         sampleUrl: 'lead1/Synth1_1.mp3'
    //     }                        
    //   ],
    //   controls: [ 
    //     { name: '[Kit change]',
    //       id: 998,
    //       type: 'input', 
    //       x: {
    //         name: 'Kit change',
    //         param: '[external]', 
    //         value: 0,
    //         stepSize: 0, 
    //         interpolate: 0, 
    //         displayedRangeMin: 0,
    //         displayedRangeMax: '[calc]',
    //         min: 0,
    //         max: '[calc]'
    //       }                 
    //     }
    //   ]            
    // }, 
    




    { type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      color: 'rgba(253, 206, 31, 0.8)',
      name: 'etoufed synth', 
      kitNumber: 0,
      tracks: [
        { name: 'C5',
          note:  31
        },  
        { name: 'B4',
          note:  30
        }, 
        { name: 'A4',
          note:  28
        }, 
        { name: 'G4',
          note:  26
        }, 
        { name: 'F4',
          note:  24
        },   
        { name: 'E4',
          note:  23   
        }, 
        { name: 'D4',
          note:  21
        },  
        { name: 'C4',
          note:  19
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
            value: 25,
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
            value: 70,
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
            value: 20,
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
            value: 50,
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
            value: 60,
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
            value: 90,
            //stepSize: 0, 
            interpolate: 0, 
            //min: 0,
            //max: 100                    
            //displayedRangeMin: 0,
            //displayedRangeMax: 100,
          }                
        },  
        
        //{ 
        //   name: 'filter eg',
        //   id: 12,
        //   type: 'input',                                    
        //   x: {
        //     name: 'filter eg',
        //     param: 'filter.set_eg',                     
        //     value: 50,
        //     //stepSize: 0, 
        //     interpolate: 0, 
        //     //min: 0,
        //     //max: 100                    
        //     //displayedRangeMin: 0,
        //     //displayedRangeMax: 100,
        //   }                
        // },  
        { name: 'filter eg amount',
          id: 13,
          type: 'input',                                    
          x: {
            name: 'filter eg amount',
            param: 'filter.set_amount',                     
            value: 35,
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
            value: 50,
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
            value: 0,
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
            value: 0,
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
    }, // end of kit


    { type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Guitar', 
      kitNumber: 1, 
      color: 'rgba(237, 49, 104, 0.9)',
      tracks: [
        { name: 'C4',
          sampleUrl: 'Guitar/C4.wav'
        },  
        { name: 'B3',
          sampleUrl: 'Guitar/B3.wav'
        }, 
        { name: 'A3',
          sampleUrl: 'Guitar/A3.wav'
        }, 
        { name: 'G3',
          sampleUrl: 'Guitar/G3.wav'
        }, 
        { name: 'F3',
          sampleUrl: 'Guitar/F3.wav'
        },   
        { name: 'E3',
          sampleUrl: 'Guitar/E3.wav'   
        }, 
        { name: 'D3',
          sampleUrl: 'Guitar/D3.wav'
        },  
        { name: 'C3',
          sampleUrl: 'Guitar/C3.wav'
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


 



    


  ] // end of kits
}, // end of channel




















// Red channel

{ channelName: 'Channel 7: c5>c6',  
  trackSet: 1, 

  defaultPatternSeq: 0, 
  patternSeq: [     
    [ {"name":"bassline A", "classs":"channel", "id":"712cc380-3d17-11e6-bd11-650c5a0c542f"},
      {"name":"Bassline B", "classs":"channel", "id":"01627d00-3d18-11e6-bd11-650c5a0c542f"} ]
  ], 



  conf: [ 
    { type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      color: 'rgba(226, 0, 6, 1)',
      name: 'short decay high pitched', 
      kitNumber: 0,
      tracks: [
        { name: 'C6',
          note:  43
        },  
        { name: 'B5',
          note:  42
        }, 
        { name: 'A5',
          note:  40
        }, 
        { name: 'G5',
          note:  38
        }, 
        { name: 'F5',
          note:  36
        },   
        { name: 'E5',
          note:  35   
        }, 
        { name: 'D5',
          note:  33
        },  
        { name: 'C5',
          note:  31
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
            value: 20,
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
            value: 35,
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
            value: 75, // -30 for high pitcehd notes
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
            value: 10,
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
            value: 60,
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
            value: 75,
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
            value: 40,
            //stepSize: 0, 
            interpolate: 0, 
            //min: 0,
            //max: 100                    
            //displayedRangeMin: 0,
            //displayedRangeMax: 100,
          }                
        },  
        
        // { 
        //   name: 'filter eg',
        //   id: 12,
        //   type: 'input',                                    
        //   x: {
        //     name: 'filter eg',
        //     param: 'filter.set_eg',                     
        //     value: 50,
        //     //stepSize: 0, 
        //     interpolate: 0, 
        //     //min: 0,
        //     //max: 100                    
        //     //displayedRangeMin: 0,
        //     //displayedRangeMax: 100,
        //   }                
        // }, 
        { name: 'filter eg amount',
          id: 13,
          type: 'input',                                    
          x: {
            name: 'filter eg amount',
            param: 'filter.set_amount',                     
            value: 40,
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
            value: 15,
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
            value: 0,
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
            value: 0,
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
    }, // end of kit



    { type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Flute', 
      kitNumber: 1, 
      color: 'rgba(226, 0, 6, 0.95)', //color: 'rgba(253, 206, 31, 0.7)',
      tracks: [
        { name: 'C5',
          sampleUrl: 'Flute/C5.wav'
        },  
        { name: 'B4',
          sampleUrl: 'Flute/B4.wav'
        }, 
        { name: 'A4',
          sampleUrl: 'Flute/A4.wav'
        }, 
        { name: 'G4',
          sampleUrl: 'Flute/G4.wav'
        }, 
        { name: 'F4',
          sampleUrl: 'Flute/F4.wav'
        },   
        { name: 'E4',
          sampleUrl: 'Flute/E4.wav'   
        }, 
        { name: 'D4',
          sampleUrl: 'Flute/D4.wav'
        },  
        { name: 'C4',
          sampleUrl: 'Flute/C4.wav'
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



  ] // end of kits
}, // end of channel













// Purple channel

{ channelName: 'Channel 8: c6>c7',  
  trackSet: 1, 
  conf: [ 
    { type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      color: 'rgba(149, 55, 166, 1)',
      name: 'accordéon/mélodie du lointain', 
      kitNumber: 0,
      tracks: [
        { name: 'C7',
          note:  55
        },  
        { name: 'B6',
          note:  54
        }, 
        { name: 'A6',
          note:  52
        }, 
        { name: 'G6',
          note:  50
        }, 
        { name: 'F6',
          note:  48
        },   
        { name: 'E6',
          note:  47  
        }, 
        { name: 'D6',
          note:  45
        },  
        { name: 'C6',
          note:  43
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
            value: 10,
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
            value: 2,
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
            value: 10,
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
            value: 5,
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
            value: 15,
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
            value: 0,
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
            value: 31,
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
            value: 100,
            //stepSize: 0, 
            interpolate: 0, 
            //min: 0,
            //max: 100                    
            //displayedRangeMin: 0,
            //displayedRangeMax: 100,
          }                
        },  
        
        // { 
        //   name: 'filter eg',
        //   id: 12,
        //   type: 'input',                                    
        //   x: {
        //     name: 'filter eg',
        //     param: 'filter.set_eg',                     
        //     value: 50,
        //     //stepSize: 0, 
        //     interpolate: 0, 
        //     //min: 0,
        //     //max: 100                    
        //     //displayedRangeMin: 0,
        //     //displayedRangeMax: 100,
        //   }                
        // },  
        { name: 'filter eg amount',
          id: 13,
          type: 'input',                                    
          x: {
            name: 'filter eg amount',
            param: 'filter.set_amount',                     
            value: 40,
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
            value: 20,
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
            value: 0,
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
    }, // end of kit



    { type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Piano', 
      kitNumber: 1, 
      color: 'rgba(149, 55, 166, 0.95)', //color: 'rgba(253, 206, 31, 0.75)',
      tracks: [
        { name: 'C5',
          sampleUrl: 'Piano/C5.wav'
        },  
        { name: 'B4',
          sampleUrl: 'Piano/B4.wav'
        }, 
        { name: 'A4',
          sampleUrl: 'Piano/A4.wav'
        }, 
        { name: 'G4',
          sampleUrl: 'Piano/G4.wav'
        }, 
        { name: 'F4',
          sampleUrl: 'Piano/F4.wav'
        },   
        { name: 'E4',
          sampleUrl: 'Piano/E4.wav'   
        }, 
        { name: 'D4',
          sampleUrl: 'Piano/D4.wav'
        },  
        { name: 'C4',
          sampleUrl: 'Piano/C4.wav'
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




  ] // end of kits
} // end of channel
//*/

];


