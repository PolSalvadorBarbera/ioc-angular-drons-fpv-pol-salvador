# Documentació del Servei HTTP i Gestió d'Estats (RA3)

## 1. Configuració de l'API Local
- **Eina:** `json-server` executat com a dependència de desenvolupament.
- **Fitxer de dades:** `tools/api/cataleg.json`.
- **Port:** `4301`.
- **Comanda d'execució:** `npm run api`.
- **Endpoints utilitzats:**
  - `GET /elements`: Retorna la col·lecció de productes (admet filtre `?categoria=...`).
  - `POST /elements`: Crea un nou registre (retorna codi HTTP 201 Created).

## 2. Diagrama del Flux de Dades
```text
[FormulariCerca / App]
       │  (criteris$.next())
       ▼
 [ElementService]
       │  tap() -> estatSignal.set({ estat: 'carregant' })
       │  switchMap() -> cancel·la peticions anteriors pendents
       ▼
 [HttpClient (GET / POST)] ──> [API json-server:4301]
       │
       ▼ (Resposta externa)
 [Adaptador pur] ──> Normalitza dades i converteix a ElementCataleg
       │
       ├─ (Èxit) -> map() -> estatSignal.set({ estat: 'exit', elements })
       └─ (Error) -> catchError() -> gestionarError() -> estatSignal.set({ estat: 'error', error: missatge })
       │
       ▼
 [Signals Readonly] ──> Injecció reactiva a la plantilla (@if, @for)
```
## 3. Gestió d'Errors
- **Error 0 (ERR_CONNECTION_REFUSED):** API aturada o fallada de xarxa. Missatge: *"No s ha pogut connectar amb el servidor. Comproveu que l API estigui arrencada (npm run api)."*
- **Error 404:** Recurs no trobat.
- **Error >= 500:** Problemes interns del servidor.

## 4. Política de Reintents
Es manté en memòria l'última cerca a `darrersCriteris`. El mètode públic `reintentar()` torna a emetre aquests criteris pel `Subject`, tornant a activar la consulta HTTP sense recarregar la pàgina.