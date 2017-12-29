import { readFile } from 'fs';
import * as _ from 'lodash';
import { promisify } from 'util';

const part1 = (input: string) {
    const inpArr = _.map(input.split('\n'), r => r.split(' => '));
    const inpMatrices = _.map(inpArr, v => _.map(v, r => r.split('/')));
    console.log(inpMatrices);
};

const part2 = (input: string) {
};

(async () => {
    const inp = await promisify(readFile)('day21/input.txt', 'utf8');
    // const testInp = await promisify(readFile)('day21/sampleinput.txt', 'utf8');
    console.log(`Part 1 - Sample Input: ${part1(testInp)}`);
    console.log(`Part 1 - Real Input: ${part1(inp)}`);
    // console.log(`Part 2 - Sample Input: ${part2(testInp2)}`);
    console.log(`Part 2 - Real Input: ${part2(inp)}`);
})();
