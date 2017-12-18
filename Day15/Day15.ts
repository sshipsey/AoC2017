const part1 = (a: number, b: number) => {
    const factorA = 16807;
    const factorB = 48271;
    let score = 0;
    let bA = '';
    let bB = '';
    for (let i = 0; i < 40000000; i++) {
        a = (a * factorA) % 2147483647;
        b = (b * factorB) % 2147483647;
        bA = a.toString(2);
        bB = b.toString(2);
        if (bA.slice(bA.length - 16) === bB.slice(bB.length - 16)) {
            score += 1;
        }
    }

    return score;
};

const part2 = (a: number, b: number) => {
    const factorA = 16807;
    const factorB = 48271;
    const divisor = 2147483647;
    let score = 0;

    for (let i = 0; i < 5000000; i++) {

        a = (a * factorA) % divisor;
        b = (b * factorB) % divisor;

        while (a % 4 !== 0) {
            a = (a * factorA) % divisor;
        }

        while (b % 8 !== 0) {
            b = (b * factorB) % divisor;
        }

        if ((a & 0xFFFF) === (b & 0xFFFF)) {
            score += 1;
        }

    }

    return score;
};

const genA = 116;
const genB = 299;
const genASample = 65;
const genBSample = 8921;

console.log(part1(genASample, genBSample));
console.log(part1(genA, genB));

console.log(part2(genASample, genBSample));
console.log(part2(genA, genB));