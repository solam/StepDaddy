##Usage

`npm install --save kick-nine`

```javascript
var Kick9 = require('kick-nine');

// Initialize AudioContext
var context = new AudioContext();

// Initialize kick instrument
var kick = Kick9(context);

// Create kick audio node (one time use only)
var kickNode = kick();

// Connect to target node
kickNode.connect(context.destination);

// Start
kickNode.start(context.currentTime);
```
