import { Evaluation } from './evaluation';
import { Eleve } from './eleve';

export class Note {
  id: number = 0;
  eleve: Eleve | undefined;
  evaluation: Evaluation | undefined;
  valeur: number = 0;
  coefficient: number = 0;
}
