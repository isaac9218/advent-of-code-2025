import * as fs from "fs";

interface InputRange {
  range: number[];
}

const input = fs.readFileSync("day_2_example.txt", "utf-8").split(",");
// console.log("Input:", input);

function inputRanges(input: string[]): InputRange[] {
  const inputRangesById = input.map((range) => {
    const [min, max] = range.split("-").map((value) => {
      return Number(value);
    });
    return { range: [min, max] };
  });

  return inputRangesById;
}

function searchingInvalidIds(inputIds: InputRange[]) {
  // Implementation goes here
  let allInvalidIdsSum = 0;

  inputIds.forEach((input, index) => {
    const rangeLength = input.range[1] - input.range[0] + 1;

    for (let i = 0; i < rangeLength; i++) {
      const currentId = input.range[0] + i;
      const currentIdStr = currentId.toString();
      const currentIdLength = currentId.toString().length;

      if (currentIdLength % 2 !== 0) {
        // console.log(`Odd ID found: ${currentId} in range index ${index}`);
        continue;
      }

      const midIndex = currentIdLength / 2;
      const firstHalf = currentIdStr.slice(0, midIndex);
      const secondHalf = currentIdStr.slice(midIndex);

      if (firstHalf === secondHalf) {
        // console.log(`Invalid ID found: ${currentId} in range index ${index}`);
        allInvalidIdsSum += currentId;
      }
    }
  });
      console.log(
      `Sum of invalid IDs ${allInvalidIdsSum}`
    );
}

const inputRangesById = inputRanges(input);

searchingInvalidIds(inputRangesById);
