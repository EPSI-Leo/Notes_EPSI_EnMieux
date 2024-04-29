export class CreateCoursModel {
  id?: number;
  idProf: number = 0;
  titre: string = '';
  description: string = '';
  idClasses: number[] = [];
}
