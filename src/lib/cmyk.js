/*
 *  Open Color
 *  CMYK Color utilities
 *  ────────────────────────────────────────────────────────────────────────────
 *  ©2016 Mark Griffiths @ The Bespoke Pixel (MIT licensed)
 */
import {TinyColor} from '@thebespokepixel/es-tinycolor'
import chroma from 'chroma-js'
import {OCOValueEX} from '..'

export function fromCMYK(raw) {
	const base = chroma.cmyk(
		raw.cyan,
		raw.magenta,
		raw.yellow,
		raw.black
	)
	return new OCOValueEX(
		new TinyColor(
			raw.alpha ? base.alpha(raw.alpha).css() : base.css()
		), raw.name
	)
}
