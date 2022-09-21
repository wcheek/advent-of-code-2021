import { readFileSync } from "fs";
import { join } from "path";
const bingoNumbers: number[] = [
  31, 50, 68, 16, 25, 15, 28, 80, 41, 8, 75, 45, 96, 9, 3, 98, 83, 27, 62, 42,
  59, 99, 95, 13, 55, 10, 23, 84, 18, 76, 87, 56, 88, 66, 1, 58, 92, 89, 19, 54,
  85, 74, 39, 93, 77, 26, 30, 52, 69, 48, 91, 73, 72, 38, 64, 53, 32, 51, 6, 29,
  17, 90, 34, 61, 70, 4, 7, 57, 44, 97, 82, 37, 43, 14, 81, 65, 11, 22, 5, 36,
  71, 35, 78, 12, 0, 94, 47, 49, 33, 79, 63, 86, 40, 21, 24, 46, 20, 2, 67, 60,
];
// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");

  // console.log(result); // 👉️ "hello world hello world ..."

  return result;
}

class bingoCard {
  numberArray: number[][];
  statusArray: boolean[][];
  cardNumber: number;
  constructor(
    numberArray: number[][],
    statusArray: boolean[][],
    cardNumber: number
  ) {
    this.numberArray = numberArray;
    this.statusArray = statusArray;
    this.cardNumber = cardNumber;
  }
}

class bingoGame {
  bingoCards: bingoCard[];

  constructor() {
    this.bingoCards = this.getCards();
  }

  private getNumberRow(value: string): number[] {
    let newValue = value[0] == " " ? value.slice(1) : value;
    let numbers: number[] = [];
    let doubleSplit = newValue.split("  ");
    doubleSplit.forEach((value) => {
      numbers = [...numbers, ...value.split(" ").map(Number)];
    });
    return numbers;
  }

  private buildBlankBingoCards() {
    let bingoCards: bingoCard[] = [];
    for (let i = 0; i < 100; i++) {
      bingoCards.push(new bingoCard([], [], i));
    }
    return bingoCards;
  }

  private processBingoCards(
    bingoCardsInput: string,
    bingoCards: bingoCard[]
  ): bingoCard[] {
    let inputArray = bingoCardsInput.split("\n").map(String);
    inputArray.forEach((value: string, index: number, array: string[]) => {
      let numbers = this.getNumberRow(value);
      if (numbers.length != 1) {
        bingoCards[Math.floor(index / 6)].numberArray[index % 6] = numbers;
        bingoCards[Math.floor(index / 6)].statusArray[index % 6] = Array(
          numbers.length
        ).fill(false);
      }
    });
    return bingoCards;
  }

  private getCards(): bingoCard[] {
    let blankBingoCards = this.buildBlankBingoCards();
    let bingoCardsInput = syncReadFile("../assets/prob4_input.txt");
    return this.processBingoCards(bingoCardsInput, blankBingoCards);
  }

  private searchBingoCardForNumber(bingoCard: bingoCard, number: number) {
    // Searches through each bingoCard and finds any rows/cols where the number
    // matches. If there's a match,
    // then the statusArray at position becomes true
    bingoCard.numberArray.forEach(
      (bingoCardRow: number[], bingoCardRowNum: number) => {
        if (bingoCardRow.includes(number)) {
          let bingoCardColNum = bingoCardRow.indexOf(number);
          bingoCard.statusArray[bingoCardRowNum][bingoCardColNum] = true;
        }
      }
    );
  }

  private getColMatch(bingoCard: bingoCard, colNum: number): boolean {
    let col: boolean[] = [
      bingoCard.statusArray[0][colNum],
      bingoCard.statusArray[1][colNum],
      bingoCard.statusArray[2][colNum],
      bingoCard.statusArray[3][colNum],
      bingoCard.statusArray[4][colNum],
    ];
    return col.every((v) => v === true);
  }

  private checkForWinningCards() {
    for (let bingoCard of this.bingoCards) {
      // Check for filled rows
      for (let bingoStatusCardRow of bingoCard.statusArray) {
        if (bingoStatusCardRow.every((v) => v === true)) {
          return bingoCard;
        }
      }
      // Check for filled cols
      let matchingCols: boolean[] = [];
      for (let colNum of Array.from({ length: 5 }, (v, i) => i)) {
        // console.log(colNum);
        matchingCols.push(this.getColMatch(bingoCard, colNum));
      }
      // console.log(matchingCols);
      if (matchingCols.some((v) => v === true)) {
        return bingoCard;
      }
    }
  }

  private getWinningCardAndNum(): [bingoCard | void, number] | void {
    for (let searchNum of bingoNumbers) {
      for (let bingoCard of this.bingoCards) {
        this.searchBingoCardForNumber(bingoCard, searchNum);
        let winningCard = this.checkForWinningCards();
        if (typeof winningCard == typeof bingoCard) {
          return [winningCard, searchNum];
        }
      }
    }
  }

  private calcCardSumUnmarkedNums(card: bingoCard): number {
    let cardSum: number = 0;
    for (let i = 0; i < card.numberArray.length; i++) {
      let bingoRow = card.numberArray[i];
      let statusRow = card.statusArray[i];
      let sumRow = bingoRow
        .filter((value: number, index: number) => {
          return !statusRow[index];
        })
        .reduce((prev: number, current: number) => {
          return prev + current;
        });
      cardSum += sumRow;
    }
    return cardSum;
  }

  getFinalScore(): number {
    let [winningCard, winningNum] = this.getWinningCardAndNum() as [
      bingoCard,
      number
    ];
    console.log(winningCard);
    console.log(winningNum);
    let cardSum = this.calcCardSumUnmarkedNums(winningCard);
    console.log(cardSum);
    return cardSum * winningNum;
  }
}

let game = new bingoGame();
let finalScore = game.getFinalScore();
console.log(finalScore);
