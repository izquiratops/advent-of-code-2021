const measurements = data.split('\n').map(Number)
let count = 0

for (let idx = 3; idx < measurements.length; idx++) {
    const prev = measurements[idx - 3] + measurements[idx - 2] + measurements[idx - 1]
    const curr = measurements[idx - 2] + measurements[idx - 1] + measurements[idx]

    if (prev < curr) {
        count++
    }
}

console.log('The number of increments is:', count)