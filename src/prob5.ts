import { readFileSync } from "fs";
import { join } from "path";
// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename: string) {
  return readFileSync(join(__dirname, filename), "utf-8");
}

class Input {
  private input: number[][][];
  filteredInput: number[][][];
  constructor() {
    this.input = this.getInput();
    this.filteredInput = this.filterInput();
  }

  private getInput(): number[][][] {
    let input = syncReadFile("../assets/prob5_input.txt");
    let inputArray = input.split("\n").map(String);
    let xyPairs: number[][][] = inputArray.map((coords) => {
      let tup = coords.split(" -> ").map(String);
      return [tup[0].split(",").map(Number), tup[1].split(",").map(Number)];
    });
    return xyPairs;
  }
  private filterInput(): number[][][] {
    let filteredInput: number[][][] = [];
    for (const coords of this.input) {
      if (coords[0][0] === coords[1][0] || coords[0][1] === coords[1][1]) {
        filteredInput.push(coords);
      }
    }
    return filteredInput;
  }
}

class Field extends Input {
  private field: number[][];
  constructor() {
    super();
    this.field = this.createEmptyField();
    this.fillField();
  }

  private createEmptyField(): number[][] {
    // 1000 X 1000 field of 0s
    return Array(1000).fill(Array(1000).fill(0));
  }


  fillField() {
    for (const coords of this.filteredInput) {

    }
  }
}

let field = new Field();
