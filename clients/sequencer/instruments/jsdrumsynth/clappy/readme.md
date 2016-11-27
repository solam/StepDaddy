##Usage

`npm install --save clappy`

```javascript
var Clappy = require('clappy');

// Initialize AudioContext
var context = new AudioContext();

// Initialize clap instrument
var clap = Clappy(context);

// Create clap audio node (one time use only)
var clapNode = clap();

// Connect to target node
clapNode.connect(context.destination);

// Start
clapNode.start(context.currentTime);
```
