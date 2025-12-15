import * as fs from "fs";

interface InputRange {
  range: number[];
}

const input = fs.readFileSync("day_2.txt", "utf-8").split(",");
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
  let allInvalidIdSum = 0;
  const segmentRanges = new Map<number, number[]>();

  inputIds.forEach((input, _) => {
    const rangeLength = input.range[1] - input.range[0] + 1;
    const allInvalidIdsSum = new Set<number>();

    for (const inputRange of input.range) {
      const segmentLength = inputRange.toString().length;
      if (!segmentRanges.has(segmentLength)) {
        const divisor: number[] = [];

        for (let i = 1; i < segmentLength; i++) {
          if (segmentLength % i === 0) {
            divisor.push(i);
          }
        }
        segmentRanges.set(segmentLength, divisor);
      }
    }

    for (let i = 0; i < rangeLength; i++) {
      const currentId = input.range[0] + i;
      const currentIdStr = currentId.toString();
      const currentIdLength = currentId.toString().length;
      // Get possible segment lengths for the current ID length
      const segmentRangesEntries = segmentRanges.get(currentIdLength);
      if (!segmentRangesEntries) continue;

      for (const segmentLength of segmentRangesEntries) {
        const chunks: string[] = [];

        for (let start = 0; start < currentIdLength; start += segmentLength) {
          chunks.push(currentIdStr.slice(start, start + segmentLength));
        }
        const allChunksEaqul = chunks.every((val) => val === chunks[0]);
        if (allChunksEaqul) {
          allInvalidIdsSum.add(currentId);
        }
      }
    }

    allInvalidIdsSum.forEach((id) => {
      allInvalidIdSum += id;
    });
  });
  console.log(`Sum of invalid IDs: ${allInvalidIdSum}`);
}

const inputRangesById = inputRanges(input);

searchingInvalidIds(inputRangesById);
