let input = document.getElementsByTagName('pre')[0].innerHTML.trim(),
    banks = input.split('\t').filter(s => s != '').map(s => parseInt(s, 10)),
    cache = {},
    cycles = 0;

while(true) {
    // select largest
    let blocks = 0,
        idx = -1;
    banks.forEach((b, i) => {
        if(b > blocks) {
            blocks = b;
            idx = i;
        }            
    });

    // redistribute
    banks[idx] = 0;
    idx++;
    while(blocks > 0) {
        if(idx >= banks.length)
            idx = 0;
        banks[idx]++;
        idx++;
        blocks--;
    }

    cycles++;
    let key = banks.join('_');

    if(cache[key]) {
        console.log('CYCLES =', cycles - cache[key]);
        break;
    }
        
    cache[key] = cycles;
}