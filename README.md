Works with <a href="https://nodejs.org/download/release/v0.10.25/">Node.js v0.10.25</a>

Added features (from <a href="https://github.com/72lions/StepDaddy">Step Daddy team (from Music Hack Day Stockholm 2013)'s version</a>):
- ability to change kit (drum/sample kits, synth presets) within user channel, live
- instrument controllers (knobs/parameters) to modify instrument kit timbre, live
- persistent channel notes (users are forced to switch/share patterns at 'channel change event' during session) 
- multi instances of same synth (1 instance per channel)
- tempo (bpm) change, channel change (users are forced to switch channels) & channel volumes controlled by conductor role
- merged conductor role with sounding instrument roles







Who's your step daddy!!??
=====

Multi user collaborative step sequencer. Several users can connect with their mobile devices or desktops and play a step sequencer together hosted on one of the devices connected.
One device will be able to act as the main controller for all sound controlling filter and pitch.

###<a href="http://experiments.72lions.com/StepDaddy/clients/sequencer/">Demo</a>

### Requirements
* Google Chrome 24+
* NodeJS for running the server.
* Python for running a simple server for the clients.

Also since that project was part of the Music Hack Day in Stockholm we only tested everything in MacOSX.


### Setup

1. Install dependencies by running **make** from the root folder.
2. Run server by going into the server folder and running **./run.sh**
3. Run clients by going into the clients folder and running **./run.sh**

### How to use it

1. Open namespaces.js and replace the IP in **windows.SERVER** with the IP of your NodeJS server.
2. In the same file replace the URL in **windows.CLIENT** with the IP of the server that hosts your clients folder.
3. Open your browser and go to **http://[yourip]/clients/sequencer**.
4. Follow the instructions on that page and then open another browser (mobile, tablet, browser) and open the links that you see on the sequencer page.
