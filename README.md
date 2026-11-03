# Tenda de Drons FPV (ioc-angular-drons-fpv-pol-salvador)

## Alumne
Pol Salvador Barberà

## Descripció
Aplicació web especialitzada en drons FPV de competició, botiga per comprar electrònica, motors i bateries. Aquesta entrega correspon al RA2: Components i interfície d'usuari


## Versions utilitzades
- **Node.js:** v24.x / v26.x
- **npm:** 11.x
- **Angular CLI:** 22.x
- **Angular:** 22.x
- **Git:** 2.x

## Com Executar el projecte

1. **Instal·lar dependències:**
   ```bash
   npm install
   ```

2. **Executar localhost en entorn de desenvolupament:**
   ```bash
   ng serve
   ```
   Un cop compilat, accedir des del navegador a `http://localhost:4200/`.


3. **Verificació de build de producció:**
   ```bash
   ng build
   ```

## Components creats (Arquitectura RA2)
1. **`EtiquetaElementComponent` (`src/app/components/etiqueta-element/`):**
   - Subcomponent encarregat de mostrar la xapa de categoria i el distintiu d'estrella si és un producte destacat.
   - Entrades: `@Input({ required: true }) categoria`, `@Input() destacat`.

2. **`TargetaElementComponent` (`src/app/components/targeta-element/`):**
   - Renderitza la targeta individual de cada producte, mostrant títol, descripció, valoració i data formatada amb `DatePipe`.
   - Entrades: `@Input({ required: true }) element`, `@Input() seleccionada`.
   - Sortida: `@Output() selecciona`.

3. **`LlistaElementsComponent` (`src/app/components/llista-elements/`):**
   - Graella d'elements que itera mitjançant `@for (...; track element.id)` i gestiona el bloc `@empty`.
   - Entrades: `@Input({ required: true }) elements`, `@Input() elementSeleccionatId`.
   - Sortida: `@Output() selecciona`.

4. **`BarraFiltresComponent` (`src/app/components/barra-filtres/`):**
   - Formulari basat en plantilles (`FormsModule`, `[(ngModel)]`) que combina cerca per text (`minlength="3"`) i desplegable de categories (`required`).
   - Botó deshabilitat si el formulari és invàlid i botó de restabliment de filtres.
   - Sortida: `@Output() filtresCanviats`.

5. **`App` (`src/app/`):**
   - Component arrel que gestiona l'estat global, la simulació asíncrona de càrrega (`signal(true)`), el filtratge combinat, el comptador reactiu de resultats i el panell lateral de detall de l'element seleccionat.
   

## Enllaç del repositori
- Repositori públic: [https://github.com/PolSalvadorBarbera/ioc-angular-drons-fpv-pol-salvador](https://github.com/PolSalvadorBarbera/ioc-angular-drons-fpv-pol-salvador)
- Branca d'avaluació RA2: [https://github.com/PolSalvadorBarbera/ioc-angular-drons-fpv-pol-salvador/tree/ra1-setup](https://github.com/PolSalvadorBarbera/ioc-angular-drons-fpv-pol-salvador/tree/ra2-components)