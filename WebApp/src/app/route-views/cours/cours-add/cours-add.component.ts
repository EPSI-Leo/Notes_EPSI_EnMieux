import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Classe } from 'src/app/models/classe';
import { CreateCoursModel } from 'src/app/models/createCoursModel';
import { ClassesService } from 'src/app/services/classes.service';
import { CoursService } from 'src/app/services/cours.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-cours-add',
  templateUrl: './cours-add.component.html',
  styleUrls: ['./cours-add.component.scss']
})
export class CoursAddComponent {

  public constructor(
    private _coursService: CoursService,
    private _classeService: ClassesService,
    private _sessionService: SessionService,
    private _router: Router,
  ) { }

  public classes: Classe[] = [];
  public coursModel: CreateCoursModel | undefined;
  public currentUser = this._sessionService.getAuthUser()!;

  ngOnInit(): void {
    this._classeService.getClasses().subscribe((classes: Classe[]) => {
      this.classes = classes;
    });
  }

  public coursForm = new FormGroup({
    idsClasse: new FormControl([this.classes[0]?.id], [Validators.required]),
    titre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(150)])
  });

  public onSubmit() {
    this.coursModel = new CreateCoursModel();
    this.coursModel.idProf = this.currentUser.id;
    this.coursModel.titre = this.coursForm.get('titre')!.value!;
    this.coursModel.description = this.coursForm.get('description')!.value!;
    this.coursModel.idClasses = this.coursForm.get('idsClasse')!.value!;
    this._coursService.addCours(this.coursModel)
      .subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this._router.navigate(['cours']);
        },
        error: (error) => console.error('API Error:', error)
      });
  }

  public onClick() {
    this._router.navigate(['cours']);
  }

  public shouldShowError(controlName: string) {
    return !this.coursForm.get(controlName)!.valid &&
      this.coursForm.get(controlName)!.touched;
  }
}
