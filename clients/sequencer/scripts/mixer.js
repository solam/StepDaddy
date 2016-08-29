(function() {

  mixr.Mixer = function() {

    var DICTIONARY = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
    //var DICTIONARY = 'abc123'.split('');

    var _room_id = 'Mixr_room_1';
    var _conn;
    var _clients = {};
    var _instruments = {};
    var _totalInstruments = 0;
    var _sequencer;
    var _sequencerView;
    var _clientJoinedCount = 0;
    //var _channelUsedCount = 0;
    var _self = this;

    var _encode = function(i) {
      if (i == 0) {
        return DICTIONARY[0];
      }
      var result = '';
      var base = DICTIONARY.length;

      while (i > 0) {
        result += DICTIONARY[(i % base)];
        i = Math.floor(i / base);
      }

      //return result.split('').reverse().join('');
      return 'rm'; // force creating only room 'rm'
    }

    var _onRoomCreated = function(data) {
      console.log('The room was created:', data.room);
      $("#audio-server-ready").html('1');    

      //var numAvailableInstruments = _sequencer._availableInstruments.length;
      //$("#audio-server-available-slots").html(numAvailableInstruments);    
      //console.log('numAvailableInstruments', numAvailableInstruments);  

    };

    var _onRoomClosed = function(data) {
      console.log('The room with id', data.room, 'was closed.');
      $("#audio-server-ready").html('0');
      _clients = {};
    };

    var _onRoomCreateError = function(error) {
      console.log('The room was not created');
    };

    var _onDisconnect = function() {
      _conn.disconnect();
      _clients = {};
    };

    var _onClientJoined = function(data) {

      //console.log('sysptns at client join room:', _sequencer._systemPatterns); 
      console.log('mixer.js _onClientJoined:', data); 

      var client = _clients[data.client];
      if (typeof client !== 'undefined') {
        console.log('A client with id', data.client, 're-joined the room');
      } else {
        console.log('A client with id ', data.client, 'joined the room');
      }

      //var numAvailableInstruments = Object.keys(_clients).length;     //_sequencer._availableInstruments.length -1; 
      //console.log('in: win avail slots',window._availableInstruments.length);
      //$("#audio-server-available-slots").html(_totalInstruments); //_channelUsedCount      

      

      if (_clientJoinedCount==0) {
        var startDate = new Date();
        var firstJoinTime = startDate.getTime();
        _sequencer.updateSeqVariables('_audioServerStartTimestamp', firstJoinTime);        
//_sequencer.createInstruments(); // Update general instruments' object
// create updateInstruments seq class method
          // just refresh channel data : do not re-init "audio rendering" of instrument - do not reset notes' data
        console.log('first client joined', firstJoinTime);
      }      
      console.log('_clientJoinedCount', _clientJoinedCount);
      _clientJoinedCount++;
      //_channelUsedCount++;

      if (typeof data.pwd !== 'undefined') {
        _clients[data.client] = data.pwd;
      } else {  
      _clients[data.client] = true;
      }
      console.log('_clients', _clients);
      //_updateChannels();

    };

    var _onClientLeft = function(data) {
      console.log('A client with id', data.client, 'left the room');
      var instrument = _instruments[data.client];
      if (typeof instrument !== 'undefined') {
        //_sequencerView.removeInstrument(instrument);
        _sequencer.addInstrument(instrument); // add abandoned instrument to "available instruments" list
        delete _instruments[data.client];
        _totalInstruments--;
        //_clientJoinedCount--; commenting this line prevents initial channel countdown to reset as "clients all leave audio server then 1 client re-joins again"
        

        delete _clients[data.client]; // avoid having too much clients connected (window refreshs creating multiple clients)

      
              

        if (_totalInstruments <= 0) {
          $('#roomId').show();
        }
      }
      //_channelUsedCount--;
      //var numAvailableInstruments = Object.keys(_clients).length;     // _sequencer._availableInstruments.length;   - _instruments
      $("#audio-server-available-slots").html(window.availSlots - Object.keys(_instruments).length); //  _channelUsedCount
      //console.log('out: win avail slots',window._availableInstruments.length);
      //console.log('avSlots', window.availSlots);
      //_updateChannels();

    };

    var _onGetInstrument = function(data) {
      var pwd = _clients[data.client];
      console.log('Got a request for an instrument', data);

      /* var numAvailableInstruments = _sequencer._availableInstruments.length; // - _channelUsedCount;
      console.log('seq avail ins length', _sequencer._availableInstruments.length);
      $("#audio-server-available-slots").html(numAvailableInstruments); */

      // var instrument = _sequencer.getRandomInstrument(data.client);
      var instrument = _sequencer.getNextInstrument(data.client, pwd);
    
      //var instrument.channelInfo = 'test !!!!';
      //console.log("_onGetInstrument (mixer.js): ", instrument);

      if (instrument) {
        _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: instrument});

/*var startDate = new Date();
var startTimestamp = startDate.getTime();
console.log('mixer sending time:', startTimestamp);*/



        //console.log('>>> Instrument', instrument, _totalInstruments);
        if (typeof _instruments[data.client] === 'undefined') {
          _totalInstruments++;
//_sequencerView.addInstrument(instrument) // remove audio stuttering
          _instruments[data.client] = instrument;
          $('#roomId').hide();

          $("#audio-server-available-slots").html(window.availSlots - Object.keys(_instruments).length);

        }
      } else {
        console.log('No more instruments available.');
        _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: 'waitroom'});


      } //*/

      //_updateChannels();

    };

    var _onNote = function(data) {
//_sequencerView.updateNote(data.args); // remove audio stuttering
      _sequencer.updateNote(data.args);
      console.log('_onNote: ', data);
    };


    
    var _updateChannels = function() {
      //console.log('update channels');
       var claients = Object.keys(_clients); 

         for (var i = 0; i < claients.length; i++) {

          if (i!=1) { // do not process conductor role (1) which has no track data associated to it ! Beware hardcoded value!
          //console.log('upd ch - claients'+i, claients[i]);
            //var oldInstrument = _instruments[claients[i]];
            //_sequencer.addInstrument(oldInstrument); // add abandoned instrument to "availabe instruments" list
            //delete _instruments[claients[i]];

            var instrument = _sequencer.updateChannelInfo(claients[i], i);    

            if (instrument) {
              _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: claients[i], instrument: instrument});

              /*if (typeof _instruments[claients[i]] === 'undefined') {
                _totalInstruments++;
                _sequencerView.addInstrument(instrument);
                _instruments[claients[i]] = instrument;
                $('#roomId').hide();
              } */
            } else {
              //console.log('_updateChannels : no more instruments available.');
            }        

        }      
      }
    };  


    var _onModifierChange = function(data) {
    
      //console.log('_onModifierChange: ', data);
      //* change object before eventuellement switch channel kit
  //_sequencer.updateFxParam(data.args, data.client); // placing this line before if (data.args.id==998) { fixes the prg change from 0 to 1 displays 0 & from 2 to 1 displays 1 bug
      //console.log('_onModifierChange: ', data.client); */     


      //console.log('data.args: ', data.args);

      // if 'channel change' id from conductor role
      if (data.args.id==997) {

       //console.log('_clients before client kick', _clients);
       //_totalInstruments 

       
       //console.log('claients + avail ins', claients, _sequencer._availableInstruments); // [_availableInstruments]
       //

       var claients = Object.keys(_clients);

       if (_sequencer._availableInstruments.length==0) {
         console.log('no channel available', _sequencer._availableInstruments.length);     
         _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: claients[0], instrument: 'kickOut' }); //       
         _sequencer.addInstrument(_instruments[claients[0]]); // _clients[claients[0]]
         delete _instruments[claients[0]];
         _totalInstruments--;
         delete _clients[claients[0]];   


        /*_sequencer.addInstrument(instrument); 
        delete _instruments[data.client];
        _totalInstruments--;
        delete _clients[data.client];*/


       }

       //console.log('_clients after client kick', _clients);
       
       var claients = Object.keys(_clients); 

       for (var i = 0; i < claients.length; i++) {

        //console.log('claients'+i, claients[i]);
          var oldInstrument = _instruments[claients[i]];
          _sequencer.addInstrument(oldInstrument); // add abandoned instrument to "availabe instruments" list
          delete _instruments[claients[i]];
          //_totalInstruments--;
          //delete _clients[claients[i]];

          //var instrument = _sequencer.getNextInstrument(claients[i]);
          var instrument = _sequencer.changeChannel(claients[i]);          
          //var instrument = _sequencer.getRandomInstrument(claients[i]);
          


          if (instrument) {
            _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: claients[i], instrument: instrument});
            //console.log(claients[i], instrument);

            //console.log('>>> Instrument', instrument, _totalInstruments);
            if (typeof _instruments[claients[i]] === 'undefined') {
              _totalInstruments++;
//_sequencerView.addInstrument(instrument); // remove audio stuttering
              _instruments[claients[i]] = instrument;
              $('#roomId').hide();
            }
          } else {
            console.log('No more instruments available. YOYYOYOO');
          }        

       }

       //console.log('(after channelChange) avail ins', _sequencer._availableInstruments.length);


      // if 'program/preset/kit change' id from any instrument channel
      } else if (data.args.id==998) {

        //console.log(data);

        // TODO check for conductor role...
        var instrument = _sequencer.updateInstrument(data.args, data.client);        
        // console.log('instrument.tracks', instrument.tracks); // data

        _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: instrument});
        //console.log('>>> Instrument', instrument);
        _instruments[data.client] = instrument; 


