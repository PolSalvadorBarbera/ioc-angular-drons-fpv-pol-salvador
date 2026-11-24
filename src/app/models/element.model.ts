// src/app/models/element.model.ts

// Categories oficials tancades de la botiga FPV
export type CategoriaElement = 
  | 'Drons RTF' 
  | 'Motors' 
  | 'Electrònica' 
  | 'Vídeo FPV' 
  | 'Bateries';

// 1. Model extern: format exacte que retorna l'API (tools/api/cataleg.json)
export interface ElementApiResponse {
  id: string | number; // Stging o numero
  nom: string;
  descripcio: string;
  categoria: string;
  preu: number;
  imatge: string;
  popular: boolean;
  stock: number;
}

// 2. Model base compatible amb l'EAC2 (soluciona els errors de dades-mock.ts)
export interface Element {
  id: string | number;
  titol?: string;
  nom?: string;
  descripcio: string;
  categoria: CategoriaElement;
  dataActualitzacio?: string;
  valoracio?: number;
  destacat?: boolean;
  preu?: number;
  imatge?: string;
  esPopular?: boolean;
  stock?: number;
  dataAfegit?: Date;
}

// 3. Model intern complet per a l'EAC3 (Unitat 3)
export interface ElementCataleg extends Element {
  id: string | number;
  nom: string;
  descripcio: string;
  categoria: CategoriaElement;
  preu: number;
  imatge: string;
  esPopular: boolean;
  stock: number;
  dataAfegit?: Date;
}

// Embolcall de cerca per a respostes d'API
export interface ElementsCercaResponse {
  elements: ElementApiResponse[];
  total: number;
}

// Estats del servei segons el patró de semàfor dels apunts
export type EstatServei = 'inicial' | 'carregant' | 'exit' | 'error';

export interface EstatElements {
  estat: EstatServei;
  elements: ElementCataleg[];
  error?: string;
}

// Criteris de cerca
export interface CriterisCerca {
  terme: string;
  categoria: string;
}

// Model per a l'alta de nous elements amb POST
export type NouElement = Pick<ElementCataleg, 'nom' | 'descripcio' | 'categoria' | 'preu' | 'stock'>;