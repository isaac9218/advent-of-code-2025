import * as fs from "fs";

const input = fs.readFileSync("day_6.txt", "utf-8").split("\n");

function groupValues(input: string[]) {
  const organisedChunks = new Map<number, string[]>();
  const numberOfLines = input.length;
  //
  const arrayOfSymbols: string[] = input[numberOfLines - 1]
    .split(" ")
    .filter((sym) => sym !== "");
  let chunk = 0;
  let tempArray: string[] = [];

  for (let column = 0; column <= input[0].length; column++) {
    let counter = 0;
    let currentDigit = "";
    let breakPoint = false;

    for (let row = 0; row < numberOfLines - 1; row++) {
      if (input[row][column] === " ") {
        counter++;
      }

      if (counter === numberOfLines - 1 || input[row][column] === undefined) {
        tempArray.push(arrayOfSymbols[chunk]);
        organisedChunks.set(chunk, tempArray);
        tempArray = [];
        chunk++;
        breakPoint = true;
        break;
      } else {
        currentDigit += input[row][column];
      }
    }
    if (!breakPoint) {
      let cleanedSpaces = "";

      for (let i = 0; i < currentDigit.length; i++) {
        if (currentDigit[i] !== " ") {
          cleanedSpaces += currentDigit[i];
        }
      }
      tempArray.push(cleanedSpaces);
    }
  }
  return organisedChunks;
}

function grandTotal(input: string[]) {
  const organisedChunks = groupValues(input);
  const numberOfGroups = organisedChunks.size;
  let grandTotalSum = 0;

  for (let i = 0; i < numberOfGroups; i++) {
    const lengthArray = organisedChunks.get(i)!?.length;
    let totalColumn = Number(organisedChunks.get(i)![0]);
    const currentOperation = organisedChunks.get(i)![lengthArray - 1];

    for (let j = 1; j < lengthArray - 1; j++) {
      const currentGroup = Number(organisedChunks.get(i)![j]);

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
