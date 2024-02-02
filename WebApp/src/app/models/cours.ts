export class Cours {
  id: number = 0;
  idProf: number = 0;
  titre: string = '';
  description: string = '';
  constructor(data?: Partial<Cours>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
