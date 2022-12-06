import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Solution } from 'src/app/models/solution.model';

@Injectable({
  providedIn: 'root'
})
export class Day6SolutionService {
  solution = new Subject<Solution>();

  private inputData!: { buffer: string };
  private solutionPost: Solution = new Solution();

  constructor(private http: HttpClient) { }

  solvePuzzle(): any {
    this.solutionPost.title = 'Day 6: Tuning Trouble';
    this.solutionPost.day = 6;
    this.readFile();
  }

  private readFile(): void {
    this.http.get('assets/day6-puzzle.txt', { responseType: 'text' }).subscribe((fileData) => {
      this.inputData = { buffer: fileData.trimEnd() };

      this.checkProcessedCharsToMarker();
      this.checkProcessedCharsToMessage();
      this.solution.next(this.solutionPost);
    });
  }

  private checkProcessedCharsToMarker() {
    const buffer: string[] = [];
    let markerPosition = 0;
    for (let i = 0; i < this.inputData.buffer.length; i++) {
      // debugger;
      const char = this.inputData.buffer[i];

      if (buffer.length < 4) {
        buffer.push(char);
      }
      else if (buffer.length === 4) {
        buffer.push(char);
        buffer.shift();

        if (buffer.filter((char, index) => buffer.indexOf(char) != index).length === 0) {
          markerPosition = i + 1;
          break;
        }
      }
    }

    this.solutionPost.solutionOne = 'The marker was found at the position ' + markerPosition;
  }

  private checkProcessedCharsToMessage() {
    const buffer: string[] = [];
    let markerPosition = 0;
    for (let i = 0; i < this.inputData.buffer.length; i++) {
      // debugger;
      const char = this.inputData.buffer[i];

      if (buffer.length < 14) {
        buffer.push(char);
      }
      else if (buffer.length === 14) {
        buffer.push(char);
        buffer.shift();

        if (buffer.filter((char, index) => buffer.indexOf(char) != index).length === 0) {
          markerPosition = i + 1;
          break;
        }
      }
    }

    this.solutionPost.solutionTwo = 'The message was found at the position ' + markerPosition;
  }
}
