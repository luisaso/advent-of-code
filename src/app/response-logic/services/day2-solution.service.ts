import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Solution } from 'src/app/models/solution.model';

@Injectable({
  providedIn: 'root'
})
export class Day2SolutionService {


  solution = new Subject<Solution>();

  private inputData: string[] = [];
  private solutionPost: Solution = new Solution();
  private signPointsMap = new Map([
    ['X', 1],
    ['Y', 2],
    ['Z', 3],
    ['A', 1],
    ['B', 2],
    ['C', 3],
  ]);
  private opponentSignsMap = new Map([
    ['A', 'X'],
    ['B', 'Y'],
    ['C', 'Z'],
  ]);
  private newStrategyLoseMap = new Map([
    ['A', 'C'],
    ['B', 'A'],
    ['C', 'B'],
  ]);

  private newStrategyWinMap = new Map([
    ['A', 'B'],
    ['B', 'C'],
    ['C', 'A'],
  ]);

  constructor(private http: HttpClient) { }

  solvePuzzle(): any {
    this.solutionPost.title = 'Day 2: Rock Paper Scissors';
    this.solutionPost.index = 2;
    this.readFile();
  }

  private readFile(): any {
    this.http.get('assets/day2-puzzle.txt', { responseType: 'text' }).subscribe((fileData) => {
      for (const line of fileData.split(/[\n\r]+/)) {
        this.inputData.push(line);
      }
      this.calculateFirstScore();
      this.calculateSecondScore();
      this.solution.next(this.solutionPost);
    })
  }

  private calculateFirstScore() {
    let points = 0;
    this.inputData.forEach(game => {
      const signsPlayed = game.split(' ');
      const opponentSign = this.opponentSignsMap.get(signsPlayed[0]);
      const mySign = signsPlayed[1];

      const mySignValue = this.signPointsMap.get(mySign);
      points += mySignValue ? mySignValue : 0;

      if (opponentSign === mySign) {
        points += 3;
      }

      else if (
        (opponentSign === 'X' && mySign === 'Y') ||
        (opponentSign === 'Y' && mySign === 'Z') ||
        (opponentSign === 'Z' && mySign === 'X')
      ) {
        points += 6;
      }
    });
    this.solutionPost.solutionOne = points.toString() + ' points.';
  }

  private calculateSecondScore() {
    let points = 0;
    this.inputData.forEach(game => {
      const signsPlayed = game.split(' ');
      const opponentSign = signsPlayed[0];
      const myStrategy = signsPlayed[1];
      let mySign!: string | undefined;

      if (myStrategy === 'X') {
        mySign = this.newStrategyLoseMap.get(opponentSign);
      }
      else if (myStrategy === 'Y') {
        mySign = opponentSign;
        points += 3;
      }
      else {
        mySign = this.newStrategyWinMap.get(opponentSign);
        points += 6;
      }

      const mySignValue = mySign ? this.signPointsMap.get(mySign) : 0;
      points += mySignValue ? mySignValue : 0;
    });
    this.solutionPost.solutionTwo = points.toString() + ' points.';
  }
}

/*
Part 1
A|X -> Rock -> 1
B|Y -> Paper -> 2
C|Z -> Scissors -> 3

Part 2
X -> Lose
Y -> Draw
Z -> Win
*/
