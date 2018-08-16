var session5ConductorControls = (JSON.parse(JSON.stringify(window.tweak.conductor))); 
session5ConductorControls[0].x.value = 58; // ch1 vol
session5ConductorControls[1].x.value = 30;
session5ConductorControls[2].x.value = 22;
session5ConductorControls[3].x.value = 16;
session5ConductorControls[4].x.value = 25;
session5ConductorControls[5].x.value = 30;
session5ConductorControls[6].x.value = 16; // ch7 vol - 100

session5ConductorControls[7].x.value = 140; // tempo

session5ConductorControls[10].x.value = 0; // ch1 bar offest
session5ConductorControls[11].x.value = 8;
        session5ConductorControls[12].x.value = 8;
session5ConductorControls[13].x.value = 18;
session5ConductorControls[14].x.value = 26;
session5ConductorControls[15].x.value = 38;
session5ConductorControls[16].x.value = 40; //48

session5ConductorControls[17].x.value = 56; // ch8 (conductor) bar offset - 100
session5ConductorControls[18].x.value = 48; // general kickout bars // 64

//console.log('s5conductCtrl: ', session5ConductorControls); // smpPrgChangeSavePattern



var patternSeqOff = (JSON.parse(JSON.stringify(aikeWebsynthControls))); 
//patternSeqOff[6].x.value = 0; // 0: patternSeq off - old: patternSeqOff[5]

//console.log('patternSeqOff: ', patternSeqOff);

