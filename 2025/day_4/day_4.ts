import * as fs from 'fs';

const input: string[] = fs.readFileSync('day_4.txt', "utf-8").trim().split('\n');

const directionsPath: number[][] = [[0,1], [1,0], [1,1], [1,-1], [0,-1], [-1,0], [-1,-1], [-1,1]];
const rollsOfPaper = new Set<string>();
const inputLineLength = input[0].length;

function isARollOfPaper(input: string[]) {
    input.forEach((line, index) => {
        for (let i = 0; i < inputLineLength; i++) {
            if(line[i] === '@'){
                rollsOfPaper.add(`${index},${i}`);
            }
        }
    });
}

isARollOfPaper(input);

function countAdjacentRollsOfPaper(rollsOfPaper: Set<string>): number{
    let count = 0;

    rollsOfPaper.forEach((roll) => {
        const rollCoords = roll.split(',').map(Number);
        let adjacentRolls = 0;
        let moreThanFourAdjacentRolls = false;

        for(const direction of directionsPath){
            const nextLine = rollCoords[0] + direction[0];
            const nextCol = rollCoords[1] + direction[1];
            const nextAdjacentRoll = `${nextLine},${nextCol}`;

            if(rollsOfPaper.has(nextAdjacentRoll)){
                if(adjacentRolls + 1 >= 4){
                    moreThanFourAdjacentRolls = true;
                    break;
                }
                adjacentRolls++;
            }
        }
        if(!moreThanFourAdjacentRolls){
            count++;
        }
    });
    return count;
}

const accesibleRollOfPaper = countAdjacentRollsOfPaper(rollsOfPaper);

console.log(`Number of rolls of paper with less than 4 adjacent rolls: ${accesibleRollOfPaper}`);
