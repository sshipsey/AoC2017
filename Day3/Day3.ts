import * as _ from 'lodash';
import * as global from '../global_functions';

// Part 1: Speed
const part1 = (input: number) => {
    let x = 0;
    let y = 0;
    let n = 0;
    let width = 0;
    let dir = 1;
    while (n < input) {
        if (dir === 1) { x += 1; }
        if (dir === 2) { y += 1; }
        if (dir === 3) { x -= 1; }
        if (dir === 4) { y -= 1; }

        if (x > width && -y === width) {
            dir = 2;
            width++;
        } else if (y === width && x === width) {
            dir = 3;
        } else if (-x === width && y === width) {
            dir = 4;
        } else if (-y === width && -x === width) {
            dir = 1;
        }
        n++;
    }
    return Math.abs(x) + Math.abs(y);
};

interface Coords {
    [key: string]: number;
}

// Part 2: Speed
const part2 = (input: number) => {
    const grid: Coords = {};
    grid['0,0'] = 1;
    let x = 0;
    let y = 0;
    let n = 1;
    let width = 0;
    let dir = 1;
    while (n < input) {
        if (dir === 1) { x += 1; }
        if (dir === 2) { y += 1; }
        if (dir === 3) { x -= 1; }
        if (dir === 4) { y -= 1; }

        if (x > width && -y === width) {
            dir = 2;
            width++;
        } else if (y === width && x === width) {
            dir = 3;
        } else if (-x === width && y === width) {
            dir = 4;
        } else if (-y === width && -x === width) {
            dir = 1;
        }
        n = sumNeighbors(x, y, grid);
        grid[`${x},${y}`] = n;
        console.log(n);
    }

    return n;
};

const sumNeighbors = (x: number, y: number, coords: {[key: string]: number}) => {
    return _.sum(
        [
            coords[`${x - 1},${y - 1}`] === undefined ? 0 : coords[`${x - 1},${y - 1}`],
            coords[`${x - 1},${y}`] === undefined ? 0 : coords[`${x - 1},${y}`],
            coords[`${x - 1},${y + 1}`] === undefined ? 0 : coords[`${x - 1},${y + 1}`],
            coords[`${x},${y - 1}`] === undefined ? 0 : coords[`${x},${y - 1}`],
            coords[`${x},${y + 1}`] === undefined ? 0 : coords[`${x},${y + 1}`],
            coords[`${x + 1},${y - 1}`] === undefined ? 0 : coords[`${x + 1},${y - 1}`],
            coords[`${x + 1},${y}`] === undefined ? 0 : coords[`${x + 1},${y}`],
            coords[`${x + 1},${y + 1}`] === undefined ? 0 : coords[`${x + 1},${y + 1}`]
        ],
    );
};

const inp = 289326;
console.log(part1(inp));
console.log(part2(inp));