const lanternfishes = data.split(',').map(Number)
const DAYS = 80

for (let day = 1; day <= DAYS; day++) {
    const currentLength = lanternfishes.length
    console.log(lanternfishes)

    for (let idx = 0; idx < currentLength; idx++) {
        lanternfishes[idx] -= 1

        if (lanternfishes[idx] < 0) {
            lanternfishes[idx] = 6
            lanternfishes.push(8)
        }
    }
}

console.log("result", lanternfishes.length)
