import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Category } from '../components/models';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Category[]>(`${environment.api}/categories`);
  }
}
