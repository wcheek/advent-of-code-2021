import { readFileSync, promises as fsPromises } from "fs";
import { join } from "path";

// ✅ read file ASYNCHRONOUSLY
async function asyncReadFile(filename: string) {
  try {
    const result = await fsPromises.readFile(
      join(__dirname, filename),
      "utf-8"
    );

    // console.log(result); // 👉️ "hello world hello world ..."

    // console.log(result.split(" "));
    return result;
  } catch (err) {
    console.log(err);
    return "Something went wrong";
  }
}

const instructions = asyncReadFile("../assets/prob2_input.txt");

class Position {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  moveForward(n: number): void {
    this.x += n as number;
  }
  moveUp(n: number): void {
    this.y -= n as number;
  }
  moveDown(n: number): void {
    this.y += n as number;
  }
}

instructions
  .then((result) => result.split("\n").map(String))
  .then((result) => {
    let subPosition = new Position(0, 0);
    result.forEach((value: string, index: number, array: string[]) => {
      const [instruction, amount] = value.split(" ") as [string, number];
      if (instruction == "forward") {
        subPosition.moveForward(+amount);
      } else if (instruction == "up") {
        subPosition.moveUp(+amount);
      } else if (instruction == "down") {
        // console.log(subPosition.y)
        subPosition.moveDown(+amount);
      }
    });
    console.log(subPosition);
    console.log(subPosition.x * subPosition.y)
  });

// answer part 1
//Position { x: 1923, y: 1001 }
//1924923
