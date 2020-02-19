/* ───────────╮
 │ Open Color │ CMYK Color utilities
 ╰────────────┴──────────────────────────────────────────────────────────────── */
// ©2016 Mark Griffiths @ The Bespoke Pixel (MIT licensed)

import {TinyColor} from '@thebespokepixel/es-tinycolor'
import chroma from 'chroma-js'
import convert from 'color-convert'

const api = TinyColor.registerFormat('cmyk')

function isValidCMYK(input, min, max) {
	const test = {
		cyan: (input.cyan >= min && input.cyan <= max),
		magenta: (input.magenta >= min && input.magenta <= max),
		yellow: (input.yellow >= min && input.yellow <= max),
		black: (input.black >= min && input.black <= max)
	}
	return (test.cyan && test.magenta && test.yellow && test.black)
}

function cmykToRgba(raw) {
	const base = chroma.cmyk(
		raw.cyan,
		raw.magenta,
		raw.yellow,
		raw.black
	)
	base.alpha(raw.alpha || 1)
	return {
		r: base.get('rgb.r'),
		g: base.get('rgb.g'),
		b: base.get('rgb.b'),
		a: base.alpha()
	}
}

function rgbaToCmyk(rgba) {
	const [c, m, y, k] = convert.rgb.cmyk.raw(chroma.gl(rgba).rgb())
	const a = rgba.a || 1
	return {c, m, y, k, a}
}

function cmykToString(cmyka) {
	let {c, m, y, k, a} = cmyka
	c = Math.round(c)
	m = Math.round(m)
	y = Math.round(y)
	k = Math.round(k)

	return (a === 1) ?
		`cmyk(${c}%, ${m}%, ${y}%, ${k}%)` :
		`cmyka(${c}%, ${m}%, ${y}%, ${k}%, ${a})`
}

api.shouldHandleInput = input => typeof input === 'object' && isValidCMYK(input, 0, 1)
api.toRgb = input => cmykToRgba(input)
api.toRaw = rgba => rgbaToCmyk(rgba)
api.toString = rgba => cmykToString(rgbaToCmyk(rgba))
