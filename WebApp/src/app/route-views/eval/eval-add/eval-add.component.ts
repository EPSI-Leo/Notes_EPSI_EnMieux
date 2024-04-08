import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cours } from 'src/app/models/cours';
import { CoursService } from 'src/app/services/cours.service';
import { EvaluationsService } from 'src/app/services/evaluations.service';
import { CreateEvalModel } from 'src/app/models/createEvalModel';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/models/note';
import { Eleve } from 'src/app/models/eleve';

@Component({
  selector: 'app-eval-add',
  templateUrl: './eval-add.component.html',
  styleUrls: ['./eval-add.component.scss']
})
export class EvalAddComponent {

  public constructor(
    private _coursService: CoursService,
    private _evalService: EvaluationsService,
    private _notesServices: NotesService,
    private _router: Router,
  ) { }

  public cours: Cours[] = [];
  public evalModel: CreateEvalModel | undefined;

  ngOnInit(): void {
    this._coursService.getCoursByIdProf().subscribe((cours: Cours[]) => {
      this.cours = cours;
    });
  }

  public evalForm = new FormGroup({
    idCours: new FormControl(this.cours[0]?.id, [Validators.required]),
    sujet: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    date: new FormControl('', [Validators.required, Validators.maxLength(150)])
  });

  public onSubmit() {
    this.evalModel = new CreateEvalModel();
    this.evalModel.sujet = this.evalForm.get('sujet')!.value!;
    this.evalModel.date = this.evalForm.get('date')!.value!;
    this.evalModel.idCours = this.evalForm.get('idCours')!.value!;
    this._evalService.addEvaluation(this.evalModel)
      .subscribe({
        next: (response) => {
          console.error('API Response:', response);
          this._coursService.getElevesByCoursId(this.evalModel!.idCours).subscribe({
            next: (eleves: any) => {
              console.log(eleves)
              eleves.value.forEach((e: Eleve) => {
                let note = new Note();
                note.idEvaluation = response.id;
                note.idUser = e.id;
                this._notesServices.addNote(note)
                  .subscribe({
                    next: (response) => {
                      console.log(response);
                    },
                    error: (error) => {
                      console.error('Error saving notes:', error);
                    }
                  });
              })
              this._router.navigate(['cours-details', this.evalModel?.idCours]);
            }
          })
        },
        error: (error) => {
          console.error('API Error:', error);
        },
      });
  }

  public onClick() {
    this._router.navigate(['cours']);
  }

  public shouldShowError(controlName: string) {
    return !this.evalForm.get(controlName)!.valid &&
      this.evalForm.get(controlName)!.touched;
  }

}
