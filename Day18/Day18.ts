import { readFile } from 'fs';
import * as _ from 'lodash';
import { promisify } from 'util';

const part1 = (input: string) => {
    let lastSound = 0;
    let ptr = 0;
    const lookup = new Map<string, number>();
    const inpArr = input.split('\n');
    while (true) {
        const op = _.take(inpArr[ptr], 3).join('');
        const varName = inpArr[ptr].split(' ')[1];
        const num = inpArr[ptr].split(' ')[2];
        const numValue = isNaN(num as any) ? (lookup.get(num) || 0) : +num;

        switch (op) {
            case 'set':
                lookup.set(varName, numValue);
                break;
            case 'add':
                lookup.set(varName, (lookup.get(varName) || 0) + numValue);
                break;
            case 'mul':
                lookup.set(varName, (lookup.get(varName) || 0) * numValue);
                break;
            case 'mod':
                lookup.set(varName, (lookup.get(varName) || 0) % numValue);
                break;
            case 'rcv':
                if (lastSound > 0) {
                    return lastSound;
                }
                break;
            case 'snd':
                lastSound = lookup.get(varName) || 0;
                break;
            case 'jgz':
                if (lookup.get(varName) || 0 > 0) {
                    ptr += numValue;
                } else {
                    ptr += 1;
                }
                break;
        }
        if (op !== 'jgz') {
            ptr += 1;
        }
    }
};

const part2 = (input: string) => {
    let ptr0 = 0;
    let ptr1 = 0;
    const lookup0 = new Map<string, number>();
    const lookup1 = new Map<string, number>();
    const inpArr = input.split('\n');
    const queue0: number[] = [];
    const queue1: number[] = [];
    lookup0.set('p', 0);
    lookup1.set('p', 1);
    let score = 0;
    let p0Locked = false;
    let p1Locked = false;

    while (true) {
        const ops = [_.take(inpArr[ptr0], 3).join(''), _.take(inpArr[ptr1], 3).join('')];
        const varNames = [inpArr[ptr0].split(' ')[1], inpArr[ptr1].split(' ')[1]];
        const nums: string[] = [];
        nums.push(ops[0] !== 'snd' ? inpArr[ptr0].split(' ')[2] : inpArr[ptr0].split(' ')[1]);
        nums.push(ops[1] !== 'snd' ? inpArr[ptr1].split(' ')[2] : inpArr[ptr1].split(' ')[1]);
        const numsValue = [isNaN(nums[0] as any) ? (lookup0.get(nums[0]) || 0) : +nums[0],
                           isNaN(nums[1] as any) ? (lookup1.get(nums[1]) || 0) : +nums[1]];

        switch (ops[0]) {
            case 'set':
                lookup0.set(varNames[0], numsValue[0]);
                break;
            case 'add':
                lookup0.set(varNames[0], (lookup0.get(varNames[0]) || 0) + numsValue[0]);
                break;
            case 'mul':
                lookup0.set(varNames[0], (lookup0.get(varNames[0]) || 0) * numsValue[0]);
                break;
            case 'mod':
                lookup0.set(varNames[0], (lookup0.get(varNames[0]) || 0) % numsValue[0]);
                break;
            case 'rcv':
                if (queue1.length > 0) {
                    lookup0.set(varNames[0], queue1.shift() || 0);
                } else if (p1Locked) {
                    return score;
                } else {
                    ptr0 -= 1; // let's deadlock
                    p0Locked = true;
                }
                break;
            case 'snd':
                queue0.push(numsValue[0]);
                p1Locked = false;
                break;
            case 'jgz':
                if (lookup0.get(varNames[0]) || 0 > 0 || !isNaN(varNames[0] as any)) {
                    ptr0 += numsValue[0];
                } else {
                    ptr0 += 1;
                }

                break;
        }
        if (ops[0] !== 'jgz') {
            ptr0 += 1;
        }

        switch (ops[1]) {
            case 'set':
                lookup1.set(varNames[1], numsValue[1]);
                break;
            case 'add':
                lookup1.set(varNames[1], (lookup1.get(varNames[1]) || 0) + numsValue[1]);
                break;
            case 'mul':
                lookup1.set(varNames[1], (lookup1.get(varNames[1]) || 0) * numsValue[1]);
                break;
            case 'mod':
                lookup1.set(varNames[1], (lookup1.get(varNames[1]) || 0) % numsValue[1]);
                break;
            case 'rcv':
                if (queue0.length > 0) {
                    lookup1.set(varNames[1], queue0.shift() || 0);
                } else if (p0Locked) {
                    return score;
                } else {
                    ptr1 -= 1; // let's deadlock
                    p1Locked = true;
                }
                break;
            case 'snd':
                queue1.push(numsValue[1]);
                score += 1;
                p0Locked = false;
                break;
            case 'jgz':
                if (lookup0.get(varNames[1]) || 0 > 0 || !isNaN(varNames[1] as any)) {
                    ptr1 += numsValue[1];
                } else {
                    ptr1 += 1;
                }
                break;
        }
        if (ops[1] !== 'jgz') {
            ptr1 += 1;
        }
    }
};

