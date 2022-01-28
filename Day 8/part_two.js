const input_instances = data
    .split('\n')
    .map(line => {
        let [signal, output] = line.split(' | ')
        return {
            signal: signal.split(' '),
            output: output.split(' ')
        }
    })

// number -> segments
function encodeNumber(number) {
    switch (number) {
        case 0: return 'abcefg'
        case 1: return 'cf'
        case 2: return 'acdeg'
        case 3: return 'acdfg'
        case 4: return 'bcdf'
        case 5: return 'abdfg'
        case 6: return 'abdefg'
        case 7: return 'acf'
        case 8: return 'abcdefg'
        case 9: return 'abcdfg'
        default: throw Error('sad trumpet')
    }
}

// segments -> number
function decodeNumber(segments) {
    switch (toCanonical(segments)) {
        case 'abcefg': return 0
        case 'cf': return 1
        case 'acdeg': return 2
        case 'acdfg': return 3
        case 'bcdf': return 4
        case 'abdfg': return 5
        case 'abdefg': return 6
        case 'acf': return 7
        case 'abcdefg': return 8
        case 'abcdfg': return 9
        default: null
    }
}

function toCanonical(input) {
    return input.split('').sort().join()
}

function* explode(arrays) {
    if (arrays.length === 1) {
        yield* arrays[0]
    } else {
        const [head, ...tail] = arrays
        for (const explodedTailItem of explode(tail)) {
            for (const headItem of head) {
                yield headItem + explodedTailItem
            }
        }
    }
}

function foo(signal) {
    const candidateMap = new Map([
        ['a', 'abcdefg'.split('')],
        ['b', 'abcdefg'.split('')],
        ['c', 'abcdefg'.split('')],
        ['d', 'abcdefg'.split('')],
        ['e', 'abcdefg'.split('')],
        ['f', 'abcdefg'.split('')],
        ['g', 'abcdefg'.split('')]
    ])

    function narrowPossibilities(segment, possibilities) {
        const candidates = candidateMap.get(segment)
        const newCandidates = candidates.filter(c => possibilities.includes(c))
        candidateMap.set(segment, newCandidates)
    }

    function excludePossibilities(segment, possibilities) {
        const candidates = candidateMap.get(segment)
        const newCandidates = candidates.filter(c => !possibilities.includes(c))
        candidateMap.set(segment, newCandidates)
    }

    function recordKnown(pattern, num) {
        // 1 -> "cf"
        const encoded = encodeNumber(num)
        const segments = 'abcdefg'.split('')

        for (let segment of segments) {
            if (pattern.includes(segment)) {
                // segment "c", pattern "...c...", possibilities "cf"
                narrowPossibilities(segment, encoded.split(''))
            } else {
                excludePossibilities(segment, encoded.split(''))
            }
        }
    }

    for (let blob of signal) {
        switch (blob.length) {
            case 2:
                recordKnown(blob, 1)
                break
            case 3:
                recordKnown(blob, 7)
                break
            case 4:
                recordKnown(blob, 4)
                break
            case 7:
                recordKnown(blob, 8)
                break
        }
    }

    for (let baz of explode([...candidateMap.values()])) {
        console.log(baz)
    }
}

let result = 0
for (let { signal, output } of input_instances) {
    foo(signal)
}

/*
function getSegmentMap(signal) {
    const segmentMap = new Map([
        ['top', new Map()],
        ['top-left', new Map()],
        ['top-right', new Map()],
        ['middle', new Map()],
        ['bottom-left', new Map()],
        ['bottom-right', new Map()],
        ['bottom', new Map()],
    ]);

    function hitBlob(blob, mapping) {
        for (let char of blob) {
            for (let segment of mapping.values()) {
                // segment = 'top'
                // counts = ['a': 6, 'b': 4, 'c': 8...]
                const counts = segmentMap.get(segment)
                const count = counts.get(char) | 0
                counts.set(char, count + 1)
            }
        }
    }

    for (let blob of signal) {
        const numbers = NUMBERS_BY_LENGTH.get(blob.length)

        // ! This is wrong
        for (let number of numbers) {
            const mapping = MAPPINGS.get(number);
            hitBlob(blob, mapping)
        }
    }

    return segmentMap
}

function guessConfiguration(segmentMap) {
    const configuration = new Map()
    const alreadyWon = new Set()

    while (configuration.size < 7) {
        for (let [segment, counts] of segmentMap) {
            let candidates = { char: [], count: 0 }

            counts = Array.from(counts.entries())
                .map(([char, count]) => ({ char, count }))
                .filter(count => !alreadyWon.has(count.char))
                .forEach((curr) => {
                    if (curr.count > candidates.count) {
                        candidates.char = [curr.char]
                        candidates.count = curr.count
                    } else if (curr.count === candidates.count) {
                        candidates.char.push(curr.char)
                    }
                })

            if (candidates.char.length === 1) {
                const winnerChar = candidates.char.pop()
                configuration.set(winnerChar, segment)

                alreadyWon.add(winnerChar)
                segmentMap.delete(segment)
            }
        }
    }

    return configuration
}

function decodeOutput(output, configuration) {
    let decoded = ''
    const alphabetical = (a, b) => a > b ? -1 : 1

    outerLoop: for (let blob of output) {
        // Get segments of blob
        const segments = []
        for (let char of blob) {
            const segment = configuration.get(char)
            segments.push(segment)
        }

        // Get actual number
        for (let [number, mapping] of MAPPINGS.entries()) {
            const sortedMapping = mapping.sort(alphabetical).join()
            const sortedSegments = segments.sort(alphabetical).join()

            if (sortedMapping === sortedSegments) {
                decoded += number.toString()
                continue outerLoop
            }
        }

        debugger

        // Something gone wrong if we're getting out of the loop
        // without any mapping match
        throw Error('🤔')
    }

    return parseInt(decoded)
}

*/