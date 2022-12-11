import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Solution } from 'src/app/models/solution.model';

@Injectable({
  providedIn: 'root'
})
export class Day8SolutionService {
  solution = new Subject<Solution>();

  private inputData: string[][] = [];

  private solutionPost: Solution = new Solution();

  constructor(private http: HttpClient) { }

  solvePuzzle(): any {
    this.solutionPost.title = 'Day 8: Treetop Tree House';
    this.solutionPost.day = 8;
    this.readFile();
  }

  private readFile(): void {
    this.http.get('assets/day8-puzzle.txt', { responseType: 'text' }).subscribe((fileData) => {
      for (let i = 0; i < fileData.split(/[\n\r]+/).length; i++) {
        const line = fileData.split(/[\n\r]+/)[i];
        this.inputData.push([]);

        for (let j = 0; j < line.length; j++) {
          const tree = line[j];
          this.inputData[i].push(tree);
        }
      }

      this.countVisibleTrees();
      this.checkScenicScore();
      this.solution.next(this.solutionPost);
    });
  }

  private countVisibleTrees() {
    let treeVisibleCount = 0;
    let isVisible = false;

    for (let i = 0; i < this.inputData.length; i++) {
      const row = this.inputData[i];

      for (let j = 0; j < row.length; j++) {
        const tree = row[j];
        isVisible = false;

        //Edge Cases
        if (j == 0 || i == 0 || j === row.length - 1 || i === this.inputData.length - 1) {
          treeVisibleCount++;
          continue;
        }
        if (isVisible) {
          continue;
        }

        //Horizontal Left
        for (let k = 0; k < j; k++) {
          const treeToTestAgainst = row[k];

          if (parseInt(treeToTestAgainst) >= parseInt(tree)) {
            break;
          }

          if (k === j - 1) {
            treeVisibleCount++;
            isVisible = true;
            break;
          }
        }
        if (isVisible) {
          continue;
        }

        //Horizontal Right

        for (let k = j + 1; k < row.length; k++) {
          const treeToTestAgainst = row[k];

          if (parseInt(treeToTestAgainst) >= parseInt(tree)) {
            break;
          }

          if (k === row.length - 1) {
            treeVisibleCount++;
            isVisible = true;
            break;
          }
        }
        if (isVisible) {
          continue;
        }

        //Vertical Top
        for (let k = 0; k < i; k++) {
          const treeToTestAgainst = this.inputData[k][j];

          if (parseInt(treeToTestAgainst) >= parseInt(tree)) {
            break;
          }

          if (k === i - 1) {
            treeVisibleCount++;
            isVisible = true;
            break;
          }
        }
        if (isVisible) {
          continue;
        }

        //Vertical Bottom
        for (let k = i + 1; k < this.inputData.length; k++) {
          const treeToTestAgainst = this.inputData[k][j];

          if (parseInt(treeToTestAgainst) >= parseInt(tree)) {
            break;
          }

          if (k === this.inputData.length - 1) {
            treeVisibleCount++;
            isVisible = true;
            break;
          }
        }


      }
    }
    this.solutionPost.solutionOne = `There are ${treeVisibleCount} visible trees.`
  }

  private checkScenicScore() {
    let highestScore = 0;

    for (let i = 0; i < this.inputData.length; i++) {
      const row = this.inputData[i];

      for (let j = 0; j < row.length; j++) {
        const tree = row[j];
        const currentTreeScore: number[] = [0, 0, 0, 0];

        //Edge Cases
        if (j == 0 || i == 0 || j === row.length - 1 || i === this.inputData.length - 1) {
          continue;
        }

        //Horizontal Left
        for (let k = j - 1; k >= 0; k--) {
          const treeToTestAgainst = row[k];
          currentTreeScore[0]++;

          if (parseInt(treeToTestAgainst) >= parseInt(tree)) {
            break;
          }
        }

        //Horizontal Right

        for (let k = j + 1; k < row.length; k++) {
          const treeToTestAgainst = row[k];
          currentTreeScore[1]++;

          if (parseInt(treeToTestAgainst) >= parseInt(tree)) {
            break;
          }
        }

        //Vertical Top
        for (let k = i - 1; k >= 0; k--) {
          const treeToTestAgainst = this.inputData[k][j];
          currentTreeScore[2]++;

          if (parseInt(treeToTestAgainst) >= parseInt(tree)) {
            break;
          }
        }

        //Vertical Bottom
        for (let k = i + 1; k < this.inputData.length; k++) {
          const treeToTestAgainst = this.inputData[k][j];
          currentTreeScore[3]++;

          if (parseInt(treeToTestAgainst) >= parseInt(tree)) {
            break;
          }
        }

        if (highestScore < currentTreeScore.reduce((a, b) => a * b)) {
          highestScore = currentTreeScore.reduce((a, b) => a * b);
        }

      }
    }

    this.solutionPost.solutionTwo = `The highest scenic score is ${highestScore}.`
  }
}
