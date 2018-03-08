import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';

const materialComponents = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatStepperModule,
  MatInputModule
];

@NgModule({
  imports: [
    CommonModule,
    ...materialComponents
  ],
  exports: [
    ...materialComponents
  ]
})
export class MaterialModule { }
