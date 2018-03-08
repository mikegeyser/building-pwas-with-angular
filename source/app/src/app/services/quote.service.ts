import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuoteService {

  constructor(private http: HttpClient) { }

  list(): Observable<Object> {
    return this.http.get('http://localhost:3000/quotes');
  }
}
