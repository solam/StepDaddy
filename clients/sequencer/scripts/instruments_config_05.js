var session5ConductorControls = (JSON.parse(JSON.stringify(window.tweak.conductor))); 
session5ConductorControls[0].x.value = 58; // ch1 vol
session5ConductorControls[1].x.value = 30;
session5ConductorControls[2].x.value = 22;
session5ConductorControls[3].x.value = 16;
session5ConductorControls[4].x.value = 25;
session5ConductorControls[5].x.value = 30;
session5ConductorControls[6].x.value = 16; // ch7 vol - 100

session5ConductorControls[7].x.value = 80; // tempo

session5ConductorControls[10].x.value = 0; // ch1 bar offest
session5ConductorControls[11].x.value = 8;
        session5ConductorControls[12].x.value = 8;
session5ConductorControls[13].x.value = 18;
session5ConductorControls[14].x.value = 26;
session5ConductorControls[15].x.value = 38;
session5ConductorControls[16].x.value = 40; //48

session5ConductorControls[17].x.value = 56; // ch8 (conductor) bar offset - 100
session5ConductorControls[18].x.value = 64; // general kickout bars

console.log('s5conductCtrl: ', session5ConductorControls); // smpPrgChangeSavePattern



var patternSeqOff = (JSON.parse(JSON.stringify(aikeWebsynthControls))); 
patternSeqOff[5].x.value = 0; // patternSeq off


window.insConf5 = [ 

{ sessionName: 'Ep #6', // Electropixel #6
  channelName: 'Ch1 Bass guitar',  
  trackSet: 0, 

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"TaLaLi Bassline A (synkoped)","classs":"channel","id":"81c22550-6675-11e6-b5e9-51d55022d761","tracks":[[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0]]},
    {"name":"TaLaLi Bassline B (continuous)","classs":"channel","id":"128a5ad0-6676-11e6-b509-c753c06f4910","tracks":[[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,1,0,1,0,1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0]]},
    {"name":"calme ta basse","classs":"channel", "id":"a61d9d90-667e-11e6-a6fa-97a17043872f","tracks":[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0]]}  
  ],  

  conf: [{ 
    type: 'samples', 
    instrumentName: 'Sampler', 
    name: 'c1-c2 (3 notes) - Bass guitar', 
    kitNumber: 0, 
    color: 'rgba(0, 171, 157, 1)',
    tracks: [{ name: 'C2', sampleUrl: 'Basse/C2.wav'}, /*{ name: 'B1', sampleUrl: 'Basse/B1.wav'}, { name: 'A1', sampleUrl: 'Basse/A1.wav'}, */ { name: 'G1', sampleUrl: 'Basse/G1.wav'}, /*{ name: 'F1', sampleUrl: 'Basse/F1.wav'}, { name: 'E1', sampleUrl: 'Basse/E1.wav'}, { name: 'D1', sampleUrl: 'Basse/D1.wav'}, */ { name: 'C1', sampleUrl: 'Basse/C1.wav'} ], 
    controls: smpPrgChangeSavePattern
  }] 
}, 



{ channelName: 'Ch8 Conductor',
  trackSet: 0, 
  conf: [ { 
    type: 'control', 
    instrumentName: 'Conductor', 
    name: 'Conductor Ctrl 01', 
    kitNumber: 0, 
    color: '#51ACBD',       
    controls: session5ConductorControls
  }] 
}, 



{ channelName: 'Ch2 Synth bass', 
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [
    {"name":"TRI_Bass","classs":"channel","controls":{"1":100,"2":"0","3":24,"4":"1","5":81,"6":0,"7":26,"8":78,"9":43,"10":23,"11":51,"12":33,"13":13,"14":7,"15":29,"16":33},"id":"2d4bc2e0-6677-11e6-89c6-9b6aaf4bf5b7"},
    {"name":"Baonlle","classs":"channel","controls":{"1":10,"2":"2","3":46,"4":"1","5":76,"6":0,"7":10,"8":11,"9":16,"10":40,"11":68,"12":26,"13":25,"14":51,"15":20,"16":12},"id":"4f802750-667e-11e6-89c6-9b6aaf4bf5b7"}
    /*{"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}},
    {"name":"double osc bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d0000","controls":{1:40, 2:1, 3:100, 4:0, 5:0, 6:0, 7:15, 8:0, 9:0, 10:66, 11:20, 12:35, 13:0, 14:30, 15:80, 16:0}},*/
  ],

  defaultPattern: 1, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"tri_note_mellow","classs":"channel","id":"8577ef70-6677-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]},
    {"name":"Pois sauteurs","classs":"channel","id":"70c15650-667e-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}
  ], 

  conf: [{ 
    type: 'synth',
    instrumentName: 'AikeWebsynth1', 
    instrumentUrl: 'http://aikelab.net/websynth/',
    color: 'rgba(0, 161, 0, 1)',
    name: 'c1 > c2', 
    kitNumber: 0,      
    tracks: window.draw.c1_c2_penta_minor,
    controls: aikeWebsynthControlsReduced           
  }] 
}, 



