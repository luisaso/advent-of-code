import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Solution } from 'src/app/models/solution.model';

@Injectable({
  providedIn: 'root'
})
export class Day4SolutionService {
  solution = new Subject<Solution>();

  private inputData!: {
    elvesGroup: {
      firstElf: {
        start: number,
        end: number
      },
      lastElf: {
        start: number,
        end: number
      }
    }[]
  };
  private solutionPost: Solution = new Solution();

  constructor(private http: HttpClient) { }

  solvePuzzle(): any {
    this.solutionPost.title = 'Day 4: Camp Cleanup';
    this.solutionPost.day = 4;
    this.readFile();
  }

  private readFile() {
    const elvesGroup: { firstElf: { start: number, end: number }, lastElf: { start: number, end: number } }[] = [];
    this.http.get('assets/day4-puzzle.txt', { responseType: 'text' }).subscribe((fileData) => {
      for (const line of fileData.split(/[\n\r]+/)) {
        const [firstElfStart, firstElfEnd, lastElfStart, lastElfEnd] = line.split(/[,|-]/);
        const firstElf = { start: parseInt(firstElfStart), end: parseInt(firstElfEnd) };
        const lastElf = { start: parseInt(lastElfStart), end: parseInt(lastElfEnd) };
        elvesGroup.push({ firstElf, lastElf });

      };
      this.inputData = { elvesGroup };
      this.findFullyOverlappedAssignments();
      this.findOverlappedAssignments();
      this.solution.next(this.solutionPost);
    });
  }

  private findFullyOverlappedAssignments() {
    let counter = 0;
    this.inputData.elvesGroup.forEach(group => {
      if (group.firstElf.start <= group.lastElf.start && group.firstElf.end >= group.lastElf.end) {
        counter++;
      }
      else if (group.firstElf.start >= group.lastElf.start && group.firstElf.end <= group.lastElf.end) {
        counter++;
      }
    });
    this.solutionPost.solutionOne = counter.toString() + ' fully overlap.';
  }

  private findOverlappedAssignments() {
    let counter = 0;
    this.inputData.elvesGroup.forEach(group => {
      if (group.firstElf.start >= group.lastElf.start && group.firstElf.start <= group.lastElf.end) {
        counter++;
      }
      else if (group.lastElf.start >= group.firstElf.start && group.lastElf.start <= group.firstElf.end) {
        counter++;
      }
      else if (group.firstElf.start >= group.lastElf.start && group.firstElf.end <= group.lastElf.end) {
        counter++;
      }
      else if (group.lastElf.start >= group.firstElf.start && group.lastElf.end <= group.firstElf.end) {
        counter++;
      }
    });
    this.solutionPost.solutionTwo = counter.toString() + ' overlap.';
  }
}
