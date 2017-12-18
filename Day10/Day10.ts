/* tslint:disable */
import * as _ from 'lodash';

// Part 1 - Speed
const part1 = (input: string) => {
    let ptr = 0;
    let lengths = input.split(',').map(v => +v);
    let arr = _.range(0, 256);
    let subArr:number[] = [];
    let skipSize = 0;
    for (let i = 0; i < lengths.length; i++) {       

        for (let j = 0; j < lengths[i]; j++) {
            subArr.push(arr[(ptr + j) % arr.length]);
        }

        for (let k = 0; k < lengths[i]; k++) {
            arr[(ptr + k) % arr.length] = subArr.pop() || 0;
        }

        ptr += (lengths[i] + skipSize) % arr.length;
        skipSize += 1;

    }
    return arr[0] * arr[1];
};

// Part 2 - Speed
export const day10part2 = (input: string) => {
    let ptr = 0;
    let lengths = input.split('').map(v => v.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
    let arr = _.range(0, 256);
    let subArr:number[] = [];
    let skipSize = 0;
    
    for (let rounds = 0; rounds < 64; rounds++) {
        for (let l of lengths) {       

            for (let j = 0; j < l; j++) {
                subArr.push(arr[(ptr + j) % arr.length]);
            }

            for (let k = 0; k < l; k++) {
                arr[(ptr + k) % arr.length] = subArr.pop() || 0;
            }

            ptr += (l + skipSize) % arr.length;
            skipSize += 1;
        }
    }
    const sparseHash = _.chunk(arr, 16);
    const denseHash = _.map(sparseHash, chunk => _.reduce(chunk, (a, b) =>  a^b, 0));

    return _.map(
        _.map(denseHash, v => v.toString(16)),
        v => v.length > 1 ? v : `0${v}`)
        .join('');
};

const inp = `165,1,255,31,87,52,24,113,0,91,148,254,158,2,73,153`;
console.log(part1(inp));
console.log(day10part2(inp));