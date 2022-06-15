const { poly, rules } = require('./input.js');

Map.prototype.incrementCount = function(key, increment = 1) {
	const curr = this.get(key) || 0;
	this.set(key, curr + increment);
}

let pairs = new Map();
for (let idx = 0; idx < poly.length - 1; idx++) {
	const first = poly[idx];
	const second = poly[idx + 1];
	pairs.incrementCount(first + second);
}

for (let step = 0; step < 40; step++) {
	// Keeping track of *this* step
	let new_pairs = new Map();

	for (const [pair, currentCount] of pairs) {
		// 'NN' -> 'C'
		const result = rules.get(pair);
		// 'NC'
		const first = pair[0] + result;
		new_pairs.incrementCount(first, currentCount);
		// 'CN'
		const second = result + pair[1];
		new_pairs.incrementCount(second, currentCount);
	}

	pairs = new_pairs;
	// console.debug(`Step: ${step}`, [...pairs.entries()]);
}

const totalCount = new Map();
console.log([...pairs.values()]);

for (const [pair, count] of pairs) {
	for (const char of pair) {
		totalCount.incrementCount(char, count);
	}
}

// 'NN' -> 'NC' + 'CN' -> meaning that every char
// is doubled but the very first and last one.
totalCount.incrementCount(poly[0]);
totalCount.incrementCount(poly[poly.length - 1]);

const totalCountList = [...totalCount.entries()]
	.map(([char, count]) => ({ char, count: count / 2 }))
	.sort((a, b) => b.count - a.count);

const max = totalCountList[0].count;
const min = totalCountList[totalCountList.length - 1].count;
console.log('max', max);
console.log('min', min);
console.log('result', max - min);
