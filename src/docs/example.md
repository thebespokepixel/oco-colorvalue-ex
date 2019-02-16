#### Open Color's ColorValue object - Extended

Enables a much wider range of color spaces, conversion, and esoteric customisation in the server, build tool or preprocessor. Supports:

- Handling a wider range or color notations, such as those found in JSON and native Objects and Arrays.
- Uses my port of Tinycolor, es-tinycolor for tighter control of minimisation and tree-shaking.
- Add supports for L*ab, CMYK, RGBA Bytes
- Generate aesthetic palettes, or describe dynamic scaling along curves from oco files with Chroma support.


```js
import {OCOValueEX, fromPrecise, fromBytes} from '@thebespokepixel/oco-colorvalue-ex'
import {render} from 'opencolor'

const r = new OCOValueEX('red', 'Test Red')
const g = new OCOValueEX('green', 'Test Green')
const b = new OCOValueEX('blue', 'Test Blue')

const ocoDocument = render(OCOValueEX.generateOCO('root', [r, g, b]))

/*
  Test Red: rgb(255, 0, 0)
  Test Green: rgb(0, 128, 0)
  Test Blue: rgb(0, 0, 255)\n
 */
````
