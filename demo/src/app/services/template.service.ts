import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Template } from '../components/models';
import { environment } from '../../environments/environment';

@Injectable()
export class TemplateService {

  constructor(private http: HttpClient) { }

  getByCategory(category: string) {
    return this.http.get<Template[]>(`${environment.api}/templates/${category}`);
  }
}
