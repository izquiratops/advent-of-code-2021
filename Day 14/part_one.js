const fs = require("fs");
const inputString = fs.readFileSync(__dirname + "/data.txt").toString();

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

// ---------- Day 14 Part A ----------

function parseInput(input) {
  const [polymerTemplate, pairInsertion] = input.split('\n\n');
  const parsedPairInsertion = pairInsertion
    .split('\n')
    .map(curr => curr.split(' -> '));

  return [polymerTemplate, new Map(parsedPairInsertion)];
}

// NNBC -> step 1: NN, step 2: NB, step 3: BC
function walk(templateArray) {

  for (let idx = 0; idx < templateArray.length - 1; idx = idx + 2) {
    const currentPair = templateArray.slice(idx, idx + 2).join('');
    const elementToBeInserted = pairInsertion.get(currentPair);
    templateArray.splice(idx + 1, 0, elementToBeInserted);
  }

  return templateArray;
}

// ---------- Init ----------
// Parse input
const [polymerTemplate, pairInsertion] = parseInput(inputString);

// Iterations
let sequence = [...polymerTemplate];
for (let step = 0; step < 10; step++) {
  sequence = walk(sequence);
}

// Count of chars
const uniqueCharsList = sequence.filter(onlyUnique);
const uniqueCountList = uniqueCharsList.map(char => sequence.reduce(
  (acc, curr) => curr === char
    ? ++acc
    : acc
  , 0)
);

const mostCommonValue = uniqueCountList.max();
const leastCommonValue = uniqueCountList.min();

console.log(`${mostCommonValue} - ${leastCommonValue} = ${mostCommonValue - leastCommonValue}`);
