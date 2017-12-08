const orientationIncrementers = [
        point => ({ x: point.x, y: point.y + 1 }), // upward
        point => ({ x: point.x - 1, y: point.y }), // westward
        point => ({ x: point.x, y: point.y - 1 }), // downward
        point => ({ x: point.x + 1, y: point.y }), // eastward
    ],
    switchOrientation = orientation => orientation >= (orientationIncrementers.length - 1) ? 0 : orientation + 1,
    widthCalculator = radius => radius * 2 + 1,
    dimsToKey = (x, y) => `${x}:${y}`,
    pointToKey = point => dimsToKey(point.x, point.y),
    sum = point => {
        let s = 0;
        for(i = -1; i <= 1; i++) {
            for(j = -1; j <= 1; j++) {
                if(j != 0 || i != 0) {
                    s += spiral[dimsToKey(point.x + i, point.y + j)] || 0;
                }
            }
        }
            
        return s;
    },
    input = 347991;

let point = { x: 0, y: 0 },
    spiral = { [pointToKey(point)]: 1 },
    radius = 0,
    orientation = 3,
    width = widthCalculator(radius),
    incrementer = orientationIncrementers[orientation],
    advanceOrientation = () => {
        orientation = switchOrientation(orientation);
        incrementer = orientationIncrementers[orientation];
    };

while(true) {
    let shouldAdvance = false;
    if(Math.abs(point.x) == radius && Math.abs(point.y) == radius) {
        if(point.x - radius == 0 && point.y + radius == 0) {
            radius++
            shouldAdvance = true;
        } else {
            advanceOrientation();
        }
    }

    point = incrementer(point);

    let key = pointToKey(point),
        value = sum(point);
    spiral[key] = value;

    if(value > input) {
        console.log('VALUE =', value);
        break;
    }

    if(shouldAdvance)
        advanceOrientation();
}
