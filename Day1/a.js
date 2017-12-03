let input = document.getElementsByTagName('pre')[0].innerHTML.trim(),
    sum = 0,
    prev = null;

for(let num of input.concat(input[0])) { 
    if(num == prev) 
        sum += parseInt(num); 
    prev = num; 
} 

console.log('SUM =', sum);