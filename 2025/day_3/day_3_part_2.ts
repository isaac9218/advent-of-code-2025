import * as fs from "fs";

// Read the input file and split it into lines
const input: string[] = fs
  .readFileSync("day_3.txt", "utf-8")
  .trim()
  .split("\n");
const bankSize = input[0].length;
let batteriesPositions = new Map<number, number[]>();
let totalOutput = 0;

function highArrangementOfBatteries(bank: string): number {
  batteriesPositions.clear();

  for (let i = 0, j = bankSize - 1; i <= j; i++, j--) {
    if (i === j) {
      calculateBatteryValue(i, bank);
    } else {
      calculateBatteryValue(i, bank);
      calculateBatteryValue(j, bank);
    }
  }
  return joinJoltageOfAllBatteries(batteriesPositions);
}

function calculateBatteryValue(position: number, bank: string) {
  const batteryValuePosition = Number(bank[position]);

  if (!batteriesPositions.has(batteryValuePosition)) {
    batteriesPositions.set(batteryValuePosition, [position]);
  } else {
    const positions = batteriesPositions.get(batteryValuePosition);
    if (!positions) return;

    positions.push(position);
  }
}

function joinJoltageOfAllBatteries(batteriesPositions: Map<number, number[]>) {
  let localBatteriesPositions = batteriesPositions;
  let joltageOfAllBatteries = "";
  let lastPosition = -1;

  for (let i = 11; i >= 0; i--) {
    let positionFound = false;
    // console.log(`Value of joltageOfAllBatteries before trying to add a new character: ${joltageOfAllBatteries}`)

    for (let keyPosition = 9; keyPosition >= 0; keyPosition--) {
      const batteriesLocations = localBatteriesPositions.get(keyPosition);

      if (batteriesLocations) {
        batteriesLocations.sort((a, b) => a - b);

        for (let j = 0; j < batteriesLocations.length; j++) {
          if (
            batteriesLocations[j] + i <= bankSize - 1 &&
            batteriesLocations[j] > lastPosition
          ) {
            joltageOfAllBatteries += keyPosition;
            lastPosition = batteriesLocations[j]

            const newBatteriesLocations = batteriesLocations.filter((value) => value !== batteriesLocations[j]);
            if (newBatteriesLocations.length === 0) {
              localBatteriesPositions.delete(keyPosition);
            } else {
              localBatteriesPositions.set(keyPosition, newBatteriesLocations);
            }
            positionFound = true;
            break;
          }
        }

        if (positionFound) {
          break;
        }
      }
    }
  }
  // console.log(`Joltage formed: ${joltageOfAllBatteries}`);
  return Number(joltageOfAllBatteries);
}

input.forEach((bank: string) => {
  totalOutput += highArrangementOfBatteries(bank);
});

console.log(`The total is: ${totalOutput}`);
