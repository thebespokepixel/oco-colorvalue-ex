import oco from 'opencolor';
import { TinyColor } from '@thebespokepixel/es-tinycolor';
import chroma from 'chroma-js';
import convert from 'color-convert';

const api$1 = TinyColor.registerFormat('cmyk');
function isValidCMYK(input, min, max) {
	const test = {
		cyan: (input.cyan >= min && input.cyan <= max),
		magenta: (input.magenta >= min && input.magenta <= max),
		yellow: (input.yellow >= min && input.yellow <= max),
		black: (input.black >= min && input.black <= max),
	};
	return (test.cyan && test.magenta && test.yellow && test.black)
}
function cmykToRgba(raw) {
	const base = chroma.cmyk(
		raw.cyan,
		raw.magenta,
		raw.yellow,
		raw.black,
	);
	base.alpha(raw.alpha || 1);
	return {
		r: base.get('rgb.r'),
		g: base.get('rgb.g'),
		b: base.get('rgb.b'),
		a: base.alpha(),
	}
}
function rgbaToCmyk(rgba) {
	const [c, m, y, k] = convert.rgb.cmyk.raw(chroma.gl(rgba).rgb());
	const a = rgba.a || 1;
	return {c, m, y, k, a}
}
function cmykToString(cmyka) {
	let {c, m, y, k, a} = cmyka;
	c = Math.round(c);
	m = Math.round(m);
	y = Math.round(y);
	k = Math.round(k);
	return (a === 1)
		? `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`
		: `cmyka(${c}%, ${m}%, ${y}%, ${k}%, ${a})`
}
api$1.shouldHandleInput = input => typeof input === 'object' && isValidCMYK(input, 0, 1);
api$1.toRgb = input => cmykToRgba(input);
api$1.toRaw = rgba => rgbaToCmyk(rgba);
api$1.toString = rgba => cmykToString(rgbaToCmyk(rgba));

const api = TinyColor.registerFormat('lab');
function round(number, precision) {
	const factor = 10 ** precision;
	const temporaryNumber = number * factor;
	const roundedTemporaryNumber = Math.round(temporaryNumber);
	return roundedTemporaryNumber / factor
}
function isValidLab(input) {
	const test = {
		L: (input.L >= 0 && input.L <= 100),
		a: (input.a >= -127 && input.a <= 127),
		b: (input.b >= -127 && input.b <= 127),
	};
	return (test.L && test.a && test.b)
}
function labToRgba(raw) {
	const base = chroma.lab(
		raw.L,
		raw.a,
		raw.b,
	);
	base.alpha(raw.alpha || 1);
	return {
		r: base.get('rgb.r'),
		g: base.get('rgb.g'),
		b: base.get('rgb.b'),
		a: base.alpha(),
	}
}
function rgbaToLab(rgba) {
	const [L, a, b] = chroma.gl(rgba).lab();
	const alpha = rgba.a || 1;
	return {L, a, b, alpha}
}
function labToString(laba) {
	let {L, a, b, alpha} = laba;
	L = round(L, 2);
	a = round(a, 2);
	b = round(b, 2);
	return (alpha === 1)
		? `lab(${L}%, ${a}, ${b})`
		: `laba(${L}%, ${a}, ${b}, ${alpha})`
}
api.shouldHandleInput = input => typeof input === 'object' && isValidLab(input);
api.toRgb = input => labToRgba(input);
api.toRaw = rgba => rgbaToLab(rgba);
api.toString = rgba => labToString(rgbaToLab(rgba));

class OCOValueEX extends TinyColor {
	constructor(color_, name_, options_) {
		super(color_, options_);
		this._name = name_;
	}
	get alphaActive() {
		return this._a < 1 && this._a >= 0
	}
	get name() {
		return this._name
	}
	toArrayIntRGBA() {
		const alphaSuffix = this.alphaActive ? `, ${Math.round(this._a * 255)}` : '';
		return `[${
			Math.round(this._r)
		}, ${
			Math.round(this._g)
		}, ${
			Math.round(this._b)
		}${alphaSuffix}]`
	}
	toArrayRGBA() {
		const alphaSuffix = this.alphaActive ? `, ${this._a}` : '';
		return `[${
			this._r / 255
		}, ${
			this._g / 255
		}, ${
			this._b / 255
		}${alphaSuffix}]`
	}
	toString(format) {
		format = format || this._format;
		let output;
		switch (format) {
			case 'toArrayIntRGBA':
				output = this.toArrayIntRGBA();
				break
			case 'toArrayRGBA':
				output = this.toArrayRGBA();
				break
			default:
				output = super.toString(format);
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

function fromPrecise(raw) {
	const base = chroma.gl([
		raw.red,
		raw.green,
		raw.blue,
	]);
	return new OCOValueEX(
		new TinyColor(
			raw.alpha ? base.alpha(raw.alpha).css() : base.css(),
		), raw.name,
	)
}
function fromBytes(raw) {
	return new OCOValueEX(
		new TinyColor(
			chroma.gl([
				raw.red / 255,
				raw.green / 255,
				raw.blue / 255,
				raw.alpha / 255,
			]).css()),
		raw.name,
	)
}

export { OCOValueEX, fromBytes, fromPrecise };
