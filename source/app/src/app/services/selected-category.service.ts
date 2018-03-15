import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Category } from '../components/models';

@Injectable()
export class SelectedCategoryService {
  public selectedCategory = new BehaviorSubject<Category>(null);
}
