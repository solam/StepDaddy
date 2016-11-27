
var jsDrumSynth = function(context) {

this.context = context;
this.Kick9 = require('instruments/jsdrumsynth/kick-nine/index');

this.HiHat = require('instruments/jsdrumsynth/hi-hat/index');


this.Clappy = require('instruments/jsdrumsynth/clappy/index');



}


jsDrumSynth.prototype.play = function(note){

        switch (note) {
            case 0:
/*if (typeof this.kickNode == 'undefined') {
  // Create kick audio node (one time use only)
  this.kickNode = this.kick();
} */


//if (this.kickNode !== null) {

  this.kick = this.Kick9(this.context);

  this.kickNode = this.kick();

  // Connect to target node
  this.kickNode.connect(this.context.destination);

  // Start
  this.kickNode.start(this.context.currentTime);
                  //jsDrumSynth.kickNode.start();
                  break;          
//          }    


case 1:

  // Initialize instrument
  this.hat = this.HiHat(this.context);

  // Create hat audio node (one time use only)
  this.closedHatNode = this.hat(); // Closed hat
  this.openHatNode = this.hat(true); // Open hat

  // Connect to target node
  this.closedHatNode.connect(this.context.destination);

  // Start
  this.closedHatNode.start(this.context.currentTime);

break;

case 2:



// Initialize clap instrument
this.clap = this.Clappy(this.context);

// Create clap audio node (one time use only)
this.clapNode = this.clap();

// Connect to target node
this.clapNode.connect(this.context.destination);

// Start
this.clapNode.start(this.context.currentTime);

break;

}

}  


jsDrumSynth.prototype.stop = function(note){

        switch (note) {
            case 0:
                this.kick=null; //.disconnect(this.context.destination);            
                //this.kickNode.stop(this.context.currentTime);
                //jsDrumSynth.kickNode.start();
                break;          
        }    


}  