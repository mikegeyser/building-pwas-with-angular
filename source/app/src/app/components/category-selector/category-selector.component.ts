import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services';
import { Category } from '../models';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  index = 0;
  categories: Category[] = [];

  @Output() categoryChanged = new EventEmitter<Category>();

  get currentCategory() { return this.categories[this.index]; };

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.get().subscribe(categories => {
      this.categories = categories;
      this.categoryChanged.emit(this.categories[0]);
    });
  }

  previous() {
    this.index = (this.index)
      ? this.index - 1
      : this.categories.length - 1;

    this.categoryChanged.emit(this.currentCategory);
  }

  next() {
    this.index = (this.index < this.categories.length - 1)
      ? this.index + 1
      : 0;

    this.categoryChanged.emit(this.currentCategory);
  }
}
