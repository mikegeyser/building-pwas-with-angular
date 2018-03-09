import { Component } from '@angular/core';
import { Category } from './components/models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentCategory = new BehaviorSubject<Category>(null);

  categoryChanged(category) {
    this.currentCategory.next(category);
  }
}
