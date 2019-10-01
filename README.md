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

// Values inbetween -50 and +50
hms.setHighlights(20);
hms.setMidtones(10);
hms.setShadows(-15);
hms.setTemperature(10);
```

#### Before
<img alt="Before filter" src="./assets/before.png"/>

#### After
<img alt="After filter" src="./assets/after.png"/>