window.insConf5 = [ 

{ sessionName: 'NDW2016', // Ep #6 Electropixel #6
  channelName: 'Ch1 Bass guitar',  
  trackSet: 0, 

  defaultPattern: 1, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"TaLaLi Bassline A (synkoped)","classs":"channel","id":"81c22550-6675-11e6-b5e9-51d55022d761","tracks":[[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0]]},
    {"name":"TaLaLi Bassline B (continuous)","classs":"channel","id":"128a5ad0-6676-11e6-b509-c753c06f4910","tracks":[[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,1,0,1,0,1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0]]},
    {"name":"calme ta basse","classs":"channel", "id":"a61d9d90-667e-11e6-a6fa-97a17043872f","tracks":[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0]]}
    //{"name":"4/4","classs":"channel","id":"85d646b0-71e9-11e6-ae6b-cbeced753752","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]]} 
  ],  

  conf: [{ 
    type: 'samples', 
    instrumentName: 'Sampler', 
    name: 'c1-c2 (3 notes) - Bass guitar', 
    kitNumber: 0, 
    color: 'rgba(0, 171, 157, 1)',
    tracks: [{ name: 'C2', sampleUrl: 'Basse/C2.wav'}, /*{ name: 'B1', sampleUrl: 'Basse/B1.wav'}, { name: 'A1', sampleUrl: 'Basse/A1.wav'}, */ { name: 'G1', sampleUrl: 'Basse/G1.wav'}, /*{ name: 'F1', sampleUrl: 'Basse/F1.wav'}, { name: 'E1', sampleUrl: 'Basse/E1.wav'}, { name: 'D1', sampleUrl: 'Basse/D1.wav'}, */ { name: 'C1', sampleUrl: 'Basse/C1.wav'} ], 
    //tracks: [{ name: 'C4', sampleUrl: 'Guitar/C4.wav'},/* { name: 'B3', sampleUrl: 'Guitar/B3.wav'}, { name: 'A3', sampleUrl: 'Guitar/A3.wav'},*/ { name: 'G3', sampleUrl: 'Guitar/G3.wav'},/* { name: 'F3', sampleUrl: 'Guitar/F3.wav'}, { name: 'E3', sampleUrl: 'Guitar/E3.wav'}, { name: 'D3', sampleUrl: 'Guitar/D3.wav'},*/ { name: 'C3', sampleUrl: 'Guitar/C3.wav'} ],
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
    {"name":"Baonlle","classs":"channel","controls":{"1":10,"2":"2","3":46,"4":"1","5":76,"6":0,"7":10,"8":11,"9":16,"10":40,"11":68,"12":26,"13":25,"14":51,"15":20,"16":12},"id":"4f802750-667e-11e6-89c6-9b6aaf4bf5b7"},
    {"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}}        
    /*{"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}},
    {"name":"double osc bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d0000","controls":{1:40, 2:1, 3:100, 4:0, 5:0, 6:0, 7:15, 8:0, 9:0, 10:66, 11:20, 12:35, 13:0, 14:30, 15:80, 16:0}},*/
  ],

  defaultPattern: 1, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"tri_note_mellow","classs":"channel","id":"8577ef70-6677-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]},
    {"name":"Pois sauteurs","classs":"channel",  "id":"70c15650-667e-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}
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



{ channelName: 'Ch3 Guitar/Piano/Drums',  
  trackSet: 0, 

  defaultPattern: 1, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"GuitarMellow","classs":"channel","id":"5d67c810-6678-11e6-afb2-e793ea1788a6","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,1,0,0,0,0,1,0,1,0,1,0],[0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0]]},
    {"name":"jazzy piano","classs":"channel","id":"6c57d720-667d-11e6-afb2-e793ea1788a6","tracks":[[0,0,0,0,1,0,1,1,0,0,1,0,1,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}
    //{"name":"4/4","classs":"channel","id":"85d646b0-71e9-11e6-ae6b-cbeced753752","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]]}  
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

    { 
      type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Drumkit 01', 
      kitNumber: 2, 
      color: 'rgba(149, 55, 166, 0.5)', 
      tracks: [{name: 'Snare', sampleUrl: 'LINN/snare.wav'}, {name: 'Hihat', sampleUrl: 'breakbeat13/hihat.wav'}, {name: 'Kick', sampleUrl: 'Kit8/kick.wav'} ], 
      controls: window.launch.sample_prg
    }    

        
  ] 
}, 



{ channelName: 'Ch4 Synth (c2>c3)', // MidFreq
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [    
    {"name":"DyaWowoySND","classs":"channel","controls":{"1":53,"2":"0","3":30,"4":"1","5":93,"6":11,"7":8,"8":34,"9":51,"10":59,"11":75,"12":39,"13":78,"14":25,"15":50,"16":63},"id":"79398eb0-6679-11e6-aa2f-73993aa5fd3f"},
    {"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}}        
  ],

  defaultPattern: 1, 
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

  defaultPattern: 1, 
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
      color: 'rgba(253, 206, 31, 0.65)', 
      tracks: [{ name: 'C5', sampleUrl: 'Flute/C5.wav'},/* { name: 'B4', sampleUrl: 'Flute/B4.wav'}, { name: 'A4', sampleUrl: 'Flute/A4.wav'},*/ { name: 'G4', sampleUrl: 'Flute/G4.wav'}, /*, { name: 'F4', sampleUrl: 'Flute/F4.wav'}, { name: 'E4', sampleUrl: 'Flute/E4.wav'}, { name: 'D4', sampleUrl: 'Flute/D4.wav'},*/ { name: 'C4', sampleUrl: 'Flute/C4.wav'} ],
      controls: window.launch.sample_prg
    },

    { 
      type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Drumkit 02', 
      kitNumber: 2, 
      color: 'rgba(253, 206, 31, 0.35)', 
      tracks: [{name: 'Snare', sampleUrl: 'CR78/snare.wav'}, {name: 'Hihat', sampleUrl: '12-TR-909/909 HHCL 1.wav'}, {name: 'Kick', sampleUrl: 'breakbeat13/kick.wav'} ], 
      controls: window.launch.sample_prg
    }       

  ] 
}, 



{ channelName: 'Ch6 Synth (c2>c4)', // HiFq Syn A
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [
    {"name":"square","type":"AikeWebsynth1","classs":"channel","id":"2fbddcv123cd7f89ff54f","controls":{1:9, 2:1, 3:35, 4:2, 5:27, 6:0, 7:66, 8:80, 9:0, 10:0, 11:40, 12:96, 13:0, 14:0, 15:30, 16:70,"992":1}}    
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
      {"name":"la ronde","classs":"channel","id":"180d4700-667c-11e6-82b9-0508ed9d1306"},
      {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"}
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

      

{ channelName: 'Ch7 Synth (c3>c5)', // Ch7 Highfreq Synth B  HiFq Syn B
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [
    //{"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}},
    {"name":"le clownSOUND","type":"AikeWebsynth1","classs":"channel","id":"2fbddfd9fd9dvbvb2b2b","controls":{1:59, 2:1, 3:19, 4:2, 5:36, 6:0, 7:26, 8:45, 9:11, 10:7, 11:55, 12:68, 13:0, 14:20, 15:78, 16:13,"992":1}}    
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
























//console.log('ses5: ', session5ConductorControls);


window.insConf99 = [ 


/*{ 
  sessionName: 'Test (99)',

  channelName: 'Ch1 Drum Synth', 
  trackSet: 0, 

  conf: [
    { 
      type: 'synth',
      instrumentName: 'JoeSullivanDrumSynth', 
      instrumentUrl: 'http://tiny-808.com/',
      color: 'rgba(0, 81, 0, 1)',
      name: 'c1 > c2', 
      kitNumber: 0,      
      tracks: window.draw.drumsynth_01,
      inputMode: 'grid', // 'keyboard', 'grid'
      controls: patternSeqOff //aikeWebsynthControls           
    }

  ] 
}, */

{ 
  sessionName: 'Test (99)',

  channelName: 'Ch1 Poly Synth', 
  trackSet: 0, 

  /*defaultPreset: 0, 
  presets: [
    {"name":"TRI_Bass","classs":"channel","controls":{"1":100,"2":"0","3":24,"4":"1","5":81,"6":0,"7":26,"8":78,"9":43,"10":23,"11":51,"12":33,"13":13,"14":7,"15":29,"16":33,"992":1},"id":"2d4bc2e0-6677-11e6-89c6-9b6aaf4bf5b7"}, // "992":0 = patternSeq disabled
    {"name":"Baonlle","classs":"channel","controls":{"1":10,"2":"2","3":46,"4":"1","5":76,"6":0,"7":10,"8":11,"9":16,"10":40,"11":68,"12":26,"13":25,"14":51,"15":20,"16":12},"id":"4f802750-667e-11e6-89c6-9b6aaf4bf5b7"}
  ],

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"tri_note_mellow","classs":"channel","id":"8577ef70-6677-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]},
    {"name":"Pois sauteurs","classs":"channel","id":"70c15650-667e-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"la marche du clown","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}    
  ], 

  defaultPatternSeq: 0, 
  patternSeq: [     
    [ {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"},
      {"name":"la marche du clown","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605"} ]
  ],   */ 

  conf: [
    { 
      type: 'synth',
      instrumentName: 'CWilsoWAMidiSynth', 
      instrumentUrl: 'https://webaudiodemos.appspot.com/midi-synth/index.html',
      color: 'rgba(0, 161, 0, 1)',
      name: 'c1 > c2', 
      kitNumber: 0,      
      tracks: window.draw.c4_c5_penta_minorCWilso,
      inputMode: 'grid', // 'keyboard', 'grid'
      controls: CWilsoWAMidiSynthControls //aikeWebsynthControls           
    }

  ] 
}, 


{ channelName: 'Ch8 Conductor',
  trackSet: 0, 

  patternSeq: [     
  ],

  conf: [ { 
    type: 'control', 
    instrumentName: 'Conductor', 
    name: 'Conductor Ctrl 01', 
    kitNumber: 0, 
    color: '#51ACBD',       
    controls: session5ConductorControls
  }] 
},

{ 
  sessionName: 'Test (99)',

  channelName: 'Ch2 Poly Synth', 
  trackSet: 0, 

  /*defaultPreset: 0, 
  presets: [
    {"name":"TRI_Bass","classs":"channel","controls":{"1":100,"2":"0","3":24,"4":"1","5":81,"6":0,"7":26,"8":78,"9":43,"10":23,"11":51,"12":33,"13":13,"14":7,"15":29,"16":33,"992":1},"id":"2d4bc2e0-6677-11e6-89c6-9b6aaf4bf5b7"}, // "992":0 = patternSeq disabled
    {"name":"Baonlle","classs":"channel","controls":{"1":10,"2":"2","3":46,"4":"1","5":76,"6":0,"7":10,"8":11,"9":16,"10":40,"11":68,"12":26,"13":25,"14":51,"15":20,"16":12},"id":"4f802750-667e-11e6-89c6-9b6aaf4bf5b7"}
  ],

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"tri_note_mellow","classs":"channel","id":"8577ef70-6677-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]},
    {"name":"Pois sauteurs","classs":"channel","id":"70c15650-667e-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"la marche du clown","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}    
  ], 

  defaultPatternSeq: 0, 
  patternSeq: [     
    [ {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"},
      {"name":"la marche du clown","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605"} ]
  ],   */ 

  conf: [
    { 
      type: 'synth',
      instrumentName: 'CWilsoWAMidiSynth', 
      instrumentUrl: 'https://webaudiodemos.appspot.com/midi-synth/index.html',
      color: 'rgba(0, 161, 0, 1)',
      name: 'c1 > c2', 
      kitNumber: 0,      
      tracks: window.draw.c4_c5_penta_minorCWilso,
      inputMode: 'keyboard', // 'keyboard', 'grid'
      controls: CWilsoWAMidiSynthControls //aikeWebsynthControls           
    }

  ] 
}, 







{ sessionName: 'Ep #6', // Electropixel #6
  channelName: 'Ch2 Bass guitar',  
  trackSet: 0, 

  defaultPattern: 4, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"TaLaLi Bassline A (synkoped)","classs":"channel","id":"81c22550-6675-11e6-b5e9-51d55022d761","tracks":[[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0]]},
    {"name":"TaLaLi Bassline B (continuous)","classs":"channel","id":"128a5ad0-6676-11e6-b509-c753c06f4910","tracks":[[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,1,0,1,0,1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0]]},
    {"name":"calme ta basse","classs":"channel", "id":"a61d9d90-667e-11e6-a6fa-97a17043872f","tracks":[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0]]},
    {"name":"4/4","classs":"channel","id":"85d646b0-71e9-11e6-ae6b-cbeced753752","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]]} 
  ],  

  conf: [{ 
    type: 'samples', 
    instrumentName: 'Sampler', 
    name: 'c1-c2 (3 notes) - Bass guitar', 
    kitNumber: 0, 
    color: 'rgba(0, 171, 157, 1)',
    //tracks: [{ name: 'C2', sampleUrl: 'Basse/C2.wav'}, /*{ name: 'B1', sampleUrl: 'Basse/B1.wav'}, { name: 'A1', sampleUrl: 'Basse/A1.wav'}, */ { name: 'G1', sampleUrl: 'Basse/G1.wav'}, /*{ name: 'F1', sampleUrl: 'Basse/F1.wav'}, { name: 'E1', sampleUrl: 'Basse/E1.wav'}, { name: 'D1', sampleUrl: 'Basse/D1.wav'}, */ { name: 'C1', sampleUrl: 'Basse/C1.wav'} ], 
    tracks: [{ name: 'C4', sampleUrl: 'Guitar/C4.wav'},/* { name: 'B3', sampleUrl: 'Guitar/B3.wav'}, { name: 'A3', sampleUrl: 'Guitar/A3.wav'},*/ { name: 'G3', sampleUrl: 'Guitar/G3.wav'},/* { name: 'F3', sampleUrl: 'Guitar/F3.wav'}, { name: 'E3', sampleUrl: 'Guitar/E3.wav'}, { name: 'D3', sampleUrl: 'Guitar/D3.wav'},*/ { name: 'C3', sampleUrl: 'Guitar/C3.wav'} ],
    controls: smpPrgChangeSavePattern
  }] 
}, 


{ 
  //sessionName: 'Test (99)',

  channelName: 'Ch3 Synth bass', 
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [
    {"name":"TRI_Bass","classs":"channel","controls":{"1":100,"2":"0","3":24,"4":"1","5":81,"6":0,"7":26,"8":78,"9":43,"10":23,"11":51,"12":33,"13":13,"14":7,"15":29,"16":33,"992":1},"id":"2d4bc2e0-6677-11e6-89c6-9b6aaf4bf5b7"}, // "992":0 = patternSeq disabled
    {"name":"Baonlle","classs":"channel","controls":{"1":10,"2":"2","3":46,"4":"1","5":76,"6":0,"7":10,"8":11,"9":16,"10":40,"11":68,"12":26,"13":25,"14":51,"15":20,"16":12},"id":"4f802750-667e-11e6-89c6-9b6aaf4bf5b7"}
    /*{"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}},
    {"name":"double osc bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d0000","controls":{1:40, 2:1, 3:100, 4:0, 5:0, 6:0, 7:15, 8:0, 9:0, 10:66, 11:20, 12:35, 13:0, 14:30, 15:80, 16:0}},*/
  ],

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"tri_note_mellow","classs":"channel","id":"8577ef70-6677-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]},
    {"name":"Pois sauteurs","classs":"channel","id":"70c15650-667e-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"la marche du clown","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}    
  ], 

  defaultPatternSeq: 0, 
  patternSeq: [     
    [ {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"},
      {"name":"la marche du clown","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605"} ]
  ],    

  conf: [
    { 
      type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      instrumentUrl: 'http://aikelab.net/websynth/',
      color: 'rgba(0, 161, 0, 1)',
      name: 'c1 > c2', 
      kitNumber: 0,      
      tracks: window.draw.c1_c2_penta_minor,
      controls: patternSeqOff //aikeWebsynthControls           
    },
    { 
      type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      instrumentUrl: 'http://aikelab.net/websynth/',
      color: 'rgba(226, 0, 6, 1)',
      name: 'c2 > c4', 
      kitNumber: 1,      
      tracks: window.draw.c2_c4_penta_minor,
      controls: patternSeqOff //aikeWebsynthControlsReduced // patternSeqOff         
    }

  ] 
}, 



];










session5ConductorControls[0].x.value = 58; // ch1 vol
session5ConductorControls[1].x.value = 30;
session5ConductorControls[2].x.value = 22;
session5ConductorControls[3].x.value = 16;
session5ConductorControls[4].x.value = 25;
session5ConductorControls[5].x.value = 30;
session5ConductorControls[6].x.value = 16; // ch7 vol - 100

session5ConductorControls[7].x.value = 80; // tempo

session5ConductorControls[10].x.value = 0; // ch1 bar offest
session5ConductorControls[11].x.value = 1;
        session5ConductorControls[12].x.value = 2;
session5ConductorControls[13].x.value = 3;
session5ConductorControls[14].x.value = 4;
session5ConductorControls[15].x.value = 2;
session5ConductorControls[16].x.value = 3; 

session5ConductorControls[17].x.value = 0; // ch8 (conductor) bar offset
session5ConductorControls[18].x.value = 24; // general kickout bars










// NDW 2016 Trempo - workshop
window.insConf6 = [ 

{ sessionName: 'NDW2016_workshop', // Ep #6 Electropixel #6
  channelName: 'Ch1 Bass guitar',  
  trackSet: 0, 

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"TaLaLi Bassline A (synkoped)","classs":"channel","id":"81c22550-6675-11e6-b5e9-51d55022d761","tracks":[[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0]]},
    {"name":"TaLaLi Bassline B (continuous)","classs":"channel","id":"128a5ad0-6676-11e6-b509-c753c06f4910","tracks":[[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,1,0,1,0,1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0]]},
    {"name":"calme ta basse","classs":"channel", "id":"a61d9d90-667e-11e6-a6fa-97a17043872f","tracks":[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0]]}
    //{"name":"4/4","classs":"channel","id":"85d646b0-71e9-11e6-ae6b-cbeced753752","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]]} 
  ],  

  conf: [{ 
    type: 'samples', 
    instrumentName: 'Sampler', 
    name: 'c1-c2 (3 notes) - Bass guitar', 
    kitNumber: 0, 
    color: 'rgba(0, 171, 157, 1)',
    tracks: [{ name: 'C2', sampleUrl: 'Basse/C2.wav'}, /*{ name: 'B1', sampleUrl: 'Basse/B1.wav'}, { name: 'A1', sampleUrl: 'Basse/A1.wav'}, */ { name: 'G1', sampleUrl: 'Basse/G1.wav'}, /*{ name: 'F1', sampleUrl: 'Basse/F1.wav'}, { name: 'E1', sampleUrl: 'Basse/E1.wav'}, { name: 'D1', sampleUrl: 'Basse/D1.wav'}, */ { name: 'C1', sampleUrl: 'Basse/C1.wav'} ], 
    //tracks: [{ name: 'C4', sampleUrl: 'Guitar/C4.wav'},/* { name: 'B3', sampleUrl: 'Guitar/B3.wav'}, { name: 'A3', sampleUrl: 'Guitar/A3.wav'},*/ { name: 'G3', sampleUrl: 'Guitar/G3.wav'},/* { name: 'F3', sampleUrl: 'Guitar/F3.wav'}, { name: 'E3', sampleUrl: 'Guitar/E3.wav'}, { name: 'D3', sampleUrl: 'Guitar/D3.wav'},*/ { name: 'C3', sampleUrl: 'Guitar/C3.wav'} ],
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
    {"name":"Baonlle","classs":"channel","controls":{"1":10,"2":"2","3":46,"4":"1","5":76,"6":0,"7":10,"8":11,"9":16,"10":40,"11":68,"12":26,"13":25,"14":51,"15":20,"16":12},"id":"4f802750-667e-11e6-89c6-9b6aaf4bf5b7"},
    {"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}}        
    /*{"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}},
    {"name":"double osc bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d0000","controls":{1:40, 2:1, 3:100, 4:0, 5:0, 6:0, 7:15, 8:0, 9:0, 10:66, 11:20, 12:35, 13:0, 14:30, 15:80, 16:0}},*/
  ],

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"tri_note_mellow","classs":"channel","id":"8577ef70-6677-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]},
    {"name":"Pois sauteurs","classs":"channel",  "id":"70c15650-667e-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}
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



{ channelName: 'Ch3 Guitar/Piano/Drums',  
  trackSet: 0, 

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"GuitarMellow","classs":"channel","id":"5d67c810-6678-11e6-afb2-e793ea1788a6","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,1,0,0,0,0,1,0,1,0,1,0],[0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0]]},
    {"name":"jazzy piano","classs":"channel","id":"6c57d720-667d-11e6-afb2-e793ea1788a6","tracks":[[0,0,0,0,1,0,1,1,0,0,1,0,1,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}
    //{"name":"4/4","classs":"channel","id":"85d646b0-71e9-11e6-ae6b-cbeced753752","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]]}  
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

    { 
      type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Drumkit 01', 
      kitNumber: 2, 
      color: 'rgba(149, 55, 166, 0.5)', 
      tracks: [{name: 'Snare', sampleUrl: 'LINN/snare.wav'}, {name: 'Hihat', sampleUrl: 'breakbeat13/hihat.wav'}, {name: 'Kick', sampleUrl: 'Kit8/kick.wav'} ], 
      controls: window.launch.sample_prg
    }    

        
  ] 
}, 



{ channelName: 'Ch4 Synth (c2>c3)', // MidFreq
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [    
    {"name":"DyaWowoySND","classs":"channel","controls":{"1":53,"2":"0","3":30,"4":"1","5":93,"6":11,"7":8,"8":34,"9":51,"10":59,"11":75,"12":39,"13":78,"14":25,"15":50,"16":63},"id":"79398eb0-6679-11e6-aa2f-73993aa5fd3f"},
    {"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}}        
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
      color: 'rgba(253, 206, 31, 0.65)', 
      tracks: [{ name: 'C5', sampleUrl: 'Flute/C5.wav'},/* { name: 'B4', sampleUrl: 'Flute/B4.wav'}, { name: 'A4', sampleUrl: 'Flute/A4.wav'},*/ { name: 'G4', sampleUrl: 'Flute/G4.wav'}, /*, { name: 'F4', sampleUrl: 'Flute/F4.wav'}, { name: 'E4', sampleUrl: 'Flute/E4.wav'}, { name: 'D4', sampleUrl: 'Flute/D4.wav'},*/ { name: 'C4', sampleUrl: 'Flute/C4.wav'} ],
      controls: window.launch.sample_prg
    },

    { 
      type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Drumkit 02', 
      kitNumber: 2, 
      color: 'rgba(253, 206, 31, 0.35)', 
      tracks: [{name: 'Snare', sampleUrl: 'CR78/snare.wav'}, {name: 'Hihat', sampleUrl: '12-TR-909/909 HHCL 1.wav'}, {name: 'Kick', sampleUrl: 'breakbeat13/kick.wav'} ], 
      controls: window.launch.sample_prg
    }       

  ] 
}, 



{ channelName: 'Ch6 Synth (c2>c4)', // HiFq Syn A
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [
    {"name":"square","type":"AikeWebsynth1","classs":"channel","id":"2fbddcv123cd7f89ff54f","controls":{1:9, 2:1, 3:35, 4:2, 5:27, 6:0, 7:66, 8:80, 9:0, 10:0, 11:40, 12:96, 13:0, 14:0, 15:30, 16:70,"992":0}}    
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
      {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"}
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

      

{ channelName: 'Ch7 Synth (c3>c5)', // Ch7 Highfreq Synth B  HiFq Syn B
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [
    //{"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}},
    {"name":"le clownSOUND","type":"AikeWebsynth1","classs":"channel","id":"2fbddfd9fd9dvbvb2b2b","controls":{1:59, 2:1, 3:19, 4:2, 5:36, 6:0, 7:26, 8:45, 9:11, 10:7, 11:55, 12:68, 13:0, 14:20, 15:78, 16:13,"992":0}}    
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
      {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"} ]
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










var session7ConductorControls = (JSON.parse(JSON.stringify(window.tweak.conductor))); 
session7ConductorControls[0].x.value = 58; // ch1 vol
session7ConductorControls[1].x.value = 30;
session7ConductorControls[2].x.value = 22;
session7ConductorControls[3].x.value = 16;
session7ConductorControls[4].x.value = 25;
session7ConductorControls[5].x.value = 30;
session7ConductorControls[6].x.value = 16; // ch7 vol - 100

session7ConductorControls[7].x.value = 115; // tempo - 115

session7ConductorControls[10].x.value = 0; // ch1 bar offest
session7ConductorControls[11].x.value = 0; // 8
        session7ConductorControls[12].x.value = 8;
session7ConductorControls[13].x.value = 0; // 18
session7ConductorControls[14].x.value = 0; // 26
session7ConductorControls[15].x.value = 0; // 38
session7ConductorControls[16].x.value = 0; //48 - 40

session7ConductorControls[17].x.value = 0; // ch8 (conductor) bar offset - 100 - 56
session7ConductorControls[18].x.value = 0; // general kickout bars // 64 - 48

var smpPrgChangeSavePattern= (JSON.parse(JSON.stringify(window.launch.change_ptn_change_kit)));


var changeKit= (JSON.parse(JSON.stringify(window.launch.change_ptn_change_kit)));
changeKit.splice(0, 1); // remove Change pattern
changeKit[0].name = 'Change mode';


CWilsoWAMidiSynthControls.splice(1, 1); // remove Save pattern
CWilsoWAMidiSynthControls.splice(3, 1); // remove Save sound
CWilsoWAMidiSynthControls.splice(3, 1); // remove Pattern Seq

var changePattern = CWilsoWAMidiSynthControls[0];
CWilsoWAMidiSynthControls[0] = CWilsoWAMidiSynthControls[1];
CWilsoWAMidiSynthControls[1] = changePattern;
CWilsoWAMidiSynthControls[0].name = 'Change mode';


var changePattern= (JSON.parse(JSON.stringify(window.launch.change_ptn_change_kit)));
changePattern.splice(1, 1);


var patternSeqOffNoSave = (JSON.parse(JSON.stringify(patternSeqOff)));
patternSeqOffNoSave.splice(1, 1); // remove Save pattern
patternSeqOffNoSave.splice(3, 1); // remove Save sound
patternSeqOffNoSave.splice(1, 1); // remove Note range

//console.log ('CWilsoWAMidiSynthControls', CWilsoWAMidiSynthControls);

// AperoCC_fev_2017
window.insConf7 = [ 

{ sessionName: 'EJS #1', // AperoCC_fev_2017
  channelName: '1: Drums (samples)',  
  trackSet: 0, 

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}
  ],  

  conf: [

    { type: 'samples', instrumentName: 'Sampler', 
      name: 'TheCheebacabra1', 
      kitNumber: 0, color: 'rgba(253, 118, 8, 1)', 
      tracks: [{ name: 'Tom 3', sampleUrl: 'TheCheebacabra1/tom3.wav'}, { name: 'Tom 2', sampleUrl: 'TheCheebacabra1/tom2.wav'}, { name: 'Tom 1', sampleUrl: 'TheCheebacabra1/tom1.wav'}, { name: 'Snare', sampleUrl: 'TheCheebacabra1/snare.wav'}, { name: 'Hihat', sampleUrl: 'TheCheebacabra1/hihat.wav'}, { name: 'Kick', sampleUrl: 'TheCheebacabra1/kick.wav'} ], 
      controls: smpPrgChangeSavePattern       
    },

    { type: 'samples', instrumentName: 'Sampler', 
      name: 'CR78', 
      kitNumber: 1, color: 'rgba(253, 118, 8, 0.95)', 
      tracks: [{name: 'Tom 3', sampleUrl: 'CR78/tom3.wav'}, {name: 'Tom 2', sampleUrl: 'CR78/tom2.wav'}, {name: 'Tom 1', sampleUrl: 'CR78/tom1.wav'}, {name: 'Snare', sampleUrl: 'CR78/snare.wav'}, {name: 'Hihat', sampleUrl: 'CR78/hihat.wav'}, {name: 'Kick', sampleUrl: 'CR78/kick.wav'} ],
      controls: smpPrgChangeSavePattern
     }, 

    { type: 'samples', instrumentName: 'Sampler', 
      name: 'Breakbeat13', 
      kitNumber: 2, color: 'rgba(253, 118, 8, 0.9)', 
      tracks: [{name: 'Tom 3', sampleUrl: 'breakbeat13/tom3.wav'}, {name: 'Tom 2', sampleUrl: 'breakbeat13/tom2.wav'}, {name: 'Tom 1', sampleUrl: 'breakbeat13/tom1.wav'}, {name: 'Snare', sampleUrl: 'breakbeat13/snare.wav'}, {name: 'Hihat', sampleUrl: 'breakbeat13/hihat.wav'}, {name: 'Kick', sampleUrl: 'breakbeat13/kick.wav'} ],
      controls: smpPrgChangeSavePattern
    }, 

    { type: 'samples', instrumentName: 'Sampler', 
      name: 'Linn', 
      kitNumber: 3, color: 'rgba(253, 118, 8, 0.85)', 
      tracks: [{name: 'Tom 3', sampleUrl: 'LINN/tom3.wav'}, {name: 'Tom 2', sampleUrl: 'LINN/tom2.wav'}, {name: 'Tom 1', sampleUrl: 'LINN/tom1.wav'}, {name: 'Snare', sampleUrl: 'LINN/snare.wav'}, {name: 'Hihat', sampleUrl: 'LINN/hihat.wav'}, {name: 'Kick', sampleUrl: 'LINN/kick.wav'} ],
      controls: smpPrgChangeSavePattern
    },      

    { type: 'samples', instrumentName: 'Sampler', 
      name: 'Kit8', 
      kitNumber: 4, color: 'rgba(253, 118, 8, 0.8)', 
      tracks: [{name: 'Tom 3', sampleUrl: 'Kit8/tom3.wav'}, {name: 'Tom 2', sampleUrl: 'Kit8/tom2.wav'}, {name: 'Tom 1', sampleUrl: 'Kit8/tom1.wav'}, {name: 'Snare', sampleUrl: 'Kit8/snare.wav'}, {name: 'Hihat', sampleUrl: 'Kit8/hihat.wav'}, {name: 'Kick', sampleUrl: 'Kit8/kick.wav'} ],
      controls: smpPrgChangeSavePattern
    },      

    { type: 'samples', instrumentName: 'Sampler', 
      name: 'TR909', 
      kitNumber: 5, color: 'rgba(253, 118, 8, 0.7)', 
      tracks: [/*{ name: 'Cymbal', sampleUrl: 'Drums/Ah1 Ride.wav'}, { name: 'Rimshot', sampleUrl: 'Drums/Ch1 RimShot.wav'},*/ { name: 'Rimshot', sampleUrl: '12-TR-909/909 RIM.wav'}, { name: 'Opened hihat', sampleUrl: '12-TR-909/909 HHOP.wav'}, { name: 'Clap', sampleUrl: '12-TR-909/909 CLAP.wav'}, { name: 'Snare', sampleUrl: '12-TR-909/909 SD10.wav'}, { name: 'Closed hihat', sampleUrl: '12-TR-909/909 HHCL 1.wav'}, { name: 'Kick', sampleUrl: '12-TR-909/909 KIK2.wav' } ],
      controls: smpPrgChangeSavePattern
    }     
  ] 

}, 



{ channelName: '8: Conductor',
  trackSet: 0, 
  conf: [ { 
    type: 'control', 
    instrumentName: 'Conductor', 
    name: 'Conductor Ctrl 01', 
    kitNumber: 0, 
    color: '#51ACBD',       
    controls: session7ConductorControls
  }] 
}, 



{ channelName: '2: Bass (mono)', 
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [
    {"name":"TRI_Bass","classs":"channel","controls":{"1":100,"2":"0","3":24,"4":"1","5":81,"6":0,"7":26,"8":78,"9":43,"10":23,"11":51,"12":33,"13":13,"14":7,"15":29,"16":33},"id":"2d4bc2e0-6677-11e6-89c6-9b6aaf4bf5b7"},
    {"name":"Baonlle","classs":"channel","controls":{"1":10,"2":"2","3":46,"4":"1","5":76,"6":0,"7":10,"8":11,"9":16,"10":40,"11":68,"12":26,"13":25,"14":51,"15":20,"16":12},"id":"4f802750-667e-11e6-89c6-9b6aaf4bf5b7"},
    {"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}}        
    /*{"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}},
    {"name":"double osc bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d0000","controls":{1:40, 2:1, 3:100, 4:0, 5:0, 6:0, 7:15, 8:0, 9:0, 10:66, 11:20, 12:35, 13:0, 14:30, 15:80, 16:0}},*/
  ],

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"tri_note_mellow","classs":"channel","id":"8577ef70-6677-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]},
    {"name":"Pois sauteurs","classs":"channel",  "id":"70c15650-667e-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}
  ], 

  conf: [
    { 
      type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      instrumentUrl: 'http://aikelab.net/websynth/',
      color: 'rgba(0, 161, 0, 1)',
      name: 'c0 > c1', 
      kitNumber: 0,      
      tracks: window.draw.c0_c1_penta_minor,
      controls: aikeWebsynthControlsNoSave           
    },

    { 
      type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      instrumentUrl: 'http://aikelab.net/websynth/',
      color: 'rgba(0, 161, 0, 0.8)',
      name: 'c1 > c2', 
      kitNumber: 1,      
      tracks: window.draw.c1_c2_penta_minor,
      controls: aikeWebsynthControlsNoSave           
    },

    { 
      type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      instrumentUrl: 'http://aikelab.net/websynth/',
      color: 'rgba(0, 161, 0, 0.6)',
      name: 'c2 > c3', 
      kitNumber: 2,      
      tracks: window.draw.c2_c3_penta_minor,
      controls: aikeWebsynthControlsNoSave           
    },    

  ] 
}, 



{ 

  channelName: '3: Monosynth', // polyphonic // Synth (poly)
  trackSet: 0, // 1 

  /*defaultPreset: 0, 
  presets: [
    {"name":"TRI_Bass","classs":"channel","controls":{"1":100,"2":"0","3":24,"4":"1","5":81,"6":0,"7":26,"8":78,"9":43,"10":23,"11":51,"12":33,"13":13,"14":7,"15":29,"16":33,"992":1},"id":"2d4bc2e0-6677-11e6-89c6-9b6aaf4bf5b7"}, // "992":0 = patternSeq disabled
    {"name":"Baonlle","classs":"channel","controls":{"1":10,"2":"2","3":46,"4":"1","5":76,"6":0,"7":10,"8":11,"9":16,"10":40,"11":68,"12":26,"13":25,"14":51,"15":20,"16":12},"id":"4f802750-667e-11e6-89c6-9b6aaf4bf5b7"}
  ], */

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"tri_note_mellow","classs":"channel","id":"8577ef70-6677-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]},
    {"name":"Pois sauteurs","classs":"channel","id":"70c15650-667e-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"la marche du clown","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}    
  ], 

  /*defaultPatternSeq: 0, // this does not seem to be iniailized when trackSet: 1 aka non grid kit
  patternSeq: [     
    [ {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"},
      {"name":"la marche du clown","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605"} ]
  ],   */  

  conf: [

    { 
      type: 'synth',
      instrumentName: 'CWilsoWAMidiSynth', 
      instrumentUrl: 'https://webaudiodemos.appspot.com/midi-synth/index.html',
      color: 'rgba(0, 161, 0, 1)',
      name: 'grid (c4 > c5)', 
      kitNumber: 0,      
      tracks: window.draw.c4_c5_penta_minorCWilso, // c4_c5_penta_minorCWilso
      inputMode: 'grid', // 'keyboard', 'grid'
      controls: CWilsoWAMidiSynthControls // CWilsoWAMidiSynthControls // aikeWebsynthControls           
    },     
    { 
      type: 'synth',
      instrumentName: 'CWilsoWAMidiSynth', 
      instrumentUrl: 'https://webaudiodemos.appspot.com/midi-synth/index.html',
      color: 'rgba(0, 161, 0, 1)',
      name: 'keyboard (c4 > c7', 
      kitNumber: 0, //1
      tracks: window.draw.c4_c7_penta_minorCWilso, // c4_c5_penta_minorCWilso
      inputMode: 'keyboard', // 'keyboard', 'grid'
      controls: window.tweak.CWilsoWAMidiSynth // CWilsoWAMidiSynthControls // aikeWebsynthControls changeKit.concat(window.tweak.CWilsoWAMidiSynth)          
    }, 

{ 
    type: 'synth',
    instrumentName: 'AikeWebsynth1', 
    instrumentUrl: 'http://aikelab.net/websynth/',
    color: 'rgba(253, 118, 8, 1)',
    name: 'c2 > c3 (synth)', 
    kitNumber: 3,      
    tracks: window.draw.c2_c3_penta_minor,
    controls: aikeWebsynthControlsNoSave           
  }      
 

  ] 
}, 

{ 

  channelName: '4: Drum Synth', 
  trackSet: 0, 

  conf: [
    { 
      type: 'synth',
      instrumentName: 'JoeSullivanDrumSynth', 
      instrumentUrl: 'http://tiny-808.com/',
      color: 'rgba(0, 81, 0, 1)',
      name: 'c1 > c2', 
      kitNumber: 0,      
      tracks: window.draw.drumsynth_01,
      inputMode: 'grid', // 'keyboard', 'grid'
      controls: changePattern //aikeWebsynthControls patternSeqOff          
    }

  ] 
},

/*{ channelName: 'Ch4 Synth (c2>c3)', // MidFreq
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [    
    {"name":"DyaWowoySND","classs":"channel","controls":{"1":53,"2":"0","3":30,"4":"1","5":93,"6":11,"7":8,"8":34,"9":51,"10":59,"11":75,"12":39,"13":78,"14":25,"15":50,"16":63},"id":"79398eb0-6679-11e6-aa2f-73993aa5fd3f"},
    {"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}}        
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
}, */





{ channelName: '5: Guitar/Piano/Drums/Synth',  
  trackSet: 0, 


  defaultPreset: 0, // this line ad myabe following ones imperatif to make preset drop down menu appear
  presets: [
    {"name":"TRI_Bass","classs":"channel","controls":{"1":100,"2":"0","3":24,"4":"1","5":81,"6":0,"7":26,"8":78,"9":43,"10":23,"11":51,"12":33,"13":13,"14":7,"15":29,"16":33},"id":"2d4bc2e0-6677-11e6-89c6-9b6aaf4bf5b7"},
    {"name":"Baonlle","classs":"channel","controls":{"1":10,"2":"2","3":46,"4":"1","5":76,"6":0,"7":10,"8":11,"9":16,"10":40,"11":68,"12":26,"13":25,"14":51,"15":20,"16":12},"id":"4f802750-667e-11e6-89c6-9b6aaf4bf5b7"},
    {"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}}        
    /*{"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}},
    {"name":"double osc bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d0000","controls":{1:40, 2:1, 3:100, 4:0, 5:0, 6:0, 7:15, 8:0, 9:0, 10:66, 11:20, 12:35, 13:0, 14:30, 15:80, 16:0}},*/
  ],

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"GuitarMellow","classs":"channel","id":"5d67c810-6678-11e6-afb2-e793ea1788a6","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,1,0,0,0,0,1,0,1,0,1,0],[0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0]]},
    {"name":"jazzy piano","classs":"channel","id":"6c57d720-667d-11e6-afb2-e793ea1788a6","tracks":[[0,0,0,0,1,0,1,1,0,0,1,0,1,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}
    //{"name":"4/4","classs":"channel","id":"85d646b0-71e9-11e6-ae6b-cbeced753752","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]]}  
  ],  

  conf: [
    { 
      type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Guitar - c3-c4 (3 notes)', 
      kitNumber: 0, 
      color: 'rgba(149, 55, 166, 1)', //color: 'rgba(253, 206, 31, 0.75)', 'rgba(237, 49, 104, 0.9)',
      tracks: [{ name: 'C4', sampleUrl: 'Guitar/C4.wav'},/* { name: 'B3', sampleUrl: 'Guitar/B3.wav'}, { name: 'A3', sampleUrl: 'Guitar/A3.wav'},*/ { name: 'G3', sampleUrl: 'Guitar/G3.wav'},/* { name: 'F3', sampleUrl: 'Guitar/F3.wav'}, { name: 'E3', sampleUrl: 'Guitar/E3.wav'}, { name: 'D3', sampleUrl: 'Guitar/D3.wav'},*/ { name: 'C3', sampleUrl: 'Guitar/C3.wav'} ],
      controls: smpPrgChangeSavePattern
    },

    { 
      type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Piano - c4-c5 (3 notes)', 
      kitNumber: 1, 
      color: 'rgba(149, 55, 166, 0.5)', //color: 'rgba(253, 206, 31, 0.75)',
      tracks: [{ name: 'C5', sampleUrl: 'Piano/C5.wav'},/* { name: 'B4', sampleUrl: 'Piano/B4.wav'}, { name: 'A4', sampleUrl: 'Piano/A4.wav'},*/ { name: 'G4', sampleUrl: 'Piano/G4.wav'},/* { name: 'F4', sampleUrl: 'Piano/F4.wav'}, { name: 'E4', sampleUrl: 'Piano/E4.wav'}, { name: 'D4', sampleUrl: 'Piano/D4.wav'},*/ { name: 'C4', sampleUrl: 'Piano/C4.wav'} ], 
      controls: smpPrgChangeSavePattern
    },

    { 
      type: 'samples', 
      instrumentName: 'Sampler', 
      name: 'Drumkit 01', 
      kitNumber: 2, 
      color: 'rgba(149, 55, 166, 0.5)', 
      tracks: [{name: 'Snare', sampleUrl: 'LINN/snare.wav'}, {name: 'Hihat', sampleUrl: 'breakbeat13/hihat.wav'}, {name: 'Kick', sampleUrl: 'Kit8/kick.wav'} ], 
      controls: smpPrgChangeSavePattern
    },


{ 
    type: 'synth',
    instrumentName: 'AikeWebsynth1', 
    instrumentUrl: 'http://aikelab.net/websynth/',
    color: 'rgba(253, 118, 8, 1)',
    name: 'c2 > c3 (synth)', 
    kitNumber: 3,      
    tracks: window.draw.c2_c3_penta_minor,
    controls: aikeWebsynthControlsNoSave           
  }    


        
  ] 
}, 






/*
{ 
 
  channelName: '5: Synth B (poly)', // polyphonic !!! buggy osund emitted !!
  trackSet: 0, // 1 

  /*defaultPreset: 0, 
  presets: [
    {"name":"TRI_Bass","classs":"channel","controls":{"1":100,"2":"0","3":24,"4":"1","5":81,"6":0,"7":26,"8":78,"9":43,"10":23,"11":51,"12":33,"13":13,"14":7,"15":29,"16":33,"992":1},"id":"2d4bc2e0-6677-11e6-89c6-9b6aaf4bf5b7"}, // "992":0 = patternSeq disabled
    {"name":"Baonlle","classs":"channel","controls":{"1":10,"2":"2","3":46,"4":"1","5":76,"6":0,"7":10,"8":11,"9":16,"10":40,"11":68,"12":26,"13":25,"14":51,"15":20,"16":12},"id":"4f802750-667e-11e6-89c6-9b6aaf4bf5b7"}
  ], /

  defaultPattern: 0, 
  patterns: [ 
    {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"tri_note_mellow","classs":"channel","id":"8577ef70-6677-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]},
    {"name":"Pois sauteurs","classs":"channel","id":"70c15650-667e-11e6-89c6-9b6aaf4bf5b7","tracks":[[0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"la marche du clown","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}    
  ], 

  /*defaultPatternSeq: 0, // this does not seem to be iniailized when trackSet: 1 aka non grid kit
  patternSeq: [     
    [ {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"},
      {"name":"la marche du clown","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605"} ]
  ],   /  

  conf: [

    { 
      type: 'synth',
      instrumentName: 'CWilsoWAMidiSynth', 
      instrumentUrl: 'https://webaudiodemos.appspot.com/midi-synth/index.html',
      color: 'rgba(0, 161, 0, 1)',
      name: 'grid (c4 > c5)', 
      kitNumber: 0,      
      tracks: window.draw.c4_c5_penta_minorCWilso, // c4_c5_penta_minorCWilso
      inputMode: 'grid', // 'keyboard', 'grid'
      controls: CWilsoWAMidiSynthControls // CWilsoWAMidiSynthControls // aikeWebsynthControls           
    }/*,    
    { 
      type: 'synth',
      instrumentName: 'CWilsoWAMidiSynth', 
      instrumentUrl: 'https://webaudiodemos.appspot.com/midi-synth/index.html',
      color: 'rgba(0, 161, 0, 1)',
      name: 'keyboard (c4 > c7', 
      kitNumber: 0, //1
      tracks: window.draw.c4_c7_penta_minorCWilso, // c4_c5_penta_minorCWilso
      inputMode: 'keyboard', // 'keyboard', 'grid'
      controls: window.tweak.CWilsoWAMidiSynth // CWilsoWAMidiSynthControls // aikeWebsynthControls changeKit.concat(window.tweak.CWilsoWAMidiSynth)          
    }/
 

  ] 
}, */



{ channelName: 'Ch6 Synth (c2>c4)', // HiFq Syn A
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [
    {"name":"square","type":"AikeWebsynth1","classs":"channel","id":"2fbddcv123cd7f89ff54f","controls":{1:9, 2:1, 3:35, 4:2, 5:27, 6:0, 7:66, 8:80, 9:0, 10:0, 11:40, 12:96, 13:0, 14:0, 15:30, 16:70,"992":0}},
    {"name":"le clownSOUND","type":"AikeWebsynth1","classs":"channel","id":"2fbddfd9fd9dvbvb2b2b","controls":{1:59, 2:1, 3:19, 4:2, 5:36, 6:0, 7:26, 8:45, 9:11, 10:7, 11:55, 12:68, 13:0, 14:20, 15:78, 16:13,"992":0}}    
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
      {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"}
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
    controls: patternSeqOffNoSave//aikeWebsynthControls         
  }] 
}, 

      

{ channelName: 'Ch7 Synth (c3>c5)', // Ch7 Highfreq Synth B  HiFq Syn B
  trackSet: 0, 

  defaultPreset: 0, 
  presets: [
    //{"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}},
    {"name":"le clownSOUND","type":"AikeWebsynth1","classs":"channel","id":"2fbddfd9fd9dvbvb2b2b","controls":{1:59, 2:1, 3:19, 4:2, 5:36, 6:0, 7:26, 8:45, 9:11, 10:7, 11:55, 12:68, 13:0, 14:20, 15:78, 16:13,"992":0}},
    {"name":"square","type":"AikeWebsynth1","classs":"channel","id":"2fbddcv123cd7f89ff54f","controls":{1:9, 2:1, 3:35, 4:2, 5:27, 6:0, 7:66, 8:80, 9:0, 10:0, 11:40, 12:96, 13:0, 14:0, 15:30, 16:70,"992":0}}            
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
      {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"} ]
  ],   

  conf: [{ 
    type: 'synth',
    instrumentName: 'AikeWebsynth1', 
    instrumentUrl: 'http://aikelab.net/websynth/',
    color: 'rgba(237, 49, 104, 1)',
    name: 'c3 > c5', 
    kitNumber: 0,      
    tracks: window.draw.c3_c5_penta_minor,
    controls: patternSeqOffNoSave          
  }] 
}, 





];





/*

  c1_c2_major: [{ name: 'C2', note: -5 }, { name: 'B1', note: -6 }, { name: 'A1', note: -8 }, { name: 'G1', note: -10 }, { name: 'F1', note: -12 }, { name: 'E1', note: -13 }, { name: 'D1', note: -15 }, { name: 'C1', note: -17 } ],
  c2_c3_penta_minor: [{ name: 'C3', note: 7 }, { name: 'Bb2', note: 5 }, { name: 'G2', note: 2 }, { name: 'F2', note: 0 }, { name: 'Eb2', note: -2 }, { name: 'C2', note: -5 } ],
  c3_c4_penta_minor: [{ name: 'C4', note: 19 }, { name: 'Bb3', note: 17 }, { name: 'G3', note: 14 }, { name: 'F3', note: 12 }, { name: 'Eb3', note: 10 }, { name: 'C3', note: 7 } ],



  c0_c1_penta_minor: [{ name: 'C1', note: -17 }, { name: 'Bb0', note: -19 }, { name: 'G0', note: -22 }, { name: 'F0', note: -24 }, { name: 'Eb0', note: -26 }, { name: 'C0', note: -29 } ],
  c1_c2_penta_minor: [{ name: 'C2', note: -5 }, { name: 'Bb1', note: -7 }, { name: 'G1', note: -10 }, { name: 'F1', note: -12 }, { name: 'Eb1', note: -14 }, { name: 'C1', note: -17 } ],
  c2_c3_penta_minor: [{ name: 'C3', note: 7 }, { name: 'Bb2', note: 5 }, { name: 'G2', note: 2 }, { name: 'F2', note: 0 }, { name: 'Eb2', note: -2 }, { name: 'C2', note: -5 } ],

*/


//patternSeqOff[6].x.value = 1; // 1: patternSeq on

//console.log('patternSeqOff', patternSeqOff, patternSeqOff[6]);

var patternSeqOff2 = (JSON.parse(JSON.stringify(aikeWebsynthControls)));


patternSeqOff2[6].x.value = 1; //  1: patternSeq on


patternSeqOff2.splice(1, 1); // remove Save pattern
//patternSeqOff2.splice(2, 1); // remove change sound
patternSeqOff2.splice(3, 1); // remove Save sound




// remove low sounding triangle synth osc option
//delete patternSeqOff2[7].x.option[0]; //.splice(0, 1);

patternSeqOff2[1].name = 'hauteur note (pitch)';



var sess8ConductorCtrls = (JSON.parse(JSON.stringify(window.tweak.conductor16a)));



var ptnEditOff = (JSON.parse(JSON.stringify(patternSeqOff2)));
//ptnEditOff[3].y.value = 0; // ptnEditOff
//delete ptnEditOff[3];
ptnEditOff.splice(3, 1); // remove ptn edit
ptnEditOff.splice(3, 1); // remove ptn seq


//console.log('patternSeqOff2', ptnEditOff); // patternSeqOff2


var blue1   = 'rgba(0, 171, 157, 0.6)';
var yellow1 = 'rgba(253, 206, 31, 0.6)';
var green1  = 'rgba(0, 161, 0, 0.6)';
var orange1 = 'rgba(253, 118, 8, 0.6)';
var red1    = 'rgba(226, 0, 6, 0.6)';

var blue2   = 'rgba(0, 171, 157, 0.7)';
var yellow2 = 'rgba(253, 206, 31, 0.7)';
var green2  = 'rgba(0, 161, 0, 0.7)';
var orange2 = 'rgba(253, 118, 8, 0.7)';
var red2    = 'rgba(226, 0, 6, 0.7)';

var blue3   = 'rgba(0, 171, 157, 0.8)';
var yellow3 = 'rgba(253, 206, 31, 0.8)';
var green3  = 'rgba(0, 161, 0, 0.8)';
var orange3 = 'rgba(253, 118, 8, 0.8)';
var red3    = 'rgba(226, 0, 6, 0.8)';

var blue4   = 'rgba(0, 171, 157, 0.9)';
var yellow4 = 'rgba(253, 206, 31, 0.9)';
var green4  = 'rgba(0, 161, 0, 0.9)';
var orange4 = 'rgba(253, 118, 8, 0.9)';
var red4    = 'rgba(226, 0, 6, 0.9)';


// AikeWebsynth1
var sess8PitchNotes = [    
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: green1,
      name: 'F1', 
      kitNumber: 0,      
      tracks: [{ name: 'F1', note: -12 } ],        
    }, 
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: orange1,
      name: 'G1', 
      kitNumber: 1,      
      tracks: [{ name: 'G1', note: -10 } ],        
    }, 
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: red1,
      name: 'Bb1', 
      kitNumber: 2,      
      tracks: [{ name: 'Bb1', note: -7 } ],        
    },     
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: blue2,
      name: 'C2', 
      kitNumber: 3,      
      tracks: [{ name: 'C2', note: -5 } ],        
    },   
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: yellow2,
      name: 'Eb2', 
      kitNumber: 4,      
      tracks: [{ name: 'Eb2', note: -2 } ],        
    }, 



    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: green2,
      name: 'F2', 
      kitNumber: 5,      
      tracks: [{ name: 'F2', note: 0 } ],        
    }, 
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: orange2,
      name: 'G2', 
      kitNumber: 6,      
      tracks: [{ name: 'G2', note: 2 } ],        
    }, 
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: red2,
      name: 'Bb2', 
      kitNumber: 7,      
      tracks: [{ name: 'Bb2', note: 5 } ],        
    },     
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: blue3,
      name: 'C3', 
      kitNumber: 8,      
      tracks: [{ name: 'C3', note: 7 } ],        
    },   
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: yellow3,
      name: 'Eb3', 
      kitNumber: 9,      
      tracks: [{ name: 'Eb3', note: 10 } ],        
    }, 





    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: green3,
      name: 'F3', 
      kitNumber: 10,      
      tracks: [{ name: 'F3', note: 12 } ],        
    }, 
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: orange3,
      name: 'G3', 
      kitNumber: 11,      
      tracks: [{ name: 'G3', note: 14 } ],        
    }, 
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: red3,
      name: 'Bb3', 
      kitNumber: 12,      
      tracks: [{ name: 'Bb3', note: 17 } ],        
    },     
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: blue4,
      name: 'C4', 
      kitNumber: 13,      
      tracks: [{ name: 'C4', note: 19 } ],        
    },   
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: yellow4,
      name: 'Eb4', 
      kitNumber: 14,      
      tracks: [{ name: 'Eb4', note: 22 } ],        
    }, 


  ]; 










window['s8PitchCh1'] = (JSON.parse(JSON.stringify(sess8PitchNotes)));
window['s8PitchCh1'].splice(6, 9); // 6,9

/*window['s8PitchCh1'][0].controls = ptnEditOff;
window['s8PitchCh1'][1].controls = ptnEditOff;
window['s8PitchCh1'][2].controls = ptnEditOff;
window['s8PitchCh1'][3].controls = ptnEditOff;
window['s8PitchCh1'][4].controls = ptnEditOff;
window['s8PitchCh1'][5].controls = ptnEditOff;*/

//console.log('wi', window['s8PitchCh1']);

for (var d=2; d<10; d++) { // 10

  //if (typeof window['insConf'][b] !== 'undefined') {

var remFNotes = d-1;  

window['s8PitchCh'+d] = (JSON.parse(JSON.stringify(sess8PitchNotes)));
window['s8PitchCh'+d].splice(0, remFNotes);
window['s8PitchCh'+d].splice(6, 8);
window['s8PitchCh'+d][0].kitNumber = 0;
window['s8PitchCh'+d][1].kitNumber = 1;
window['s8PitchCh'+d][2].kitNumber = 2;
window['s8PitchCh'+d][3].kitNumber = 3;
window['s8PitchCh'+d][4].kitNumber = 4;
window['s8PitchCh'+d][5].kitNumber = 5;

/*if (d<4) {

window['s8PitchCh'+d][0].controls = ptnEditOff;
window['s8PitchCh'+d][1].controls = ptnEditOff;
window['s8PitchCh'+d][2].controls = ptnEditOff;
window['s8PitchCh'+d][3].controls = ptnEditOff;
window['s8PitchCh'+d][4].controls = ptnEditOff;
window['s8PitchCh'+d][5].controls = ptnEditOff;

}*/

}






var sess8PitchNotesDouble = [   

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'F2-G2', 
      kitNumber: 5,      
      tracks: [{ name: 'G2', note: 2 }, { name: 'F2', note: 0 } ],        
    }, 

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'G2-Bb2', 
      kitNumber: 7,      
      tracks: [{ name: 'Bb2', note: 5 }, { name: 'G2', note: 2 } ],        
    }, 

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'Bb2-C3', 
      kitNumber: 7,      
      tracks: [{ name: 'C3', note: 7 }, { name: 'Bb2', note: 5 } ],        
    },     

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'C3-Eb3', 
      kitNumber: 8,      
      tracks: [{ name: 'Eb3', note: 10 }, { name: 'C3', note: 7 } ],        
    }, 

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'Eb3-F3', 
      kitNumber: 9,      
      tracks: [{ name: 'F3', note: 12 }, { name: 'Eb3', note: 10 } ],        
    }, 

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'F3-G3', 
      kitNumber: 10,      
      tracks: [{ name: 'G3', note: 14 }, { name: 'F3', note: 12 } ],        
    }, 
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'G3-Bb3', 
      kitNumber: 11,      
      tracks: [{ name: 'Bb3', note: 17 }, { name: 'G3', note: 14 } ],        
    }, 
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'Bb3-C4', 
      kitNumber: 12,      
      tracks: [{ name: 'C4', note: 19 }, { name: 'Bb3', note: 17 } ],        
    },     
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'C4-Eb4', 
      kitNumber: 13,      
      tracks: [{ name: 'Eb4', note: 22 }, { name: 'C4', note: 19 } ],        
    },   
    /*{ 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'Eb4', 
      kitNumber: 14,      
      tracks: [{ name: 'Eb4', note: 22 } ],        
    },*/ 

  ]; 



