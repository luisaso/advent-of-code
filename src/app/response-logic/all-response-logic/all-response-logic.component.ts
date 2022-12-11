import { Component, OnInit } from '@angular/core';
import { Solution } from 'src/app/models/solution.model';
import { Day1SolutionService } from '../services/day1-solution.service';
import { Day2SolutionService } from '../services/day2-solution.service';
import { Day3SolutionService } from '../services/day3-solution.service';
import { Day4SolutionService } from '../services/day4-solution.service';
import { Day5SolutionService } from '../services/day5-solution.service';
import { Day6SolutionService } from '../services/day6-solution.service';
import { Day7SolutionService } from '../services/day7-solution.service';
import { Day8SolutionService } from '../services/day8-solution.service';

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
    private day4SolutionService: Day4SolutionService,
    private day5SolutionService: Day5SolutionService,
    private day6SolutionService: Day6SolutionService,
    private day7SolutionService: Day7SolutionService,
    private day8SolutionService: Day8SolutionService,
  ) { }

  ngOnInit() {
    this.day1Solution();
    this.day2Solution();
    this.day3Solution();
    this.day4Solution();
    this.day5Solution();
    this.day6Solution();
    this.day7Solution();
    this.day8Solution();
  }

  private day1Solution() {
    this.day1SolutionService.solvePuzzle();
    this.day1SolutionService.solution.subscribe((solution: Solution) => {
      this.solutions.push(solution);
      this.solutions.sort((a, b) => a.day - b.day)
    })
  }

  private day2Solution() {
    this.day2SolutionService.solvePuzzle();
    this.day2SolutionService.solution.subscribe((solution: Solution) => {
      this.solutions.push(solution);
      this.solutions.sort((a, b) => a.day - b.day)
    })
  }

  private day3Solution() {
    this.day3SolutionService.solvePuzzle();
    this.day3SolutionService.solution.subscribe((solution: Solution) => {
      this.solutions.push(solution);
      this.solutions.sort((a, b) => a.day - b.day)
    })
  }

  private day4Solution() {
    this.day4SolutionService.solvePuzzle();
    this.day4SolutionService.solution.subscribe((solution: Solution) => {
      this.solutions.push(solution);
      this.solutions.sort((a, b) => a.day - b.day)
    })
  }

  private day5Solution() {
    this.day5SolutionService.solvePuzzle();
    this.day5SolutionService.solution.subscribe((solution: Solution) => {
      this.solutions.push(solution);
      this.solutions.sort((a, b) => a.day - b.day)
    })
  }

  private day6Solution() {
    this.day6SolutionService.solvePuzzle();
    this.day6SolutionService.solution.subscribe((solution: Solution) => {
      this.solutions.push(solution);
      this.solutions.sort((a, b) => a.day - b.day)
    })
  }

  private day7Solution() {
    this.day7SolutionService.solvePuzzle();
    this.day7SolutionService.solution.subscribe((solution: Solution) => {
      this.solutions.push(solution);
      this.solutions.sort((a, b) => a.day - b.day)
    })
  }

  private day8Solution() {
    this.day8SolutionService.solvePuzzle();
    this.day8SolutionService.solution.subscribe((solution: Solution) => {
      this.solutions.push(solution);
      this.solutions.sort((a, b) => a.day - b.day)
    })
  }
}
