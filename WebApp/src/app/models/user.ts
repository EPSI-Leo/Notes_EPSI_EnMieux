export class User {
  id: number = 0;
  username: string = '';
  password: string = '';
  nom: string = '';
  prenom: string = '';
  role: string = '';
  idClasse: number | null = null;

  constructor(data?: Partial<User>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