delete window['s8PitchCh9'];
window['s8PitchCh9'] = (JSON.parse(JSON.stringify(sess8PitchNotesDouble)));
window['s8PitchCh9'].splice(3, 10);  
window['s8PitchCh9'][0].kitNumber = 0;
window['s8PitchCh9'][1].kitNumber = 1;
window['s8PitchCh9'][2].kitNumber = 2;




for (var d=10; d<15; d++) {

var remFNotes = d-1;  

//delete window['s8PitchCh'+d];
window['s8PitchCh'+d] = (JSON.parse(JSON.stringify(sess8PitchNotesDouble)));
window['s8PitchCh'+d].splice(0, d-8);
window['s8PitchCh'+d].splice(3, 10);
window['s8PitchCh'+d][0].kitNumber = 0;
window['s8PitchCh'+d][1].kitNumber = 1;
window['s8PitchCh'+d][2].kitNumber = 2;

}

/*
window['s8Pitchch16'] = (JSON.parse(JSON.stringify(sess8PitchNotesDouble)));
window['s8Pitchch16'].splice(3, 10);  
window['s8Pitchch16'][0].kitNumber = 0;
window['s8Pitchch16'][1].kitNumber = 1;
window['s8Pitchch16'][2].kitNumber = 2;
*/

//console.log('windows8PitchCh9', window['s8PitchCh10']); // patternSeqOff2


