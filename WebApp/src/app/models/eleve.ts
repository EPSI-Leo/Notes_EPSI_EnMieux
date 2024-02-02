import { Classe } from "./classe";
import { User } from "./user";

export class Eleve extends User {
  classe: Classe | undefined;
}