(async () => {
    const inp = await promisify(readFile)('day18/input.txt', 'utf8');
    const testInp = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;
    const testInp2 = `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`;
    // console.log(`Part 1 - Sample Input: ${part1(testInp)}`);
    // console.log(`Part 1 - Real Input: ${part1(inp)}`);
    console.log(`Part 2 - Sample Input: ${part2(testInp2)}`);
    console.log(`Part 2 - Real Input: ${part2(inp)}`);
import { readFile } from 'fs';
import * as _ from 'lodash';
import { promisify } from 'util';

const part1 = (input: string) => {
    let lastSound = 0;
    let ptr = 0;
    const lookup = new Map<string, number>();
    const inpArr = input.split('\n');
    while (true) {
        const op = _.take(inpArr[ptr], 3).join('');
        const varName = inpArr[ptr].split(' ')[1];
        const num = inpArr[ptr].split(' ')[2];
        const numValue = isNaN(num as any) ? (lookup.get(num) || 0) : +num;

        switch (op) {
            case 'set':
                lookup.set(varName, numValue);
                break;
            case 'add':
                lookup.set(varName, (lookup.get(varName) || 0) + numValue);
                break;
            case 'mul':
                lookup.set(varName, (lookup.get(varName) || 0) * numValue);
                break;
            case 'mod':
                lookup.set(varName, (lookup.get(varName) || 0) % numValue);
                break;
            case 'rcv':
                if (lastSound > 0) {
                    return lastSound;
                }
                break;
            case 'snd':
                lastSound = lookup.get(varName) || 0;
                break;
            case 'jgz':
                if (lookup.get(varName) || 0 > 0) {
                    ptr += numValue;
                } else {
                    ptr += 1;
                }
                break;
        }
        if (op !== 'jgz') {
            ptr += 1;
        }
    }
};

const part2 = (input: string) => {
    let ptr0 = 0;
    let ptr1 = 0;
    const lookup0 = new Map<string, number>();
    const lookup1 = new Map<string, number>();
    const inpArr = input.split('\n');
    const queue0: number[] = [];
    const queue1: number[] = [];
    lookup0.set('p', 0);
    lookup1.set('p', 1);
    let score = 0;
    let p0Locked = false;
    let p1Locked = false;

    while (true) {
        const ops = [_.take(inpArr[ptr0], 3).join(''), _.take(inpArr[ptr1], 3).join('')];
        const varNames = [inpArr[ptr0].split(' ')[1], inpArr[ptr1].split(' ')[1]];
        const nums: string[] = [];
        nums.push(ops[0] !== 'snd' ? inpArr[ptr0].split(' ')[2] : inpArr[ptr0].split(' ')[1]);
        nums.push(ops[1] !== 'snd' ? inpArr[ptr1].split(' ')[2] : inpArr[ptr1].split(' ')[1]);
        const numsValue = [isNaN(nums[0] as any) ? (lookup0.get(nums[0]) || 0) : +nums[0],
                          isNaN(nums[1] as any) ? (lookup1.get(nums[1]) || 0) : +nums[1]];

        switch (ops[0]) {
            case 'set':
                lookup0.set(varNames[0], numsValue[0]);
                break;
            case 'add':
                lookup0.set(varNames[0], (lookup0.get(varNames[0]) || 0) + numsValue[0]);
                break;
            case 'mul':
                lookup0.set(varNames[0], (lookup0.get(varNames[0]) || 0) * numsValue[0]);
                break;
            case 'mod':
                lookup0.set(varNames[0], (lookup0.get(varNames[0]) || 0) % numsValue[0]);
                break;
            case 'rcv':
                if (queue1.length > 0) {
                    lookup0.set(varNames[0], queue1.shift() || 0);
                } else if (p1Locked) {
                    return score;
                } else {
                    ptr0 -= 1; // let's deadlock
                    p0Locked = true;
                }
                break;
            case 'snd':
                queue0.push(numsValue[0]);
                p1Locked = false;
                break;
            case 'jgz':
                if (varNames[0] === '1' || (lookup0.get(varNames[0]) || 0) > 0) {
                    ptr0 += numsValue[0];
                } else {
                    ptr0 += 1;
                }
                break;
        }
        if (ops[0] !== 'jgz') {
            ptr0 += 1;
        }

        switch (ops[1]) {
            case 'set':
                lookup1.set(varNames[1], numsValue[1]);
                break;
            case 'add':
                lookup1.set(varNames[1], (lookup1.get(varNames[1]) || 0) + numsValue[1]);
                break;
            case 'mul':
                lookup1.set(varNames[1], (lookup1.get(varNames[1]) || 0) * numsValue[1]);
                break;
            case 'mod':
                lookup1.set(varNames[1], (lookup1.get(varNames[1]) || 0) % numsValue[1]);
                break;
            case 'rcv':
                if (queue0.length > 0) {
                    lookup1.set(varNames[1], queue0.shift() || 0);
                } else if (p0Locked) {
                    return score;
                } else {
                    ptr1 -= 1; // let's deadlock
                    p1Locked = true;
                }
                break;
            case 'snd':
                queue1.push(numsValue[1]);
                score += 1;
                p0Locked = false;
                break;
            case 'jgz':
                if (varNames[1] === '1' || (lookup1.get(varNames[1]) || 0) > 0) {
                    ptr1 += numsValue[1];
                } else {
                    ptr1 += 1;
                }
                break;
        }
        if (ops[1] !== 'jgz') {
            ptr1 += 1;
        }
    }
};

(async () => {
    const inp = await promisify(readFile)('day18/input.txt', 'utf8');
    const testInp = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;
    const testInp2 = `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`;
    // console.log(`Part 1 - Sample Input: ${part1(testInp)}`);
    // console.log(`Part 1 - Real Input: ${part1(inp)}`);
    console.log(`Part 2 - Sample Input: ${part2(testInp2)}`);
    console.log(`Part 2 - Real Input: ${part2(inp)}`);
})();