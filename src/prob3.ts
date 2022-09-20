import { readFileSync, promises as fsPromises } from "fs";
import { join } from "path";

// ✅ read file ASYNCHRONOUSLY
async function asyncReadFile(filename: string) {
  try {
    const result = await fsPromises.readFile(
      join(__dirname, filename),
      "utf-8"
    );
    return result;
  } catch (err) {
    console.log(err);
    return "Something went wrong";
  }
}
var getMax = function (str: string) {
  var max = 0,
    maxChar = "";
  str.split("").forEach(function (char) {
    if (str.split(char).length > max) {
      max = str.split(char).length;
      maxChar = char;
    }
  });
  return maxChar;
};
let getMostCommon = function (str: string): string {
  let numZeros = (str.match(/0/g) || []).length;
  let numOnes = (str.match(/1/g) || []).length;
  if (numZeros > numOnes) {
    return "0";
  } else if (numZeros < numOnes) {
    return "1";
  } else {
    return "1";
  }
};
let getLeastCommon = function (str: string): string {
  let numZeros = (str.match(/0/g) || []).length;
  let numOnes = (str.match(/1/g) || []).length;
  if (numZeros > numOnes) {
    return "1";
  } else if (numZeros < numOnes) {
    return "0";
  } else {
    return "0";
  }
};

let stringArray: string[] = Array(12).fill("");

const diagnostic_report = asyncReadFile("../assets/prob3_input.txt");

// diagnostic_report
//   .then((result) => result.split("\n").map(String))
//   .then((result) => {
//     for (let i = 0; i <= 11; i++) {
//       result.forEach((value: string, index: number, array: string[]) => {
//         // console.log(value[i]);
//         stringArray[i] += value[i];
//       });
//     }
//     // console.log(stringArray);
//     let code: string = "";
//     stringArray.forEach((value: string, index: number, array: string[]) => {
//       //   console.log(value);
//       let common: string = getMostCommon(value);
//       //   console.log(common);
//       code += common;
//     });
//     // console.log(stringArray[0].length)
//     // console.log(code);
//     let gamma_rate = parseInt(code, 2);
//     let reverseCode: string = "";
//     for (let i = 0; i < code.length; i++) {
//       if (code[i] == "0") {
//         reverseCode += "1";
//       } else if (code[i] == "1") {
//         reverseCode += "0";
//       }
//     }
//     let epsilon_rate = parseInt(reverseCode, 2);
//     console.log(gamma_rate);
//     console.log(epsilon_rate);
//     console.log(gamma_rate * epsilon_rate);
//   });
// part1 soln
// 3069
// 1026
// 3148794

diagnostic_report
  .then((result) => result.split("\n").map(String))
  .then((result) => {
    let filteredBytes: string[] = result;
    for (let i = 0; i <= 11; i++) {
      let stringArray: string[] = Array(12).fill("");
      for (let i = 0; i <= 11; i++) {
        filteredBytes.forEach(
          (value: string, index: number, array: string[]) => {
            // console.log(value[i]);
            stringArray[i] += value[i];
          }
        );
      }
      let code: string = "";
      stringArray.forEach((value: string, index: number, array: string[]) => {
        let common: string = getLeastCommon(value);
        code += common;
      });
      //   console.log(code)
      filteredBytes = filteredBytes.filter(
        (value: string, index: number, array: string[]) => {
          //   console.log(value)
          return value[i] == code[i];
        }
      );
      //   console.log(i);
      //   console.log(code[i]);
      // console.log(filteredBytes)
      if (filteredBytes.length == 1) {
        // console.log(filteredBytes)
        console.log(parseInt(filteredBytes[0], 2));
      }
    }
    // console.log(code);
    // console.log(filteredBytes);
  });
console.log(2349 * 1190);
// part2 son
// oxygen generator rating 2349
// CO2 scrubber rating 1190
