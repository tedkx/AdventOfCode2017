let rows = document.getElementsByTagName('pre')[0].innerHTML
        .trim()
        .split('\n')
        .map(row => row.split('\t')),
    sum = 0;

for(let row of rows) {
    let min = parseInt(row[0]),
        max = -1;
    for(let num of row) {
        let currentNum = parseInt(num);
        if(min > currentNum)
            min = currentNum;
        if(max < currentNum)
            max = currentNum;
    }

    sum += (max - min);
}

console.log('CHECKSUM = ', sum);