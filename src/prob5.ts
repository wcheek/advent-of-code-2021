import { readFileSync } from "fs";
import { join } from "path";
// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename: string) {
  return readFileSync(join(__dirname, filename), "utf-8");
}
function getInput(): number[][][] {
  let input = syncReadFile("../assets/prob5_input.txt");
  let inputArray = input.split("\n").map(String);
  let xyPairs: number[][][] = inputArray.map((coords) => {
    let tup = coords.split(" -> ").map(String);
    return [tup[0].split(",").map(Number), tup[1].split(",").map(Number)];
  });
  return xyPairs;
}

let input = getInput();
console.log(input);
