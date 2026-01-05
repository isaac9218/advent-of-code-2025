import * as fs from 'fs';

const input: string[] = fs.readFileSync('day_7_example.txt', 'utf-8').trim().split('\n');

function readingString(input: string[]){
    const arrayOfSplitters = new Set<string>();

    const locationOfS = input[0].indexOf('S');    
}