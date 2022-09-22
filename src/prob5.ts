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
    let input = syncReadFile("../assets/prob5_input_copy.txt");
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
  // the field is referenced as [y][x] whereas the input is [x][y]
  constructor() {
    super();
    this.field = this.createEmptyField();
    this.fillField();
  }

  private createEmptyField(): number[][] {
    // 1000 X 1000 field of 0s
    return Array(1000).fill(Array(1000).fill(0));
  }

  private getRangeToFill(
    initialVal: number,
    constVal: number,
    distance: number
  ): number[] {
    // Basically take the distance and translate to the initial val
    return Array.from(Array(distance + 1).keys()).map((coords) => {
      return coords + initialVal;
    });
  }

  fillField() {
    for (const coords of this.filteredInput) {
      if (coords[0][0] === coords[1][0]) {
        // X is the same.
        //Draw a vertical line between coords[0][1] (y0) and coords[1][1] (y1)
        // REMEMBER Y IS INVERTED. Down is +
        let xConst = coords[0][0];
        let y0 = coords[0][1];
        let y1 = coords[1][1];
        let rangeToFill: number[] = [];
        if (y0 < y1) {
          // vertical line goes from up to down
          let vertDist = y1 - y0;
          rangeToFill = this.getRangeToFill(y0, xConst, vertDist);
        } else if (y0 > y1) {
          // vertical line goes from down to up
          let vertDist = y0 - y1;
          rangeToFill = this.getRangeToFill(y1, xConst, vertDist);
        }
        for (let yCoord of rangeToFill) {
          this.field[yCoord][xConst] += 1;
        }
      }
      if (coords[0][1] === coords[1][1]) {
        // Y is the same.
        //Draw a horizontal line between coords[0][0] (x0) and coords[1][0] (x1)
        let yConst = coords[0][1];
        let x0 = coords[0][0];
        let x1 = coords[1][0];
        let rangeToFill: number[] = [];
        if (x0 < x1) {
          // horizontal line goes from left to right
          let horDist = x1 - x0;
          rangeToFill = this.getRangeToFill(x0, yConst, horDist);
        } else if (x0 > x1) {
          // horizontal line goes right to left
          let horDist = x0 - x1;
          rangeToFill = this.getRangeToFill(x1, yConst, horDist);
        }
        for (let xCoord of rangeToFill) {
          this.field[yConst][xCoord] += 1;
        }
      }
    }
  }
}

let field = new Field();
