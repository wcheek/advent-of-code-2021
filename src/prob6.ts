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
  // liveAnotherDay() {
  //   this.interval -= 1;
  // }
}

class School extends Input {
  schoolOfFish: Fish[];
  constructor() {
    super();
    this.schoolOfFish = this.makeInitialSchool();
    this.liveAndBreed();
  }

  protected makeInitialSchool(): Fish[] {
    let schoolOfFish: Fish[] = [];
    for (let int of this.input) {
      schoolOfFish.push(new Fish(int));
    }
    // console.log(schoolOfFish)
    return schoolOfFish;
  }

  protected liveAndBreed() {
    for (let dayNum = 0; dayNum < 80; dayNum++) {
      // console.log(this.schoolOfFish)
      let currentSchool = this.schoolOfFish;
      for (let fish of currentSchool) {
        if (fish.interval === 0) {
          this.schoolOfFish.push(new Fish(9));
          fish.interval = 6;
        } else {
          fish.interval -= 1;
        }
      }
    }
  }
}
let school = new School();
console.log(school.schoolOfFish.length);
// Could optimize solution by not doing OO.
// Just track number of fish at each stage. Moving on though.
