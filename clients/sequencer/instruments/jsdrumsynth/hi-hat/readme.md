##Usage

`npm install --save hi-hat`

```javascript
var HiHat = require('hi-hat');

// Initialize AudioContext
var context = new AudioContext();

// Initialize instrument
var hat = HiHat(context);

// Create hat audio node (one time use only)
var closedHatNode = hat(); // Closed hat
var openHatNode = hat(true); // Open hat

// Connect to target node
closedHatNode.connect(context.destination);

// Start
closedHatNode.start(context.currentTime);
```
