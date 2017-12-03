let rows = document.getElementsByTagName('pre')[0].innerHTML
        .trim()
        .split('\n')
        .map(row => row.split('\t').map(c => parseInt(c))),
    sum = 0;

for(let row of rows) {
    let div = 0;
    for(let i = 0; i < row.length; i++) {
        if(div != 0)
            break;
        for(let j = i; j < row.length; j++) {
            if(i != j && row[i] % row[j] == 0) {
                div = row[i] / row[j];
                break;
            } else if (i != j && row[j] % row[i] == 0) {
                div = row[j] / row[i];
                break;
            }
        }
    }
    
    sum += div;
}

console.log('CHECKSUM = ', sum);