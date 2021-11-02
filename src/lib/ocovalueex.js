/* ───────────╮
 │ Open Color │ ColorValue Extensions: Conversion and Color Format Utilities
 ╰────────────┴──────────────────────────────────────────────────────────────── */
// ©2016 Mark Griffiths @ The Bespoke Pixel (MIT licensed)
/* eslint import/no-unassigned-import:0 */

import oco from 'opencolor'
import {TinyColor} from '@thebespokepixel/es-tinycolor'
import './cmyk.js'
import './lab.js'

export class OCOValueEX extends TinyColor {
	constructor(color_, name_, options_) {
		super(color_, options_)
		this._name = name_
	}

	get alphaActive() {
		return this._a < 1 && this._a >= 0
	}

	get name() {
		return this._name
	}

	toArrayIntRGBA() {
		const alphaSuffix = this.alphaActive ? `, ${Math.round(this._a * 255)}` : ''
		return `[${
			Math.round(this._r)
		}, ${
			Math.round(this._g)
		}, ${
			Math.round(this._b)
		}${alphaSuffix}]`
	}

	toArrayRGBA() {
		const alphaSuffix = this.alphaActive ? `, ${this._a}` : ''
		return `[${
			this._r / 255
		}, ${
			this._g / 255
		}, ${
			this._b / 255
		}${alphaSuffix}]`
	}

	toString(format) {
		format = format || this._format
		let output
		switch (format) {
			case 'toArrayIntRGBA':
				output = this.toArrayIntRGBA()
				break

			case 'toArrayRGBA':
				output = this.toArrayRGBA()
				break

			default:
				output = super.toString(format)
		}

		return output
	}

	static generateOCO(name_, colorArray_) {
		return new oco.Entry(
			name_,
			colorArray_.map(color_ => new oco.Entry(
				color_._name,
				[new oco.ColorValue('original', color_.toRgbString(), color_)],
				'Color',
				-1,
			)),
		)
	}
}
