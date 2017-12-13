import { readFile } from 'fs';
import * as _ from 'lodash';
import { promisify } from 'util';

const part1 = (input: string) => {
    let score = 0;
    let idx = 0;
    // Setup scanners
    const scanners = input.split('\n').map(a => a.split(': ').map(b => +b));
    for (let ps = scanners[0][0];
         ps < scanners[scanners.length - 1][0] - 1;
         ps++) {
        if (ps === scanners[idx][0]) {
            const dr = scanners[idx];
            if (ps % (dr[1] * 2 - 2) === 0) {
                score += dr[0] * dr[1];
            }
            idx++;
        }
    }

    return score;
};

const part2 = (input: string) => {
    // Setup scanners
    const scanners = input.split('\n').map(a => a.split(': ').map(b => +b));
    let offset = -1;
    while (true) {
        let idx = 0;
        offset++;
        let ps = offset;
        while (idx < scanners.length) {
            if (ps - offset === scanners[idx][0]) { // We encountered a scanner
                const dr = scanners[idx];  // Scanner details
                if (ps % (dr[1] * 2 - 2) === 0) { // We hit the laser rip
                    break;
                }
                idx++;
            }
            ps++;
        }
        if (idx >= scanners.length) {
            return offset;
        }
   }
};

(async () => {
    const inp = await promisify(readFile)('day13/input.txt', 'utf8');
    const testInp = `0: 3
1: 2
4: 4
6: 4`;
    console.log(`Part 1 - Sample Input: ${part1(testInp)}`);
    console.log(`Part 1 - Real Input: ${part1(inp)}`);
    console.log(`Part 2 - Sample Input: ${part2(testInp)}`);
    console.log(`Part 2 - Real Input: ${part2(inp)}`);
})();