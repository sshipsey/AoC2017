import { readFile } from 'fs';
import * as _ from 'lodash';
import { promisify } from 'util';

const part1 = (input: string) => {
    const inpArr = _.map(
        _.map(input.split('\n'), p => p.replace(' <-> ', ', ')),
        v => v.split(', '));
    const allValues = _.map(inpArr, v => v[0]);
    let matches = ['0'];

    return getAllMatches(inpArr, matches);
};

const getAllMatches = (inpArr: string[][], matches: string[]): string[] => {
    for (const d of inpArr) {
        for (const c of inpArr) {
            if (_.intersection(matches, c).length > 0) {
                matches = _.uniq(_.concat(matches, c));
            } else {
                getAllMatches(inpArr, c);
            }
        }
    }
    return matches;
}

const part2 = (input: string) => {
    const inpArr = _.map(
        _.map(input.split('\n'),
        p => p.replace(' <-> ', ', ')),
        v => v.split(', '));

    const queue: string[] = [];
    let idx = 0;
    let groups: string[][] = [[]];
    queue.push(...inpArr[0].slice(1));
    groups[idx].push(inpArr[0][0]);
    while (idx < inpArr.length) {
        if (_.indexOf(_.flatten(groups), inpArr[idx][0]) > -1) {
            idx++;
        } else {

        }
    }
    
    // return matches.length;
};

(async () => {
    const inp = await promisify(readFile)('day12/input.txt', 'utf8');
    const testInp = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;
    // console.log(`Part 1 - Sample Input: ${part1(testInp)}`);
    // console.log(`Part 1 - Real Input: ${part1(inp)}`);
     console.log(`Part 2 - Sample Input: ${part2(testInp)}`);
    // console.log(`Part 2 - Real Input: ${part2(inp)}`);
})();