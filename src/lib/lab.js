/*
 *  Open Color
 *  Lab Color utilities
 *  ────────────────────────────────────────────────────────────────────────────
 *  ©2016 Mark Griffiths @ The Bespoke Pixel (MIT licensed)
 */
import {TinyColor} from '@thebespokepixel/es-tinycolor'
import chroma from 'chroma-js'
import {OCOValueEX} from '..'

export function fromLab(raw) {
	const base = chroma.lab(
		raw.L,
		raw.a,
		raw.b
	)
	return new OCOValueEX(
		new TinyColor(
			raw.alpha ? base.alpha(raw.alpha).css() : base.css()
		), raw.name
	)
}
