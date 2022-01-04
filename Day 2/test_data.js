module.exports = `forward 5
down 5
forward 8
up 3
down 8
forward 2
`.split('\n').map(line => {
    const [cmd, degree] = line.split(' ')
    return [cmd, parseInt(degree)]
})