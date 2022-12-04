import { Component, Input, OnInit } from '@angular/core';
import { Solution } from '../models/solution.model';

@Component({
  selector: 'app-puzzle-response',
  templateUrl: './puzzle-response.component.html',
  styleUrls: ['./puzzle-response.component.css']
})
export class PuzzleResponseComponent implements OnInit {

  @Input() solution!: Solution;

  title!: string;
  solutionPartOne!: string;
  solutionPartTwo!: string;
  isOpened: boolean = false;;

  constructor() { }

  ngOnInit() {
    this.title = this.solution?.title;
    this.solutionPartOne = this.solution?.solutionOne;
    this.solutionPartTwo = this.solution?.solutionTwo;
  }

  showSolution() {
    this.isOpened = !this.isOpened;
  }

}
