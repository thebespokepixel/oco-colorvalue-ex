'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

function _interopDefault(ex) {
	return (ex && (typeof ex === 'object') && 'default' in ex) ? ex.default : ex
}

const oco = _interopDefault(require('opencolor'))
const _thebespokepixel_esTinycolor = require('@thebespokepixel/es-tinycolor')
const chroma = _interopDefault(require('chroma-js'))
const convert = _interopDefault(require('color-convert'))

const asyncGenerator = (function () {
	function AwaitValue(value) {
		this.value = value
	}

	function AsyncGenerator(gen) {
		let front
		let back

		function send(key, arg) {
			return new Promise((resolve, reject) => {
				const request = {
					key,
					arg,
					resolve,
					reject,
					next: null
				}

				if (back) {
					back = back.next = request
				} else {
					front = back = request
					resume(key, arg)
				}
			})
		}

		function resume(key, arg) {
			try {
				const result = gen[key](arg)
				const value = result.value

				if (value instanceof AwaitValue) {
					Promise.resolve(value.value).then(arg => {
						resume('next', arg)
					}, arg => {
						resume('throw', arg)
					})
				} else {
					settle(result.done ? 'return' : 'normal', result.value)
				}
			} catch (err) {
				settle('throw', err)
			}
		}

		function settle(type, value) {
			switch (type) {
				case 'return':
					front.resolve({
						value,
						done: true
					})
					break

				case 'throw':
					front.reject(value)
					break

				default:
					front.resolve({
						value,
						done: false
					})
					break
			}

			front = front.next

			if (front) {
				resume(front.key, front.arg)
			} else {
				back = null
			}
		}

		this._invoke = send

		if (typeof gen.return !== 'function') {
			this.return = undefined
		}
	}

	if (typeof Symbol === 'function' && Symbol.asyncIterator) {
		AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
			return this
		}
	}

	AsyncGenerator.prototype.next = function (arg) {
		return this._invoke('next', arg)
	}

	AsyncGenerator.prototype.throw = function (arg) {
		return this._invoke('throw', arg)
	}

	AsyncGenerator.prototype.return = function (arg) {
		return this._invoke('return', arg)
	}

	return {
		wrap(fn) {
			return function () {
				return new AsyncGenerator(fn.apply(this, arguments))
			}
		},
		await(value) {
			return new AwaitValue(value)
		}
	}
})()

const get = function get(object, property, receiver) {
	if (object === null)		{
		object = Function.prototype
	}
	const desc = Object.getOwnPropertyDescriptor(object, property)

	if (desc === undefined) {
		const parent = Object.getPrototypeOf(object)

		if (parent === null) {
			return undefined
		} else {
			return get(parent, property, receiver)
		}
	} else if ('value' in desc) {
		return desc.value
	} else {
		const getter = desc.get

		if (getter === undefined) {
			return undefined
		}

		return getter.call(receiver)
	}
}

const set = function set(object, property, value, receiver) {
	const desc = Object.getOwnPropertyDescriptor(object, property)

	if (desc === undefined) {
		const parent = Object.getPrototypeOf(object)

		if (parent !== null) {
			set(parent, property, value, receiver)
		}
	} else if ('value' in desc && desc.writable) {
		desc.value = value
	} else {
		const setter = desc.set

		if (setter !== undefined) {
			setter.call(receiver, value)
		}
	}

	return value
}

const slicedToArray = (function () {
	function sliceIterator(arr, i) {
		const _arr = []
		let _n = true
		let _d = false
		let _e

		try {
			for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
				_arr.push(_s.value)

				if (i && _arr.length === i) {
					break
				}
			}
		} catch (err) {
			_d = true
			_e = err
		} finally {
			try {
				if (!_n && _i.return) {
					_i.return()
				}
			} finally {
				if (_d)					{
					throw _e
				}
			}
		}

		return _arr
	}

	return function (arr, i) {
		if (Array.isArray(arr)) {
			return arr
		} else if (Symbol.iterator in Object(arr)) {
			return sliceIterator(arr, i)
		} else {
			throw new TypeError('Invalid attempt to destructure non-iterable instance')
		}
	}
})()

const api = _thebespokepixel_esTinycolor.TinyColor.registerFormat('cmyk')

function isValidCMYK(input, min, max) {
	const test = {
		cyan: input.cyan >= min && input.cyan <= max,
		magenta: input.magenta >= min && input.magenta <= max,
		yellow: input.yellow >= min && input.yellow <= max,
		black: input.black >= min && input.black <= max
	}
	return test.cyan && test.magenta && test.yellow && test.black
}

function cmykToRgba(raw) {
	const base = chroma.cmyk(raw.cyan, raw.magenta, raw.yellow, raw.black)
	base.alpha(raw.alpha || 1)
	return {
		r: base.get('rgb.r'),
		g: base.get('rgb.g'),
		b: base.get('rgb.b'),
		a: base.alpha()
	}
}

