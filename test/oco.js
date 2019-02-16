import test from 'ava'
import {parse, render} from 'opencolor'
import {OCOValueEX} from '..'

const r = new OCOValueEX('red', 'Test Red')
const g = new OCOValueEX('green', 'Test Green')
const b = new OCOValueEX('blue', 'Test Blue')
const rawOCO = OCOValueEX.generateOCO('root', [r, g, b])
const output = 'Test Red: rgb(255, 0, 0)\nTest Green: rgb(0, 128, 0)\nTest Blue: rgb(0, 0, 255)\n'

test('OCO formatting test', t => {
	t.is(render(rawOCO), output)
})

test('OCO reverse value test', t => {
	const parsed = parse(output)
	t.is(parsed.children[0].children[0].value, rawOCO.children[0].children[0].value)
	t.is(parsed.children[1].children[0].value, rawOCO.children[1].children[0].value)
	t.is(parsed.children[2].children[0].value, rawOCO.children[2].children[0].value)
	t.not(parsed.children[0].children[0].value, rawOCO.children[1].children[0].value)
	t.not(parsed.children[0].children[0].value, rawOCO.children[2].children[0].value)
})

test('OCO properties test', t => {
	t.is(rawOCO._name, 'root')
	t.is(rawOCO.children.length, 3)
})
