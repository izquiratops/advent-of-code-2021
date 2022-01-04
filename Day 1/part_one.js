const measurements = require('./data')

let count = 0;

for (let idx = 0; idx < measurements.length; idx++) {
	const prev = measurements[idx - 1]
	const curr = measurements[idx]

	if (prev < curr) {
		count++
	}
}

console.log('The number of increments is:', count)
