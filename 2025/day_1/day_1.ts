import * as fs from "fs";

const FILE_PATH = "day_1.txt";

function readFileSyncExample(FILE_PATH: string): string[] {
  try {
    const stream = fs.readFileSync(FILE_PATH, "utf-8").split("\n");
    // console.log(stream);
    return stream;
  } catch (error) {
    console.error("Error reading file synchronously:", error);
    return [];
  }
}

function rotationSequence(rotations: string[]) {
  let position = 50;
  let zerosReached = 0;

  rotations.forEach((rotation) => {
    const dialRotation = Number(rotation.slice(1));

    switch (rotation[0]) {
      case "L": {
        const newPosition = position - dialRotation;

        position = wrapTo99(newPosition);
        zerosReached += timesZeroReached(position);
        break;
      }
      case "R": {
        const newPosition = position + dialRotation;

        position = wrapTo99(newPosition);
        zerosReached += timesZeroReached(position);
        break;
      }
    }
  });
  console.log(`Final Position: ${position}`);
  console.log(`Times Zero Reached: ${zerosReached}`);
}

function timesZeroReached(position: number) {
  if (position === 0) {
    return 1;
  }
  return 0;
}

function wrapTo99(position: number) {
  return ((position % 100) + 100) % 100;
}

const rotations = readFileSyncExample(FILE_PATH);
rotationSequence(rotations);
