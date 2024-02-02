import { Cours } from './cours';

export class Evaluation {
  ID: number = 0;
  Cours: Cours | undefined;
  Sujet: string = '';
  Date: Date = new Date();
}
