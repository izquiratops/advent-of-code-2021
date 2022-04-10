const fs = require("fs");

const input = fs.readFileSync(__dirname + "/data.txt").toString();
const lines = input.split(/\r?\n/);
const dots = new Map();
const folds = [];
