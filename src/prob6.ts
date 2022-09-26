import { join } from "path";
// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename: string) {
  return readFileSync(join(__dirname, filename), "utf-8");
}
import { readFileSync } from "fs";
class Input {
  protected input: number[];
  constructor() {
    this.input = this.getInput();
  }

  private getInput(): number[] {
    let input = syncReadFile("../assets/prob6_input.txt");
    let inputArray = input.split(",").map(Number);
    console.log(inputArray);
    return inputArray;
  }
}

class Fish {
  private interval: number;
  constructor(interval: number = 8) {
    this.interval = interval;
  }
  private liveAnotherDay() {
    this.interval -= 1;
  }
}
class School extends Input {
  schoolOfFish: Fish[];
  constructor() {
    super();
    this.makeSchool();
    this.schoolOfFish = [];
  }
  protected makeSchool() {
    for (let int of this.input) {
      this.schoolOfFish.push(new Fish(int));
    }
  }
}
let school = new School();
console.log(school.schoolOfFish);
