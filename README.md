# canvas-hms
A super lightweight library for setting the highlights, midtones and shadows for images drawn on HTML5 Canvas.

## Install
```
npm install canvas-hms
```

## Import
#### ES6/Babel
```
import {setHighlights, setMidtones, setShadows} from "canvas-hms";
```

#### ES5
```
const {setHighlights, setMidtones, setShadows} = require("canvas-hms");
```

## Usage
```
// Get context
context.drawImage(myImage, 0, 0, canvas.width, canvas.height);

setHighlights(context, 50);
setMidtones(context, -20);
setShadows(context, 15);
```
