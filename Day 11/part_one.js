const energyGrid = data.split("\n").map((x) => x.split("").map(Number));

const ROWS = energyGrid.length;
const COLS = energyGrid[0].length;
const STEPS = 100;

let flashCount = 0;
const alreadyFlashed = new Set();

function getNeighbors(x, y) {
  const neighborTemplate = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ];

  return neighborTemplate.filter(
    ([x, y]) => x < ROWS && x >= 0 && y < COLS && y >= 0
  );
}

function increaseEnergy([x, y]) {
  const key = `${x}-${y}`;

  if (alreadyFlashed.has(key)) {
    return;
  } else if (energyGrid[y][x] >= 9) {
    energyGrid[y][x] = 0;
    alreadyFlashed.add(key);
    flashCount += 1;

    for (const neighbor of getNeighbors(x, y)) {
      increaseEnergy(neighbor);
    }
  } else {
    energyGrid[y][x] += 1;
  }
}

for (let step = 1; step <= STEPS; step++) {
  alreadyFlashed.clear();

  for (let y = 0; y < COLS; y++) {
    for (let x = 0; x < ROWS; x++) {
      increaseEnergy([x, y]);
    }
  }

  console.log(step, flashCount);
  console.log(energyGrid.map((val) => val.join("")).join("\n"));
}
