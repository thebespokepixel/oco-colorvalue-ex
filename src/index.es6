/*
 * An Open Color Converter for Sip, JSON and ASE palettes
 * ──────────────────────────────────────────────────────────────
 * ©2016 Mark Griffiths @ The Bespoke Pixel (MIT licensed)
 */

import oco from 'opencolor'
import tinycolor from 'tinycolor2'
import convert from 'color-convert'
import chroma from 'chroma'
import {pad} from '@thebespokepixel/string'
import _ from'./lodash-es'

class OCOValueEX extends tinycolor {
	constructor(color_, name_, options_) {
		super(color_, options_)
		this._name = name_
	}

	get alphaActive() {
		return this._a < 1 && this._a >= 0
	}

	toSublimeUI() {
		const alphaSuffix = this.alphaActive ? `, ${Math.round(this._a * 255)}` : ''

		return `[${
			Math.round(this._r)
		}, ${
			Math.round(this._g)
		}, ${
			Math.round(this._b)
		}${alphaSuffix}]`
	}

	rgbaToHexRGBA(allowRGBA) {
		const hexAA = this.alphaActive ? pad(Math.round(this._a * 255).toString(16), 2, '0').toUpperCase() : ''
		const hexA = this.alphaActive && allowRGBA && hexAA[0] === hexAA[1] ? hexAA[0] : hexAA

		const hexRGB = this.toHex(allowRGBA && hexA.length === 1).toUpperCase()
		return `#${hexRGB}${hexA}`
	}

	toString(format) {
		format = format || this._format
		let output
		switch (format) {
			case 'sublRGBA':
				output = this.toSublimeUI()
				break

			case 'hexRGBA':
				output = this.rgbaToHexRGBA(true)
				break

			default:
				output = super.toString(format)
		}
		return output
	}

	static fromJSON(raw_) {
		return new OCOValueEX(
			tinycolor.fromRatio({
				r: raw_.red,
				g: raw_.green,
				b: raw_.blue,
				a: raw_.alpha
			}), raw_.name
		)
	}

	static isJSON(is_) {
		return {
			palette: {
				name: (typeof is_.name === 'string') && is_.name,
				colors: (Array.isArray(is_.colors)) && is_.colors
			},
			rgba: {
				name: typeof is_.name === 'string' && is_.name,
				red: (is_.red >= 0.0 && is_.red <= 1.0) && is_.red,
				green: (is_.green >= 0.0 && is_.green <= 1.0) && is_.green,
				blue: (is_.blue >= 0.0 && is_.blue <= 1.0) && is_.blue,
				alpha: (is_.alpha >= 0.0 && is_.alpha <= 1.0) && is_.alpha
			}
		}
	}

	static generatePalette(name_, colorArray_) {
		return new oco.Entry(
			name_,
			colorArray_.map(color_ => new oco.Entry(
				color_._name,
				[new oco.ColorValue('original', color_.toRgbString(), color_)],
				'Color',
				-1
			))
		)
	}
}

export default OCOValueEX
