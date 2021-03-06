const commands = parseCommands(data)
let horizontal_position = 0
let depth = 0
let aim = 0

function parseCommands(value) {
    return value.split('\n').map(line => {
        const [cmd, degree] = line.split(' ')
        return [cmd, parseInt(degree)]
    })
}

for (let idx = 0; idx < commands.length; idx++) {
    let [command, degree] = commands[idx]

    if (command === 'forward') {
        horizontal_position = horizontal_position + degree
        depth = depth + (aim * degree)
    } else if (command === 'up') {
        aim = aim - degree
    } else if (command === 'down') {
        aim = aim + degree
    }
}

console.log(horizontal_position, depth)
// 10366575 is low
console.log('result:', horizontal_position * depth)