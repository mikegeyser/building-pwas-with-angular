import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CategoryService } from './category.service';
import { TemplateService } from './template.service';
import { MemeService } from './meme.service';
import { SelectedCategoryService } from './selected-category.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    CategoryService,
    TemplateService,
    MemeService,
    SelectedCategoryService
  ]
})
export class ServicesModule { }
