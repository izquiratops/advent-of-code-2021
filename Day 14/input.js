const fs = require('fs');

const [poly, raw_rules] = fs
	.readFileSync(__dirname + "/data.txt")
	.toString()
	.trim()
	.split('\n\n');

const rules = raw_rules.split('\n')
	.reduce((map, rule) => {
		let [from, to] = rule.split(' -> ').map((s) => s.trim());
		map.set(from, to);

		return map;
	}, new Map());

module.exports = { poly, rules };