{ channelName: 'Ch3 Guitar/Piano',  
  trackSet: 1, 

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"GuitarMellow","classs":"channel","id":"5d67c810-6678-11e6-afb2-e793ea1788a6","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,1,0,0,0,0,1,0,1,0,1,0],[0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0]]},
    {"name":"jazzy piano","classs":"channel","id":"6c57d720-667d-11e6-afb2-e793ea1788a6","tracks":[[0,0,0,0,1,0,1,1,0,0,1,0,1,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]} 
  ],  

  conf: [
    { 
      type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Guitar - c3-c4 (3 notes)', 
      kitNumber: 0, 
      color: 'rgba(149, 55, 166, 1)', //color: 'rgba(253, 206, 31, 0.75)', 'rgba(237, 49, 104, 0.9)',
      tracks: [{ name: 'C4', sampleUrl: 'Guitar/C4.wav'},/* { name: 'B3', sampleUrl: 'Guitar/B3.wav'}, { name: 'A3', sampleUrl: 'Guitar/A3.wav'},*/ { name: 'G3', sampleUrl: 'Guitar/G3.wav'},/* { name: 'F3', sampleUrl: 'Guitar/F3.wav'}, { name: 'E3', sampleUrl: 'Guitar/E3.wav'}, { name: 'D3', sampleUrl: 'Guitar/D3.wav'},*/ { name: 'C3', sampleUrl: 'Guitar/C3.wav'} ],
      controls: window.launch.sample_prg
    },

    { 
      type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Piano - c4-c5 (3 notes)', 
      kitNumber: 1, 
      color: 'rgba(149, 55, 166, 0.5)', //color: 'rgba(253, 206, 31, 0.75)',
      tracks: [{ name: 'C5', sampleUrl: 'Piano/C5.wav'},/* { name: 'B4', sampleUrl: 'Piano/B4.wav'}, { name: 'A4', sampleUrl: 'Piano/A4.wav'},*/ { name: 'G4', sampleUrl: 'Piano/G4.wav'},/* { name: 'F4', sampleUrl: 'Piano/F4.wav'}, { name: 'E4', sampleUrl: 'Piano/E4.wav'}, { name: 'D4', sampleUrl: 'Piano/D4.wav'},*/ { name: 'C4', sampleUrl: 'Piano/C4.wav'} ], 
      controls: window.launch.sample_prg
    },

  ] 
}, 



{ channelName: 'Ch4 MidFq Syn', // MidFreq
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [
    //{"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}},
    {"name":"DyaWowoySND","classs":"channel","controls":{"1":53,"2":"0","3":30,"4":"1","5":93,"6":11,"7":8,"8":34,"9":51,"10":59,"11":75,"12":39,"13":78,"14":25,"15":50,"16":63},"id":"79398eb0-6679-11e6-aa2f-73993aa5fd3f"}    
  ],

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"DyaWowoyMellow","classs":"channel","id":"a9be3630-6679-11e6-aa2f-73993aa5fd3f","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}
  ], 

  conf: [{ 
    type: 'synth',
    instrumentName: 'AikeWebsynth1', 
    instrumentUrl: 'http://aikelab.net/websynth/',
    color: 'rgba(253, 118, 8, 1)',
    name: 'c2 > c3', 
    kitNumber: 0,      
    tracks: window.draw.c2_c3_penta_minor,
    controls: aikeWebsynthControlsReduced           
  }] 
}, 



