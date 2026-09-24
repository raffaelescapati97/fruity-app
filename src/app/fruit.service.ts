import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Fruit } from './fruit';

@Injectable({ providedIn: 'root' })
export class FruitService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/fruit';

  getAll(): Observable<Fruit[]> {
    return this.http.get<Fruit[]>(`${this.apiUrl}/all`);
  }

  searchByName(name: string): Observable<Fruit> {
    return this.http.get<Fruit>(`${this.apiUrl}/${encodeURIComponent(name.trim().toLowerCase())}`);
  }
}