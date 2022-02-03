const lines = data.split('\n').map(line => line.split(''))

const openers = ['(', '[', '{', '<']

const counterMap = new Map([
    ['(', ')'],
    [')', '('],
    ['[', ']'],
    [']', '['],
    ['{', '}'],
    ['}', '{'],
    ['<', '>'],
    ['>', '<']
])

const scoreMap = new Map([
    [')', 1],
    [']', 2],
    ['}', 3],
    ['>', 4]
])

const compareValue = (a, b) => a < b ? 1 : -1

function forwardScan(line) {
    const depthMap = new Map()
    let depth = 0

    for (let char of line) {
        if (openers.includes(char)) {
            const list = depthMap.get(char)

            if (list) {
                list.push(char)
            } else {
                depthMap.set(depth, [char])
            }

            depth += 1
        } else {
            const childrenRange = depthMap.get(depth - 1)
            const [ lastOpenRange ] = childrenRange.splice(-1)

            if (counterMap.get(char) !== lastOpenRange) {
                const expected = getCloseCharacter(lastOpenRange)
                throw {
                    expected,
                    char,
                    instance: line.join('')
                }
            }

            depth -= 1
        }
    }

    const completeSequence = [...depthMap.values()]
        .map(depthList => depthList.map(char => counterMap.get(char)).flat())
        .reverse()
        .join('')

    if (completeSequence) {
        console.log(`${line.join('')} - Complete by adding ${completeSequence}`)
    }

    return completeSequence
}

function calculateLineScore(sequence) {
    let score = 0

    for (let char of sequence) {
        score = score * 5
        score += scoreMap.get(char)
    }

    console.log(`${sequence} - ${score} total points`)
    return score
}

let scoreList = []
for (const line of lines) {
    let sequence
    try {
        sequence = forwardScan(line)
    } catch (err) {
        // Discard corrupted line
        continue
    }

    const lineScore = calculateLineScore(sequence)
    scoreList.push(lineScore)
}

const sortedScoreList = scoreList.sort(compareValue)
const middleItem = Math.floor(sortedScoreList.length / 2)
const result = sortedScoreList[middleItem]

console.log(result)