//console.log('patternSeqOff2', s8PitchCh2); // patternSeqOff2



var s8preset = [

    {"name":"fulim","id":"fd5a6b00-5616-11e7-b178-1b2c4ec8904d", "type":"AikeWebsynth1", "classs":"channel","controls":{"1":40,"2":"2","3":50,"4":"1","5":0,"6":0,"7":10,"8":20,"9":20,"10":31,"11":30,"12":50,"13":0,"14":80,"15":40,"16":20,"992":0}},
    //{"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}},
    //{"name":"le clownSOUND","type":"AikeWebsynth1","classs":"channel","id":"2fbddfd9fd9dvbvb2b2b","controls":{1:59, 2:1, 3:19, 4:2, 5:36, 6:0, 7:26, 8:45, 9:11, 10:7, 11:55, 12:68, 13:0, 14:20, 15:78, 16:13,"992":0}},
    //{"name":"square","type":"AikeWebsynth1","classs":"channel","id":"2fbddcv123cd7f89ff54f","controls":{1:9, 2:1, 3:35, 4:2, 5:27, 6:0, 7:66, 8:80, 9:0, 10:0, 11:40, 12:96, 13:0, 14:0, 15:30, 16:70,"992":0}}            
  ];


for (var e=1; e<16; e++) {

window['s8DefPresetCh'+e] = (JSON.parse(JSON.stringify(s8preset)));
window['s8DefPresetCh'+e][0].id= 's8_defpre_ch'+e;

}  

//console.log('s8DefPreset: ', window['s8DefPresetCh1']); //








// COPY OF session 9 en plus:




var patternSeqOff2 = (JSON.parse(JSON.stringify(aikeWebsynthControls)));


patternSeqOff2[6].x.value = 1; //  1: patternSeq on


patternSeqOff2.splice(1, 1); // remove Save pattern
//patternSeqOff2.splice(2, 1); // remove change sound
patternSeqOff2.splice(3, 1); // remove Save sound

patternSeqOff2.splice(5, 18); // remove all sliders after ptnSeq



// remove low sounding triangle synth osc option
//delete patternSeqOff2[7].x.option[0]; //.splice(0, 1);

patternSeqOff2[1].name = 'hauteur note (pitch)';



var sess9ConductorCtrls = (JSON.parse(JSON.stringify(window.tweak.conductor16a)));



var ptnEditOff = (JSON.parse(JSON.stringify(patternSeqOff2)));
//ptnEditOff[3].y.value = 0; // ptnEditOff
//delete ptnEditOff[3];
ptnEditOff.splice(3, 1); // remove ptn edit
ptnEditOff.splice(3, 1); // remove ptn seq




var blue1   = 'rgba(0, 171, 157, 0.6)';
var yellow1 = 'rgba(253, 206, 31, 0.6)';
var green1  = 'rgba(0, 161, 0, 0.6)';
var orange1 = 'rgba(253, 118, 8, 0.6)';
var red1    = 'rgba(226, 0, 6, 0.6)';
var purple1 = 'rgba(149, 55, 166, 0.6)';
var pink1   = 'rgba(237, 49, 104, 0.6)';

var blue2   = 'rgba(0, 171, 157, 0.7)';
var yellow2 = 'rgba(253, 206, 31, 0.7)';
var green2  = 'rgba(0, 161, 0, 0.7)';
var orange2 = 'rgba(253, 118, 8, 0.7)';
var red2    = 'rgba(226, 0, 6, 0.7)';
var purple2 = 'rgba(149, 55, 166, 0.7)';
var pink2   = 'rgba(237, 49, 104, 0.7)';

var blue3   = 'rgba(0, 171, 157, 0.8)';
var yellow3 = 'rgba(253, 206, 31, 0.8)';
var green3  = 'rgba(0, 161, 0, 0.8)';
var orange3 = 'rgba(253, 118, 8, 0.8)';
var red3    = 'rgba(226, 0, 6, 0.8)';
var purple3 = 'rgba(149, 55, 166, 0.8)';
var pink3   = 'rgba(237, 49, 104, 0.8)';

var blue4   = 'rgba(0, 171, 157, 0.9)';
var yellow4 = 'rgba(253, 206, 31, 0.9)';
var green4  = 'rgba(0, 161, 0, 0.9)';
var orange4 = 'rgba(253, 118, 8, 0.9)';
var red4    = 'rgba(226, 0, 6, 0.9)';
var purple4 = 'rgba(149, 55, 166, 0.9)';
var pink4   = 'rgba(237, 49, 104, 0.9)';






