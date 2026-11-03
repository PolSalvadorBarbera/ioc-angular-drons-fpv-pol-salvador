import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraFiltresComponent, FiltresElement } from './components/barra-filtres/barra-filtres.component';
import { LlistaElementsComponent } from './components/llista-elements/llista-elements.component';
import { ELEMENTS_MOCK } from './mocks/dades-mock';
import { Element } from './models/element.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BarraFiltresComponent, LlistaElementsComponent, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  elements: Element[] = [];
  elementsFiltrats: Element[] = [];
  elementSeleccionat: Element | undefined = undefined;
  filtresActuals: FiltresElement = { text: '', categoria: 'Totes' };
  carregant = signal(true);

  constructor() {
    // Simulació de càrrega asíncrona
    setTimeout(() => {
      this.elements = ELEMENTS_MOCK;
      this.elementsFiltrats = ELEMENTS_MOCK;
      this.carregant.set(false);
    }, 800);
  }

  actualitzaFiltres(filtres: FiltresElement): void {
    this.filtresActuals = filtres;
    const text = filtres.text.trim().toLocaleLowerCase('ca');

    this.elementsFiltrats = this.elements.filter((element) => {
      const categoriaCoincideix = 
        filtres.categoria === 'Totes' || element.categoria === filtres.categoria;
      const textCoincideix = 
        text === '' || this.conteText(element, text);
      return categoriaCoincideix && textCoincideix;
    });

    if (this.elementSeleccionat && !this.elementsFiltrats.includes(this.elementSeleccionat)) {
      this.elementSeleccionat = undefined;
    }
  }

  seleccionaElement(element: Element): void {
    this.elementSeleccionat = element;
  }

  tancaDetall(): void {
    this.elementSeleccionat = undefined;
  }

  private conteText(element: Element, text: string): boolean {
    const contingut = `${element.titol} ${element.descripcio}`.toLocaleLowerCase('ca');
    return contingut.includes(text);
  }
}