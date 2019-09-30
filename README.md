# canvas-hms
A super lightweight library for setting the highlights, midtones and shadows for images drawn on HTML5 Canvas.

## Install
```
npm install canvas-hms
```

## Import
#### ES6/Babel
```javascript
import {setHighlights, setMidtones, setShadows} from "canvas-hms";
```

#### ES5
```javascript
const {setHighlights, setMidtones, setShadows} = require("canvas-hms");
```

## Usage
```javascript
// Get context
context.drawImage(myImage, 0, 0, canvas.width, canvas.height);

setHighlights(context, 30);
setMidtones(context, 20);
setShadows(context, -15);
```

#### Before
<img alt="Before filter" src="./assets/before.png"/>

#### After
<img alt="After filter" src="./assets/after.png"/>
