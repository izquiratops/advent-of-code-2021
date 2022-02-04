const lanternfishes = data.split(',').map(Number)
const DAYS = 256

let fishCount = lanternfishes.reduce((acc, curr) => {
    const value = acc.get(curr) || 0
    acc.set(curr, value + 1)
    return acc;
}, new Map())

function swipeFishCount() {
    const newFishCount = new Map()

    let idx = 0
    for (let nextIdx = 8; nextIdx >= 0; nextIdx--) {
        let currentFish = fishCount.get(idx) || 0

        if (nextIdx === 6) {
            currentFish += fishCount.get(0) || 0
        }

        newFishCount.set(nextIdx, currentFish)
        idx = nextIdx
    }

    return newFishCount
}

for (let day = 1; day <= DAYS; day++) {
    console.log(day, fishCount)
    fishCount = swipeFishCount()
}

const count = [...fishCount.values()].reduce((acc, curr) => {
    acc += curr
    return acc
}, 0)

console.log('result', count)
