let input = document.getElementsByTagName('pre')[0].innerHTML.trim().split('\n').map(s => s.trim().split(' ')),
    validPassphrases = 0;

for(let passphrase of input) {
    let obj = {},
        valid = true;
    
    for(let word of passphrase) {
        if(obj[word] === true) {
            valid = false;
            break;
        }
        obj[word] = true;
    }
    valid === true && validPassphrases++;
}

console.log('VALID PASSPHRASES =', validPassphrases);