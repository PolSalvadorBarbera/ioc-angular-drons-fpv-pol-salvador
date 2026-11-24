# Tenda de Drons FPV (ioc-angular-drons-fpv-pol-salvador)

## Autor
Pol Salvador Barberà

## Descripció
Aplicació web interactiva de catàleg i botiga en línia de drons FPV de carreres i freestyle, recanvis electrònics, motors i bateries. En aquest lliurament (Unitat 3 RA3) s'ha implementat la integració amb serveis externs HTTP via `json-server`, adaptadors purs de normalització de dades, gestió d'estats amb Signals, formularis reactius amb validacions síncrones, asíncrones i persistència de l'historial a `localStorage`.

## Versions utilitzades
- **Node.js:** v24.x / v26.x
- **npm:** 11.x
- **Angular CLI:** 22.x
- **Angular:** 22.x
- **Git:** 2.x
- **json-server**

## Branca de treball
- Branca d'avaluació de la Unitat 3: `ra3-serveis`
- URL de la branca: [https://github.com/PolSalvadorBarbera/ioc-angular-drons-fpv-pol-salvador/tree/ra3-serveis](https://github.com/PolSalvadorBarbera/ioc-angular-drons-fpv-pol-salvador/tree/ra3-serveis)

## Comandes per executar el projecte
Per reproduir l'aplicació completament:

1. **Instal·lació de dependències:**
   ```bash
   npm install
    ```
2. **Arrencar l'API local mock (Terminal 1):**
   ```bash
   npm run api
   ```
   L'API quedarà disponible a `http://localhost:4301/elements`.

3. **Arrencar el servidor d'Angular (Terminal 2):**
   ```bash
   ng serve
   ```
   Accedir des del navegador a `http://localhost:4200/`.

4. **Compilació de producció:**
   ```bash
   npm run build
   ```

5. **Execució de proves:**
   ```bash
   npm test -- --watch=false
   ```

## Serveis i Arquitectura Implementada (RA3)
1. **`ElementService` (`src/app/services/element.service.ts`):**
   - Utilitza `HttpClient` per fer peticions `GET` i `POST`.
   - Pipeline reactiu amb `Subject` i `switchMap` per cancel·lar peticions obsoletes en cercar.
   - Exposa un Signal d'estat de només lectura (`readonly estat`) que gestiona els estats `'inicial'`, `'carregant'`, `'exit'` i `'error'`.
   - Mètode `reintentar()` per repetir l'última consulta executada.
   - Mètode `crearElement()` per afegir nous productes a l'API amb `POST /elements`.

2. **`HistorialCerquesService` (`src/app/services/historial-cerques.service.ts`):**
   - Gestiona l'historial de cerques recents a `localStorage` (clau: `cataleg-historial-cerques`).
   - Evita duplicats consecutius, limita l'historial a 8 entrades i gestiona fallades amb `try/catch`.

3. **Adaptador pur (`src/app/adaptadors/element.adaptador.ts`):**
   - Transforma `ElementApiResponse` (extern) a `ElementCataleg` (intern).
   - Aplica `trim()`, conversions numèriques segures (`numeroSegur()`), normalització de categories (`normalitzaCategoria()`), valors per defecte i dates coherents.

4. **Formulari reactiu de cerca (`FormulariCercaComponent`):**
   - Camp de cerca amb `Validators.minLength(3)` i validador asíncron `termeAmbResultatsValidator()` amb debounce de 400ms.
   - Desplegable de categories, botó de neteja i accés directe als termes desats a l'historial.

## Documentació tècnica
Tota la informació ampliada es troba disponible a:
- `docs/models.md`: Mapatge complet de dades API -> Model intern.
- `docs/serveis.md`: Arquitectura del servei HTTP, flux de dades i tractament d'errors.
- `docs/formularis.md`: Validacions síncrones, asíncrones i persistència de l'historial.

## Enllaç del repositori
- [https://github.com/PolSalvadorBarbera/ioc-angular-drons-fpv-pol-salvador](https://github.com/PolSalvadorBarbera/ioc-angular-drons-fpv-pol-salvador)