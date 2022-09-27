import { join } from "path";
import { readFileSync } from "fs";
function syncReadFile(filename: string) {
  return readFileSync(join(__dirname, filename), "utf-8");
}

function getInput(): string[][][] {
  let input = syncReadFile("../assets/prob8_input.txt");
  let inputArray = input.split("\n").map(String);
  let inputData: string[][][] = [];
  for (let line of inputArray) {
    let [tenDigit, fourDigit] = line.split(" | ") as [string, string];
    inputData.push([[...tenDigit.split(" ")], [...fourDigit.split(" ")]]);
  }
  return inputData;
}

interface InumbersInfo {
  [number: number]: {
    segments: string;
    length: number;
  };
}

let numbersInfo: InumbersInfo = {
  // 1, 4, 7, 8 are easy numbers
  1: { segments: "cf", length: 2 },
  4: { segments: "bcdf", length: 4 },
  7: { segments: "acf", length: 3 },
  8: { segments: "abcdefg", length: 7 },

  2: { segments: "acdeg", length: 5 },
  3: { segments: "acdfg", length: 5 },
  5: { segments: "abdfg", length: 5 },
  0: { segments: "abdefg", length: 6 },
  6: { segments: "abdefg", length: 6 },
  9: { segments: "abcdfg", length: 6 },
};

let input = getInput();
console.log(input)

