make-distortion-curve
----------------

[![NPM](https://nodei.co/npm/make-distortion-curve.png)](https://nodei.co/npm/make-distortion-curve/)

cuz im tired of copy pasting the only distortion curve i have ever known.

### install

`npm install make-distortion-curve`

### use it

```
var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
var distortion = audioCtx.createWaveShaper()

var makeDistortionCurve = require('make-distortion-curve')
distortion.curve = makeDistortionCurve(400)
```

code hoisted from [http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion](here) and [https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createWaveShaper](there)

