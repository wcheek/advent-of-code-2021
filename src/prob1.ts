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

let count: number = 0;

asyncReadFile("../assets/prob1_input.txt")
  .then((result) => result.split(/\s+/).map(Number))
  .then((result) => {
    result.forEach((value: number, ind: number, a: number[]) => {
      // console.log(a);
      let val_prev = result
        .slice(ind, ind + 3)
        .reduce<number>((accumulator, current) => {
          return accumulator + current;
        }, 0);
      let val = result
        .slice(ind + 1, ind + 4)
        .reduce<number>((accumulator, current) => {
          return accumulator + current;
        }, 0);
      // console.log(val);
      if (val > val_prev) {
        count += 1;
      }
    });
    console.log(count);
  });
// part 1: Should be 1676
// part 2: 1706
