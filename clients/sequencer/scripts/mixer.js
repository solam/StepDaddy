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
    };

    var _onRoomClosed = function(data) {
      console.log('The room with id', data.room, 'was closed.');
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

      var client = _clients[data.client];
      if (typeof client !== 'undefined') {
        console.log('A client with id', data.client, 're-joined the room');
      } else {
        console.log('A client with id ', data.client, 'joined the room');
      }

      _clients[data.client] = true;

    };

    var _onClientLeft = function(data) {
      console.log('A client with id', data.client, 'left the room');
      var instrument = _instruments[data.client];
      if (typeof instrument !== 'undefined') {
        //_sequencerView.removeInstrument(instrument);
        _sequencer.addInstrument(instrument); // add abandoned instrument to "available instruments" list
        delete _instruments[data.client];
        _totalInstruments--;

        delete _clients[data.client]; // avoid having too much clients connected (window refreshs creating multiple clients)

        if (_totalInstruments <= 0) {
          $('#roomId').show();
        }
      }
    };

    var _onGetInstrument = function(data) {
    //*  console.log('Got a request for an instrument', data);

      // var instrument = _sequencer.getRandomInstrument(data.client);
      var instrument = _sequencer.getNextInstrument(data.client);

      if (instrument) {
        _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: instrument});
        //console.log('>>> Instrument', instrument, _totalInstruments);
        if (typeof _instruments[data.client] === 'undefined') {
          _totalInstruments++;
          _sequencerView.addInstrument(instrument);
          _instruments[data.client] = instrument;
          $('#roomId').hide();
        }
      } else {
        console.log('No more instruments available.');
      } //*/
    };

    var _onNote = function(data) {
      _sequencerView.updateNote(data.args);
      _sequencer.updateNote(data.args);
      //console.log('_onNote: ', data.args);
    };

    var _onModifierChange = function(data) {
    
      //console.log('_onModifierChange: ', data);
      //* change object before eventuellement switch channel kit
  //_sequencer.updateFxParam(data.args, data.client); // placing this line before if (data.args.id==998) { fixes the prg change from 0 to 1 displays 0 & from 2 to 1 displays 1 bug
      //console.log('_onModifierChange: ', data.client); */     


      // if 'channel change' id
      if (data.args.id==997) {

       console.log('_clients before client kick', _clients);
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

       console.log('_clients after client kick', _clients);
       
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
              _sequencerView.addInstrument(instrument);
              _instruments[claients[i]] = instrument;
              $('#roomId').hide();
            }
          } else {
            console.log('No more instruments available. YOYYOYOO');
          }        

       }

       //console.log('(after channelChange) avail ins', _sequencer._availableInstruments.length);


      // if 'program change' id
      } else if (data.args.id==998) {

        // TODO check for conductor role...
        var instrument = _sequencer.updateInstrument(data.args, data.client);        
        // console.log('instrument.tracks', instrument.tracks); // data

        _conn.execute(mixr.enums.Events.INSTRUMENT, {receiver: data.client, instrument: instrument});
        //console.log('>>> Instrument', instrument);
        _instruments[data.client] = instrument; 

        // remove old channel instrument from _sequencerView      
        _sequencerView.removeInstrument(instrument); 

        _sequencerView.addInstrument(instrument);


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

            _sequencerView.updateNote(dataObj);
          }
        }
      } else {
        _sequencer.updateFxParam(data.args, data.client);        
      } 
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

      _sequencer.on(mixr.enums.Events.SEQUENCER_BEAT, function(beat) {
        _sequencerView.drawPlayhead(beat);
        _conn.execute(mixr.enums.Events.SEQUENCER_BEAT, {beat: beat});
      });
    };

  };

  new mixr.Mixer().initialize();

}());


