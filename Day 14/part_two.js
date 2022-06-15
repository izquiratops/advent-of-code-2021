const fs = require("fs");
const inputString = fs.readFileSync(__dirname + "/data_test.txt").toString();

// Helper functions

Array.prototype.max = function() {
	return Math.max.apply(null, this);
};

Array.prototype.min = function() {
	return Math.min.apply(null, this);
};

function onlyUnique(value, idx, array) {
	return array.indexOf(value) === idx;
}

// ---------- Day 14 Part B ----------

function parseInput(input) {
	const [polymerTemplate, pairInsertion] = input.split('\n\n');

	const pairInsertionList = pairInsertion
		.split('\n')
		.map(curr => curr.split(' -> '));

	return [
		// Polymer template: 'NNBC'
		polymerTemplate.split(''),
		// Pair insertion Map: { 'NN' -> 'C', ... }
		new Map(pairInsertionList)
	];
}

function initializeNodes(polymerValueList) {
	let tmpNextNode = null;

	for (let idx = polymerValueList.length - 1; idx >= 0; idx--) {
		const node = {
			value: polymerValueList[idx],
			next: tmpNextNode
		};

		tmpNextNode = node;
	}

	return tmpNextNode;
}

function walk(node) {
	while (node.next) {
		const currentNodeValue = node.value;
		const nextNodeValue = node.next.value;
		const insertedNode = {
			value: pairInsertationMap.get(currentNodeValue + nextNodeValue),
			next: node.next
		};

		const nextStep = node.next;
		node.next = insertedNode;
		node = nextStep;
	}
}

function calculateCharCounts(node) {
	const counts = new Map();

	while(true) {
		const count = counts.get(node.value) | 0;
		counts.set(node.value, count + 1);

		if (node.next) {
			node = node.next;
		} else {
			break;
		}
	}

	return counts;
}

// ---------- Init ----------
const [polymerInitStack, pairInsertationMap] = parseInput(inputString);

const firstNode = initializeNodes(polymerInitStack);

for (let step = 0; step < 40; step++) {
	console.debug(step);
	walk(firstNode);
}

const charCounts = calculateCharCounts(firstNode);
const mostCommon = [...charCounts.values()].max();
const leastCommon = [...charCounts.values()].min();

console.log(`${mostCommon} - ${leastCommon} = ${mostCommon - leastCommon}`);
