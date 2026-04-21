import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { PeliculaService } from '../services/pelicula.service';

/**
 * Validador asíncron que comprova si un codi d'element està disponible
 */
export function codiDisponibleValidator(peliculaService: PeliculaService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return of(control.value).pipe(
      delay(500),  // Sretard de 500ms per simular latència de validació
      map(async (valor) => {
        const noHiHaElements = await peliculaService.codiDisponible(valor);
        return noHiHaElements ? {sensResultats: true} : null;
      })
    ) as Observable<ValidationErrors | null>;
  };
}