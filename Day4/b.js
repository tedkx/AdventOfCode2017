let input = document.getElementsByTagName('pre')[0].innerHTML.trim().split('\n').map(s => s.trim().split(' ')),
    validPassphrases = 0;

for(let passphrase of input) {
    let obj = {},
        valid = true;

    for(let word of passphrase) {
        let sortedWord = word.split('').sort().join('');
        if(obj[sortedWord] === true) {
            valid = false;
            break;
        }
        obj[sortedWord] = true;
    }
    valid === true && validPassphrases++;
}

console.log('VALID PASSPHRASES =', validPassphrases);