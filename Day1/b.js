let input = document.getElementsByTagName('pre')[0].innerHTML.trim(),
    diff = input.length / 2,
    sum = 0;

for(let i = 0; i < input.length; i++)
    if(input[i] == input[otheridx])
        sum += parseInt(input[i]); 

console.log('SUM =', sum);