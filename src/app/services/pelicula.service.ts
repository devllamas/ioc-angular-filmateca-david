import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private apiUrl = 'http://localhost:4301/pelicules';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  getItemById(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  searchItems(query: string, items: Pelicula[]): Pelicula[] {
    const lowerQuery = query.toLowerCase();
    return items.filter(item =>
      item.nom.toLowerCase().includes(lowerQuery) ||
      item.sinopsis.toLowerCase().includes(lowerQuery)
    );
  }
}