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
    return inputArray;
  }
}

class Fish {
  interval: number;
  constructor(interval: number = 8) {
    this.interval = interval;
  }
  liveAnotherDay() {
    this.interval -= 1;
  }
}
class School extends Input {
  schoolOfFish: Fish[];
  constructor() {
    super();
    this.schoolOfFish = this.makeSchool();
    this.liveAndBreed()
  }

  protected makeSchool(): Fish[] {
    let schoolOfFish: Fish[] = [];
    for (let int of this.input) {
      schoolOfFish.push(new Fish(int));
    }
    return schoolOfFish;
  }

  protected liveAndBreed() {
    for (let dayNum = 0; dayNum < 80; dayNum++) {
      for (let fish of this.schoolOfFish) {
        if (fish.interval === 0) {
          this.schoolOfFish.push(new Fish(8));
          fish.interval = 6
        } else {
          fish.liveAnotherDay();
        }
      }
    }
  }
}
let school = new School();
console.log(school.schoolOfFish.length);
