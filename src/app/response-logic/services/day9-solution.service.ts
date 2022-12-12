import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Solution } from 'src/app/models/solution.model';

@Injectable({
  providedIn: 'root'
})
export class Day9SolutionService {
  solution = new Subject<Solution>();

  private inputData: string[][] = [];

  private head = [0, 0];
  private tail = [0, 0];
  private uniqueSpaces: number[][] = [[0, 0]];

  private headPart2 = [0, 0];
  private knot1 = [0, 0];
  private knot2 = [0, 0];
  private knot3 = [0, 0];
  private knot4 = [0, 0];
  private knot5 = [0, 0];
  private knot6 = [0, 0];
  private knot7 = [0, 0];
  private knot8 = [0, 0];
  private tailPart2 = [0, 0];
  private uniqueSpacesPart2: number[][] = [[0, 0]];

  private solutionPost: Solution = new Solution();

  constructor(private http: HttpClient) {
    this.solutionPost.title = 'Day 9: Rope Bridge';
    this.solutionPost.day = 9;
  }

  solvePuzzle(): any {
    this.readFile();
  }

  private readFile(): void {
    this.http.get('assets/day9-puzzle.txt', { responseType: 'text' }).subscribe((fileData) => {
      for (const line of fileData.split(/[\n\r]+/)) {
        this.inputData.push(line.split(' '));
      }

      this.countSpacesTailVisited();
      this.solution.next(this.solutionPost);
    });
  }

  private countSpacesTailVisited() {



    this.inputData.forEach(command => {
      switch (command[0]) {
        case 'U':
          for (let i = 0; i < parseInt(command[1]); i++) {
            this.moveHeadUp();
          }
          break;

        case 'D':
          for (let i = 0; i < parseInt(command[1]); i++) {
            this.moveHeadDown();
          }
          break;

        case 'L':
          for (let i = 0; i < parseInt(command[1]); i++) {
            this.moveHeadLeft();
          }
          break;

        case 'R':
          for (let i = 0; i < parseInt(command[1]); i++) {
            this.moveHeadRight();
          }
          break;

        default:
          break;
      }
    });
    this.solutionPost.solutionOne = `The rope tail passed by ${this.uniqueSpaces.length} unique spots.`

  }

  private moveHeadRight() {
    this.head[0]++;
    this.moveTail();
  }

  private moveHeadLeft() {
    this.head[0]--;
    this.moveTail();
  }

  private moveHeadUp() {
    this.head[1]++;
    this.moveTail();
  }

  private moveHeadDown() {
    this.head[1]--;
    this.moveTail();
  }

  private moveTail() {
    if (Math.abs(this.head[0] - this.tail[0]) < 2 && Math.abs(this.head[1] - this.tail[1]) < 2) {
      return;
    }

    if (this.head[0] - this.tail[0] === 2) {
      this.tail[0]++;
      if (this.head[1] - this.tail[1] === 1) {
        this.tail[1]++;
      }
      else if (this.head[1] - this.tail[1] === -1) {
        this.tail[1]--;
      }
    }

    else if (this.head[0] - this.tail[0] === -2) {
      this.tail[0]--;
      if (this.head[1] - this.tail[1] === 1) {
        this.tail[1]++;
      }
      else if (this.head[1] - this.tail[1] === -1) {
        this.tail[1]--;
      }
    }

    else if (this.head[1] - this.tail[1] === 2) {
      this.tail[1]++;
      if (this.head[0] - this.tail[0] === 1) {
        this.tail[0]++;
      }
      else if (this.head[0] - this.tail[0] === -1) {
        this.tail[0]--;
      }
    }

    else if (this.head[1] - this.tail[1] === -2) {
      this.tail[1]--;
      if (this.head[0] - this.tail[0] === 1) {
        this.tail[0]++;
      }
      else if (this.head[0] - this.tail[0] === -1) {
        this.tail[0]--;
      }
    }

    this.checkIfIsUnique([...this.tail]);
  }

  private checkIfIsUnique(coord: number[]) {
    if (!this.uniqueSpaces.find(usedCoord => JSON.stringify(usedCoord) === JSON.stringify(coord))) {
      this.uniqueSpaces.push(coord);
    }
  }
}