//*
        // remove old channel instrument from _sequencerView      
//_sequencerView.removeInstrument(instrument); // remove audio stuttering

//_sequencerView.addInstrument(instrument); // remove audio stuttering


        // import notes from old instr to new one (so theyr are displayed on seq view)  
        for (var i = 0; i < instrument.tracks.length; i++) {          
          //console.log('instrument.tracks[i]', instrument.tracks[i]);

          for (var j = 0; j < instrument.tracks[i].notes.length; j++) {
            //var note = instrument.tracks[i].notes[j];  
            //if (instrument.tracks[i].notes[j] > 0) 
            
            var dataObj = { 
            'id': instrument.id, // channel id
            'trackId': instrument.tracks[i].id, 
            'noteId': j , // step number 0-15 - instrument.tracks[i].note
            'volume': instrument.tracks[i].notes[j]};  
            //console.log('dataObj', dataObj); 

//_sequencerView.updateNote(dataObj); // remove audio stuttering
          }
        }
//*/









    // change preset
    } else if (data.args.id==992) {

        var instrument = _sequencer.updatePreset(data.args, data.client);        
        _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: instrument});
        _instruments[data.client] = instrument; 

        /*// import notes from old instr to new one (so theyr are displayed on seq view)  
        for (var i = 0; i < instrument.tracks.length; i++) {          
          for (var j = 0; j < instrument.tracks[i].notes.length; j++) {            
            var dataObj = { 
            'id': instrument.id, // channel id
            'trackId': instrument.tracks[i].id, 
            'noteId': j , // step number 0-15 - instrument.tracks[i].note
            'volume': instrument.tracks[i].notes[j]};  
          }
        }*/

      } else if (data.args.id==996) {
        _sequencer.changeSession(data.args, data.client);
/*
      // target channel start bar offset info  
      } else if (data.args.id>=700 && data.args.id<799) {      

        var claients = Object.keys(_clients);
        var claientId = data.args.id.toString()[2]; // get last digit aka 0 from 700 : beware that won't work if there's more than 11 channels (id 10 vs 0)
        //console.log('clt id', claientId);
        //console.log('_clients before', _clients);
        var instrument = _sequencer.updateInstrument(data.args, claients[claientId]);
        console.log('instrument', instrument);
        _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: claients[claientId], instrument: instrument });  // are we required to send new instrument object, not just 3 params to update?   
*/

      } else if (data.args.id==995) {
        //console.log('995 save ptn data', data);
        _sequencer.addPattern(data, data.client);
        //_conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: _instruments[data.client]});


        if (typeof data.args.triggerMode !== 'undefined') {
          if (data.args.triggerMode == 'manual') {

          data.args.x = data.args.kitNumber;
          var instrument = _sequencer.updateInstrument(data.args, data.client);        
          _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: instrument});
          _instruments[data.client] = instrument; 
          }
        }

        //console.log('ins data clt: ', _instruments[data.client]);




      } else if (data.args.id==991) {
        //console.log('995 save ptn data', data);
        _sequencer.addPreset(data, data.client);

        if (typeof data.args.triggerMode !== 'undefined') {
          if (data.args.triggerMode == 'manual') {

          data.args.x = data.args.kitNumber;
          var instrument = _sequencer.updateInstrument(data.args, data.client);        
          _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: instrument});
          _instruments[data.client] = instrument; 
          }
        } 



      } else if (data.args.id==994) {

      //console.log('data 994:', data);   

      //_sequencerView.updateNotes(data); // .args
      var notes = _sequencer.updateNotes(data);   

      /*
      for (var a = 0; a < notes.length; a += 1) {
        setTimeout(function () {
          _sequencerView.updateNote(notes[a]);
          console.log(notes[a]);  
        }, 100);
      } */  

      //console.log(notes);


      } else if (data.args.id==993) { // update channel infos
        //console.log('data 993: channel sound', data); 
        _sequencer.updateChannelSound(data.client, data.args.x);

      } else if (data.args.id==201) {  
          console.log('data', data);
        _sequencer.directInfoChange(data);
      } else {
        //console.log('non regular event id popped');

        _sequencer.updateFxParam(data.args, data.client);   

        if (data.args.id==699 || data.args.id==999 /*|| data.args.id==993*/) { // 993: update channel sound On/Off | 699: General Bar kickout time | 999: bpm - if data of type general (non instrument specific command)
          _updateChannels();
        } else if (data.args.id>0 && data.args.id<=200) { // >=0
          _sequencer.directInfoChange(data);
        }


      } 

      // take care of channel start bar offset data : force channel to update its default instrument along with new channel data (à la bpm, etc)
      /*if (data.args.id>=700 && data.args.id<799) {  // this is buggy !!! causes errors on this.updateInstrument = function(data, clientId) { 

        var claients = Object.keys(_clients);
        var claientId = data.args.id.toString()[2]; // get last digit aka 0 from 700 : beware that won't work if there's more than 11 channels (id 10 vs 0)
        //console.log('clt id', claientId);
        //console.log('_clients before', _clients);
        var instrument = _sequencer.updateInstrument(data.args, claients[claientId]);
        console.log('instrument', instrument);
        _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: claients[claientId], instrument: instrument });  // are we required to send new instrument object, not just 3 params to update?   

      } */




      /*
      _sequencer.updateFxParam(data.args, data.client);
      //console.log('_onModifierChange: ', data.client); */  

    };
    /*
    var _shortenUrl = function(url, callback) {
      var params = '{"longUrl": "' + url + '"}';
      var http = new XMLHttpRequest();
      http.open('POST', 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyD5cO_Rr60v9dff3UrocHx5YHIkVtaW3ps', true);

      //Send the proper header information along with the request
      http.setRequestHeader('Content-type', 'application/json');

      http.onreadystatechange = function() {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
          callback(JSON.parse(http.responseText).id);
        }
      }
      http.send(params);
    }; */

    this.initialize = function() {

      _room_id = _encode(new Date().getTime());

      //_room_id = 'rm';

      $('#roomId').find('span').html(_room_id);
      /*
      var h2 = $('#roomId').find('h2');

      _shortenUrl(window.CLIENTS + '/device/?' + _room_id, function(url) {
        $(h2).eq(0).append('<a target="_blank" href="' + url + '">' + url + '</a>');
      });


      _shortenUrl(window.CLIENTS + '/fx/?' + _room_id, function(url) {
        $(h2).eq(1).append('<a target="_blank" href="' + url + '">' + url + '</a>');
      }); */


      _conn = new mixr.net.Connection();
      _conn.connect(window.SERVER)
      .on(mixr.enums.Events.REGISTER, function() {
            _conn.createRoom(_room_id, _onRoomCreated, _onRoomCreateError);
          })
      .on(mixr.enums.Events.CLIENT_JOINED, _onClientJoined)
      .on(mixr.enums.Events.ROOM_CLOSED, _onRoomClosed)
      .on(mixr.enums.Events.CLIENT_LEFT, _onClientLeft)
      .on(mixr.enums.Events.GET_INSTRUMENT, _onGetInstrument)
      .on(mixr.enums.Events.NOTE, _onNote)
      .on(mixr.enums.Events.MODIFIER_CHANGE, _onModifierChange);

      _sequencer = new mixr.Sequencer();
      window['SEQ'] = _sequencer;

      _sequencerView = new mixr.views.SequencerView(document.getElementById('sequencer-view')).initialize();
      //window['SEQVIEW'] = _sequencerView;

      window.barcount=0;

      _sequencer.on(mixr.enums.Events.SEQUENCER_BEAT, function(beat) {

        
        // bar count rounds from bar1 to bar8
        if (window.barcount==8 && beat==0) {
          window.barcount=0;
        }

        if (beat==0) {
          window.barcount++;
        }

        //console.log('beat', beat, window.barcount);

//_sequencerView.drawPlayhead(beat); // remove audio stuttering
        _conn.execute(mixr.enums.Events.SEQUENCER_BEAT, {beat: beat, bar: window.barcount}); // lighten data transmitted to clients
      });
    };

  };

  new mixr.Mixer().initialize();

}());


