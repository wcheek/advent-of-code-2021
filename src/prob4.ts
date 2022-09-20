import { readFileSync, promises as fsPromises } from "fs";
import { join } from "path";
const bingoNumbers: number[] = [
  31, 50, 68, 16, 25, 15, 28, 80, 41, 8, 75, 45, 96, 9, 3, 98, 83, 27, 62, 42,
  59, 99, 95, 13, 55, 10, 23, 84, 18, 76, 87, 56, 88, 66, 1, 58, 92, 89, 19, 54,
  85, 74, 39, 93, 77, 26, 30, 52, 69, 48, 91, 73, 72, 38, 64, 53, 32, 51, 6, 29,
  17, 90, 34, 61, 70, 4, 7, 57, 44, 97, 82, 37, 43, 14, 81, 65, 11, 22, 5, 36,
  71, 35, 78, 12, 0, 94, 47, 49, 33, 79, 63, 86, 40, 21, 24, 46, 20, 2, 67, 60,
];

// ✅ read file ASYNCHRONOUSLY
async function asyncReadFile(filename: string) {
  try {
    const result = await fsPromises.readFile(
      join(__dirname, filename),
      "utf-8"
    );
    return result;
  } catch (err) {
    console.log(err);
    return "Something went wrong";
  }
}
class bingoCard {
  bingoArray: number[][];
  constructor(bingoArray: number[][]) {
    this.bingoArray = bingoArray;
  }
}
let bingoCards: bingoCard[] = Array(100).fill(new bingoCard([]));
let bingoCardsInput = asyncReadFile("../assets/prob4_input.txt");

let getNumberRow = function (value: string): number[] {
  let newValue = value[0] == " " ? value.slice(1) : value;
  let numbers: number[] = [];
  let doubleSplit = newValue.split("  ");
  doubleSplit.forEach((value) => {
    numbers = [...numbers, ...value.split(" ").map(Number)];
  });
  return numbers;
};

bingoCardsInput
  .then((result) => result.split("\n").map(String))
  .then((result) => {
    result.forEach((value: string, index: number, array: string[]) => {
      let numbers = getNumberRow(value);
      if (numbers.length != 1) {
        // console.log(index)
        // console.log(Math.floor(index / 6));
        console.log(numbers)
        console.log(bingoCards[0])
        bingoCards[Math.floor(index / 6)].bingoArray[index % 6] = numbers;
      }
    });
    // console.log(bingoCards[9]);
  });
