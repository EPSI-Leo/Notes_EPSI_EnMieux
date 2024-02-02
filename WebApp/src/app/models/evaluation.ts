import { Cours } from './cours';

export class Evaluation {
  id: number = 0;
  cours: Cours | undefined;
  sujet: string = '';
  date: Date = new Date();
}
