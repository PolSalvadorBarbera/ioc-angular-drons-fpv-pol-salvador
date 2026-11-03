import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaElement } from '../../models/element.model';

export interface FiltresElement {
  text: string;
  categoria: CategoriaElement | 'Totes';
}

@Component({
  selector: 'app-barra-filtres',
  imports: [FormsModule],
  templateUrl: './barra-filtres.component.html',
  styleUrl: './barra-filtres.component.scss'
})
export class BarraFiltresComponent {
  @Output() filtresCanviats = new EventEmitter<FiltresElement>();

  categories: Array<CategoriaElement | 'Totes'> = [
    'Totes',
    'Drons RTF',
    'Motors',
    'Electrònica',
    'Vídeo FPV',
    'Bateries'
  ];

  filtres: FiltresElement = {
    text: '',
    categoria: 'Totes'
  };

  aplicaFiltres(): void {
    this.filtresCanviats.emit({ ...this.filtres });
  }

  restableixFiltres(): void {
    this.filtres = { text: '', categoria: 'Totes' };
    this.aplicaFiltres();
  }
}