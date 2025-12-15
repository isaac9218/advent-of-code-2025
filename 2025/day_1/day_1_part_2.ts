import * as fs from "fs";

const FILE_PATH = "day_1_example.txt";

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

    const newPosition =
      rotation[0] === "L" ? position - dialRotation : position + dialRotation;

    const wrappedPosition = ((newPosition % 100) + 100) % 100;

    zerosReached += Math.floor(dialRotation / 100);

    if(position !== 0){
        const wentToZero = wrappedPosition === 0;
        const crossedZeroToRight = rotation[0] === "R" && wrappedPosition < position;
        const crossedZeroToLeft = rotation[0] === "L" && wrappedPosition > position;

        if(wentToZero || crossedZeroToRight || crossedZeroToLeft){
            zerosReached += 1;
        }
    }

    position = wrappedPosition;
  });
  console.log(`Final Position: ${position}`);
  console.log(`Times Zero Reached: ${zerosReached}`);
}
const rotations = readFileSyncExample(FILE_PATH);
rotationSequence(rotations);
