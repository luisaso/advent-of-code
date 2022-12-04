import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllResponseLogicComponent } from './all-response-logic.component';
import { PuzzleResponseComponent } from 'src/app/puzzle-response/puzzle-response.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    AllResponseLogicComponent
  ],
  providers: [
  ],
  declarations: [
    AllResponseLogicComponent,
    PuzzleResponseComponent
  ]
})
export class AllResponseLogicModule { }
