const connections = data
	.split('\n')
	.map(path => path.split('-'))

const neighborMap = new Map()

function recordCaveConnection([origin, target]) {
	let neighbors = neighborMap.get(origin)

	if (!neighbors) {
		neighbors = new Set([target])
	} else {
		neighbors.add(target)
	}

	neighborMap.set(origin, neighbors)
}

function isSmallCave(name) {
	return name.toLowerCase() === name
}

function* walk(cave, smallVisitedSet, letVisitTwice) {
	// check if small cave can be visited twice
	if (smallVisitedSet.has(cave)) {
		if (letVisitTwice && !(cave === 'start' || cave === 'end')) {
			letVisitTwice = false
		} else {
			return
		}
	}
	
	if (cave === 'end') {
		yield ['end']
	}

	if (isSmallCave(cave)) {
		smallVisitedSet.add(cave)
	}

	for (const nextCave of neighborMap.get(cave)) {
		// clone the "small caves set" for every new walk step
		const pathCandidates = walk(nextCave, new Set(smallVisitedSet), letVisitTwice)
		for (const nextPath of pathCandidates) {
			yield [cave, ...nextPath]
		}
	}

}

// 1. Get the map of all possible connections between caves
for (let connection of connections) {
	recordCaveConnection(connection)
	recordCaveConnection(connection.reverse())
}

// 2. Search all the paths
const paths = [...walk('start', new Set(), true)]

console.log(paths.length)