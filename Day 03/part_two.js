const diagnostic = data.split('\n')
const BIT_LENGTH = 12
const bitCount = new Map()

function recordBitCount(pos, value) {
    // Init new position
    if (!bitCount.get(pos)) {
        bitCount.set(pos, { zeroes: 0, ones: 0 })
    }

    const bitPositionValues = bitCount.get(pos)
    if (value === '1') {
        bitPositionValues.ones++
    } else if (value === '0') {
        bitPositionValues.zeroes++
    } else {
        throw Error(`🤔 Position: ${pos}, Value: ${value}`)
    }
}

function oxygenCriteria({ ones, zeroes }) { return ones >= zeroes }

function carbonCriteria({ ones, zeroes }) { return ones < zeroes }

function getRate(criteria) {
    let filteredDiagnostic = [...diagnostic]

    function filterDiagnostic(pos, values) {
        for (let value of values) {
            for (let bit_pos = 0; bit_pos < BIT_LENGTH; bit_pos++) {
                recordBitCount(bit_pos, value[bit_pos])
            }
        }

        const currentBitCount = bitCount.get(pos)
        if (criteria(currentBitCount)) {
            return values.filter((curr) => curr[pos] === '1')
        } else {
            return values.filter((curr) => curr[pos] === '0')
        }
    }

    for (let pos = 0; pos < BIT_LENGTH; pos++) {
        filteredDiagnostic = filterDiagnostic(pos, filteredDiagnostic)
        bitCount.clear()

        if (filteredDiagnostic.length === 1) {
            break
        }
    }

    // There's only one left
    return filteredDiagnostic.pop()
}

const oxygenRate = getRate(oxygenCriteria)
const carbonRate = getRate(carbonCriteria)

console.log('oxygenRate:', parseInt(oxygenRate, 2))
console.log('carbonRate:', parseInt(carbonRate, 2))
console.log('result:', parseInt(oxygenRate, 2) * parseInt(carbonRate, 2))
