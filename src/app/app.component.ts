import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormulariCercaComponent } from './components/formulari-cerca/formulari-cerca.component';
import { LlistaElementsComponent } from './components/llista-elements/llista-elements.component';
import { ElementService } from './services/element.service';
import { ElementCataleg, CriterisCerca} from './models/element.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormulariCercaComponent, LlistaElementsComponent, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App implements OnInit {
  private readonly elementService = inject(ElementService);

  // Exposem directament el Signal d'estat del servei
  readonly estatServei = this.elementService.estat;
  elementSeleccionat: ElementCataleg | undefined = undefined;

  ngOnInit(): void {
    // Carreguem el catàleg inicial de l'API
    this.elementService.carregarTot();
  }

actualitzaFiltres(criteris: CriterisCerca): void {
    this.elementService.cercar(criteris);
  }

  seleccionaElement(element: any): void {
    this.elementSeleccionat = element;
  }

  tancaDetall(): void {
    this.elementSeleccionat = undefined;
  }

  reintentar(): void {
    this.elementService.reintentar();
  }

  // Mètode senzill per provar el POST de l'Exercici 3
  crearElementExemple(): void {
    this.elementService.crearElement({
      nom: 'Dron CineLog 35 V2 HD',
      descripcio: 'Quadcòpter cinemàtic d alta estabilitat per a càmeres GoPro',
      categoria: 'Drons RTF',
      preu: 399.00,
      stock: 7
    }).subscribe({
      next: (nou) => {
        alert(`Producte creat correctament amb POST! ID: ${nou.id}`);
      }
    });
  }
}