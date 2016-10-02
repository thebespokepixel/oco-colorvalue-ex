import test from 'ava'
import {OCOValueEX} from '..'

test('Named red', t => {
	const c = new OCOValueEX({cyan: 0, magenta: 1, yellow: 1, black: 0}, 'Test Red')
	t.is(c.name, 'Test Red')
	t.is(c.toString('hex'), '#ff0000')
	t.is(c.toString('cmyk'), 'cmyk(0%, 100%, 100%, 0%)')
})

test('Named green', t => {
	const c = new OCOValueEX({cyan: 1, magenta: 0, yellow: 1, black: 0}, 'Test Green')
	t.is(c.name, 'Test Green')
	t.is(c.toString('hex'), '#00ff00')
	t.is(c.toString('cmyk'), 'cmyk(100%, 0%, 100%, 0%)')
})

test('Named blue', t => {
	const c = new OCOValueEX({cyan: 1, magenta: 1, yellow: 0, black: 0}, 'Test Blue')
	t.is(c.name, 'Test Blue')
	t.is(c.toString('hex'), '#0000ff')
	t.is(c.toString('cmyk'), 'cmyk(100%, 100%, 0%, 0%)')
})