{ channelName: 'Ch5 Hang/Flute',  
  trackSet: 0, 

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}, 
    {"name":"pontec","classs":"channel","id":"63753dd0-667a-11e6-82ff-f7a50cae174e","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0]]},
    {"name":"pontec 2","classs":"channel","id":"d41d0bb0-667c-11e6-82ff-f7a50cae174e","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0]]}
  ],  

  conf: [
    { 
      type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Hang - c4-c5 (3 notes)', 
      kitNumber: 0, 
      color: 'rgba(253, 206, 31, 1)', // 'rgba(226, 0, 6, 1)'
      tracks: [{ name: 'C5', sampleUrl: 'spacedrum/Chro13C5.mp3'},/* { name: 'B4', sampleUrl: 'spacedrum/Chro12B4.mp3'}, { name: 'A4', sampleUrl: 'spacedrum/Chro10A4.mp3'},*/ { name: 'G4', sampleUrl: 'spacedrum/Chro8G4.mp3'}, /*, { name: 'F4', sampleUrl: 'spacedrum/Chro6F4.mp3'}, { name: 'E4', sampleUrl: 'spacedrum/Chro5E4.mp3'}, { name: 'D4', sampleUrl: 'spacedrum/Chro3D4.mp3'},*/ { name: 'C4', sampleUrl: 'spacedrum/Chro1C4.mp3'} ], 
      controls: window.launch.sample_prg
    },

    {
      type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Flute - c4-c5 (3 notes)', 
      kitNumber: 1, 
      color: 'rgba(253, 206, 31, 0.35)', 
      tracks: [{ name: 'C5', sampleUrl: 'Flute/C5.wav'},/* { name: 'B4', sampleUrl: 'Flute/B4.wav'}, { name: 'A4', sampleUrl: 'Flute/A4.wav'},*/ { name: 'G4', sampleUrl: 'Flute/G4.wav'}, /*, { name: 'F4', sampleUrl: 'Flute/F4.wav'}, { name: 'E4', sampleUrl: 'Flute/E4.wav'}, { name: 'D4', sampleUrl: 'Flute/D4.wav'},*/ { name: 'C4', sampleUrl: 'Flute/C4.wav'} ],
      controls: window.launch.sample_prg
    },

  ] 
}, 



{ channelName: 'Ch6 HiFq Syn A', 
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [
    {"name":"square","type":"AikeWebsynth1","classs":"channel","id":"2fbddcv123cd7f89ff54f","controls":{1:9, 2:1, 3:35, 4:2, 5:27, 6:0, 7:66, 8:80, 9:0, 10:0, 11:40, 12:96, 13:0, 14:0, 15:30, 16:70}}    
  ],

  defaultPattern: 0, 
  patterns: [ // channel patterns
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"la ronde","classs":"channel","id":"180d4700-667c-11e6-82b9-0508ed9d1306","tracks":[[0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0],[0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}    
    /*{"name":"bassline a", "classs":"channel", "id":"712cc380-3d17-11e6-bd11-650c5a0c542f", "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0],[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"bassline b", "classs":"channel", "id":"01627d00-3d18-11e6-bd11-650c5a0c542f", "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0],[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]]}*/     
  ], 

  defaultPatternSeq: 0, 
  patternSeq: [     
    [ //{"name":"bassline a", "classs":"channel", "id":"712cc380-3d17-11e6-bd11-650c5a0c542f"},
      {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"},
      {"name":"la ronde","classs":"channel","id":"180d4700-667c-11e6-82b9-0508ed9d1306"}
      //{"name":"bassline b", "classs":"channel", "id":"01627d00-3d18-11e6-bd11-650c5a0c542f"} 
    ]
  ], 

  conf: [{ 
    type: 'synth',
    instrumentName: 'AikeWebsynth1', 
    instrumentUrl: 'http://aikelab.net/websynth/',
    color: 'rgba(226, 0, 6, 1)',
    name: 'c2 > c4', 
    kitNumber: 0,      
    tracks: window.draw.c2_c4_penta_minor,
    controls: patternSeqOff//aikeWebsynthControls         
  }] 
}, 

      

{ channelName: 'Ch7 HiFq Syn B', // Ch7 Highfreq Synth B
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [
    //{"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}},
    {"name":"le clownSOUND","type":"AikeWebsynth1","classs":"channel","id":"2fbddfd9fd9dvbvb2b2b","controls":{1:59, 2:1, 3:19, 4:2, 5:36, 6:0, 7:26, 8:45, 9:11, 10:7, 11:55, 12:68, 13:0, 14:20, 15:78, 16:13}}    
  ],

  defaultPattern: 0, 
  patterns: [ // channel patterns
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"la marche du clown","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}
    /*{"name":"bassline a", "classs":"channel", "id":"712cc380-3d17-11e6-bd11-650c5a0c542f", "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0],[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"bassline b", "classs":"channel", "id":"01627d00-3d18-11e6-bd11-650c5a0c542f", "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0],[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]]}*/     
  ], 

  defaultPatternSeq: 0, 
  patternSeq: [     
    [ {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"},
      {"name":"la marche du clown","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605"} ]
  ],   

  conf: [{ 
    type: 'synth',
    instrumentName: 'AikeWebsynth1', 
    instrumentUrl: 'http://aikelab.net/websynth/',
    color: 'rgba(237, 49, 104, 1)',
    name: 'c3 > c5', 
    kitNumber: 0,      
    tracks: window.draw.c3_c5_penta_minor,
    controls: patternSeqOff          
  }] 
}, 











];


