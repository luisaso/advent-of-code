import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Solution } from 'src/app/models/solution.model';

@Injectable({
  providedIn: 'root'
})
export class Day5SolutionService {
  solution = new Subject<Solution>();

  private inputData!: {
    initialState: {
      columns: {
        crateStack: string[]
      }[]
    },
    moves: {
      numberCrates: number,
      from: number,
      to: number
    }[]
  };
  private solutionPost: Solution = new Solution();

  constructor(private http: HttpClient) { }

  solvePuzzle(): any {
    this.solutionPost.title = 'Day 5: Supply Stacks';
    this.solutionPost.day = 5;
    this.readFile();
  }

  private readFile(): void {
    let initialState: { columns: { crateStack: string[] }[] };
    const moves: { numberCrates: number, from: number, to: number }[] = [];
    const columns: { crateStack: string[] }[] = [{ crateStack: [] }, { crateStack: [] }, { crateStack: [] }, { crateStack: [] }, { crateStack: [] }, { crateStack: [] }, { crateStack: [] }, { crateStack: [] }, { crateStack: [] }];
    const index: number[] = [1, 5, 9, 13, 17, 21, 25, 29, 33];

    this.http.get('assets/day5-puzzle.txt', { responseType: 'text' }).subscribe((fileData) => {
      let isStartPositionData = true;

      for (const line of fileData.split(/[\n\r]+/)) {
        if (isStartPositionData) {
          for (let i = 0; i < 9; i++) {
            const crate = line[index[i]];

            if (crate.match(/\d/)) {
              isStartPositionData = false;
              break;
            }
            if (crate.match(/\w/)) {
              columns[i].crateStack.unshift(crate);
            }
          }
        }

        else {
          const [numberCrates, from, to]: any = line.match(/\d+/g);
          moves.push({ numberCrates, from, to });
        }
      }

      initialState = { columns };
      this.inputData = { initialState, moves };
      this.checkTopCratesAfterAllMoves();
      this.checkTopCratesAfterAllMovesWithCrateMover9001();
      this.solution.next(this.solutionPost);
    });
  }

  private checkTopCratesAfterAllMoves() {
    const state = JSON.parse(JSON.stringify(this.inputData.initialState));
    const moves = [...this.inputData.moves];
    let finalStateTopRow: string = '';

    moves.forEach(move => {
      for (let i = 0; i < move.numberCrates; i++) {
        const crate = state.columns[move.from - 1].crateStack.pop();
        if (crate) {
          state.columns[move.to - 1].crateStack.push(crate)
        }
      }
    });

    state.columns.forEach((column: { crateStack: string[]; }) => {
      finalStateTopRow += column.crateStack.pop();
    });

    this.solutionPost.solutionOne = finalStateTopRow + ' are the top crates.';
  }

  private checkTopCratesAfterAllMovesWithCrateMover9001() {
    const state: { columns: { crateStack: string[]; }[]; } = JSON.parse(JSON.stringify(this.inputData.initialState));
    const moves = [...this.inputData.moves];
    let finalStateTopRow: string = '';

    moves.forEach(move => {
      const size = state.columns[move.from - 1].crateStack.length;
      const crates = state.columns[move.from - 1].crateStack.splice(size - move.numberCrates, move.numberCrates);
      state.columns[move.to - 1].crateStack = [...state.columns[move.to - 1].crateStack, ...crates];
    });

    state.columns.forEach((column: { crateStack: string[]; }) => {
      finalStateTopRow += column.crateStack.pop();
    });

    this.solutionPost.solutionTwo = finalStateTopRow + ' are the top crates.';
  }
}
