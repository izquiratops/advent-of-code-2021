// parse input
calls = data.calls.split(",").map(Number)
boards = data.boards.split("\n\n").map(parseBoards)

const alreadyCalled = new Set()
const winnerBoards = new Set()
let lastScore = 0

function parseBoards(board) {
    const rows = board.split('\n').map(row => ({
        progress: 0,
        numbers: row
            .split(' ')
            .filter(char => char !== '')
            .map(Number)
    }))

    const cols = []
    for (row of rows) {
        let columnIdx = 0
        for (let number of row.numbers) {
            if (!cols[columnIdx]) {
                cols[columnIdx] = {
                    progress: 0,
                    numbers: []
                }
            }
            cols[columnIdx].numbers.push(number)
            columnIdx++
        }
    }

    return { rows, cols }
}

function calculateScore(board, call) {
    const rows = board.rows.map(row => row.numbers)
    const sum = rows.flat().reduce((sum, number) => {
        if (!alreadyCalled.has(number)) {
            sum = sum + number
        }

        return sum
    }, 0)

    return sum * call
}

function runCalls() {
    for (let call of calls) {
        alreadyCalled.add(call)

        iterateBoard: for (let board of boards) {
            // Look for winners through Rows
            for (let row of board.rows) {
                for (let number of row.numbers) {
                    if (call === number) {
                        row.progress++
                    }
                }

                if (row.progress === 5 && !winnerBoards.has(board)) {
                    lastScore = calculateScore(board, call)
                    winnerBoards.add(board)
                    continue iterateBoard
                }
            }

            // Look for winners through Columns
            for (col of board.cols) {
                for (number of col.numbers) {
                    if (call === number) {
                        col.progress++
                    }
                }

                if (col.progress === 5 && !winnerBoards.has(board)) {
                    lastScore = calculateScore(board, call)
                    winnerBoards.add(board)
                    continue iterateBoard
                }
            }
        }
    }
}

runCalls()
console.log('result: ', lastScore)
