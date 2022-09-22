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
    console.log(this.filteredInput);
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
      if (coords[0][0] === coords[1][0]) {
        // X is the same.
        //Draw a vertical line between coords[0][1] and coords[1][1]
        let y0 = coords[0][1];
        let y1 = coords[1][1];
        if (coords[0][1] < coords[1][1]) {
          // vertical line goes from down to up
        } else if (coords[0][1] > coords[1][1]) {
          // vertical line goes from up to down
        }
      }
      if (coords[0][1] === coords[1][1]) {
        // Y is the same.
        //Draw a horizontal line between coords[0][0] and coords[1][0]
        let x0 = coords[0][0]
        let x1 = coords[1][0]
        if (coords[0][0] < coords[1][0]) {
          // horizontal line goes from left to right
        } else if (coords[0][0] > coords[1][1]) {
          // horizontal line goes right to left
        }
      }
    }
  }
}

let field = new Field();
