import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { CategoryService, SelectedCategoryService } from '../../services';
import { Category } from '../models';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  index = 0;
  categories: Category[] = [];

  get currentCategory() { return this.categories[this.index]; };

  constructor(
    private categoryService: CategoryService,
    public selectedCategoryService: SelectedCategoryService) { }

  ngOnInit() {
    this.categoryService.get().subscribe(categories => {
      this.categories = categories;
      this.selectedCategoryService.selectedCategory.next(this.categories[0]);
    });
  }

  previous() {
    this.index = (this.index)
      ? this.index - 1
      : this.categories.length - 1;

    this.selectedCategoryService.selectedCategory.next(this.currentCategory);
  }

  next() {
    this.index = (this.index < this.categories.length - 1)
      ? this.index + 1
      : 0;

    this.selectedCategoryService.selectedCategory.next(this.currentCategory);
  }
}
