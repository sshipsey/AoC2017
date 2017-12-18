import { readFile } from 'fs';
import * as _ from 'lodash';
import { promisify } from 'util';

const rgx = /(\w)(\d+|\w)(?:\/)?(\d+|\w)?/i;

const parseMove = (currentStr: string, move: string) => {
    const moveArr = move.match(rgx) || [];
    const strArr = currentStr.split('');
    switch (moveArr[1]) {
        case 's':
            return _.concat(_.takeRight(currentStr, +moveArr[2]), _.dropRight(currentStr, +moveArr[2])).join('');
        case 'x':
            const t = strArr[+moveArr[2]];
            strArr[+moveArr[2]] = strArr[+moveArr[3]];
            strArr[+moveArr[3]] = t;
            return strArr.join('');
        case 'p':
            const idx = _.indexOf(strArr, moveArr[3]);
            strArr[_.indexOf(strArr, moveArr[2])] = moveArr[3];
            strArr[idx] = moveArr[2];
            return strArr.join('');
        }
};

const doDanceMove = (str: string, moves: string) => {
    for (const mv of moves.split(',')) {
        str = parseMove(str, mv) || '';
    }
    return str;
};

const part1 = (str: string, moves: string) => {
    return doDanceMove(str, moves);
};

const part2 = (str: string, moves: string) => {
    let i = 1;
    while (true) {
        str = doDanceMove(str, moves);
        if (str === 'abcdefghijklmnop') {
            for (let j = 0; j < 1000000000 % i; j++) {
                str = doDanceMove(str, moves);
            }
            return str;
        } else {
            i += 1;
        }
    }
};

(async () => {
    const inp = await promisify(readFile)('day16/input.txt', 'utf8');
    const testInp = `s1,x3/4,pe/b`;
    const initial = `abcdefghijklmnop`;
    console.log(`Part 1 - Sample Input: ${part1(`abcde`, testInp)}`);
    console.log(`Part 1 - Real Input: ${part1(initial, inp)}`);

    console.log(`Part 2 - Real Input: ${part2(initial, inp)}`);
})();