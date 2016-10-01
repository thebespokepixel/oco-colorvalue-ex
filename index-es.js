import oco from 'opencolor';
import { TinyColor } from '@thebespokepixel/es-tinycolor';
import chroma from 'chroma-js';

function fromPrecise(raw) {
	const base = chroma.gl([raw.red, raw.green, raw.blue]);
	return new OCOValueEX(new TinyColor(raw.alpha ? base.alpha(raw.alpha).css() : base.css()), raw.name);
}

function fromBytes(raw) {
	return new OCOValueEX(new TinyColor(chroma.gl([raw.red / 255.0, raw.green / 255.0, raw.blue / 255.0, raw.alpha / 255.0]).css()), raw.name);
}

function fromCMYK(raw) {
	const base = chroma.cmyk(raw.cyan, raw.magenta, raw.yellow, raw.black);
	return new OCOValueEX(new TinyColor(raw.alpha ? base.alpha(raw.alpha).css() : base.css()), raw.name);
}

function fromLab(raw) {
	const base = chroma.lab(raw.L, raw.a, raw.b);
	return new OCOValueEX(new TinyColor(raw.alpha ? base.alpha(raw.alpha).css() : base.css()), raw.name);
}

class OCOValueEX extends TinyColor {
	constructor(color_, name_, options_) {
		super(color_, options_);
		this._name = name_;
	}

	get alphaActive() {
		return this._a < 1 && this._a >= 0;
	}

	get name() {
		return this._name;
	}

	toArrayIntRGBA() {
		const alphaSuffix = this.alphaActive ? `, ${ Math.round(this._a * 255) }` : '';
		return `[${ Math.round(this._r) }, ${ Math.round(this._g) }, ${ Math.round(this._b) }${ alphaSuffix }]`;
	}

	toArrayRGBA() {
		const alphaSuffix = this.alphaActive ? `, ${ this._a }` : '';
		return `[${ this._r / 255.0 }, ${ this._g / 255.0 }, ${ this._b / 255.0 }${ alphaSuffix }]`;
	}

	toString(format) {
		format = format || this._format;
		let output;
		switch (format) {
			case 'toArrayIntRGBA':
				output = this.toArrayIntRGBA();
				break;

			case 'toArrayRGBA':
				output = this.toArrayRGBA();
				break;

			default:
				output = super.toString(format);
		}
		return output;
	}

	static generateOCO(name_, colorArray_) {
		return new oco.Entry(name_, colorArray_.map(color_ => new oco.Entry(color_._name, [new oco.ColorValue('original', color_.toRgbString(), color_)], 'Color', -1)));
	}
}

export { OCOValueEX, fromPrecise, fromBytes, fromCMYK, fromLab };