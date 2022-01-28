// use with test_data content
// data_part_one.replace(/ \|\n/g, ' | ').split('\n')

const instances = data.split('\n').map(line => {
    let [signal, output] = line.split(' | ')
    return {
        signal: signal.split(' '),
        output: output.split(' ')
    }
})

let total = 0
for (let instance of instances) {
    for (let value of instance.output) {
        if (value.length === 2 || value.length === 3 || value.length === 4 || value.length === 7) {
            total++
        }
    }
}

console.log(instances, total)