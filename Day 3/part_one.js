const diagnostic = require('./data.js')

let gamma = ''
let epsilon = ''
const hits = new Map()

function hitValue(pos, value) {
    if (!hits.get(pos)) {
        hits.set(pos, { zeroes: 0, ones: 0 })
    }

    const bitPositionValues = hits.get(pos)
    if (value === '1') {
        bitPositionValues.ones++
    } else if (value === '0') {
        bitPositionValues.zeroes++
    } else {
        throw Error(`🤔 Position: ${pos}, Value: ${value}`)
    }
}

for (let value of diagnostic) {
    for (let bit_pos = 0; bit_pos < 12; bit_pos++) {
        hitValue(bit_pos, value[bit_pos])
    }
}

for (let bitPositionValues of hits.values()) {
    if (bitPositionValues.ones > bitPositionValues.zeroes) {
        gamma += '1'
        epsilon += '0'
    } else {
        gamma += '0'
        epsilon += '1'
    }
}

console.log('gamma', gamma, parseInt(gamma, 2))
console.log('epsilon', epsilon, parseInt(epsilon, 2))
console.log('result', parseInt(gamma, 2) * parseInt(epsilon, 2))