const corners = [
        { coordsCalc: (dimension, value) => [value, -1 * dimension], valueCoeff: 1 },   //bottom right
        { coordsCalc: (dimension, value) => [-1 * dimension, value], valueCoeff: 2 },  //bottom left
        { coordsCalc: (dimension, value) => [value, dimension], valueCoeff: 3 },   //top left
        { coordsCalc: (dimension, value) => [dimension, value], valueCoeff: 4 }     //top right
    ],
    getCoords = (input, spiralWidth, spiralMax) => {
        for(let cornerObj of corners) {
            let cornerBase = spiralMax - (spiralWidth - 1) * cornerObj.valueCoeff;
            if(cornerBase > input)
                continue;

            let dimension = Math.floor(spiralWidth / 2),
                value = dimension - (input - cornerBase);
            
            return cornerObj.coordsCalc(dimension, value);
        }
    },
    distanceCalc = coord => Math.abs(coord[0] - coord[1]),
    calc = c => Math.pow(2 * c + 1, 2);

var input = 347991;

let spiralMax = 0,
    currentSpiral = 0;

while(spiralMax < input)
    spiralMax = calc(++currentSpiral);

let coords = getCoords(input, 2 * currentSpiral + 1, spiralMax);

console.log('STEPS =', distanceCalc(coords));

