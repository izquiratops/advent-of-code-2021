const crabs = data.split(',').map(Number)

const costMap = new Map()

function calculateCost(a, b) {
    const fromValue = Math.min(a, b)
    const toValue = Math.max(a, b)

    let increment = 1
    let output = 0
    for (let i = fromValue; i < toValue; i++) {
        output += increment
        increment++
    }

    return output
}

for (let idx = 5; idx < crabs.length; idx++) {
    const total = crabs.reduce((acc, curr) => {
        const cost = calculateCost(curr, idx)
        // console.log(`Move from ${curr} to ${idx}: ${cost} fuel`)
        acc += cost
        return acc
    }, 0)

    costMap.set(idx, total)
}

const performantIndex = [...costMap.entries()].reduce((a, b) => (a[1] <= b[1]) ? a : b)
console.log(`performant index: ${performantIndex[0]}, fuel spend: ${performantIndex[1]}`)