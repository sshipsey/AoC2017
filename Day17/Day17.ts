import * as _ from 'lodash';

const part1 = (input: number) => {
    const arr: number[] = [0];
    let ptr = 0;
    for (let val = 1; val < 2018; val++) {
        ptr = ((ptr + input) % arr.length) + 1;
        arr.splice(ptr, 0, val);
    }
    return arr[ptr + 1];
};

const part2 = (input: number) => {
    let ptr = 0;
    let a = 0;
    for (let val = 1; val < 50000001; val++) {
        ptr = ((ptr + input) % val) + 1;
        if (ptr === 1) {
            a = val;
        }
    }

    return a;
};

const inp = 356;
const inpSample = 3;
const bufferLen = 2017;
console.log(part1(inpSample));
console.log(part1(inp));
// console.log(part2(inpSample));
console.log(part2(inp));