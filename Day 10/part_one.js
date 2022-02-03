const lines = data.split('\n').map(line => line.split(''))

const illegalMap = new Map([
    [')', 3],
    [']', 57],
    ['}', 1197],
    ['>', 25137]
])

const openSymbols = ['(', '[', '{', '<']

const closeSymbols = [')', ']', '}', '>']

function getOpenSymbol(sym) {
    const idx = closeSymbols.findIndex(x => x === sym)
    return openSymbols[idx]
}

function getCloseSymbol(sym) {
    const idx = openSymbols.findIndex(x => x === sym)
    return closeSymbols[idx]
}

function forwardScan(line) {
    const depthMap = new Map()
    let depth = 0

    for (let char of line) {
        if (openSymbols.includes(char)) {
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

            if (getOpenSymbol(char) !== lastOpenRange) {
                const expected = getCloseSymbol(lastOpenRange)
                throw {
                    expected,
                    char,
                    instance: line.join('')
                }
            }

            depth -= 1
        }
    }
}

let illegalScore = 0
for (const line of lines) {
    try {
        forwardScan(line)
    } catch (err) {
        const { instance, expected, char } = err
        console.error(`${instance} - Expected ${expected}, but found ${char} instead.`)

        illegalScore += illegalMap.get(char)
    }
}

console.log(illegalScore)