// AikeWebsynth1
var sess9PitchNotes = [    
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: green1,
      name: 'C3 Marimba', 
      kitNumber: 0,      
      tracks: [ { name: 'C3', sampleUrl: 'Marimba/C3.wav'} ], },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: orange1,
      name: 'D3 Marimba', 
      kitNumber: 1,      
      tracks: [ { name: 'D3', sampleUrl: 'Marimba/D3.wav'} ],         
    }, 
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: red1,
      name: 'E3 Marimba', 
      kitNumber: 2,      
      tracks: [ { name: 'E3', sampleUrl: 'Marimba/E3.wav'} ],         
    },     
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: purple1,
      name: 'F3 Marimba', 
      kitNumber: 3,      
      tracks: [ { name: 'F3', sampleUrl: 'Marimba/F3.wav'} ],         
    },   
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: pink1,
      name: 'G3 Marimba', 
      kitNumber: 4,      
      tracks: [ { name: 'G3', sampleUrl: 'Marimba/G3.wav'} ],        
    }, 

    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue2,
      name: 'A3 Marimba', 
      kitNumber: 5,      
      tracks: [ { name: 'A3', sampleUrl: 'Marimba/A3.wav'} ],         
    }, 
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: yellow2,
      name: 'B3 Marimba', 
      kitNumber: 6,      
      tracks: [ { name: 'B3', sampleUrl: 'Marimba/B3.wav'} ],    
    },








    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: green2,
      name: 'C4 Piano', 
      kitNumber: 0,      
      tracks: [ { name: 'C4', sampleUrl: 'Piano/C4.wav'} ], },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: orange2,
      name: 'D4 Piano', 
      kitNumber: 1,      
      tracks: [ { name: 'D4', sampleUrl: 'Piano/D4.wav'} ],         
    }, 
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: red2,
      name: 'E4 Piano', 
      kitNumber: 2,      
      tracks: [ { name: 'E4', sampleUrl: 'Piano/E4.wav'} ],         
    },     
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: purple2,
      name: 'F4 Piano', 
      kitNumber: 3,      
      tracks: [ { name: 'F4', sampleUrl: 'Piano/F4.wav'} ],         
    },   
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: pink2,
      name: 'G4 Piano', 
      kitNumber: 4,      
      tracks: [ { name: 'G4', sampleUrl: 'Piano/G4.wav'} ],        
    }, 

    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue3,
      name: 'A4 Piano', 
      kitNumber: 5,      
      tracks: [ { name: 'A4', sampleUrl: 'Piano/A4.wav'} ],         
    }, 
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: yellow3,
      name: 'B4 Piano', 
      kitNumber: 6,      
      tracks: [ { name: 'B4', sampleUrl: 'Piano/B4.wav'} ],    
    },


 { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: green1,
      name: 'C3 Marimba', 
      kitNumber: 0,      
      tracks: [ { name: 'C3', sampleUrl: 'Marimba/C3.wav'} ], },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: orange1,
      name: 'D3 Marimba', 
      kitNumber: 1,      
      tracks: [ { name: 'D3', sampleUrl: 'Marimba/D3.wav'} ],         
    }, 
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: red1,
      name: 'E3 Marimba', 
      kitNumber: 2,      
      tracks: [ { name: 'E3', sampleUrl: 'Marimba/E3.wav'} ],         
    },     
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: purple1,
      name: 'F3 Marimba', 
      kitNumber: 3,      
      tracks: [ { name: 'F3', sampleUrl: 'Marimba/F3.wav'} ],         
    },   
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: pink1,
      name: 'G3 Marimba', 
      kitNumber: 4,      
      tracks: [ { name: 'G3', sampleUrl: 'Marimba/G3.wav'} ],        
    }, 

    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue2,
      name: 'A3 Marimba', 
      kitNumber: 5,      
      tracks: [ { name: 'A3', sampleUrl: 'Marimba/A3.wav'} ],         
    }, 
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: yellow2,
      name: 'B3 Marimba', 
      kitNumber: 6,      
      tracks: [ { name: 'B3', sampleUrl: 'Marimba/B3.wav'} ],    
    },



  ]; 




window['s9PitchCh1'] = (JSON.parse(JSON.stringify(sess9PitchNotes)));
window['s9PitchCh1'].splice(3, 35); // 6 -9


//console.log('wi', window['s9PitchCh1']);

for (var d=2; d<17; d++) { // 10

  var remFNotes = d-1;  

  window['s9PitchCh'+d] = (JSON.parse(JSON.stringify(sess9PitchNotes)));
  window['s9PitchCh'+d].splice(0, remFNotes);
  window['s9PitchCh'+d].splice(3, 35);
  window['s9PitchCh'+d][0].kitNumber = 0;
  window['s9PitchCh'+d][1].kitNumber = 1;
  window['s9PitchCh'+d][2].kitNumber = 2;

}




var s9preset = [

    {"name":"fulim","id":"fd5a6b00-5616-11e7-b178-1b2c4ec8904d", "type":"AikeWebsynth1", "classs":"channel","controls":{"1":40,"2":"2","3":50,"4":"1","5":0,"6":0,"7":10,"8":20,"9":20,"10":31,"11":30,"12":50,"13":0,"14":80,"15":40,"16":20,"992":0}},
      
  ];


for (var e=1; e<16; e++) {

window['s9DefPresetCh'+e] = (JSON.parse(JSON.stringify(s8preset)));
window['s9DefPresetCh'+e][0].id= 's9_defpre_ch'+e;

}  































//console.log('windows8PitchCh1', window['s8PitchCh1']);


