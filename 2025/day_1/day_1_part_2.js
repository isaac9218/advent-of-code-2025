"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var FILE_PATH = "day_1.txt";
function readFileSyncExample(FILE_PATH) {
    try {
        var stream = fs.readFileSync(FILE_PATH, "utf-8").split("\n");
        // console.log(stream);
        return stream;
    }
    catch (error) {
        console.error("Error reading file synchronously:", error);
        return [];
    }
}
function rotationSequence(rotations) {
    var position = 50;
    var zerosReached = 0;
    rotations.forEach(function (rotation) {
        var dialRotation = Number(rotation.slice(1));
        switch (rotation[0]) {
            case "L": {
                var newPosition = position - dialRotation;
                var result = wrapTo99(newPosition, zerosReached);
                position = result.position;
                zerosReached = result.zerosReached;
                break;
            }
            case "R": {
                var newPosition = position + dialRotation;
                var result = wrapTo99(newPosition, zerosReached);
                position = result.position;
                zerosReached = result.zerosReached;
                break;
            }
        }
    });
    console.log("Final Position: ".concat(position));
    console.log("Times Zero Reached: ".concat(zerosReached));
}
function wrapTo99(position, zerosReached) {
    zerosReached += Math.floor(position);
    position = ((position % 100) + 100) % 100;
    return { position: position, zerosReached: zerosReached };
}
var rotations = readFileSyncExample(FILE_PATH);
rotationSequence(rotations);
