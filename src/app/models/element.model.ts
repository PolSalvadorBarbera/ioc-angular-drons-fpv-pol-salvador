export type CategoriaElement = // | tipus de cat
  | 'Drons RTF' 
  | 'Motors' 
  | 'Electrònica' 
  | 'Vídeo FPV' 
  | 'Bateries';

export interface Element {
  id: number;
  titol: string;
  descripcio: string;
  categoria: CategoriaElement;
  dataActualitzacio: string; // Format ISO 8601 ('2026-09-10')
  valoracio: number;         // numèric (de 0 a 5)
  destacat?: boolean;        // booleà opcional?
}