window.insConf8 = [ 





//*

{ sessionName: 'melo', // Electrons libres #3: A - SynthFest 2017  1: mélodie perc dnb
  channelName: '01', 
  trackSet: 3, 
  defaultPreset: 0, 
  presets: s8preset,

  defaultPattern: 0, 
  patterns: [ // channel patterns      
    //{"name":"silence (wipe all notes)","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","notenb":[0,0],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"id":"s8_defptn_c1","tracks":[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], "name":"defptn s8c1 ","classs":"channel"},
  ], 
  conf: window['s8PitchCh1']
},

//*/






/*
{ 
  channelName: '09 (1bar/4)', conf: window['s8PitchCh9'], // ch6: c3 - 9
  trackSet: 1, defaultPreset: 0, presets: s8preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s8_ch9_bar3","classs":"channel","id":"s8_ch9_bar3","notenb":[0,2], "tracks":[[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  //patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s8_ch9_bar3","classs":"channel","id":"s8_ch9_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
  patternSeq: [ [{"name":"s8_ch9_bar3","classs":"channel","id":"s8_ch9_bar3"}] ] // , {"name":"reset","classs":"channel","id":"silence01"}
},

*/








/*
{ sessionName: 'melo',
  channelName: '01 (1bar/1)', 
  conf: window['s8PitchCh1'],


/*
  conf: [{ 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'F2-G2', 
      kitNumber: 0,      
      tracks: [{ name: 'G2', note: 2 }, { name: 'F2', note: 0 } ],        
    }], 

/*
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'F2-G2', 
      kitNumber: 5,      
      tracks: [{ name: 'G2', note: 2 }, { name: 'F2', note: 0 } ],        
    }, 

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'G2-Bb2', 
      kitNumber: 7,      
      tracks: [{ name: 'Bb2', note: 5 }, { name: 'G2', note: 2 } ],        
    }, 

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'Bb2-C3', 
      kitNumber: 7,      
      tracks: [{ name: 'C3', note: 7 }, { name: 'Bb2', note: 5 } ],        
    },     

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'C3-Eb3', 
      kitNumber: 8,      
      tracks: [{ name: 'Eb3', note: 10 }, { name: 'C3', note: 7 } ],        
    }, 

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'Eb3-F3', 
      kitNumber: 9,      
      tracks: [{ name: 'F3', note: 12 }, { name: 'Eb3', note: 10 } ],        
    }, 

/


   trackSet: 3, defaultPreset: 0, presets: window['s8DefPresetCh1'], defaultPattern: 0, defaultPatternSeq: 0, // trackSet: 3
  patterns: [
    {"name":"s8_ch1_bar1","classs":"channel","id":"s8_ch1_bar1","tracks":[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]     ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]      ]},    
  ],    
  patternSeq: [ [{"name":"s8_ch1_bar1","classs":"channel","id":"s8_ch1_bar1"}] ]  
}, 
/*/




/* test
{ sessionName: 'test',
  channelName: '09 (1bar/4)', conf: window['s8PitchCh9'], // ch6: c3 - 9
  trackSet: 1, defaultPreset: 0, presets: s8preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,0],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s8_ch9_bar3","classs":"channel","id":"s8_ch9_bar3","notenb":[0,2], "tracks":[[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s8_ch9_bar3","classs":"channel","id":"s8_ch9_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},
//*/



{ channelName: '8: Conductor',
  trackSet: 0, 
  conf: [{ 
    type: 'control', 
    instrumentName: 'Conductor', 
    name: 'Conductor Ctrl 01', 
    kitNumber: 0, 
    color: '#51ACBD',       
    controls: sess8ConductorCtrls //session7ConductorControls
  }] 
}, 






/*

{ 
  channelName: '02', trackSet: 3, defaultPreset: 0, presets: s8preset, defaultPattern: 0, conf: window['s8PitchCh2'],
  patterns: [ {"id":"s8_defptn_c2","tracks":[[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0]], "name":"defptn s8c2","classs":"channel"} ]
},
{ 
  channelName: '03', trackSet: 3, defaultPreset: 0, presets: s8preset, defaultPattern: 0, conf: window['s8PitchCh3'],
  patterns: [ {"id":"s8_defptn_c3","tracks":[[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]], "name":"defptn s8c3","classs":"channel"} ]
},
{ 
  channelName: '04', trackSet: 3, defaultPreset: 0, presets: s8preset, defaultPattern: 0, conf: window['s8PitchCh4'],
  patterns: [ {"id":"s8_defptn_c4","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0]], "name":"defptn s8c4","classs":"channel"} ]
},

*/


//* remove nearly all channels for tests



{ 
  channelName: '02 (1bar/1)', conf: window['s8PitchCh2'], trackSet: 3, defaultPreset: 0, presets: window['s8DefPresetCh2'], defaultPattern: 0, defaultPatternSeq: 0, 
  patterns: [
    {"name":"s8_ch2_bar1","classs":"channel","id":"s8_ch2_bar1","tracks":[[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s8_ch2_bar1","classs":"channel","id":"s8_ch2_bar1"}] ]  
}, 

{ 
  channelName: '03 (1bar/1)', conf: window['s8PitchCh3'], trackSet: 3, defaultPreset: 0, presets: window['s8DefPresetCh3'], defaultPattern: 0, defaultPatternSeq: 0, 
  patterns: [
    {"name":"s8_ch3_bar1","classs":"channel","id":"s8_ch3_bar1","tracks":[[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s8_ch3_bar1","classs":"channel","id":"s8_ch3_bar1"}] ]  
}, 


{ 
  channelName: '04 (1bar/1)', conf: window['s8PitchCh4'], trackSet: 4, defaultPreset: 0, presets: window['s8DefPresetCh4'], defaultPattern: 0, defaultPatternSeq: 0, 
  patterns: [
    {"name":"s8_ch4_bar1","classs":"channel","id":"s8_ch4_bar1","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s8_ch4_bar1","classs":"channel","id":"s8_ch4_bar1"}] ]  
}, 




{ 
  channelName: '05 (1bar/2)', conf: window['s8PitchCh5'], // Bb2
  trackSet: 3, defaultPreset: 0, presets: s8preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,1],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s8_ch5_bar2","classs":"channel","id":"s8_ch5_bar2","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"s8_ch5_bar2","classs":"channel","id":"s8_ch5_bar2"}] ]  
}, 
{ 
  channelName: '06 (1bar/2)', conf: window['s8PitchCh4'], // 6
  trackSet: 3, defaultPreset: 0, presets: s8preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,1],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s8_ch6_bar2","classs":"channel","id":"s8_ch6_bar2","tracks":[[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"s8_ch6_bar2","classs":"channel","id":"s8_ch6_bar2"}] ]  
}, 

// poss ch 7 & 8 to sound en alternance aavec 5/6

{ 
  channelName: '07 (1bar/2)', conf: window['s8PitchCh3'], // 7
  trackSet: 3, defaultPreset: 0, presets: s8preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,1],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s8_ch7_bar2","classs":"channel","id":"s8_ch7_bar2","tracks":[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"s8_ch7_bar2","classs":"channel","id":"s8_ch7_bar2"}] ]  
}, 
{ 
  channelName: '08 (1bar/2)', conf: window['s8PitchCh2'], // 8
  trackSet: 3, defaultPreset: 0, presets: s8preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,1],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s8_ch8_bar2","classs":"channel","id":"s8_ch8_bar2","tracks":[[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"s8_ch8_bar2","classs":"channel","id":"s8_ch8_bar2"}] ]  
},





{ 
  channelName: '09 (1bar/4)', conf: window['s8PitchCh9'], // ch6: c3 - 9
  trackSet: 1, defaultPreset: 0, presets: s8preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s8_ch9_bar3","classs":"channel","id":"s8_ch9_bar3","notenb":[0,2], "tracks":[[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s8_ch9_bar3","classs":"channel","id":"s8_ch9_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},

{ 
  channelName: '10 (1bar/4)', conf: window['s8PitchCh10'], // ch6: c3 - 10
  trackSet: 1, defaultPreset: 0, presets: s8preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s8_ch10_bar3","classs":"channel","id":"s8_ch10_bar3","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s8_ch10_bar3","classs":"channel","id":"s8_ch10_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},

{ 
  channelName: '11 (1bar/4)', conf: window['s8PitchCh11'], // ch6: c3 - 11
  trackSet: 1, defaultPreset: 0, presets: s8preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s8_ch11_bar3","classs":"channel","id":"s8_ch11_bar3","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s8_ch11_bar3","classs":"channel","id":"s8_ch11_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},

{ 
  channelName: '12 (1bar/4)', conf: window['s8PitchCh12'], // ch6: c3 - 12
  trackSet: 1, defaultPreset: 0, presets: s8preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s8_ch12_bar3","classs":"channel","id":"s8_ch12_bar3","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s8_ch12_bar3","classs":"channel","id":"s8_ch12_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},



{ 
  channelName: '13 (1bar/8)', conf: window['s8PitchCh13'], // 
  trackSet: 1, defaultPreset: 0, presets: s8preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s8_ch13_bar1","classs":"channel","id":"s8_ch13_bar1","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s8_ch13_bar1","classs":"channel","id":"s8_ch13_bar1"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},

{ 
  channelName: '14 (1bar/8)', conf: window['s8PitchCh14'], // 
  trackSet: 1, defaultPreset: 0, presets: s8preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s8_ch14_bar1","classs":"channel","id":"s8_ch14_bar1","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s8_ch14_bar1","classs":"channel","id":"s8_ch14_bar1"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},


{ 
  channelName: '15 (1bar/8)', conf: window['s8PitchCh13'], // 
  trackSet: 1, defaultPreset: 0, presets: s8preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s8_ch15_bar6","classs":"channel","id":"s8_ch15_bar6","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [ {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s8_ch15_bar6","classs":"channel","id":"s8_ch15_bar6"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},
//*
{ 
  channelName: '16 (1bar/8)', conf: window['s8PitchCh12'], // 
  trackSet: 1, defaultPreset: 0, presets: s8preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s8_ch16_bar6","classs":"channel","id":"s8_ch16_bar6","notenb":[0,2], "tracks":[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [ {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s8_ch16_bar6","classs":"channel","id":"s8_ch16_bar6"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},
//*/




// remove nearly all channels for test */





/* // SAMPLES 9-16

{ 
  channelName: '09 (1bar/4)', conf: window['s9PitchCh9'], // ch6: c3 - 9
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch9_bar3","classs":"channel","id":"s9_ch9_bar3","notenb":[0,2], "tracks":[[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch9_bar3","classs":"channel","id":"s9_ch9_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},

{ 
  channelName: '10 (1bar/4)', conf: window['s9PitchCh10'], // ch6: c3 - 10
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch10_bar3","classs":"channel","id":"s9_ch10_bar3","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch10_bar3","classs":"channel","id":"s9_ch10_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},

{ 
  channelName: '11 (1bar/4)', conf: window['s9PitchCh11'], // ch6: c3 - 11
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch11_bar3","classs":"channel","id":"s9_ch11_bar3","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch11_bar3","classs":"channel","id":"s9_ch11_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},

{ 
  channelName: '12 (1bar/4)', conf: window['s9PitchCh12'], // ch6: c3 - 12
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch12_bar3","classs":"channel","id":"s9_ch12_bar3","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch12_bar3","classs":"channel","id":"s9_ch12_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},


//*
{ 
  channelName: '13 (1bar/8)', conf: window['s9PitchCh13'], // 
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch13_bar1","classs":"channel","id":"s9_ch13_bar1","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s9_ch13_bar1","classs":"channel","id":"s9_ch13_bar1"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},

{ 
  channelName: '14 (1bar/8)', conf: window['s9PitchCh14'], // 
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch14_bar1","classs":"channel","id":"s9_ch14_bar1","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s9_ch14_bar1","classs":"channel","id":"s9_ch14_bar1"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},


{ 
  channelName: '15 (1bar/8)', conf: window['s9PitchCh15'], // 
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch15_bar6","classs":"channel","id":"s9_ch15_bar6","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [ {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch15_bar6","classs":"channel","id":"s9_ch15_bar6"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},
//*
{ 
  channelName: '16 (1bar/8)', conf: window['s9PitchCh16'], // 
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch16_bar6","classs":"channel","id":"s9_ch16_bar6","notenb":[0,2], "tracks":[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [ {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch16_bar6","classs":"channel","id":"s9_ch16_bar6"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},
//*/





/*
{ 

  //sessionName: '1: mélodie', // Electrons libres #3: A - SynthFest 2017

  channelName: 'xx02', 

  trackSet: 3, // aka default kit

  defaultPreset: 0, 
  presets: [
    //{"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}},
    {"name":"le clownSOUND","type":"AikeWebsynth1","classs":"channel","id":"2fbddfd9fd9dvbvb2b2b","controls":{1:59, 2:1, 3:19, 4:2, 5:36, 6:0, 7:26, 8:45, 9:11, 10:7, 11:55, 12:68, 13:0, 14:20, 15:78, 16:13,"992":0}},
    {"name":"square","type":"AikeWebsynth1","classs":"channel","id":"2fbddcv123cd7f89ff54f","controls":{1:9, 2:1, 3:35, 4:2, 5:27, 6:0, 7:66, 8:80, 9:0, 10:0, 11:40, 12:96, 13:0, 14:0, 15:30, 16:70,"992":0}}            
  ],

  defaultPattern: 1, 
  patterns: [ // channel patterns      
    {"name":"silence (wipe all notes)","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","notenb":[0,0],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"bar2_ch1_onTheFly","classs":"channel","id":"ch1_bar2_onTheFly","tracks":[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]]},
    //{"name":"bar2_ch1_onTheFly","classs":"channel","id":"ch1_bar2_onTheFly","tracks":[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"notenb":[4,4]},
    //{"name":"la marche redux","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605","tracks":[[0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0]]}
    
    //{"name":"la marche du clown","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}
    //{"name":"bassline a", "classs":"channel", "id":"712cc380-3d17-11e6-bd11-650c5a0c542f", "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0],[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    //{"name":"bassline b", "classs":"channel", "id":"01627d00-3d18-11e6-bd11-650c5a0c542f", "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0],[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]]}     
  ], 



  defaultPatternEdit: 1, //{"name":"la marche redux","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605"}, 
  patternsEdit: [ // 
    {"name":"silence (wipe all notes)","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"},
    {"name":"KOLbar2_ch1_onTheFly","classs":"channel","id":"ch1_bar2_onTheFly"},
  ],   



  defaultPatternSeq: 0, 
  patternSeq: [     
    [       
      {"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"}, /* name param is here just to ease uhman readability /
      //{"name":"la marche redux","classs":"channel","id":"307c36c0-6681-11e6-ae54-5f50faffa605"}/*{"name":"reset","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83"}/
      {"name":"bar2_ch1_onTheFly","classs":"channel","id":"ch1_bar2_onTheFly"}, 
    ]
  ],   

  conf: window['s8PitchCh3'] /*  sess8PitchNotes [
    { 
      type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      instrumentUrl: 'http://aikelab.net/websynth/',
      color: 'rgba(237, 49, 104, 1)',
      name: 'C2', 
      kitNumber: 0,      
      tracks: [{ name: 'C2', note: -5 } ],
      controls: patternSeqOff2  //   lack of kit entraines bug at seq.js l1173 with patternSeqOffNoSave    
    },
    { 
      type: 'synth',
      instrumentName: 'AikeWebsynth1', 
      instrumentUrl: 'http://aikelab.net/websynth/',
      color: 'rgba(237, 49, 104, 1)',
      name: 'C1', 
      kitNumber: 1,      
      tracks: [{ name: 'B1', note: -17 } ],
      controls: patternSeqOff2  //   lack of kit entraines bug at seq.js l1173 with patternSeqOffNoSave    
    }    
  ]/ 
}, 

*/












]; // end of sesssion 8 (16 AWS1 synth channels)














































var patternSeqOff2 = (JSON.parse(JSON.stringify(aikeWebsynthControls)));


patternSeqOff2[6].x.value = 1; //  1: patternSeq on


patternSeqOff2.splice(1, 1); // remove Save pattern
//patternSeqOff2.splice(2, 1); // remove change sound
patternSeqOff2.splice(3, 1); // remove Save sound

patternSeqOff2.splice(5, 18); // remove all sliders after ptnSeq



// remove low sounding triangle synth osc option
//delete patternSeqOff2[7].x.option[0]; //.splice(0, 1);

patternSeqOff2[1].name = 'hauteur note (pitch)';



var sess9ConductorCtrls = (JSON.parse(JSON.stringify(window.tweak.conductor16a)));


sess9ConductorCtrls[17].x.value = 60; // start at 60 bpm
sess9ConductorCtrls[17].x.displayedRangeMax = 400
//autoValIncMode
sess9ConductorCtrls[17].x.autoValIncTime = 4; // increment every 2 bars - 4
sess9ConductorCtrls[17].x.autoValIncBy = 4; // by 8 bpms

//console.log(sess9ConductorCtrls); 



var ptnEditOff = (JSON.parse(JSON.stringify(patternSeqOff2)));
//ptnEditOff[3].y.value = 0; // ptnEditOff
//delete ptnEditOff[3];
ptnEditOff.splice(3, 1); // remove ptn edit
ptnEditOff.splice(3, 1); // remove ptn seq




var blue1   = 'rgba(0, 171, 157, 0.6)';
var yellow1 = 'rgba(253, 206, 31, 0.6)';
var green1  = 'rgba(0, 161, 0, 0.6)';
var orange1 = 'rgba(253, 118, 8, 0.6)';
var red1    = 'rgba(226, 0, 6, 0.6)';
var purple1 = 'rgba(149, 55, 166, 0.6)';
var pink1   = 'rgba(237, 49, 104, 0.6)';

var blue2   = 'rgba(0, 171, 157, 0.7)';
var yellow2 = 'rgba(253, 206, 31, 0.7)';
var green2  = 'rgba(0, 161, 0, 0.7)';
var orange2 = 'rgba(253, 118, 8, 0.7)';
var red2    = 'rgba(226, 0, 6, 0.7)';
var purple2 = 'rgba(149, 55, 166, 0.7)';
var pink2   = 'rgba(237, 49, 104, 0.7)';

var blue3   = 'rgba(0, 171, 157, 0.8)';
var yellow3 = 'rgba(253, 206, 31, 0.8)';
var green3  = 'rgba(0, 161, 0, 0.8)';
var orange3 = 'rgba(253, 118, 8, 0.8)';
var red3    = 'rgba(226, 0, 6, 0.8)';
var purple3 = 'rgba(149, 55, 166, 0.8)';
var pink3   = 'rgba(237, 49, 104, 0.8)';

var blue4   = 'rgba(0, 171, 157, 0.9)';
var yellow4 = 'rgba(253, 206, 31, 0.9)';
var green4  = 'rgba(0, 161, 0, 0.9)';
var orange4 = 'rgba(253, 118, 8, 0.9)';
var red4    = 'rgba(226, 0, 6, 0.9)';
var purple4 = 'rgba(149, 55, 166, 0.9)';
var pink4   = 'rgba(237, 49, 104, 0.9)';






// AikeWebsynth1
var sess9PitchNotes = [    
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: green1,
      name: 'C3 Marimba', 
      kitNumber: 0,      
      tracks: [ { name: 'C3', sampleUrl: 'Marimba/C3.wav'} ], },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: orange1,
      name: 'D3 Marimba', 
      kitNumber: 1,      
      tracks: [ { name: 'D3', sampleUrl: 'Marimba/D3.wav'} ],         
    }, 
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: red1,
      name: 'E3 Marimba', 
      kitNumber: 2,      
      tracks: [ { name: 'E3', sampleUrl: 'Marimba/E3.wav'} ],         
    },     
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: purple1,
      name: 'F3 Marimba', 
      kitNumber: 3,      
      tracks: [ { name: 'F3', sampleUrl: 'Marimba/F3.wav'} ],         
    },   
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: pink1,
      name: 'G3 Marimba', 
      kitNumber: 4,      
      tracks: [ { name: 'G3', sampleUrl: 'Marimba/G3.wav'} ],        
    }, 

    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue2,
      name: 'A3 Marimba', 
      kitNumber: 5,      
      tracks: [ { name: 'A3', sampleUrl: 'Marimba/A3.wav'} ],         
    }, 
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: yellow2,
      name: 'B3 Marimba', 
      kitNumber: 6,      
      tracks: [ { name: 'B3', sampleUrl: 'Marimba/B3.wav'} ],    
    },








    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: green2,
      name: 'C4 Piano', 
      kitNumber: 0,      
      tracks: [ { name: 'C4', sampleUrl: 'Piano/C4.wav'} ], },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: orange2,
      name: 'D4 Piano', 
      kitNumber: 1,      
      tracks: [ { name: 'D4', sampleUrl: 'Piano/D4.wav'} ],         
    }, 
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: red2,
      name: 'E4 Piano', 
      kitNumber: 2,      
      tracks: [ { name: 'E4', sampleUrl: 'Piano/E4.wav'} ],         
    },     
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: purple2,
      name: 'F4 Piano', 
      kitNumber: 3,      
      tracks: [ { name: 'F4', sampleUrl: 'Piano/F4.wav'} ],         
    },   
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: pink2,
      name: 'G4 Piano', 
      kitNumber: 4,      
      tracks: [ { name: 'G4', sampleUrl: 'Piano/G4.wav'} ],        
    }, 

    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue3,
      name: 'A4 Piano', 
      kitNumber: 5,      
      tracks: [ { name: 'A4', sampleUrl: 'Piano/A4.wav'} ],         
    }, 
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: yellow3,
      name: 'B4 Piano', 
      kitNumber: 6,      
      tracks: [ { name: 'B4', sampleUrl: 'Piano/B4.wav'} ],    
    },


 { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: green1,
      name: 'C3 Marimba', 
      kitNumber: 0,      
      tracks: [ { name: 'C3', sampleUrl: 'Marimba/C3.wav'} ], },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: orange1,
      name: 'D3 Marimba', 
      kitNumber: 1,      
      tracks: [ { name: 'D3', sampleUrl: 'Marimba/D3.wav'} ],         
    }, 
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: red1,
      name: 'E3 Marimba', 
      kitNumber: 2,      
      tracks: [ { name: 'E3', sampleUrl: 'Marimba/E3.wav'} ],         
    },     
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: purple1,
      name: 'F3 Marimba', 
      kitNumber: 3,      
      tracks: [ { name: 'F3', sampleUrl: 'Marimba/F3.wav'} ],         
    },   
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: pink1,
      name: 'G3 Marimba', 
      kitNumber: 4,      
      tracks: [ { name: 'G3', sampleUrl: 'Marimba/G3.wav'} ],        
    }, 

    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue2,
      name: 'A3 Marimba', 
      kitNumber: 5,      
      tracks: [ { name: 'A3', sampleUrl: 'Marimba/A3.wav'} ],         
    }, 
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: yellow2,
      name: 'B3 Marimba', 
      kitNumber: 6,      
      tracks: [ { name: 'B3', sampleUrl: 'Marimba/B3.wav'} ],    
    },



  ]; 










window['s9PitchCh1'] = (JSON.parse(JSON.stringify(sess9PitchNotes)));
window['s9PitchCh1'].splice(3, 35); // 6 -9


//console.log('wi', window['s9PitchCh1']);

for (var d=2; d<17; d++) { // 10

  var remFNotes = d-1;  

  window['s9PitchCh'+d] = (JSON.parse(JSON.stringify(sess9PitchNotes)));
  window['s9PitchCh'+d].splice(0, remFNotes);
  window['s9PitchCh'+d].splice(3, 35);
  window['s9PitchCh'+d][0].kitNumber = 0;
  window['s9PitchCh'+d][1].kitNumber = 1;
  window['s9PitchCh'+d][2].kitNumber = 2;
  /*window['s9PitchCh'+d][3].kitNumber = 3;
  window['s9PitchCh'+d][4].kitNumber = 4;
  window['s9PitchCh'+d][5].kitNumber = 5;*/


  //console.log('kooli: ', window['s9PitchCh'+d]);
}


//console.log('kooli 1/2/3: ', window['s9PitchCh1'], window['s9PitchCh2'], window['s9PitchCh3']);


/*
var sess8PitchNotesDouble = [   

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'F2-G2', 
      kitNumber: 5,      
      tracks: [{ name: 'G2', note: 2 }, { name: 'F2', note: 0 } ],        
    }, 

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'G2-Bb2', 
      kitNumber: 7,      
      tracks: [{ name: 'Bb2', note: 5 }, { name: 'G2', note: 2 } ],        
    }, 

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'Bb2-C3', 
      kitNumber: 7,      
      tracks: [{ name: 'C3', note: 7 }, { name: 'Bb2', note: 5 } ],        
    },     

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'C3-Eb3', 
      kitNumber: 8,      
      tracks: [{ name: 'Eb3', note: 10 }, { name: 'C3', note: 7 } ],        
    }, 

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'Eb3-F3', 
      kitNumber: 9,      
      tracks: [{ name: 'F3', note: 12 }, { name: 'Eb3', note: 10 } ],        
    }, 

    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'F3-G3', 
      kitNumber: 10,      
      tracks: [{ name: 'G3', note: 14 }, { name: 'F3', note: 12 } ],        
    }, 
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'G3-Bb3', 
      kitNumber: 11,      
      tracks: [{ name: 'Bb3', note: 17 }, { name: 'G3', note: 14 } ],        
    }, 
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'Bb3-C4', 
      kitNumber: 12,      
      tracks: [{ name: 'C4', note: 19 }, { name: 'Bb3', note: 17 } ],        
    },     
    { 
      type: 'synth', instrumentName: 'AikeWebsynth1', instrumentUrl: 'http://aikelab.net/websynth/', controls: patternSeqOff2,
      color: 'rgba(237, 49, 104, 0.6)',
      name: 'C4-Eb4', 
      kitNumber: 13,      
      tracks: [{ name: 'Eb4', note: 22 }, { name: 'C4', note: 19 } ],        
    },   


  ]; 



delete window['s8PitchCh9'];
window['s8PitchCh9'] = (JSON.parse(JSON.stringify(sess8PitchNotesDouble)));
window['s8PitchCh9'].splice(3, 10);  
window['s8PitchCh9'][0].kitNumber = 0;
window['s8PitchCh9'][1].kitNumber = 1;
window['s8PitchCh9'][2].kitNumber = 2;




for (var d=10; d<15; d++) {

var remFNotes = d-1;  

//delete window['s8PitchCh'+d];
window['s8PitchCh'+d] = (JSON.parse(JSON.stringify(sess8PitchNotesDouble)));
window['s8PitchCh'+d].splice(0, d-8);
window['s8PitchCh'+d].splice(3, 10);
window['s8PitchCh'+d][0].kitNumber = 0;
window['s8PitchCh'+d][1].kitNumber = 1;
window['s8PitchCh'+d][2].kitNumber = 2;

}

*/




