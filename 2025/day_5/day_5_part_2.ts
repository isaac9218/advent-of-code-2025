import * as fs from 'fs';
import { parse } from 'path';

const input = fs.readFileSync('day_5.txt', 'utf-8').split('\n');
const whiteSpace = input.indexOf('');

const idRanges = input.slice(0, whiteSpace).map((range) => {
    const [min, max] = range.split('-').map(Number);
    return { min, max };
});

function sortRangesAndIds(idRanges: { min: number; max: number }[]) {
    idRanges.sort((a, b) => a.min - b.min);

    let mergedRanges: { min: number; max: number }[] = [];
    let currentMin = idRanges[0].min;
    let currentMax = idRanges[0].max;

    for( const {min, max} of idRanges.slice(1)){
        if(min <= currentMax + 1){
            currentMax = Math.max(currentMax, max);
        } else {
            mergedRanges.push({min: currentMin, max: currentMax});
            currentMin = min;
            currentMax = max;
        }
    }
    mergedRanges.push({min: currentMin, max: currentMax});

    return mergedRanges;
}

const mergedRanges = sortRangesAndIds(idRanges);

function allFreshId(mergedRanges: { min: number; max: number }[]) {
    let counter = 0;
    mergedRanges.forEach((range) => {
        counter += range.max - range.min + 1;
    });
    return counter;
}

const result = allFreshId(mergedRanges);

console.log(`The number of available IDs that are within the ranges is: ${result}`);
