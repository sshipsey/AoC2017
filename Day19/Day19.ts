import { readFile } from 'fs';
import * as _ from 'lodash';
import { promisify } from 'util';

const part1 = (input: string) => {
    let grid = _.map(input.split('\n'), v => v.split(''));
    const h = grid.length;
    const w = _.max(_.map(grid, r => r.length)) || 0;
    grid = _.map(grid, r => _.concat(r, ' '.repeat(r.length - w).split('')));
    // Find entry
    let x = _.indexOf(grid[0], '|');
    let y = 0;
    let dir = 0;
    const chars: string[] = [];
    while (true) {
        if (/^[a-zA-Z]+$/.test(grid[y][x])) {
            chars.push(grid[y][x]);
        }

        // Turn if needed
        if (grid[y][x] === '+') {
            dir = (dir === 0 || dir === 2)
                ? (grid[y][x + 1] !== ' ' ? 3 : 1)
                : (dir = grid[y + 1][x] !== ' ' ? 0 : 2);
        }

        // Move
        switch (dir) {
            case 0:
                if (y >= h) { return chars.join(''); }
                y += 1;
                break;
            case 1:
                if (x <= 0) { return chars.join(''); }
                x -= 1;
                break;
            case 2:
                if (y <= 0) { return chars.join(''); }
                y -= 1;
                break;
            default:
                if (x >= w) { return chars.join(''); }
                x += 1;
                break;
        }

        if (grid[y][x] === ' ') {
            return chars.join('');
        }
    }
};

const part2 = (input: string) => {
    let grid = _.map(input.split('\n'), v => v.split(''));
    const h = grid.length;
    const w = _.max(_.map(grid, r => r.length)) || 0;
    grid = _.map(grid, r => _.concat(r, ' '.repeat(r.length - w).split('')));
    // Find entry
    let x = _.indexOf(grid[0], '|');
    let y = 0;
    let dir = 0;
    let count = 0;
    while (true) {
        count++;

        // Turn if needed
        if (grid[y][x] === '+') {
            dir = (dir === 0 || dir === 2)
                ? (grid[y][x + 1] !== ' ' ? 3 : 1)
                : (dir = grid[y + 1][x] !== ' ' ? 0 : 2);
        }

        // Move
        switch (dir) {
            case 0:
                if (y >= h) { return count; }
                y += 1;
                break;
            case 1:
                if (x <= 0) { return count; }
                x -= 1;
                break;
            case 2:
                if (y <= 0) { return count; }
                y -= 1;
                break;
            default:
                if (x >= w) { return count; }
                x += 1;
                break;
        }

        if (grid[y][x] === ' ') {
            return count;
        }
    }
};

(async () => {
    const inp = await promisify(readFile)('day19/input.txt', 'utf8');
    const testInp = await promisify(readFile)('day19/sampleinput.txt', 'utf8');
    // console.log(`Part 1 - Sample Input: ${part1(testInp)}`);
    console.log(`Part 1 - Real Input: ${part1(inp)}`);
    // console.log(`Part 2 - Sample Input: ${part2(testInp2)}`);
    console.log(`Part 2 - Real Input: ${part2(inp)}`);
})();