import { readFile } from 'fs';
import * as _ from 'lodash';
import { promisify } from 'util';

const part1 = (input: string) => {
    const inpArr = _.map(
        _.map(input.split('\r\n'), p => p.replace(' <-> ', ', ')),
        v => v.split(', '));
    const allValues = _.map(inpArr, v => v[0]);
    let matches = ['0'];

    console.log(getAllMatches(inpArr, matches));
};

const getAllMatches = (inpArr: string[][], matches: string[]): string[] => {
    for (const d of inpArr) {
        for (const c of inpArr) {
            if (_.intersection(matches, c).length > 0) {
                matches = _.uniq(_.concat(matches, c));
            } else {
                return getAllMatches(inpArr, c);
            }
        }
    }
    return matches;
}

const part2 = (input: string) => {
    const inpArr = _.map(
        _.map(input.split('\r\n'), p => p.replace(' <-> ', ', ')),
        v => v.split(', '));
    const allValues = _.map(inpArr, v => v[0]);
    let matches = ['0'];
    for (const d of inpArr) {
        for (const c of inpArr) {
            if (_.intersection(matches, c).length > 0) {
                matches = _.uniq(_.concat(matches, c));
            }
        }
    }

    return matches.length;
};

(async () => {
    const inp = await promisify(readFile)('day12/input.txt', 'utf8');
    const testInp = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;
    console.log(`Part 1 - Sample Input: ${part1(testInp)}`);
    console.log(`Part 1 - Real Input: ${part1(inp)}`);
    console.log(`Part 2 - Sample Input: ${part2(testInp)}`);
    console.log(`Part 2 - Real Input: ${part2(inp)}`);
})();