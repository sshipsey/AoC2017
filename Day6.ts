import * as _ from 'lodash';

// Part 1 - Speed
const part1 = (input: string) => {
    let cur = input.split('\t').map(v => +v);
    let seen: string[] = [];
    let ptr = 0;
    let dist = 0;``
    let count = 0;
    while (true) {
        ptr = _.indexOf(cur, _.max(cur));
        dist = cur[ptr];
        cur[ptr] = 0;
        for (let i = 0; i < dist; i++) {
            cur[(ptr + i + 1) % cur.length] += 1;
        }
        count++;
        if (!_.includes(seen, cur.join('').toString())) {
            seen.push(cur.join('').toString());
        } else {
            break;
        }
    }

    return count;
}

// Part 2 - Speed
const part2 = (input: string) => {
    let cur = input.split('\t').map(v => +v);
    let seen: string[] = [];
    let ptr = 0;
    let dist = 0;
    let count = 0;
    while (true) {
        ptr = _.indexOf(cur, _.max(cur));
        dist = cur[ptr];
        cur[ptr] = 0;
        for (let i = 0; i < dist; i++) {
            cur[(ptr + i + 1) % cur.length] += 1;
        }
        count++;
        if (!_.includes(seen, cur.join('').toString())) {
            seen.push(cur.join('').toString());
        } else {
            return count - _.indexOf(seen, cur.join('').toString()) - 1;
        }
    }
}

const input = `2	8	8	5	4	2	3	1	5	5	1	2	15	13	5	14`;

console.log(part1(input));
console.log(part2(input));