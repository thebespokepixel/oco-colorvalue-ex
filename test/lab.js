import test from 'ava'
import {OCOValueEX} from '../index.js'

test('Named red', t => {
	const c = new OCOValueEX({L: 53.24, a: 80.09, b: 67.2}, 'Test Red')
	t.is(c.name, 'Test Red')
	t.is(c.toString('hex'), '#ff0000')
	t.is(c.toString('lab'), 'lab(53.24%, 80.09, 67.2)')
})

test('Named green', t => {
	const c = new OCOValueEX({L: 87.73, a: -86.18, b: 83.18}, 'Test Green')
	t.is(c.name, 'Test Green')
	t.is(c.toString('hex'), '#00ff00')
	t.is(c.toString('lab'), 'lab(87.73%, -86.18, 83.18)')
})

test('Named blue', t => {
	const c = new OCOValueEX({L: 32.3, a: 79.19, b: -107.86}, 'Test Blue')
	t.is(c.name, 'Test Blue')
	t.is(c.toString('hex'), '#0000ff')
	t.is(c.toString('lab'), 'lab(32.3%, 79.19, -107.86)')
})
