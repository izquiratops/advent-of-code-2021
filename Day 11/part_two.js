const energyGrid = data.split("\n").map((x) => x.split("").map(Number));

const ROWS = energyGrid.length;
const COLS = energyGrid[0].length;
const OCTO_COUNT = ROWS * COLS;
const STEPS = 1000;

let stepFlashCount;
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
    stepFlashCount += 1;
    alreadyFlashed.add(key);

    for (const neighbor of getNeighbors(x, y)) {
      increaseEnergy(neighbor);
    }
  } else {
    energyGrid[y][x] += 1;
  }
}

function isCurrentlySynchronized() {
  const flattenedGrid = energyGrid.flat();
  const flashedGrid = flattenedGrid.filter((val) => val === 0);

  return flashedGrid.length === flattenedGrid.length;
}

stepLoop: for (let step = 1; step <= STEPS; step++) {
  stepFlashCount = 0;
  alreadyFlashed.clear();

  for (let y = 0; y < COLS; y++) {
    for (let x = 0; x < ROWS; x++) {
      increaseEnergy([x, y]);
    }
  }

  if (stepFlashCount === OCTO_COUNT) {
    console.log("!", step);
    break stepLoop;
  }
}
