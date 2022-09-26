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