
# Documentació dels Formularis Reactius i Historial (RA3)

## 1. Formulari Reactiu de Cerca (`FormulariCercaComponent`)
Construït amb `ReactiveFormsModule` i `FormBuilder` (amb controls `nonNullable: true`).

### Taula de Controls i Validacions
| Control | Tipus | Validadors Síncrons | Validadors Asíncrons | Debounce | Objectiu |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `terme` | `FormControl<string>` | `Validators.minLength(3)` | `termeAmbResultatsValidator()` | 400 ms (`timer`) | Cerca de text amb validació en viu contra l'API. |
| `categoria` | `FormControl<string>` | Cap (per defecte `'Totes'`) | Cap | - | Filtre per desplegable de categories. |

### Comportament del Validador Asíncron
- S'espera 400ms (`timer(400)`) des de l'última pulsació de tecla per evitar peticions massives.
- Consulta l'API mitjançant `elementService.comptarResultats(terme)`.
- Si el servidor retorna 0 resultats, genera l'error `{ senseResultats: true }`.
- Si l'API cau o dona error, s'aplica `catchError(() => of(null))` per no bloquejar el formulari.

## 2. Historial de Cerques (`HistorialCerquesService`)
- **Medi de persistència:** `localStorage`.
- **Clau:** `cataleg-historial-cerques`.
- **Límit:** Màxim 8 cerques emmagatzemades (les més recents primer).
- **Control de duplicats:** Evita guardar cerques consecutives idèntiques en terme i categoria.
- **Robustesa:** Totes les lectures i escriptures estan protegides amb blocs `try / catch` i verificacions de tipus (`Array.isArray`).