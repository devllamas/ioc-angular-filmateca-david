import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PeliculaCataleg, PeliculaApiResponse, EstatServei } from '../models/pelicula.model';
import { adaptarPeliculesApi } from '../adaptadors/pelicula.adaptador';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  // Signals per gestionar l'estat de forma reactiva
  private readonly peliculesSignal = signal<PeliculaCataleg[]>([]);
  private readonly estatSignal = signal<EstatServei>('inicial');
  private readonly errorSignal = signal<string>('');

  // Exposem signals com a només lectura
  readonly pelicules = this.peliculesSignal.asReadonly();
  readonly estat = this.estatSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obté les pel·lícules populars del catàleg
   */
  obtenirPopulars(): void {
    this.estatSignal.set('carregant');
    this.errorSignal.set('');

    this.http.get<PeliculaApiResponse[]>(`${this.apiUrl}/pelicules?popular=true`)
      .pipe(
        map(adaptarPeliculesApi),
        tap(pelicules => {
          this.peliculesSignal.set(pelicules);
          this.estatSignal.set('exit');
        }),
        catchError((error: HttpErrorResponse) => {
          const missatgeError = this.gestionarError(error);
          this.errorSignal.set(missatgeError);
          this.estatSignal.set('error');
          this.peliculesSignal.set([]);
          return of([]);
        })
      )
      .subscribe();
  }

  /**
   * Cerca pel·lícules per terme de cerca
   */
  cercar(terme: string): void {
    if (!terme.trim()) {
      this.obtenirPopulars();
      return;
    }

    this.estatSignal.set('carregant');
    this.errorSignal.set('');

    this.http.get<PeliculaApiResponse[]>(`${this.apiUrl}/pelicules?q=${terme}`)
      .pipe(
        map(adaptarPeliculesApi),
        tap(pelicules => {
          this.peliculesSignal.set(pelicules);
          this.estatSignal.set('exit');
        }),
        catchError((error: HttpErrorResponse) => {
          const missatgeError = this.gestionarError(error);
          this.errorSignal.set(missatgeError);
          this.estatSignal.set('error');
          this.peliculesSignal.set([]);
          return of([]);
        })
      )
      .subscribe();
  }

  /**
   * Comprova si un codi de pel·lícula està disponible (per validació asíncrona)
   */
  codiDisponible(codi: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.http.get<PeliculaApiResponse[]>(`${this.apiUrl}/pelicules?id=${codi}`)
          .subscribe({
            next: (pelicules) => resolve(pelicules.length === 0),
            error: () => resolve(false)
          });
      }, 500);  // Simula latència de validació
    });
  }

  /**
   * Reinicia l'estat del servei
   */
  reiniciar(): void {
    this.peliculesSignal.set([]);
    this.estatSignal.set('inicial');
    this.errorSignal.set('');
  }

  /**
   * Gestiona errors HTTP i retorna missatges comprensibles
   */
  private gestionarError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // Error de client o xarxa
      return `Error de xarxa: ${error.error.message}`;
    }

    // Error del servidor
    switch (error.status) {
      case 0:
        return 'No es pot connectar al servidor. Comprova que json-server està actiu.';
      case 404:
        return 'Endpoint no trobat. Verifica la URL de l\'API.';
      case 500:
        return 'Error intern del servidor.';
      default:
        return `Error desconegut (${error.status}): ${error.message}`;
    }
  }
}