import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from './quote.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    QuoteService
  ]
})
export class ServicesModule { }
