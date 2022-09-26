import { join } from "path";
// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename: string) {
  return readFileSync(join(__dirname, filename), "utf-8");
}
import { readFileSync } from "fs";

function getInput(): number[] {
  let input = syncReadFile("../assets/prob7_input.txt");
  let inputArray = input.split(",").map(Number);
  return inputArray;
}

function getUniqueVals(array: number[]): number[] {
  return array.filter((value: number, index: number, self: number[]) => {
    return self.indexOf(value) === index;
  });
}

let input = getInput();
var uniqueVals = getUniqueVals(input);

let totalFuel: number[] = Array(uniqueVals.length).fill(0)
for (let uniqueValInd in uniqueVals) {
  for (let ind in input) {
    totalFuel[uniqueValInd] += Math.abs(input[ind] - uniqueVals[uniqueValInd]);
  }
}

let smallestFuelInd = totalFuel.indexOf(Math.min(...totalFuel))
let smallestLoc = uniqueVals[smallestFuelInd]
console.log(Math.min(...totalFuel))