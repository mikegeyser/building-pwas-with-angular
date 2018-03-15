import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Category, Meme } from '../components/models';

@Injectable()
export class MemeService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<any[]>(`${environment.api}/memes`);
  }

  getByCategory(key: string) {
    return this.http.get<Meme[]>(`${environment.api}/memes/${key}`);
  }

  save(meme: Meme) {
    return this.http.post(`${environment.api}/memes`, meme);
  }
}
