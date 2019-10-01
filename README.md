# canvas-hms
A super lightweight library for setting the highlights, midtones and shadows for images drawn on HTML5 Canvas.

## Install
```
npm install canvas-hms
```

## Import
#### ES6/Babel
```javascript
import HMS from "canvas-hms";
```

#### ES5
```javascript
const HMS = require("canvas-hms");
```

## Usage
```javascript
// Do some canvas magic...
context.drawImage(myImage, 0, 0, canvas.width, canvas.height);

const options = {curveWidth: 765 / 3};
const hms = new HMS({canvas: myCanvasElement, options});

HMS.setHighlights(30);
HMS.setMidtones(15);
HMS.setShadows(-15);
```

#### Before
<img alt="Before filter" src="./assets/before.png"/>

#### After
<img alt="After filter" src="./assets/after.png"/>

## How it works
The equation used is a cheap approximation of a tone curve.

#### Tone curve example
<img alt="Tone curve" src="./assets/tone-curve.jpg"/>

#### Approximation
<img alt="Approximation" src="./assets/approximation.png"/>