var fspaAudioWorkletPolySynth = function(synthInstanceString) {


    //fspaAudioWorkletPolySynth.prototype.init = async function init(first) {
    this.init = async function init(first) {
    //this.init = async function() {    

        //console.log(synthInstanceString, window[synthInstanceString]);

        this.context = window['audio_context_origin']; // window['audio_context_origin'];

//console.log(this.context.audioWorklet);        

    //if ( typeof this.context.audioWorklet !== 'undefined' ) {    


        //var cnter = localStorage.getItem('awpscounter');
        

        var nbr = synthInstanceString.replace('channel_','');

        //console.log(nbr);

        var nbr2='';

        //if (cnter != 1) {
            // this should happen only once probably
            this.module = await this.context.audioWorklet.addModule('/sequencer/instruments/fspaAudioWorkletPolySynth/worklet'+nbr+'.js'); // local version
            // un comment fol. line for online version
            //this.module = await this.context.audioWorklet.addModule('https://loops.solam.co/editor/sequencer/instruments/fspaAudioWorkletPolySynth/worklet'+nbr+'.js');
            //localStorage.setItem('awpscounter', 1);            
        //}

        
        this.processor = await new AudioWorkletNode(this.context, 'processor'+nbr, { outputChannelCount: [2] });
        //this.processor.onprocessorerror = e => { console.log(e); /*info.textContent = "error";*/ }

        this.processor.connect(window['audio_context']); // this.context.destination

        //window[synthInstanceString]
        this.pcKeyHandler = await new AudioWorkletNode(this.context, 'pcKeyHandler'+nbr);

        //var noteVal = Math.floor(Math.random() * (30 - 1 + 1) + 1);

        //array = ['z','x','c','v','b','n','m',',','.','a','s','d','f','g','h','j','k','l','q','w','e','r','t','y','u','i','o','p','1','2','3','4','5','6','7','8','9','0'];

        /*array = ['z','x','c','v','b','n','m',',','2','3','4','5','6','7','8','9','0'];

        const noteVal = array[Math.floor(Math.random() * array.length)];

        this.pcKeyHandler.port.postMessage({ id: "keydown", value: noteVal }); */


    //}    


    } 

    this.init();

    //this.init = new init();


}