function rgbaToCmyk(rgba) {
	const _convert$rgb$cmyk$raw = convert.rgb.cmyk.raw(chroma.gl(rgba).rgb())
	const _convert$rgb$cmyk$raw2 = slicedToArray(_convert$rgb$cmyk$raw, 4)

	const c = _convert$rgb$cmyk$raw2[0]
	const m = _convert$rgb$cmyk$raw2[1]
	const y = _convert$rgb$cmyk$raw2[2]
	const k = _convert$rgb$cmyk$raw2[3]

	const a = rgba.a || 1
	return {
		c,
		m,
		y,
		k,
		a
	}
}

function cmykToString(cmyka) {
	let c = cmyka.c
	let m = cmyka.m
	let y = cmyka.y
	let k = cmyka.k
	const a = cmyka.a

	c = Math.round(c)
	m = Math.round(m)
	y = Math.round(y)
	k = Math.round(k)

	return a === 1 ? `cmyk(${c}%, ${m}%, ${y}%, ${k}%)` : `cmyka(${c}%, ${m}%, ${y}%, ${k}%, ${a})`
}

api.shouldHandleInput = input => typeof input === 'object' && isValidCMYK(input, 0.0, 1.0)
api.toRgb = input => cmykToRgba(input)
api.toRaw = rgba => rgbaToCmyk(rgba)
api.toString = rgba => cmykToString(rgbaToCmyk(rgba))

const api$1 = _thebespokepixel_esTinycolor.TinyColor.registerFormat('lab')

function round(number, precision) {
	const factor = Math.pow(10, precision)
	const tempNumber = number * factor
	const roundedTempNumber = Math.round(tempNumber)
	return roundedTempNumber / factor
}

function isValidLab(input) {
	const test = {
		L: input.L >= 0.0 && input.L <= 100.0,
		a: input.a >= -127.0 && input.a <= 127.0,
		b: input.b >= -127.0 && input.b <= 127.0
	}
	return test.L && test.a && test.b
}

function labToRgba(raw) {
	const base = chroma.lab(raw.L, raw.a, raw.b)
	base.alpha(raw.alpha || 1)
	return {
		r: base.get('rgb.r'),
		g: base.get('rgb.g'),
		b: base.get('rgb.b'),
		a: base.alpha()
	}
}

function rgbaToLab(rgba) {
	const _chroma$gl$lab = chroma.gl(rgba).lab()
	const _chroma$gl$lab2 = slicedToArray(_chroma$gl$lab, 3)

	const L = _chroma$gl$lab2[0]
	const a = _chroma$gl$lab2[1]
	const b = _chroma$gl$lab2[2]

	const alpha = rgba.a || 1
	return {
		L,
		a,
		b,
		alpha
	}
}

function labToString(laba) {
	let L = laba.L
	let a = laba.a
	let b = laba.b
	const alpha = laba.alpha

	L = round(L, 2)
	a = round(a, 2)
	b = round(b, 2)

	return alpha === 1 ? `lab(${L}%, ${a}, ${b})` : `laba(${L}%, ${a}, ${b}, ${alpha})`
}

api$1.shouldHandleInput = input => typeof input === 'object' && isValidLab(input)
api$1.toRgb = input => labToRgba(input)
api$1.toRaw = rgba => rgbaToLab(rgba)
api$1.toString = rgba => labToString(rgbaToLab(rgba))

function fromPrecise$$1(raw) {
	const base = chroma.gl([raw.red, raw.green, raw.blue])
	return new OCOValueEX(new _thebespokepixel_esTinycolor.TinyColor(raw.alpha ? base.alpha(raw.alpha).css() : base.css()), raw.name)
}

function fromBytes$$1(raw) {
	return new OCOValueEX(new _thebespokepixel_esTinycolor.TinyColor(chroma.gl([raw.red / 255.0, raw.green / 255.0, raw.blue / 255.0, raw.alpha / 255.0]).css()), raw.name)
}

class OCOValueEX extends _thebespokepixel_esTinycolor.TinyColor {
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
		return `[${Math.round(this._r)}, ${Math.round(this._g)}, ${Math.round(this._b)}${alphaSuffix}]`
	}

	toArrayRGBA() {
		const alphaSuffix = this.alphaActive ? `, ${this._a}` : ''
		return `[${this._r / 255.0}, ${this._g / 255.0}, ${this._b / 255.0}${alphaSuffix}]`
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
		return new oco.Entry(name_, colorArray_.map(color_ => new oco.Entry(color_._name, [new oco.ColorValue('original', color_.toRgbString(), color_)], 'Color', -1)))
	}
}

exports.OCOValueEX = OCOValueEX
exports.fromPrecise = fromPrecise$$1
exports.fromBytes = fromBytes$$1

