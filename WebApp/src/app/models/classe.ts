import { Cours } from "./cours";
import { Eleve } from "./eleve";

export class Classe {
  id: number = 0;
  nom: string = "";
  cours: Cours[] = [];
  eleves: Eleve[] = [];
}
