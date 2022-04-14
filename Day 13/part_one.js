const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data_test.txt").toString();
const dots = new Map();
const folds = [];

let height = 0;
let width = 0;

function loadData() {
    const checkBoundaries = (coords) => {
        const [x, y] = coords.split(",");
        width = Math.max(x, width);
        height = Math.max(y, height);
    };

    const lines = input.split(/\r?\n/);
    lines.forEach((line) => {
        if (line.startsWith("fold along")) {
            // ['fold', 'along', 'y', '5']
            const [direction, position] = line.split(/\s|=/).slice(-2);
            folds.push({direction, position: parseInt(position)});
        } else if (line.length > 0) {
            checkBoundaries(line);
            dots.set(line, 1);
        }
    });
}

function renderPaper(fold) {
    let message = '';

    for (let y = 0; y <= height; y++) {
        if (fold.direction === 'y' && fold.position === y) {
            message.concat('-'.repeat(width));
        } else {
            for (let x = 0; x <= width; x++) {
                if (fold.direction === 'x' && fold.position === x) {
                    message.concat('|');
                }

                // Draw dot
                message.concat(dots.has(`${x},${y}`) ? '#' : '.');
            }
        }

        message.concat('\n');
    }

    console.log(message);
}

function applyFold(fold) {
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

loadData();

renderPaper(folds[0]);
applyFold(folds[0]);

console.log(dots.size);
