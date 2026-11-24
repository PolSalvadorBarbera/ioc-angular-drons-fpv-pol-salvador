// src/app/services/element.service.ts
import { Service, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Subject, of, Observable } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  ElementApiResponse, 
  ElementCataleg, 
  EstatElements, 
  CriterisCerca, 
  NouElement 
} from '../models/element.model';
import { 
  adaptarElementsApi, 
  adaptarElementApi, 
  prepararElementApi 
} from '../adaptadors/element.adaptador';

@Service()
export class ElementService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/elements`;

  private readonly criterisInicials: CriterisCerca = { terme: '', categoria: '' };
  private readonly criteris$ = new Subject<CriterisCerca>();
  private darrersCriteris: CriterisCerca = { ...this.criterisInicials };

  // Estat reactiu gestionat amb Signals
  private readonly estatSignal = signal<EstatElements>({ estat: 'inicial', elements: [] });
  readonly estat = this.estatSignal.asReadonly();

  constructor() {
    // Pipeline RxJS per a cerques i recàrregues amb switchMap
    this.criteris$.pipe(
      tap((criteris) => {
        this.darrersCriteris = criteris;
        this.estatSignal.set({ estat: 'carregant', elements: [] });
      }),
      switchMap((criteris) => 
        this.obtenirElements(criteris).pipe(
          map((elements) => ({
            estat: 'exit' as const,
            elements
          })),
          catchError((error: HttpErrorResponse) => 
            of<EstatElements>({
              estat: 'error',
              elements: [],
              error: this.gestionarError(error)
            })
          )
        )
      )
    ).subscribe((nouEstat) => {
      this.estatSignal.set(nouEstat);
    });
  }

  // --- Mètodes Públics ---

  carregarTot(): void {
    this.cercar(this.criterisInicials);
  }

  cercar(criteris: CriterisCerca): void {
    const criterisNets: CriterisCerca = {
      terme: (criteris.terme || '').trim(),
      categoria: criteris.categoria === 'Totes' ? '' : (criteris.categoria || '')
    };
    this.criteris$.next(criterisNets);
  }

  reintentar(): void {
    this.criteris$.next(this.darrersCriteris);
  }

  crearElement(nou: NouElement): Observable<ElementCataleg> {
    const cosApi = prepararElementApi(nou);
    return this.http.post<ElementApiResponse>(this.apiUrl, cosApi).pipe(
      map(adaptarElementApi),
      tap(() => this.reintentar()) // Refresca el catàleg en crear-lo
    );
  }

  comptarResultats(terme: string): Observable<number> {
    return this.obtenirElements({ terme, categoria: '' }).pipe(
      map(elements => elements.length)
    );
  }

  // --- Mètodes Privats ---

  private obtenirElements(criteris: CriterisCerca): Observable<ElementCataleg[]> {
    let params = new HttpParams();
    if (criteris.categoria) {
      params = params.set('categoria', criteris.categoria);
    }

    return this.http.get<ElementApiResponse[]>(this.apiUrl, { params }).pipe(
      map(adaptarElementsApi),
      map((elements) => this.filtrarPerTerme(elements, criteris.terme))
    );
  }

  private filtrarPerTerme(elements: ElementCataleg[], terme: string): ElementCataleg[] {
    const text = (terme || '').trim().toLocaleLowerCase('ca');
    if (text.length < 3) {
      return elements;
    }
    return elements.filter((el) => 
      el.nom.toLocaleLowerCase('ca').includes(text) || 
      el.descripcio.toLocaleLowerCase('ca').includes(text)
    );
  }

  private gestionarError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'No s ha pogut connectar amb el servidor. Comproveu que l API estigui arrencada (npm run api).';
    }
    if (error.status === 404) {
      return 'No s han trobat les dades sol·licitades.';
    }
    if (error.status >= 500) {
      return 'El servidor està experimentant problemes tècnics. Proveu-ho més tard.';
    }
    return `S ha produït un error inesperat (${error.status}): ${error.message}`;
  }
}