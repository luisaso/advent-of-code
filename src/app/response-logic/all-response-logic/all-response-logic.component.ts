import { Component, OnInit } from '@angular/core';
import { Solution } from 'src/app/models/solution.model';
import { Day1SolutionService } from '../services/day1-solution.service';
import { Day2SolutionService } from '../services/day2-solution.service';
import { Day3SolutionService } from '../services/day3-solution.service';

@Component({
  selector: 'app-all-response-logic',
  templateUrl: './all-response-logic.component.html',
  styleUrls: ['./all-response-logic.component.css']
})
export class AllResponseLogicComponent implements OnInit {

  solutions: Solution[] = [];

  constructor(
    private day1SolutionService: Day1SolutionService,
    private day2SolutionService: Day2SolutionService,
    private day3SolutionService: Day3SolutionService,
  ) { }

  ngOnInit() {
    this.day1Solution();
    this.day2Solution();
    this.day3Solution();
  }

  private day1Solution() {
    this.day1SolutionService.solvePuzzle();
    this.day1SolutionService.solution.subscribe((solution: Solution) => {
      this.solutions.push(solution);
      this.solutions.sort((a, b) => a.index - b.index)
    })
  }

  private day2Solution() {
    this.day2SolutionService.solvePuzzle();
    this.day2SolutionService.solution.subscribe((solution: Solution) => {
      this.solutions.push(solution);
      this.solutions.sort((a, b) => a.index - b.index)
    })
  }

  private day3Solution() {
    this.day3SolutionService.solvePuzzle();
    this.day3SolutionService.solution.subscribe((solution: Solution) => {
      this.solutions.push(solution);
      this.solutions.sort((a, b) => a.index - b.index)
    })
  }
}
