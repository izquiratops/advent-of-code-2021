const fs = require("fs");
const input = fs.readFileSync(__dirname + "/data.txt").toString();

// Dots state
const dots = new Map();
const folds = [];

// Paper size
let height = 0;
let width = 0;

// Read input, fill dots map with it
function parseInputData() {
  const checkBoundaries = (coords) => {
    const [x, y] = coords.split(",");
    width = Math.max(x, width);
    height = Math.max(y, height);
  };

  const lines = input.split(/\r?\n/);
  for (const line of lines) {
    if (line.startsWith("fold along")) {
      // ['fold', 'along', 'y', '5']
      const [direction, position] = line.split(/\s|=/).slice(-2);
      folds.push({ direction, position: parseInt(position) });
    } else if (line.length > 0) {
      // Check on every dot if the paper size should be enlarged
      checkBoundaries(line);
      dots.set(line, 1);
    }
  }
}

function renderPaper(iter = null) {
  const fold = folds[iter];
  let message = "";

  for (let y = 0; y <= height; y++) {
    if (fold?.direction === "y" && fold?.position === y) {
      // Draw horizontal line (y fold)
      message += "-".repeat(width + 1);
    } else {
      for (let x = 0; x <= width; x++) {
        // Draw vertical line (x fold)
        if (fold?.direction === "x" && fold?.position === x) {
          message += "|";
        }

        // Draw dot
        message += dots.has(`${x},${y}`) ? "#" : ".";
      }
    }

    message += "\n";
  }

  console.log(message);
}

function applyFold(iter) {
  const fold = folds[iter];

  if (fold.direction === "x") {
    for (const key of dots.keys()) {
      const dot = key.split(",").map(Number);

      if (dot[0] >= fold.position) {
        dots.delete(key);
        const id = `${2 * fold.position - dot[0]},${dot[1]}`;
        dots.set(id, 1);
      }
    }

    width = fold.position - 1;
  } else {
    for (const key of dots.keys()) {
      const dot = key.split(",").map(Number);

      if (dot[1] >= fold.position) {
        dots.delete(key);
        const id = `${dot[0]},${2 * fold.position - dot[1]}`;
        dots.set(id, 1);
      }
    }

    height = fold.position - 1;
  }
}

// Let's make some foldings 👏

parseInputData();

// console.log(`----- Original -----`);
// renderPaper();

console.log(`------ Iter 0 ------`);
// renderPaper(0);
applyFold(0);
// renderPaper();

console.log("Size:", dots.size);

// console.log(`------ Iter 1 ------`);
// renderPaper(1);
// applyFold(1);
// renderPaper();
