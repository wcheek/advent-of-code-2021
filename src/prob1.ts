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
  .then((result) => result.split(/\s+/))
  .then((result) => {
    result.slice(1,).forEach((value, ind, a) => {
      // console.log(value, result[ind])
      if (value > result[ind]) {
        count = count + 1;
      }
    })
    console.log(count)
  });
