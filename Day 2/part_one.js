const commands = require('./data')

let horizontal_position = 0
let depth = 0

for (let idx = 0; idx < commands.length; idx++) {
    let [command, degree] = commands[idx]

    if (command === 'forward') {
        horizontal_position = horizontal_position + degree
    } else if (command === 'up') {
        depth = depth - degree
    } else if (command === 'down') {
        depth = depth + degree
    }
}

console.log(horizontal_position, depth)
console.log('result:', horizontal_position * depth)