// src/app/validadors/terme-amb-resultats.validator.ts
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ElementService } from '../services/element.service';

/**
 * Validador asíncron amb debounce de 400ms que comprova si el terme té coincidències a l'API
 */
export function termeAmbResultatsValidator(elementService: ElementService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const valor = String(control.value || '').trim();

    // Si té menys de 3 caràcters, no fem petició HTTP (ja ho valida minLength)
    if (valor.length < 3) {
      return of(null);
    }

    return timer(400).pipe(
      switchMap(() => elementService.comptarResultats(valor)),
      map((total) => (total > 0 ? null : { senseResultats: true })),
      catchError(() => of(null)) // Si falla l'API, no bloquejar el formulari
    );
  };
}