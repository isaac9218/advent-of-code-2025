import * as fs from "fs";

// Read the input file and split it into lines
const input: string[] = fs
  .readFileSync("day_3.txt", "utf-8")
  .trim()
  .split("\n");
// console.log(`Lines: ${input}`);

const bankSize = input[0].length;
let totalOutput = 0;

function highArrangementOfBatteries(bank: string) {
  const batteryArrangesments = new Set<number>();
  let highestBatteryArrangement = 0;

  for (let i = 0; i < bankSize - 1; i++) {
    for (let j = i + 1; j < bankSize; j++) {
      const selectedBatteries = `${bank[i]}${bank[j]}`;
      const batteryValue = Number(selectedBatteries);

      if (!batteryArrangesments.has(batteryValue)) {
        batteryArrangesments.add(Number(selectedBatteries));
        if(batteryValue > highestBatteryArrangement) {
            highestBatteryArrangement = batteryValue;
        };
      }
    }
  }
  totalOutput += highestBatteryArrangement;
}

input.forEach((bank: string) => {
  highArrangementOfBatteries(bank);
});

console.log(`Total Output: ${totalOutput}`);
