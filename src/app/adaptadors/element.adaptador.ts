// src/app/adaptadors/element.adaptador.ts
import { CategoriaElement, ElementApiResponse, ElementCataleg, NouElement } from '../models/element.model';

export const IMATGE_PER_DEFECTE = 'https://placehold.co/300x200?text=Sense+imatge';

/**
 * Normalitza la categoria assegurant un format canònic de CategoriaElement
 */
export function normalitzaCategoria(categoria: string): CategoriaElement {
  const cat = (categoria || '').trim().toLowerCase();
  if (cat.includes('dron')) return 'Drons RTF';
  if (cat.includes('motor')) return 'Motors';
  if (cat.includes('electr')) return 'Electrònica';
  if (cat.includes('vid') || cat.includes('vtx')) return 'Vídeo FPV';
  if (cat.includes('bat')) return 'Bateries';
  return 'Electrònica'; // Valor per defecte
}

/**
 * Conversió segura a número evitant valors NaN o no finits
 */
export function numeroSegur(valor: unknown, perDefecte = 0): number {
  const num = Number(valor);
  return Number.isFinite(num) ? num : perDefecte;
}

/**
 * Adaptador pur d'un element extern de l'API al model intern de l'aplicació
 */
export function adaptarElementApi(apiElement: ElementApiResponse): ElementCataleg {
  const nomNet = (apiElement.nom ?? '').trim();
  return {
    id: String(apiElement.id),
    nom: nomNet,
    titol: nomNet, // Perquè targeta-element mostri el nom
    descripcio: (apiElement.descripcio ?? '').trim(),
    categoria: normalitzaCategoria(apiElement.categoria),
    preu: numeroSegur(apiElement.preu, 0),
    imatge: (apiElement.imatge ?? '').trim() || IMATGE_PER_DEFECTE,
    esPopular: apiElement.popular === true,
    destacat: apiElement.popular === true, // Perquè la xapa mostri l'estrella
    stock: numeroSegur(apiElement.stock, 0),
    dataAfegit: new Date(),
    dataActualitzacio: new Date().toISOString().slice(0, 10), // Perquè DatePipe no falli
    valoracio: 4.8
  };
}

/**
 * Adaptador per a col·leccions d'elements
 */
export function adaptarElementsApi(apiElements: ElementApiResponse[]): ElementCataleg[] {
  return (apiElements || []).map(adaptarElementApi);
}

/**
 * Genera un element buit amb valors vàlids per defecte
 */
export function elementBuit(): ElementCataleg {
  return {
    id: '',
    nom: '',
    titol: '',
    descripcio: '',
    categoria: 'Drons RTF',
    preu: 0,
    imatge: IMATGE_PER_DEFECTE,
    esPopular: false,
    destacat: false,
    stock: 0,
    dataAfegit: new Date(),
    dataActualitzacio: new Date().toISOString().slice(0, 10),
    valoracio: 0
  };
}

/**
 * Prepara les dades d'un nou element per enviar a l'API via POST (Adaptador invers)
 */
export function prepararElementApi(nou: NouElement): Omit<ElementApiResponse, 'id'> {
  return {
    nom: (nou.nom ?? '').trim(),
    descripcio: (nou.descripcio ?? '').trim(),
    categoria: nou.categoria,
    preu: Number(nou.preu),
    stock: Number(nou.stock),
    imatge: `https://placehold.co/300x200?text=${encodeURIComponent((nou.nom ?? '').trim())}`,
    popular: false
  };
}