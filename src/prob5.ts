import { readFileSync } from "fs";
import { join } from "path";
// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename: string) {
  return readFileSync(join(__dirname, filename), "utf-8");
}

class Input {
  protected input: number[][][];
  protected filteredInput: number[][][];
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
  // the field is referenced as [y][x] whereas the input is [x][y]
  private field: number[][];
  numPointsGreaterThanOne: number;

  constructor() {
    super();
    this.field = this.createEmptyField();
    this.fillField();
    this.numPointsGreaterThanOne = this.getPointsGreaterThanOne();
  }

  private createEmptyField(): number[][] {
    // 1000 X 1000 field of 0s
    return Array(1000)
      .fill(0)
      .map(() => new Array(1000).fill(0));
  }

  private getRangeToFill(initialVal: number, distance: number): number[] {
    // Basically take the distance and translate to the initial val
    return Array.from(Array(distance + 1).keys()).map((coord) => {
      return coord + initialVal;
    });
  }

  private fillField() {
    for (const coords of this.input) {
      let y0 = coords[0][1];
      let y1 = coords[1][1];
      let x0 = coords[0][0];
      let x1 = coords[1][0];
      if (x0 === x1) {
        // X is the same.
        let xConst = x0;
        // Draw a vertical line between coords[0][1] (y0) and coords[1][1] (y1)
        // REMEMBER Y IS INVERTED. Down is +
        let rangeToFill: number[] = [];
        if (y0 < y1) {
          // vertical line goes from up to down
          let vertDist = y1 - y0;
          rangeToFill = this.getRangeToFill(y0, vertDist);
        } else if (y0 > y1) {
          // vertical line goes from down to up
          let vertDist = y0 - y1;
          rangeToFill = this.getRangeToFill(y1, vertDist);
        }
        for (let yCoord of rangeToFill) {
          this.field[yCoord][xConst] += 1;
        }
      } else if (y0 === y1) {
        // Y is the same.
        let yConst = y0;
        // Draw a horizontal line between coords[0][0] (x0) and coords[1][0] (x1)
        let rangeToFill: number[] = [];
        if (x0 < x1) {
          // horizontal line goes from left to right
          let horDist = x1 - x0;
          rangeToFill = this.getRangeToFill(x0, horDist);
        } else if (x0 > x1) {
          // horizontal line goes right to left
          let horDist = x0 - x1;
          rangeToFill = this.getRangeToFill(x1, horDist);
        }
        for (let xCoord of rangeToFill) {
          this.field[yConst][xCoord] += 1;
        }
      } else {
        // Line is diagonal... Need to figure this one out. 4 cases
        // all lines are 45*
        let rangeToFill: number[] = [];
        let domainToFill: number[] = [];
        if (x0 < x1) {
          // left to right
          // Small to big
          let horDist = x1 - x0;
          rangeToFill = this.getRangeToFill(x0, horDist);
          if (y0 < y1) {
            // left up to right down
            // small to big
            let vertDist = y1 - y0;
            domainToFill = this.getRangeToFill(y0, vertDist);
          } else if (y0 > y1) {
            // left down to right up
            // Big to Small
            let vertDist = y0 - y1;
            domainToFill = this.getRangeToFill(y1, vertDist);
            domainToFill = domainToFill.reverse();
          }
        } else if (x0 > x1) {
          // right to left
          // Big to small
          let horDist = x0 - x1;
          rangeToFill = this.getRangeToFill(x1, horDist);
          rangeToFill = rangeToFill.reverse();
          if (y0 < y1) {
            // right up to left down
            // Small to big
            let vertDist = y1 - y0;
            domainToFill = this.getRangeToFill(y0, vertDist);
          } else if (y0 > y1) {
            // right down to left up
            // Big to small
            let vertDist = y0 - y1;
            domainToFill = this.getRangeToFill(y1, vertDist);
            domainToFill = domainToFill.reverse();
          }
        }
        // rangeToFill and domainToFill should have the same length.
        // since the lines are all just 45*
        for (let i = 0; i < rangeToFill.length; i++) {
          this.field[domainToFill[i]][rangeToFill[i]] += 1;
        }
      }
    }
  }

  private getPointsGreaterThanOne() {
    let numPoints: number = 0;
    for (let xRow of this.field) {
      numPoints += xRow.filter((coord) => {
        return coord > 1;
      }).length;
    }
    return numPoints;
  }
}

let field = new Field();
console.log(field.numPointsGreaterThanOne);
