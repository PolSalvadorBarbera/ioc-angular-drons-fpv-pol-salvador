import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetaElementComponent } from './targeta-element.component';

describe('TargetaElementComponent', () => {
  let component: TargetaElementComponent;
  let fixture: ComponentFixture<TargetaElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetaElementComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TargetaElementComponent);
    component = fixture.componentInstance;

    // Passem un element de prova perquè el test no trobi 'element' indefinit
    component.element = {
      id: 'elem-001',
      nom: 'Dron Nazgul5',
      titol: 'Dron Nazgul5',
      descripcio: 'Dron de prova per a tests unitaris',
      categoria: 'Drons RTF',
      preu: 450,
      imatge: '',
      esPopular: true,
      stock: 5,
      dataActualitzacio: '2026-09-15',
      valoracio: 5
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});