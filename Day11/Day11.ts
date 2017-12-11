import { readFile } from 'fs';
import * as _ from 'lodash';
import { promisify } from 'util';

class Position {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
const moveMap: { [key: string]: (p: Position) => Position } = {
    n: (p: Position) => new Position(p.x, ++p.y),
    s: (p: Position) => new Position(p.x, --p.y),
    nw: (p: Position) => new Position(p.x -= 0.5, p.y += 0.5),
    ne: (p: Position) => new Position(p.x += 0.5, p.y += 0.5),
    sw: (p: Position) => new Position(p.x -= 0.5, p.y -= 0.5),
    se: (p: Position) => new Position(p.x += 0.5, p.y -= 0.5),
};

const part1 = (input: string) => {
    let pos: Position = {x: 0, y: 0};

    for (const move of input.split(',')) {
        pos = moveMap[move](pos);
    }

    return calcDistance(pos);
};

const part2 = (input: string) => {
    let pos: Position = {x: 0, y: 0};
    let maxDistance = 0;
    for (const move of input.split(',')) {
        pos = moveMap[move](pos);
        maxDistance = calcDistance({...pos}) > maxDistance ? calcDistance({...pos}) : maxDistance;
    }
    return maxDistance;
};

const calcDistance = (pos: Position) => {
    let steps = 0;
    while (pos.x !== 0 || pos.y !== 0) {
        if (pos.x > 0 && pos.y > 0) {
            pos = moveMap['sw'](pos);
        } else if (pos.x > 0 && pos.y < 0) {
            pos = moveMap['nw'](pos);
        } else if (pos.x < 0 && pos.y > 0) {
            pos = moveMap['se'](pos);
        } else if (pos.x < 0 && pos.y < 0) {
            pos = moveMap['ne'](pos);
        } else if (pos.y > 0) {
            pos = moveMap['s'](pos);
        } else if (pos.y < 0) {
            pos = moveMap['n'](pos);
        } else if (pos.x > 0) {
            pos = moveMap['nw'](pos);
        } else {
            pos = moveMap['ne'](pos);
        }
        steps++;
    }
    return steps;
}

(async () => {
    const inp = await promisify(readFile)('day11/input.txt', 'utf8');
    const testInp = `se,sw,se,sw,sw`;
    console.log(`Part 1 - Sample Input: ${part1(testInp)}`);
    console.log(`Part 1 - Real Input: ${part1(inp)}`);
    console.log(`Part 2 - Sample Input: ${part2(testInp)}\nPart 2 - Real Input: ${part2(inp)}`);
})();