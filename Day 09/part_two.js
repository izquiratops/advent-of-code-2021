const grid = parseData(data)

const ROWS = grid.length
const COLS = grid[0].length

function parseData(data) {
    return data
        .split('\n')
        .map(line => line.split('').map((value) =>
            ({ value: Number(value), visited: false })
        ))
}

function* getNeighbors(x, y) {
    if (x < COLS - 1) {
        yield [x + 1, y]
    }
    if (x > 0) {
        yield [x - 1, y]
    }
    if (y < ROWS - 1) {
        yield [x, y + 1]
    }
    if (y > 0) {
        yield [x, y - 1]
    }
}

function isLowPoint(x, y) {
    const current = grid[y][x]
    for (const adjacentCoords of getNeighbors(x, y)) {
        const [x, y] = adjacentCoords
        const adjacent = grid[y][x]

        if (current.value >= adjacent.value) {
            return false
        }
    }

    return true
}

// Low points
const lowPoints = new Set()

for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    for (let x = 0; x < row.length; x++) {
        if (isLowPoint(x, y)) {
            lowPoints.add(`${x}-${y}`)
        }
    }
}

// Basins
const basins = []

function propagate(x, y) {
    let basinDegree = 1
    const current = grid[y][x]
    current.visited = true

    for (const adjacentCoords of getNeighbors(x, y)) {
        const [x, y] = adjacentCoords
        const adjacent = grid[y][x]

        if (!adjacent.visited && adjacent.value < 9) {
            if (adjacent.value > current.value) {
                basinDegree += propagate(x, y)
            }
        }
    }

    return basinDegree
}

for (const lowPoint of lowPoints.values()) {
    const [x, y] = lowPoint.split('-').map(Number)
    basins.push(propagate(x, y))
}

const compareByValue = (a, b) => a > b ? -1 : 1
const result = basins
    .sort(compareByValue)
    .slice(0, 3)
    .reduce((acc, curr) => acc * curr)

console.log(result)
