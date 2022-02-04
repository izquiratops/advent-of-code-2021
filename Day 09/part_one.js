const grid = parseData(data)

const ROWS = grid.length
const COLS = grid[0].length

function parseData(data) {
    return data
        .split('\n')
        .map(line => line.split('').map(Number))
}

function* getNeighbors(x, y) {
    if (x < COLS - 1) {
        yield grid[y][x + 1]
    }
    if (x > 0) {
        yield grid[y][x - 1]
    }
    if (y < ROWS - 1) {
        yield grid[y + 1][x]
    }
    if (y > 0) {
        yield grid[y - 1][x]
    }
}

function isLowPoint(x, y) {
    const item = grid[y][x]
    for (let neighbor of getNeighbors(x, y)) {
        if (item >= neighbor) {
            return false
        }
    }

    return true
}

let totalRisk = 0
for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    for (let x = 0; x < row.length; x++) {
        if (isLowPoint(x, y)) {
            const risk = grid[y][x] + 1
            totalRisk += risk
        }
    }
}

console.log(totalRisk)
