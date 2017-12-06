import * as _ from 'lodash';

export const rotate = <T>(input: T[], n: number): T[] => {
    return _.concat(_.takeRight(input, input.length - n), _.take(input, input.length - n));
};

export const getCombinations = <T>(combinations: T[][], current: T[], depth: number, ...arrays: T[][]) => {
    if (depth === arrays.length) {
        combinations.push(current);
        return;
    }

    _.each(arrays[depth], (arr) =>
        getCombinations<T>(combinations, _.concat(current, arr), depth + 1, ...arrays),
    );
};

export const xProd = <T>(arr1: T[], arr2: T[]) => {
    const newArr: T[][] = [];
    for (const a of arr1) {
        for (const b of arr2) {
            newArr.push([a, b]);
        }
    }
    return newArr;
};

export const arraysAreEquivalent = <T>(arr1: T[], arr2: T[]) =>
    arr1.length === arr2.length && _.every(arr1.map((v, i) => v === arr2[i]));
