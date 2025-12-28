import * as fs from 'fs';
import { parse } from 'path';

const input = fs.readFileSync('day_5.txt', 'utf-8').split('\n');
const whiteSpace = input.indexOf('');

const idRanges = input.slice(0, whiteSpace).map((range) => {
    const [min, max] = range.split('-').map(Number);
    return { min, max };
});
const availableIds = input.slice(whiteSpace + 1).map(Number);

function sortRangesAndIds(idRanges: { min: number; max: number }[]) {
    idRanges.sort((a, b) => a.min - b.min);
    availableIds.sort((a, b) => a - b);

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

function freshId() {
    let lastRangeMatchedIndex = 0;
    const rangeIdsLength = mergedRanges.length;
    let counter = 0;

    availableIds.forEach((id) => {
        for(let i = lastRangeMatchedIndex; i < rangeIdsLength; i++){
            const range = mergedRanges[i];
            if(id >= range.min && id <= range.max){
                lastRangeMatchedIndex = i;
                counter++;
                break;
            }
        }
    });
    return counter;
}

const result = freshId();

console.log(`The number of available IDs that are within the ranges is: ${result}`);
