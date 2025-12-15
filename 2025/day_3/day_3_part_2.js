"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// Read the input file and split it into lines
var input = fs
    .readFileSync("day_3.txt", "utf-8")
    .trim()
    .split("\n");
var bankSize = input[0].length;
var batteriesPositions = new Map();
var totalOutput = 0;
function highArrangementOfBatteries(bank) {
    batteriesPositions.clear();
    for (var i = 0, j = bankSize - 1; i <= j; i++, j--) {
        if (i === j) {
            calculateBatteryValue(i, bank);
        }
        else {
            calculateBatteryValue(i, bank);
            calculateBatteryValue(j, bank);
        }
    }
    return joinJoltageOfAllBatteries(batteriesPositions);
}
function calculateBatteryValue(position, bank) {
    var batteryValuePosition = Number(bank[position]);
    if (!batteriesPositions.has(batteryValuePosition)) {
        batteriesPositions.set(batteryValuePosition, [position]);
    }
    else {
        var positions = batteriesPositions.get(batteryValuePosition);
        if (!positions)
            return;
        positions.push(position);
    }
}
function joinJoltageOfAllBatteries(batteriesPositions) {
    var localBatteriesPositions = batteriesPositions;
    var joltageOfAllBatteries = "";
    var lastPosition = -1;
    for (var i = 11; i >= 0; i--) {
        var keyPosition = 9;
        var hasKey = false;
        var isPositionable = false;
        // console.log(`Value of joltageOfAllBatteries before trying to add a new character: ${joltageOfAllBatteries}`)
        while (!hasKey || !isPositionable) {
            var batteriesLocations = localBatteriesPositions.get(keyPosition);
            // console.log(`batteriesLocations for i: ${i}, and keyPosition: ${keyPosition} is of: ${batteriesLocations}`)
            if (!batteriesLocations) {
                // console.log(`No batteries for the key ${keyPosition}`)
                keyPosition--;
            }
            else {
                hasKey = true;
                batteriesLocations.sort(function (a, b) { return a - b; });
                if (batteriesLocations[0] + i <= bankSize - 1 && lastPosition < batteriesLocations[0]) {
                    isPositionable = true;
                    lastPosition = batteriesLocations[0];
                    // console.log(lastPosition)
                    joltageOfAllBatteries += keyPosition.toString();
                    var newBatteriesLocations = batteriesLocations.slice(1);
                    // console.log(`Selecting the position ${batteriesLocations[0]}; new addition of ${keyPosition} and i: ${i}, so now looks like ${joltageOfAllBatteries}, with remain of batteries in ${newBatteriesLocations.length === 0 ? 0 : newBatteriesLocations}`)
                    if (newBatteriesLocations.length === 0) {
                        localBatteriesPositions.delete(keyPosition);
                        keyPosition--;
                    }
                    else {
                        localBatteriesPositions.set(keyPosition, newBatteriesLocations);
                    }
                }
                else {
                    // console.log(`No possible to select it cause it goes beyond the bank Size for a keyPosiotn ${keyPosition} and a i: ${i}`)
                    keyPosition--;
                }
            }
            // console.log("hello")
        }
    }
    console.log("Joltage formed: ".concat(joltageOfAllBatteries));
    return Number(joltageOfAllBatteries);
}
input.forEach(function (bank) {
    totalOutput += highArrangementOfBatteries(bank);
});
console.log("The total is: ".concat(totalOutput));
