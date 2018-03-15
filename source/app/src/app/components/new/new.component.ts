import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService, TemplateService, SelectedCategoryService, MemeService } from '../../services';
import { Template, Meme } from '../models';
import { mergeMap, debounceTime, map } from 'rxjs/Operators';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  form: FormGroup;
  templates: Template[] = [];
  preview: Observable<Meme>;

  constructor(
    private fb: FormBuilder,
    private selectedCategoryService: SelectedCategoryService,
    private categoryService: CategoryService,
    private templateService: TemplateService,
    private memeService: MemeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      template: ['', Validators.required],
      top: ['', Validators.required],
      bottom: ['', Validators.required]
    });

    this.selectedCategoryService.selectedCategory.pipe(
      debounceTime(1),
      mergeMap(category => this.templateService.getByCategory(category.key))
    ).subscribe(templates => this.templates = templates);

    this.preview = this.form.valueChanges.pipe(map(
      data => this.createMeme(data)
    ));
  }

  private createMeme(data, fullPath = true) {
    return {
      id: Math.random(),
      category: this.selectedCategoryService.selectedCategory.value.key,
      template: (fullPath) ? data.template.fullPath : data.template.fileName,
      top: data.top,
      bottom: data.bottom
    };
  }

  save() {
    if (this.form.valid) {
      const meme: Meme = this.createMeme(this.form.value);
      this.memeService.save(meme).subscribe(_ => this.router.navigate(['/']));
    }
  }
}