var s9preset = [

    {"name":"fulim","id":"fd5a6b00-5616-11e7-b178-1b2c4ec8904d", "type":"AikeWebsynth1", "classs":"channel","controls":{"1":40,"2":"2","3":50,"4":"1","5":0,"6":0,"7":10,"8":20,"9":20,"10":31,"11":30,"12":50,"13":0,"14":80,"15":40,"16":20,"992":0}},
    //{"name":"303 square bass","type":"AikeWebsynth1","classs":"channel","id":"2fbdd99d8f8f","controls":{1:0, 2:1, 3:35, 4:2, 5:76, 6:0, 7:5, 8:0, 9:0, 10:0, 11:75, 12:100, 13:0, 14:0, 15:0, 16:0}},
    //{"name":"le clownSOUND","type":"AikeWebsynth1","classs":"channel","id":"2fbddfd9fd9dvbvb2b2b","controls":{1:59, 2:1, 3:19, 4:2, 5:36, 6:0, 7:26, 8:45, 9:11, 10:7, 11:55, 12:68, 13:0, 14:20, 15:78, 16:13,"992":0}},
    //{"name":"square","type":"AikeWebsynth1","classs":"channel","id":"2fbddcv123cd7f89ff54f","controls":{1:9, 2:1, 3:35, 4:2, 5:27, 6:0, 7:66, 8:80, 9:0, 10:0, 11:40, 12:96, 13:0, 14:0, 15:30, 16:70,"992":0}}            
  ];


for (var e=1; e<16; e++) {

window['s9DefPresetCh'+e] = (JSON.parse(JSON.stringify(s8preset)));
window['s9DefPresetCh'+e][0].id= 's9_defpre_ch'+e;

}  




window.insConf9 = [ 





/*

{ sessionName: 'melo', // Electrons libres #3: A - SynthFest 2017  1: mélodie perc dnb
  channelName: '01', 
  trackSet: 3, 
  defaultPreset: 0, 
  presets: s9preset,

  defaultPattern: 0, 
  patterns: [ // channel patterns      
    //{"name":"silence (wipe all notes)","classs":"channel","id":"2fb82950-36f3-11e6-aa68-d355ddb21e83","notenb":[0,0],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"id":"s9_defptn_c1","tracks":[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]], "name":"defptn s9c1 ","classs":"channel"},
  ], 
  conf: window['s9PitchCh1']
},

//*/

//*
{ sessionName: 'Marimba/Piano', //
  channelName: '01 (1bar/1)', conf: window['s9PitchCh1'], trackSet: 1, defaultPreset: 0, presets: window['s9DefPresetCh1'], defaultPattern: 0, defaultPatternSeq: 0, 
  patterns: [
    {"name":"s9_ch1_bar1","classs":"channel","id":"s9_ch1_bar1","tracks":[[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s9_ch1_bar1","classs":"channel","id":"s9_ch1_bar1"}] ]  
}, 
/*/




/* test
{ sessionName: 'test',
  channelName: '09 (1bar/4)', conf: window['s9PitchCh9'], // ch6: c3 - 9
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,0],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch9_bar3","classs":"channel","id":"s9_ch9_bar3","notenb":[0,2], "tracks":[[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch9_bar3","classs":"channel","id":"s9_ch9_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},
//*/



{ channelName: '8: Conductor',
  trackSet: 0, 
  conf: [{ 
    type: 'control', 
    instrumentName: 'Conductor', 
    name: 'Conductor Ctrl 01', 
    kitNumber: 0, 
    color: '#51ACBD',       
    controls: sess9ConductorCtrls //session7ConductorControls
  }] 
}, 





//* remove nearly all channels for tests 


{ 
  channelName: '02 (1bar/1)', conf: window['s9PitchCh2'], trackSet: 1, defaultPreset: 0, presets: window['s9DefPresetCh2'], defaultPattern: 0, defaultPatternSeq: 0, 
  patterns: [
    {"name":"s9_ch2_bar1","classs":"channel","id":"s9_ch2_bar1","tracks":[[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s9_ch2_bar1","classs":"channel","id":"s9_ch2_bar1"}] ]  
}, 



//*
{ 
  channelName: '03 (1bar/1)', conf: window['s9PitchCh2'], trackSet: 1, defaultPreset: 0, presets: window['s9DefPresetCh3'], defaultPattern: 0, defaultPatternSeq: 0, 
  patterns: [
    {"name":"s9_ch3_bar1","classs":"channel","id":"s9_ch3_bar1","tracks":[[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s9_ch3_bar1","classs":"channel","id":"s9_ch3_bar1"}] ]  
}, 


{ 
  channelName: '04 (1bar/1)', conf: window['s9PitchCh3'], trackSet: 1, defaultPreset: 0, presets: window['s9DefPresetCh4'], defaultPattern: 0, defaultPatternSeq: 0, 
  patterns: [
    {"name":"s9_ch4_bar1","classs":"channel","id":"s9_ch4_bar1","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s9_ch4_bar1","classs":"channel","id":"s9_ch4_bar1"}] ]  
}, 



//*
{ 
  channelName: '05 (1bar/2)', conf: window['s9PitchCh5'], // Bb2
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,1],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch5_bar2","classs":"channel","id":"s9_ch5_bar2","tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch5_bar2","classs":"channel","id":"s9_ch5_bar2"}] ]  
}, 
{ 
  channelName: '06 (1bar/2)', conf: window['s9PitchCh4'], // 6
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,1],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch6_bar2","classs":"channel","id":"s9_ch6_bar2","tracks":[[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch6_bar2","classs":"channel","id":"s9_ch6_bar2"}] ]  
}, 

// poss ch 7 & 8 to sound en alternance aavec 5/6

{ 
  channelName: '07 (1bar/2)', conf: window['s9PitchCh3'], // 7
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,1],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch7_bar2","classs":"channel","id":"s9_ch7_bar2","tracks":[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch7_bar2","classs":"channel","id":"s9_ch7_bar2"}] ]  
}, 
{ 
  channelName: '08 (1bar/2)', conf: window['s9PitchCh2'], // 8
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,1],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch8_bar2","classs":"channel","id":"s9_ch8_bar2","tracks":[[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch8_bar2","classs":"channel","id":"s9_ch8_bar2"}] ]  
},



//*

