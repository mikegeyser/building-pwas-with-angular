import { Component, OnInit, Input } from '@angular/core';
import { MemeService, SelectedCategoryService } from '../../services';
import { Category, Meme } from '../models';
import { Observable } from 'rxjs/Observable';
import { mergeMap, filter } from 'rxjs/Operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  memes: Meme[] = [];

  constructor(
    private memeService: MemeService,
    private selectedCategoryService: SelectedCategoryService
  ) { }

  ngOnInit() {
    this.selectedCategoryService.selectedCategory.pipe(
      filter(value => !!value),
      mergeMap(value => this.memeService.getByCategory(value.key)),
    ).subscribe(memes => this.memes = memes);
  }
}
