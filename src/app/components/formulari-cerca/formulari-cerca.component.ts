import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CriterisCerca, CercaDesada } from '../../models/element.model';
import { ElementService } from '../../services/element.service';
import { HistorialCerquesService } from '../../services/historial-cerques.service';
import { termeAmbResultatsValidator } from '../../validadors/terme-amb-resultats.validator';

@Component({
  selector: 'app-formulari-cerca',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './formulari-cerca.component.html',
  styleUrl: './formulari-cerca.component.scss'
})
export class FormulariCercaComponent {
  private readonly fb = inject(FormBuilder);
  readonly elementService = inject(ElementService);
  readonly historial = inject(HistorialCerquesService);

  @Output() cercaEnviada = new EventEmitter<CriterisCerca>();

  categories = ['Totes', 'Drons RTF', 'Motors', 'Electrònica', 'Vídeo FPV', 'Bateries'];

  readonly formulari = this.fb.nonNullable.group({
    terme: [
      '',
      {
        validators: [Validators.minLength(3)],
        asyncValidators: [termeAmbResultatsValidator(this.elementService)]
      }
    ],
    categoria: ['Totes']
  });

  get termeControl() {
    return this.formulari.controls.terme;
  }

  get mostrarErrors(): boolean {
    return this.termeControl.invalid && (this.termeControl.dirty || this.termeControl.touched);
  }

  get missatgeError(): string {
    if (this.termeControl.hasError('minlength')) {
      return 'La cerca ha de tenir com a mínim 3 caràcters.';
    }
    if (this.termeControl.hasError('senseResultats')) {
      return 'No s ha trobat cap producte a l API amb aquest terme.';
    }
    return '';
  }

  enviar(): void {
    if (this.formulari.invalid || this.formulari.pending) {
      this.formulari.markAllAsTouched();
      return;
    }

    const { terme, categoria } = this.formulari.getRawValue();
    this.historial.desar(terme, categoria);
    this.cercaEnviada.emit({ terme, categoria });
  }

  netejar(): void {
    this.formulari.reset({ terme: '', categoria: 'Totes' });
    this.cercaEnviada.emit({ terme: '', categoria: 'Totes' });
  }

  recuperar(cerca: CercaDesada): void {
    this.formulari.patchValue({
      terme: cerca.terme,
      categoria: cerca.categoria || 'Totes'
    });
    this.enviar();
  }
}