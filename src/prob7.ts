import { join } from "path";
import { readFileSync } from "fs";
function syncReadFile(filename: string) {
  return readFileSync(join(__dirname, filename), "utf-8");
}

function getInput(): number[] {
  let input = syncReadFile("../assets/prob7_input.txt");
  let inputArray = input.split(",").map(Number);
  return inputArray;
}

function getTotalFuel(uniqueVals: number[]) {
  let totalFuel: number[] = Array(uniqueVals.length).fill(0);
  for (let uniqueValInd in uniqueVals) {
    for (let ind in input) {
      totalFuel[uniqueValInd] += Math.abs(
        input[ind] - uniqueVals[uniqueValInd]
      );
    }
  }
  return totalFuel;
}

let input = getInput();
var uniqueVals = [...new Set(input)];
let totalFuel = getTotalFuel(uniqueVals);
console.log(Math.min(...totalFuel));
