"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var FILE_PATH = 'day_1_example.txt';
function readFileSyncExample(FILE_PATH) {
    try {
        var stream = (fs.readFileSync(FILE_PATH, 'utf-8')).split('\n');
        console.log(stream[0]);
    }
    catch (error) {
        console.error('Error reading file synchronously:', error);
    }
}
function rotationSequence() {
}
readFileSyncExample(FILE_PATH);
