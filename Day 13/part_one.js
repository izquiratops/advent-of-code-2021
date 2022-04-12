const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data_test.txt").toString();
const lines = input.split(/\r?\n/);
const dots = new Map();
const folds = [];

let height = 0;
let width = 0;

// read from input
lines.forEach((line) => {
  if (line.startsWith("fold along")) {
    // ['fold', 'along', 'y', '5']
    const [direction, position] = line.split(/\s|=/).slice(-2);
    folds.push({ direction, position: parseInt(position) });
  } else if (line.length > 0) {
    // track paper dimension
    const [x, y] = line.split(",");
    width = Math.max(x, width);
    height = Math.max(y, height);
    // save dot
    dots.set(line, 1);
  }
});

function foldPaper(fold) {
  dots.forEach((val, key) => {
    const dot = key.split(",").map(Number);

    if (fold.direction === "x" && dot[0] >= fold.position) {
      dots.delete(key);
      const id = `${2 * fold.position - dot[0]}, ${dot[1]}`;
      dots.set(id, 1);
    } else if (fold.direction === "y" && dot[1] >= fold.position) {
      dots.delete(key);
      const id = `${dot[0]}, ${2 * fold.position - dot[1]}`;
      dots.set(id, 1);
    }
  });
}

foldPaper(folds[0]);

console.log(dots.size);
