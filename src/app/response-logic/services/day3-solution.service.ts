import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Solution } from 'src/app/models/solution.model';

@Injectable({
  providedIn: 'root'
})
export class Day3SolutionService {
  solution = new Subject<Solution>();

  private inputData!: { rucksack: { firstCompartment: string, lastCompartment: string }[] };
  private inputDataSecondPart!: { group: { rucksack: string[] }[] }
  private solutionPost: Solution = new Solution();

  constructor(private http: HttpClient) { }

  solvePuzzle(): any {
    this.solutionPost.title = 'Day 3: Rucksack Reorganization';
    this.solutionPost.day = 3;
    this.readFile();
  }

  private readFile(): any {
    const rucksack: { firstCompartment: string, lastCompartment: string }[] = [];
    let counter = 0;
    let secondPartRucksack: string[] = [];
    let group: { rucksack: string[] }[] = [];

    this.http.get('assets/day3-puzzle.txt', { responseType: 'text' }).subscribe((fileData) => {
      for (const line of fileData.split(/[\n\r]+/)) {
        const [firstCompartment, lastCompartment] = [line.slice(0, line.length / 2), line.slice(line.length / 2)]
        rucksack.push({ firstCompartment, lastCompartment })

        secondPartRucksack.push(line);
        counter++;

        if (counter === 3) {
          group.push({ rucksack: secondPartRucksack })
          secondPartRucksack = [];
          counter = 0;
        }
      }
      this.inputData = { rucksack };
      this.inputDataSecondPart = { group }

      this.findRepeatedItemsScore();
      this.findBadgeItemScore();
      this.solution.next(this.solutionPost);
    })
  }

  private findRepeatedItemsScore() {
    let score = 0;
    this.inputData.rucksack.forEach((items) => {
      for (let i = 0; i < items.firstCompartment.length; i++) {
        const item = items.firstCompartment[i];

        if (items.lastCompartment.includes(item)) {
          if (item.charCodeAt(0) >= 97) {
            score += item.charCodeAt(0) - 96;
          }
          else {
            score += item.charCodeAt(0) - 38;
          }
          break;
        }
      }
    });
    this.solutionPost.solutionOne = score.toString();
  }

  private findBadgeItemScore() {
    let score = 0;
    this.inputDataSecondPart.group.forEach((group: { rucksack: string[] }) => {
      for (let i = 0; i < group.rucksack[0].length; i++) {
        const item = group.rucksack[0][i];
        if (group.rucksack[1].includes(item) && group.rucksack[2].includes(item)) {
          if (item.charCodeAt(0) >= 97) {
            score += item.charCodeAt(0) - 96;
          }
          else {
            score += item.charCodeAt(0) - 38;
          }
          break;
        }
      }
    });
    this.solutionPost.solutionTwo = score.toString();
  }
}
