const data = require('./test_data.js')

const vectors = data.split('\n').map(parseVector)
const hits = new Map()
const drawCondition = (vector) => vector.from.x === vector.to.x || vector.from.y === vector.to.y

function parseVector(line) {
    const [from, to] = line.split(' -> ').map(coord => {
        const [x, y] = coord.split(',').map(Number);
        return { x, y }
    })

    return { from, to }
}

function* walkThrough(vec) {
    if (vec.from.x === vec.to.x) {
        // vertical walk
        const direction = vec.to.y > vec.from.y // True means 'positive'
        const step = direction ? 1 : -1

        for (let y = vec.from.y; direction ? (y <= vec.to.y) : (y >= vec.to.y); y += step) {
            yield { x: vec.from.x, y }
        }
    } else if (vec.from.y === vec.to.y) {
        // horizontal walk
        const direction = vec.to.x > vec.from.x // True means 'positive'
        const step = direction ? 1 : -1

        for (let x = vec.from.x; direction ? (x <= vec.to.x) : (x >= vec.to.x); x += step) {
            yield { x, y: vec.from.y }
        }
    } else {
        // diagonal walk
        const directionX = vec.to.x > vec.from.x
        const directionY = vec.to.y > vec.from.y
        const step = { x: directionX ? 1 : -1, y: directionY ? 1 : -1 }

        // for (let x = vec.from.x; direction ? (x <= vec.to.x) : (x >= vec.to.x); x += step) {
        //     yield { x, y: vec.from.y }
        // }
    }
}

let height = 0
let width = 0

for (let vec of vectors) {
    if (drawCondition(vec)) {
        for (let point of walkThrough(vec)) {
            const key = `${point.x}-${point.y}`
            const value = hits.get(key) || 0
            hits.set(key, value + 1)

            // set boundaries
            if (point.x > width) {
                width = point.x
            }
            if (point.y > height) {
                height = point.y
            }
        }
    }
}

let result = 0

for (let y = 0; y <= width; y++) {
    for (let x = 0; x <= height; x++) {
        const value = hits.get(`${x}-${y}`) || 0
        result += (value >= 2) ? 1 : 0
    }
}

console.log(result)
