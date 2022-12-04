import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Solution } from 'src/app/models/solution.model';

@Injectable({
  providedIn: 'root'
})
export class Day1SolutionService {


  solution = new Subject<Solution>();

  private inputData!: {
    elf: {
      foodCalories: number[]
    }[]
  };
  private solutionPost: Solution = new Solution();

  constructor(private http: HttpClient) { }

  solvePuzzle(): any {
    this.solutionPost.title = 'Day 1: Calorie Counting';
    this.solutionPost.index = 1;
    this.readFile();
  }

  private readFile(): any {
    let foodCaloriesGroup: number[] = [];
    const elfsGroup: { foodCalories: number[] }[] = [];

    this.http.get('assets/day1-puzzle.txt', { responseType: 'text' }).subscribe((fileData) => {
      for (const line of fileData.split(/[\n]+/)) {
        if (line.length > 1) {
          foodCaloriesGroup.push(parseInt(line));
        }
        else {
          elfsGroup.push({ foodCalories: foodCaloriesGroup });
          foodCaloriesGroup = [];
        }
      }
      this.inputData = { elf: elfsGroup }

      this.searchElf();
      this.searchTop3Elfs();
      this.solution.next(this.solutionPost);
    })
  }

  private searchElf() {
    const caloriesSum: number[] = [];
    this.inputData?.elf.forEach(elf => {
      const newCaloriesSum = elf.foodCalories.reduce((sum, current) => sum + current, 0);
      caloriesSum.push(newCaloriesSum);
    });
    const topElf = caloriesSum.sort((a, b) => b - a)[0];
    this.solutionPost.solutionOne = topElf.toString() + ' Calories.';
  }

  private searchTop3Elfs() {
    const caloriesSum: number[] = [];
    this.inputData?.elf.forEach(elf => {
      const newCaloriesSum = elf.foodCalories.reduce((sum, current) => sum + current, 0);
      caloriesSum.push(newCaloriesSum);
    });
    const sumTopElfs = caloriesSum
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((sum, current) => sum + current, 0);

    this.solutionPost.solutionTwo = sumTopElfs.toString() + ' Calories.';

  }
}
