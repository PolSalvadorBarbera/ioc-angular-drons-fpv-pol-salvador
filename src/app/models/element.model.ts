// Categories oficials tancades de la botiga FPV
export type CategoriaElement = 
  | 'Drons RTF' 
  | 'Motors' 
  | 'Electrònica' 
  | 'Vídeo FPV' 
  | 'Bateries';

// 1. Model extern: format exacte que retorna l'API (tools/api/cataleg.json)
export interface ElementApiResponse {
  id: string;
  nom: string;
  descripcio: string;
  categoria: string;
  preu: number;
  imatge: string;
  popular: boolean;
  stock: number;
}

// 2. Model intern: estructura rica que fa servir la nostra aplicació Angular
export interface ElementCataleg {
  id: string;
  nom: string;
  descripcio: string;
  categoria: CategoriaElement;
  preu: number;
  imatge: string;
  esPopular: boolean;       // Renombrat des de 'popular' per convenció booleana
  stock: number;           // Camp numèric de control d'estoc
  dataAfegit?: Date;       // Camp temporal calculat per l'adaptador
}

// Embolcall de cerca per a respostes d'API
export interface ElementsCercaResponse {
  elements: ElementApiResponse[];
  total: number;
}

// Estats del servei patró semàfor
export type EstatServei = 'inicial' | 'carregant' | 'exit' | 'error';

export interface EstatElements {
  estat: EstatServei;
  elements: ElementCataleg[];
  error?: string;

}
