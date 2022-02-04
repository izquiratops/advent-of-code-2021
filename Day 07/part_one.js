const crabs = data.split(',').map(Number)

const costMap = new Map()

for (let idx = 0; idx < crabs.length; idx++) {
    const total = crabs.reduce((acc, curr) => {
        const cost = Math.abs(curr - idx)
        // console.log(`Move from ${curr} to ${crabs[idx]}: ${cost} fuel`)
        acc += cost
        return acc
    }, 0)

    costMap.set(idx, total)
}

const performantIndex = [...costMap.entries()].reduce((a, b) => (a[1] <= b[1]) ? a : b)
console.log(`performant index: ${performantIndex[0]}, fuel spend: ${performantIndex[1]}`)