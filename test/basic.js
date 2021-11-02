import test from 'ava'
import {OCOValueEX} from '../index.js'

test('Named red', t => {
	const c = new OCOValueEX('red', 'Test Red')
	t.is(c.name, 'Test Red')
	t.is(c.toString('hex'), '#ff0000')
})

test('Named green', t => {
	const c = new OCOValueEX('green', 'Test Green')
	t.is(c.name, 'Test Green')
	t.is(c.toString('hex'), '#008000')
})

test('Named blue', t => {
	const c = new OCOValueEX('blue', 'Test Blue')
	t.is(c.name, 'Test Blue')
	t.is(c.toString('hex'), '#0000ff')
})
