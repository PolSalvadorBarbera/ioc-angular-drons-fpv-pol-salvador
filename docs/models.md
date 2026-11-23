# Mapatge de Models de Dades (EAC3 - RA3)

## Taula de correspondència API Externa -> Model Intern

| Camp Extern (API) | Tipus Extern | Camp Intern (Model) | Tipus Intern | Transformació / Normalització aplicada |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `string` | `id` | `string` | Conversió explícita amb `String(apiElement.id)`. |
| `nom` | `string` | `nom` | `string` | Neteja d'espais amb `.trim()` i fallback `?? ''`. |
| `descripcio` | `string` | `descripcio` | `string` | Neteja d'espais amb `.trim()` i fallback `?? ''`. |
| `categoria` | `string` | `categoria` | `CategoriaElement` | Normalització amb `normalitzaCategoria()` a tipus unió canònic. |
| `preu` | `number` | `preu` | `number` | Conversió segura amb `numeroSegur()` validant `Number.isFinite()`. |
| `imatge` | `string` | `imatge` | `string` | Neteja `.trim()` o fallback amb `IMATGE_PER_DEFECTE`. |
| `popular` | `boolean` | `esPopular` | `boolean` | Renombrat semàntic i avaluació estricta `apiElement.popular === true`. |
| `stock` | `number` | `stock` | `number` | Conversió segura amb `numeroSegur(apiElement.stock, 0)`. |
| *(inexistent)* | - | `dataAfegit` | `Date` | Generació de data temporal enriquida amb `new Date()`. |

## Valors per defecte aplicats
- `nom`: Cadena buida `''` si arriba nul o indefinit.
- `descripcio`: Cadena buida `''` si arriba nul o indefinit.
- `categoria`: `'Electrònica'` si la categoria no és reconeguda.
- `preu`: `0` si el valor no és un número vàlid.
- `stock`: `0` si no és un número vàlid.
- `imatge`: Placeholder per defecte si arriba buida.
- `esPopular`: `false` si no és estrictament `true`.