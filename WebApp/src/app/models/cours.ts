import { Prof } from './prof';

export class Cours {
  id: number = 0;
  Prof: Prof | undefined;
  titre: string = '';
  description: string = '';
}
