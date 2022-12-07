import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Solution } from 'src/app/models/solution.model';

@Injectable({
  providedIn: 'root'
})
export class Day7SolutionService {
  solution = new Subject<Solution>();

  private inputData: string[] = [];
  private directoryTreeRecreated!: Directory;
  private solutionPost: Solution = new Solution();

  private totalSum: number = 0;
  private minDirectorySize = Number.MAX_VALUE;

  constructor(private http: HttpClient) { }

  solvePuzzle(): any {
    this.solutionPost.title = 'Day 7: No Space Left On Device';
    this.solutionPost.day = 7;
    this.readFile();
  }

  private readFile(): void {
    this.http.get('assets/day7-puzzle.txt', { responseType: 'text' }).subscribe((fileData) => {
      for (const line of fileData.split(/[\n\r]+/)) {
        this.inputData.push(line);
      }

      this.recreateDirectoryTree();
      this.sumAllDirectoriesSizeUnder100000();
      this.findSmallestViableDirectoryToDelete();
      this.solution.next(this.solutionPost);
    });
  }

  private recreateDirectoryTree() {
    const root = new Directory('/', null);
    let currentDirectory = root;
    this.inputData.forEach((line) => {
      if (line.startsWith('$ cd')) {
        if (line.includes('cd ..') && currentDirectory.parent) {
          currentDirectory = currentDirectory.parent as Directory;
        }
        else {
          const directoryName = line.split(' ')[2];
          const directory = currentDirectory.children.find(
            (d) => d.name === directoryName
          );
          if (directory) {
            currentDirectory = directory;
          }
        }
      }
      else if (!line.includes('$')) {
        const [first, second] = line.split(' ');
        if (first === 'dir') {
          currentDirectory.children.push(new Directory(second, currentDirectory));
        } else {
          currentDirectory.size += parseInt(first);
        }
      }
    });
    this.directoryTreeRecreated = root;
  }

  private sumAllDirectoriesSizeUnder100000() {
    this.calculateDirectorySize(this.directoryTreeRecreated);
    this.solutionPost.solutionOne = 'The sum of the total sizes is ' + this.totalSum;
  }

  private calculateDirectorySize(directory: Directory): number {
    directory.children.forEach(children => {
      directory.size += this.calculateDirectorySize(children);
    });
    if (directory.size <= 100000) {
      this.totalSum += directory.size;
    }

    return directory.size;
  }

  private findSmallestViableDirectoryToDelete() {
    const neededSpace = this.directoryTreeRecreated.size - 70000000 + 30000000;
    this.findTheSmalestDirectory(this.directoryTreeRecreated, neededSpace);
    this.solutionPost.solutionTwo = 'The sizes of the directory is ' + this.minDirectorySize;
  }

  private findTheSmalestDirectory(directory: Directory, neededSpace: number) {
    if (directory.size >= neededSpace) {
      if (directory.size < this.minDirectorySize) {
        this.minDirectorySize = directory.size;
      }
    }
    for (const child of directory.children) {
      this.findTheSmalestDirectory(child, neededSpace);
    }
  }
}


export class Directory {
  name!: string;
  size!: number;
  parent!: Directory | null;
  children!: Directory[];

  constructor(name: string, parent: Directory | null) {
    this.name = name;
    this.size = 0;
    this.parent = parent;
    this.children = [];
  }
}