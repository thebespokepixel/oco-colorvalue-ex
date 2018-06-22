/* ───────────╮
 │ Open Color │ RGBA Color utilities
 ╰────────────┴──────────────────────────────────────────────────────────────── */
// ©2016 Mark Griffiths @ The Bespoke Pixel (MIT licensed)

import {TinyColor} from '@thebespokepixel/es-tinycolor'
import chroma from 'chroma-js'
import {OCOValueEX} from '../index'

export function fromPrecise(raw) {
	const base = chroma.gl([
		raw.red,
		raw.green,
		raw.blue
	])
	return new OCOValueEX(
		new TinyColor(
			raw.alpha ? base.alpha(raw.alpha).css() : base.css()
		), raw.name
	)
}

export function fromBytes(raw) {
	return new OCOValueEX(
		new TinyColor(
			chroma.gl([
				raw.red / 255.0,
				raw.green / 255.0,
				raw.blue / 255.0,
				raw.alpha / 255.0
			]).css()),
		raw.name
	)
}
