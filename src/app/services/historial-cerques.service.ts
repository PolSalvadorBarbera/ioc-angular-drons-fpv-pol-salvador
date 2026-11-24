// src/app/services/historial-cerques.service.ts
import { Service, signal } from '@angular/core';
import { CercaDesada } from '../models/element.model';

@Service()
export class HistorialCerquesService {
  private readonly CLAU_STORAGE = 'cataleg-historial-cerques';
  private readonly _historial = signal<CercaDesada[]>(this.llegir());
  readonly historial = this._historial.asReadonly();

  desar(terme: string, categoria: string): void {
    const termeNet = (terme || '').trim();
    if (termeNet.length < 3) return;

    const actuals = this._historial();

    // Evitem duplicats consecutius
    if (
      actuals.length > 0 &&
      actuals[0].terme.toLowerCase() === termeNet.toLowerCase() &&
      actuals[0].categoria === categoria
    ) {
      return;
    }

    const novaCerca: CercaDesada = {
      terme: termeNet,
      categoria: categoria || 'Totes',
      data: new Date().toISOString()
    };

    // Posem la nova al principi i en guardem màxim 8
    const actualitzat = [novaCerca, ...actuals].slice(0, 8);
    this._historial.set(actualitzat);
    this.escriure(actualitzat);
  }

  netejar(): void {
    this._historial.set([]);
    this.escriure([]);
  }

  private llegir(): CercaDesada[] {
    try {
      const dades = localStorage.getItem(this.CLAU_STORAGE);
      if (!dades) return [];
      const parsed = JSON.parse(dades);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (c) => typeof c.terme === 'string' && typeof c.categoria === 'string' && typeof c.data === 'string'
      );
    } catch (error) {
      console.error('Error llegint historial de localStorage:', error);
      return [];
    }
  }

  private escriure(cerques: CercaDesada[]): void {
    try {
      localStorage.setItem(this.CLAU_STORAGE, JSON.stringify(cerques));
    } catch (error) {
      console.error('Error guardant historial a localStorage:', error);
    }
  }
}