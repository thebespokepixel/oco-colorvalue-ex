import test from 'ava'
import OCOValueEX from '..'

test('Simple colors', t => {
	const testRed = new OCOValueEX('#FF0012', 'Test Red')
	t.is(testRed.name, 'Test Red')
	t.is(testRed.toString(), '#ff0012')
})
