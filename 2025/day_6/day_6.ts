import * as fs from "fs";

const input = fs.readFileSync("day_6.txt", "utf-8").trim().split("\n");

function groupValues(input: string[]) {
  const organisedChunks = new Map<number, string[]>();

  input.forEach((line, index) => {
    const tempArray: string[] = [];
    let stringNumber = "";

    for (let i = 0; i <= line.length; i++) {
      const char = line[i];
      if (char !== " " && char !== undefined) {
        stringNumber += char;
      } else if (stringNumber !== "") {
        tempArray.push(stringNumber);
        stringNumber = "";
      }
    }
    organisedChunks.set(index, tempArray);
  });
  return organisedChunks;
}

function grandTotal(input: string[]) {
  const organisedChunks = groupValues(input);
  const lengthArray = organisedChunks.get(0)!?.length;
  const numberOfGroups = organisedChunks.size;
  let grandTotalSum = 0;

  for (let i = 0; i < lengthArray; i++) {
    let totalColumn = Number(organisedChunks.get(0)![i]);
    const currentOperation = organisedChunks.get(numberOfGroups - 1)![i];

    for (let j = 1; j < numberOfGroups - 1; j++) {
      const currentGroup = Number(organisedChunks.get(j)![i]);

      switch (currentOperation) {
        case "+":
          totalColumn += currentGroup;
          break;
        case "*":
          totalColumn *= currentGroup;
      }
    }
    grandTotalSum += totalColumn;
  }
  return grandTotalSum;
}

const grandTotalSum = grandTotal(input);
console.log("Grand Total Sum:", grandTotalSum);
