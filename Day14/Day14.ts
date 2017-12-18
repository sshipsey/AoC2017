import { readFile } from 'fs';
import * as _ from 'lodash';
import { promisify } from 'util';
import { day10part2 } from '../Day10/Day10';

const ConvertBase = (num: string) => {
    return {
        from : (baseFrom: number) => {
            return {
                to : (baseTo: number) => {
                    return parseInt(num, baseFrom).toString(baseTo);
                },
            };
        },
    };
};

// hexadecimal to binary
const hex2bin = (num: string) => {
    return ConvertBase(num).from(16).to(2);
};

// v => v.length > 3 ? v : v.length > 2 ? `0${v}` : v.length > 1 ? `00${v}` : `000${v}`

const part1 = (input: string) => {
    let n = 0;
    let score = 0;
    for (n; n < 128; n++) {

        const hash = _.map(day10part2(`${input}-${n}`),

                b => hex2bin(b))
                .join('');

        console.log(hash.length);
        score += _.sum(_.map(hash.split(''), v => +v));
    }

    return score;
};

(async () => {
    const inp = await promisify(readFile)('day14/input.txt', 'utf8');
    const testInp = `flqrgnkx`;
//    console.log(`Part 1 - Sample Input: ${part1(testInp)}`);
    console.log(`Part 1 - Real Input: ${part1(inp)}`);
    // console.log(`Part 2 - Sample Input: ${part2(testInp)}`);
    // console.log(`Part 2 - Real Input: ${part2(inp)}`);
})();