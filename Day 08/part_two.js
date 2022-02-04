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
    switch (segments) {
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
        default: return null
    }
}

function toCanonical(input) {
    return input.split('').sort().join('')
}

function* explode(arrays) {
    if (arrays.length === 1) {
        yield* arrays[0]
    } else {
        const [head, ...tail] = arrays

        for (const recursiveTail of explode(tail)) {
            for (const recursiveHead of head) {
                yield recursiveHead + recursiveTail
            }
        }
    }
}

function guessTheDamnThing(signal) {
    const candidateMap = new Map([
        ['a', 'abcdefg'.split('')],
        ['b', 'abcdefg'.split('')],
        ['c', 'abcdefg'.split('')],
        ['d', 'abcdefg'.split('')],
        ['e', 'abcdefg'.split('')],
        ['f', 'abcdefg'.split('')],
        ['g', 'abcdefg'.split('')]
    ])

    /* Get a solid clue with the easy (length unique) numbers */

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

    /* Let's guess the rest */

    // Validate if every character is unique
    function explodeCandidates(blob) {
        const candidates =  blob.split('').map(c => candidateMap.get(c))
        return [...explode(candidates)]
    }

    function isValid(candidate) {
        const uniqueCandidates = new Set(candidate.split(''))
        if (uniqueCandidates.size !== candidate.length) {
            return false
        }

        return decodeNumber(candidate) !== null;
    }

    const configuration = new Map()

    for (let blob of signal) {
        // Get every possible way to order the candidates
        const candidates = explodeCandidates(blob)
        // Get rid of duplicates with different order (digit segments doesn't care about order)
        const filteredCandidates = [...new Set(candidates.map(toCanonical))]
        // Filter candidates with duplicated characters + try to validate with a decoded success
        const matchingCandidates = filteredCandidates.filter(isValid)

        if (matchingCandidates.length === 1) {
            configuration.set(toCanonical(blob), matchingCandidates[0])
        } else {
            throw Error('uwu')
        }
    }

    return configuration
}

function decodeOutput(encodedOutput, configuration) {
    // Output comes unsorted
    encodedOutput = encodedOutput.map(blob => toCanonical(blob))

    let decodedOutput = ''
    // encodedOutput = ['ced', 'cgbefad', 'gbcaef', 'cd']
    for (let blob of encodedOutput) {
        // from 'ced' to pattern = 'acf'
        const pattern = configuration.get(blob)
        // 'acf -> 7
        const decodedValue = decodeNumber(pattern)
        decodedOutput += decodedValue
    }

    return parseInt(decodedOutput)
}

let result = 0
for (let { signal, output } of input_instances) {
    const configuration = guessTheDamnThing(signal)
    const decodedNumber = decodeOutput(output, configuration)

    result += decodedNumber
}

console.log(result)
