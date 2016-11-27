##Usage

`npm install --save-dev rim-shot`

```javascript
var RimShot = require('rim-shot');

// Initialize AudioContext
var context = new AudioContext();

var rimShot = RimShot(context);

// Create audio node (one time use only)
var rimShotNode = rimShot();

// Connect to target node
rimShotNode.connect(context.destination);

// Start
rimShotNode.start(context.currentTime);
```
