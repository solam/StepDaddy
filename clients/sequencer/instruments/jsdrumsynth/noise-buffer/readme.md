## NoiseBuffer

Generate `AudioBuffer`s of noise.

Code taken from [NoiseHack.com](http://noisehack.com/generate-noise-web-audio-api/)

## Usage

`npm install --save noise-buffer`

```javascript
var NoiseBuffer = require('noise-buffer');

var noise = NoiseBuffer(1); // One second of white noise
var noise = NoiseBuffer(1, 'pink'); // One second of pink noise
var noise = NoiseBuffer(1, 'brown'); // One second of brown noise

noise instanceof AudioBuffer // true
```
