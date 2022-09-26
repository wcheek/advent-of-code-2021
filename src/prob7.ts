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
      let distance = Math.abs(input[ind] - uniqueVals[uniqueValInd]);
      let array = Array.from({ length: distance + 1 }, (v, i) => i);
      let fuel = array.reduce((prev, cur) => prev + cur, 0);
      totalFuel[uniqueValInd] += fuel;
    }
  }
  return totalFuel;
}

let input = getInput();
var uniqueVals = [...new Set(input)];
let totalFuel = getTotalFuel(uniqueVals);
console.log(Math.min(...totalFuel));