{ 
  channelName: '09 (1bar/4)', conf: window['s9PitchCh9'], // ch6: c3 - 9
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch9_bar3","classs":"channel","id":"s9_ch9_bar3","notenb":[0,2], "tracks":[[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch9_bar3","classs":"channel","id":"s9_ch9_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},

{ 
  channelName: '10 (1bar/4)', conf: window['s9PitchCh10'], // ch6: c3 - 10
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch10_bar3","classs":"channel","id":"s9_ch10_bar3","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch10_bar3","classs":"channel","id":"s9_ch10_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},

{ 
  channelName: '11 (1bar/4)', conf: window['s9PitchCh11'], // ch6: c3 - 11
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch11_bar3","classs":"channel","id":"s9_ch11_bar3","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch11_bar3","classs":"channel","id":"s9_ch11_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},

{ 
  channelName: '12 (1bar/4)', conf: window['s9PitchCh12'], // ch6: c3 - 12
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch12_bar3","classs":"channel","id":"s9_ch12_bar3","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch12_bar3","classs":"channel","id":"s9_ch12_bar3"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},


//*
{ 
  channelName: '13 (1bar/8)', conf: window['s9PitchCh13'], // 
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch13_bar1","classs":"channel","id":"s9_ch13_bar1","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s9_ch13_bar1","classs":"channel","id":"s9_ch13_bar1"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},

{ 
  channelName: '14 (1bar/8)', conf: window['s9PitchCh14'], // 
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch14_bar1","classs":"channel","id":"s9_ch14_bar1","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s9_ch14_bar1","classs":"channel","id":"s9_ch14_bar1"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},


{ 
  channelName: '15 (1bar/8)', conf: window['s9PitchCh15'], // 
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch15_bar6","classs":"channel","id":"s9_ch15_bar6","notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [ {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch15_bar6","classs":"channel","id":"s9_ch15_bar6"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},
//*
{ 
  channelName: '16 (1bar/8)', conf: window['s9PitchCh16'], // 
  trackSet: 1, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s9_ch16_bar6","classs":"channel","id":"s9_ch16_bar6","notenb":[0,2], "tracks":[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [ {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s9_ch16_bar6","classs":"channel","id":"s9_ch16_bar6"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}] ]  
},
//*/




// remove nearly all channels for test */




]; // end of session 9 (marimba / piano)





/*

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


        },
        { name: 'Kick',
          sampleUrl: 'TheCheebacabra1/kick.wav'            
        }                      
      ],

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
         
        },  
        {
          name: 'Snare',
         
        },
        {
          name: 'Hihat',
         
        },
        {
          name: 'Kick',
          sampleUrl: 'CR78/kick.wav'            
        }                      
      ],




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

        },
        {
          name: 'Kick',

        }                      
      ],     
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

        },  
        {
          name: 'Snare',

        },
        {


        {
          name: 'Kick',

        }                      
      ],     
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

        },  
        {
          name: 'Snare',

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
          type: 'ddmenu', 
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
    },     

    { type: 'samples', 
      instrumentName: 'Sampler', 
      name: '909', 
      kitNumber: 5, 
      color: 'rgba(253, 118, 8, 0.7)', // (kitColor)
      tracks: [
 
        { name: 'Rimshot',
           
        },
        { name: 'Clap',
                    
        },  
        { name: 'Snare',
          sampleUrl: ''            
        },
        { name: 'Closed hihat',

        },
        { name: 'Kick',
          sampleUrl: '12-TR-909/909 KIK2.wav' // 909 KIK7           
        }                      
      ],
      ]            
    }



kick: 78 bbeat13 linn
hh: 78 bbeat13 909
sd: 78 linn kit8
klap: 909

3 toms: 78, linn, kit8
various: 909 oh, 909 rim, linn hh, cheebacra hh sd tom3



var blue1   = 'rgba(0, 171, 157, 0.6)';
var yellow1 = 'rgba(253, 206, 31, 0.6)';
var green1  = 'rgba(0, 161, 0, 0.6)';
var orange1 = 'rgba(253, 118, 8, 0.6)';
var red1    = 'rgba(226, 0, 6, 0.6)';
var purple1 = 'rgba(149, 55, 166, 0.6)';
var pink1   = 'rgba(237, 49, 104, 0.6)';

var blue2   = 'rgba(0, 171, 157, 0.7)';
var yellow2 = 'rgba(253, 206, 31, 0.7)';
var green2  = 'rgba(0, 161, 0, 0.7)';
var orange2 = 'rgba(253, 118, 8, 0.7)';
var red2    = 'rgba(226, 0, 6, 0.7)';
var purple2 = 'rgba(149, 55, 166, 0.7)';
var pink2   = 'rgba(237, 49, 104, 0.7)';



          sampleUrl: ''     
          CR78/kick.wav     
          sampleUrl: 'breakbeat13/kick.wav'  



//*/




var ptnSeqOff3 = (JSON.parse(JSON.stringify(aikeWebsynthControls)));





ptnSeqOff3.splice(1, 1); // remove Save pattern
ptnSeqOff3.splice(2, 1); // remove change sound
ptnSeqOff3.splice(2, 1); // remove Save sound
ptnSeqOff3.splice(4, 18); // remove all sliders after ptnSeq

//console.log('ptnSeqOff3', ptnSeqOff3);
ptnSeqOff3[2].y.value = 0; //  0: patternEdit off
ptnSeqOff3[3].x.value = 0; //  0: patternSeq off
ptnSeqOff3[1].name = 'Change sound';   


patternSeqOff2[1].name = 'Change sound';   


// remove low sounding triangle synth osc option
//delete patternSeqOff2[7].x.option[0]; //.splice(0, 1);

              
console.log('patternSeqOff2', patternSeqOff2);

window['s10KitsCh1'] = [    
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue1,
      name: 'Kick (Linn)', 
      kitNumber: 0,      
      tracks: [ { name: 'Kick (Linn)', sampleUrl: 'LINN/kick.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue2,
      name: 'Kick (Cr78)', 
      kitNumber: 1,      
      tracks: [ { name: 'Kick (Cr78)', sampleUrl: 'CR78/kick.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue3,
      name: 'Kick (bb13)', 
      kitNumber: 2,      
      tracks: [ { name: 'Kick (bb13)', sampleUrl: 'breakbeat13/kick.wav'} ], 
    },        
];




window['s10KitsCh2'] = [    
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: yellow1,
      name: 'Snare (Linn)', 
      kitNumber: 0,      
      tracks: [ { name: 'Snare (Linn)', sampleUrl: 'LINN/snare.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: yellow2,
      name: 'Snare (Cr78)', 
      kitNumber: 1,      
      tracks: [ { name: 'Snare (Cr78)', sampleUrl: 'CR78/snare.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: yellow3,
      name: 'Snare (Tr909)', 
      kitNumber: 2,      
      tracks: [ { name: 'Snare (Tr909)', sampleUrl: '12-TR-909/909 SD10.wav'} ], 
    },     
      
];




window['s10KitsCh3'] = [    
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: green1,
      name: 'Hihat (bb13)', 
      kitNumber: 0,      
      tracks: [ { name: 'Hihat (bb13)', sampleUrl: 'breakbeat13/hihat.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: green2,
      name: 'Hihat (Cr78)', 
      kitNumber: 1,      
      tracks: [ { name: 'Hihat (Cr78)', sampleUrl: 'CR78/hihat.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: green3,
      name: 'Hihat (Tr909)', 
      kitNumber: 2,      
      tracks: [ { name: 'Hihat (Tr909)', sampleUrl: '12-TR-909/909 HHCL 1.wav'} ], 
    },        
];



window['s10KitsCh4'] = [    
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: orange1,
      name: 'Clap (Tr909)', 
      kitNumber: 0,      
      tracks: [ { name: 'Clap (Tr909)', sampleUrl: '12-TR-909/909 CLAP.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: orange2,
      name: 'Clap (kit8)', 
      kitNumber: 1,      
      tracks: [ { name: 'Clap (kit8)', sampleUrl: 'Kit8/snare.wav'} ], 
    },      
     
];




window['s10KitsCh5'] = [    
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: red1,
      name: 'Tom 1 (Linn)', 
      kitNumber: 0,      
      tracks: [ { name: 'Tom 1 (Linn)', sampleUrl: 'LINN/tom1.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: red2,
      name: 'Tom 1 (Cr78)', 
      kitNumber: 1,      
      tracks: [ { name: 'Tom 1 (Cr78)', sampleUrl: 'CR78/tom1.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: red3,
      name: 'Tom 1 (Kit8)', 
      kitNumber: 2,      
      tracks: [ { name: 'Tom 1 (Kit8)', sampleUrl: 'Kit8/tom1.wav'} ], 
    },        
];


window['s10KitsCh6'] = [    
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: purple1,
      name: 'Tom 2 (Linn)', 
      kitNumber: 0,      
      tracks: [ { name: 'Tom 2 (Linn)', sampleUrl: 'LINN/tom2.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: purple2,
      name: 'Tom 2 (Cr78)', 
      kitNumber: 1,      
      tracks: [ { name: 'Tom 2 (Cr78)', sampleUrl: 'CR78/tom2.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: purple3,
      name: 'Tom 2 (Kit8)', 
      kitNumber: 2,      
      tracks: [ { name: 'Tom 2 (Kit8)', sampleUrl: 'Kit8/tom2.wav'} ], 
    },        
];

window['s10KitsCh7'] = [    
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: pink1,
      name: 'Tom 3 (Linn)', 
      kitNumber: 0,      
      tracks: [ { name: 'Tom 3 (Linn)', sampleUrl: 'LINN/tom3.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: pink2,
      name: 'Tom 3 (Cr78)', 
      kitNumber: 1,      
      tracks: [ { name: 'Tom 3 (Cr78)', sampleUrl: 'CR78/tom3.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: pink3,
      name: 'Tom 3 (Kit8)', 
      kitNumber: 2,      
      tracks: [ { name: 'Tom 3 (Kit8)', sampleUrl: 'Kit8/tom3.wav'} ], 
    },        
];


window['s10KitsCh8'] = [    
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue1,
      name: 'Kick (Cheebacabra)', 
      kitNumber: 0,      
      tracks: [ { name: 'Kick (Cheebacabra)', sampleUrl: 'TheCheebacabra1/tom3.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue2,
      name: 'Snare (Cheebacabra)', 
      kitNumber: 1,      
      tracks: [ { name: 'Snare (Cheebacabra)', sampleUrl: 'TheCheebacabra1/snare.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue3,
      name: 'Hihat (Cheebacabra)', 
      kitNumber: 2,      
      tracks: [ { name: 'Hihat (Cheebacabra)', sampleUrl: 'TheCheebacabra1/hihat.wav'} ], 
    },      

    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue3,
      name: 'Loud hihat (Linn)', 
      kitNumber: 3,      
      tracks: [ { name: 'Loud hihat (Linn)', sampleUrl: 'LINN/hihat.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue3,
      name: 'Rimshot (Tr909)', 
      kitNumber: 4,      
      tracks: [ { name: 'Rimshot (Tr909)', sampleUrl: '12-TR-909/909 RIM.wav'} ], 
    },
    { 
      type: 'samples', instrumentName: 'Sampler', controls: patternSeqOff2,
      color: blue3,
      name: 'Opened hihat (Tr909)', 
      kitNumber: 5,      
      tracks: [ { name: 'Opened hihat (Tr909)', sampleUrl: '12-TR-909/909 HHOP.wav'} ], 
    },          
];



window['s10NoPtnEdit_Ch1'] = (JSON.parse(JSON.stringify(window['s10KitsCh1'])));

//console.log('log aavnt:', window['s10NoPtnEdit_Ch1']);          
      forIn(window['s10NoPtnEdit_Ch1'], function(val, key, o) { 
        delete window['s10NoPtnEdit_Ch1'][key].controls;
        window['s10NoPtnEdit_Ch1'][key].controls = ptnSeqOff3;
        //console.log(window['s10KitsCh8'][key]);          
      });


//console.log('log après:', window['s10NoPtnEdit_Ch1']);          


window['s10NoPtnEdit_Ch2'] = (JSON.parse(JSON.stringify(window['s10KitsCh2'])));
        
forIn(window['s10NoPtnEdit_Ch2'], function(val, key, o) { 
  delete window['s10NoPtnEdit_Ch2'][key].controls;
  window['s10NoPtnEdit_Ch2'][key].controls = ptnSeqOff3;       
});


window['s10NoPtnEdit_Ch3'] = (JSON.parse(JSON.stringify(window['s10KitsCh3'])));
        
forIn(window['s10NoPtnEdit_Ch3'], function(val, key, o) { 
  delete window['s10NoPtnEdit_Ch3'][key].controls;
  window['s10NoPtnEdit_Ch3'][key].controls = ptnSeqOff3;       
});


window['s10NoPtnEdit_Ch4'] = (JSON.parse(JSON.stringify(window['s10KitsCh4'])));
        
forIn(window['s10NoPtnEdit_Ch4'], function(val, key, o) { 
  delete window['s10NoPtnEdit_Ch4'][key].controls;
  window['s10NoPtnEdit_Ch4'][key].controls = ptnSeqOff3;       
});


/*

        { name: 'Tom 3',
          sampleUrl: ''            
        },  
        { name: 'Snare',
          sampleUrl: ''            
        },
        { name: 'Hihat',
          sampleUrl: ''   
          name: 'Hihat',
          sampleUrl: ''            
        },

          sampleUrl: ''            
        },
        { name: 'Opened hihat',
          sampleUrl: '' 

var blue1   = 'rgba(0, 171, 157, 0.6)';
var yellow1 = 'rgba(253, 206, 31, 0.6)';
var green1  = 'rgba(0, 161, 0, 0.6)';
var orange1 = 'rgba(253, 118, 8, 0.6)';
var red1    = 'rgba(226, 0, 6, 0.6)';
var purple1 = 'rgba(149, 55, 166, 0.6)';
var pink1   = 'rgba(237, 49, 104, 0.6)';

*/


//console.log('kit ch2: ', window['s10KitsCh2'], window['s9DefPresetCh1']);


var sess10ConductorCtrls = (JSON.parse(JSON.stringify(window.tweak.conductor16a)));


sess10ConductorCtrls[17].x.value = 115; // start at 60 bpm
sess10ConductorCtrls[17].x.displayedRangeMax = 400;
sess10ConductorCtrls[17].x.autoValIncMode = 0;
/*
sess9ConductorCtrls[17].x.autoValIncTime = 4; // increment every 2 bars - 4
sess9ConductorCtrls[17].x.autoValIncBy = 4; // by 8 bpms */


window.insConf10 = [ 





// editable patterns

//*
{ sessionName: 'drums',
  channelName: '01 (1bar/1) static patterns', conf: window['s10NoPtnEdit_Ch1'], trackSet: 0, defaultPreset: 0, presets: window['s9DefPresetCh1'], defaultPattern: 1, defaultPatternSeq: 0, // fixed
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,0],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},  
    {"name":"hip hop beat","classs":"channel","id":"s10_ch1_bar1_ptn02","notenb":[2,2],"tracks":[[1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]},
    {"name":"techno beat","classs":"channel","id":"s10_ch1_bar1_ptn01","notenb":[4,4],"tracks":[[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]]},    // 4x4 beat
    {"name":"reggae beat","classs":"channel","id":"s10_ch1_bar1_ptn03","notenb":[2,2],"tracks":[[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]]},
  ],    
  //patternSeq: [ [{"name":"techno beat","classs":"channel","id":"s10_ch1_bar1_ptn01"}] ]  
}, 
//*/





/*
{ //sessionName: 'drums',
  channelName: '02 (1bar/1) static patterns', conf: window['s10Kitsch2'], trackSet: 1, defaultPreset: 0, presets: window['s9DefPresetCh1'], defaultPattern: 0,// defaultPatternSeq: 0, // fixed
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,0],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},  
    /*{"name":"5-13 hits","classs":"channel","id":"s10_ch2_bar1_ptn02","notenb":[2,2],"tracks":[[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0]]},
    {"name":"techno beat","classs":"channel","id":"s10_ch2_bar1_ptn01","notenb":[4,4],"tracks":[[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]]},    // 4x4 beat
    {"name":"reggae beat","classs":"channel","id":"s10_ch2_bar1_ptn03","notenb":[0,2],"tracks":[[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]]},/
    // freestyle pattern 0>2
  ],    
}, 
*/



{ channelName: '8: Conductor',
  trackSet: 0, 
  conf: [{ 
    type: 'control', 
    instrumentName: 'Conductor', 
    name: 'Conductor Ctrl 01', 
    kitNumber: 0, 
    color: '#51ACBD',       
    controls: sess10ConductorCtrls //session7ConductorControls
  }] 
}, 



{ 
  channelName: '01b gfx',   // first gfx user channel
  trackSet: 0,
  audiolink: 0,
  conf: [{ 
    type: 'gfx', 
    instrumentName: 'gfx', 
    name: 'gfx 01', 
    kitNumber: 0, 
    color: '#51ACBD',       
    controls: sess10ConductorCtrls //session7ConductorControls
  }] 

  //, trackSet: 0, defaultPreset: 0, presets: s9preset, defaultPattern: 0, defaultPatternSeq: 0, 

}, 





//*
{ 
  channelName: '02 (1bar/1) static patterns', conf: window['s10NoPtnEdit_Ch2'], trackSet: 0, defaultPreset: 0, presets: window['s9DefPresetCh1'], defaultPattern: 1, defaultPatternSeq: 0, // fixed
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,0],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},  
    {"name":"5-13 hits","classs":"channel","id":"s10_ch2_bar1_ptn02","notenb":[2,2],"tracks":[[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0]]},
    {"name":"5-15 hits","classs":"channel","id":"s10_ch2_bar1_ptn01","notenb":[2,2],"tracks":[[0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0]]},    
    {"name":"7-15 hits","classs":"channel","id":"s10_ch2_bar1_ptn03","notenb":[2,2],"tracks":[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0]]},
  ],      
}, 
//*/



{ 
  channelName: '02b gfx', // gfx user ch 02    
  audiolink: 3,
  trackSet: 0,
  conf: [{ 
    type: 'gfx', 
    instrumentName: 'gfx', 
    name: 'gfx 01', 
    kitNumber: 0, 
    color: '#51ACBD',       
    controls: sess10ConductorCtrls //session7ConductorControls
  }] 

  //, trackSet: 0, defaultPreset: 0, presets: s9preset, defaultPattern: 0, defaultPatternSeq: 0, 

}, 



//*
{ 
  channelName: '03 (1bar/1) static patterns', conf: window['s10NoPtnEdit_Ch3'], trackSet: 0, defaultPreset: 0, presets: window['s9DefPresetCh1'], defaultPattern: 1, defaultPatternSeq: 0, // fixed
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,0],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},  
    {"name":"hip hop hihats","classs":"channel","id":"s10_ch3_bar1_ptn01","notenb":[8,8],"tracks":[[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]]},
    {"name":"techno hihats","classs":"channel","id":"s10_ch3_bar1_ptn02","notenb":[4,4],"tracks":[[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0]]},
  ],      
}, 
//*/



{ 
  channelName: '03b gfx',     
  audiolink: 5,
  trackSet: 0,
  conf: [{ 
    type: 'gfx', 
    instrumentName: 'gfx', 
    name: 'gfx 01', 
    kitNumber: 0, 
    color: '#51ACBD',       
    controls: sess10ConductorCtrls
  }] 


}, 




{ sessionName: 'The Chase',
  channelName: 'Ch4 | Bassline',  
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


{ 
  channelName: '04b gfx', // gfx user ch 02    
  audiolink: 7,
  trackSet: 0,
  conf: [{ 
    type: 'gfx', 
    instrumentName: 'gfx', 
    name: 'gfx 01', 
    kitNumber: 0, 
    color: '#51ACBD',       
    controls: sess10ConductorCtrls //session7ConductorControls
  }] 

  //, trackSet: 0, defaultPreset: 0, presets: s9preset, defaultPattern: 0, defaultPatternSeq: 0, 

}, 




/*
{ 
  channelName: '04 (1bar/1) static patterns', conf: window['s10NoPtnEdit_Ch4'], trackSet: 0, defaultPreset: 0, presets: window['s9DefPresetCh1'], defaultPattern: 1, defaultPatternSeq: 0, // fixed
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,0],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},  
    {"name":"5-13 hits","classs":"channel","id":"s10_ch2_bar1_ptn02","notenb":[2,2],"tracks":[[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0]]},
    {"name":"5-15 hits","classs":"channel","id":"s10_ch2_bar1_ptn01","notenb":[2,2],"tracks":[[0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0]]},    
    {"name":"7-15 hits","classs":"channel","id":"s10_ch2_bar1_ptn03","notenb":[2,2],"tracks":[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0]]},
    {"name":"multi claps","classs":"channel","id":"s10_ch3_bar1_ptn01","notenb":[8,8],"tracks":[[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]]}, // hip hop hihats 
  ],      
}, 
*/

/*
{ 
  channelName: '05 (1bar/1) editable patterns', conf: window['s10KitsCh5'], trackSet: 2, defaultPreset: 0, presets: window['s9DefPresetCh4'], defaultPattern: 0, defaultPatternSeq: 0, 
  patterns: [
    {"name":"s10_ch5_bar1","classs":"channel","id":"s10_ch5_bar1", "notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s10_ch5_bar1","classs":"channel","id":"s10_ch5_bar1"}] ]  
}, */


/*

{ 
  channelName: '06 (1bar/1) editable patterns', conf: window['s10KitsCh6'], trackSet: 0, defaultPreset: 0, presets: window['s9DefPresetCh4'], defaultPattern: 0, defaultPatternSeq: 0, 
  patterns: [
    {"name":"s10_ch6_bar1","classs":"channel","id":"s10_ch6_bar1", "notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s10_ch6_bar1","classs":"channel","id":"s10_ch6_bar1"}] ]  
}, 

{ 
  channelName: '07 (1bar/1) editable patterns', conf: window['s10KitsCh7'], trackSet: 2, defaultPreset: 0, presets: window['s9DefPresetCh4'], defaultPattern: 0, defaultPatternSeq: 0, 
  patterns: [
    {"name":"s10_ch7_bar1","classs":"channel","id":"s10_ch7_bar1", "notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s10_ch7_bar1","classs":"channel","id":"s10_ch7_bar1"}] ]  
}, 

*/

/*
{ 
  channelName: '08 (1bar/1) editable patterns', conf: window['s10KitsCh8'], trackSet: 0, defaultPreset: 0, presets: window['s9DefPresetCh4'], defaultPattern: 0, defaultPatternSeq: 0, 
  patterns: [
    {"name":"s10_ch8_bar1","classs":"channel","id":"s10_ch8_bar1", "notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s10_ch8_bar1","classs":"channel","id":"s10_ch8_bar1"}] ]  
}, 

*/


/*
{ 
  channelName: '09 (1bar/2) editable patterns', conf: window['s10KitsCh1'], trackSet: 0, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s10_ch9_bar1","classs":"channel","id":"s10_ch9_bar1", "notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s10_ch9_bar1","classs":"channel","id":"s10_ch9_bar1"}, {"name":"reset","classs":"channel","id":"silence01"}, ] ]  
}, 

*/

{ 
  channelName: '10 (1bar/2) editable patterns', conf: window['s10KitsCh2'], trackSet: 0, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s10_ch10_bar1","classs":"channel","id":"s10_ch10_bar1", "notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"s10_ch10_bar1","classs":"channel","id":"s10_ch10_bar1"}, {"name":"reset","classs":"channel","id":"silence01"}, ] ]  
}, 



{ 
  channelName: '11 (1bar/2) editable patterns', conf: window['s10KitsCh3'], trackSet: 0, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s10_ch11_bar1","classs":"channel","id":"s10_ch11_bar1", "notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"s10_ch11_bar1","classs":"channel","id":"s10_ch11_bar1"},  ] ]  
}, 

{ 
  channelName: '12 (1bar/2) editable patterns', conf: window['s10KitsCh4'], trackSet: 0, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,2],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s10_ch12_bar1","classs":"channel","id":"s10_ch12_bar1", "notenb":[0,2], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"s10_ch12_bar1","classs":"channel","id":"s10_ch12_bar1"},  ] ]  
}, 






{ 
  channelName: '13 (1bar/4) editable patterns', conf: window['s10KitsCh5'], trackSet: 0, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,4],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s10_ch13_bar1","classs":"channel","id":"s10_ch13_bar1", "notenb":[0,4], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"s10_ch13_bar1","classs":"channel","id":"s10_ch13_bar1"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, ] ]  
}, 


{ 
  channelName: '14 (1bar/4) editable patterns', conf: window['s10KitsCh6'], trackSet: 0, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,4],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s10_ch14_bar1","classs":"channel","id":"s10_ch14_bar1", "notenb":[0,4], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"s10_ch14_bar1","classs":"channel","id":"s10_ch14_bar1"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, ] ]  
}, 

{ 
  channelName: '15 (1bar/4) editable patterns', conf: window['s10KitsCh6'], trackSet: 0, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,4],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s10_ch15_bar1","classs":"channel","id":"s10_ch15_bar1", "notenb":[0,4], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s10_ch15_bar1","classs":"channel","id":"s10_ch15_bar1"},] ]  
}, 

{ 
  channelName: '16 (1bar/4) editable patterns', conf: window['s10KitsCh6'], trackSet: 0, defaultPreset: 0, presets: s9preset, defaultPattern: 1, defaultPatternSeq: 0, 
  patterns: [
    {"name":"silence","classs":"channel","id":"silence01","notenb":[0,4],"tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},
    {"name":"s10_ch16_bar1","classs":"channel","id":"s10_ch16_bar1", "notenb":[0,4], "tracks":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},    
  ],    
  patternSeq: [ [{"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"reset","classs":"channel","id":"silence01"}, {"name":"s10_ch16_bar1","classs":"channel","id":"s10_ch16_bar1"},] ]  
}, 


];















