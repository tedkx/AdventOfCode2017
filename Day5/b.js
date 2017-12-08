let input = document.getElementsByTagName('pre')[0].innerHTML.trim(),
    instructions = input.split('\n').map(s => parseInt(s, 10)),
    steps = 0,
    idx = 0;

while(true) {
    if(idx < 0 || idx >= instructions.length)
        break;

    let prevIdx = idx;
    idx += instructions[idx];

    steps++;
    (instructions[prevIdx] >= 3 && instructions[prevIdx]--) || instructions[prevIdx]++;
}

console.log('STEPS', steps);