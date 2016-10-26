/* ───────────╮
 │ Open Color │ Lab Color utilities
 ╰────────────┴──────────────────────────────────────────────────────────────── */
// ©2016 Mark Griffiths @ The Bespoke Pixel (MIT licensed)

import {TinyColor} from '@thebespokepixel/es-tinycolor'
import chroma from 'chroma-js'

const api = TinyColor.registerFormat('lab')

function round(number, precision) {
	const factor = Math.pow(10, precision)
	const tempNumber = number * factor
	const roundedTempNumber = Math.round(tempNumber)
	return roundedTempNumber / factor
}

function isValidLab(input) {
	const test = {
		L: (input.L >= 0.0 && input.L <= 100.0),
		a: (input.a >= -127.0 && input.a <= 127.0),
		b: (input.b >= -127.0 && input.b <= 127.0)
	}
	return (test.L && test.a && test.b)
}

function labToRgba(raw) {
	const base = chroma.lab(
		raw.L,
		raw.a,
		raw.b
	)
	base.alpha(raw.alpha || 1)
	return {
		r: base.get('rgb.r'),
		g: base.get('rgb.g'),
		b: base.get('rgb.b'),
		a: base.alpha()
	}
}

function rgbaToLab(rgba) {
	const [L, a, b] = chroma.gl(rgba).lab()
	const alpha = rgba.a || 1
	return {L, a, b, alpha}
}

function labToString(laba) {
	let {L, a, b, alpha} = laba
	L = round(L, 2)
	a = round(a, 2)
	b = round(b, 2)

	return (alpha === 1) ?
		`lab(${L}%, ${a}, ${b})` :
		`laba(${L}%, ${a}, ${b}, ${alpha})`
}

api.shouldHandleInput = input => typeof input === 'object' && isValidLab(input)
api.toRgb = input => labToRgba(input)
api.toRaw = rgba => rgbaToLab(rgba)
api.toString = rgba => labToString(rgbaToLab(rgba))
