import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    private _activatedRoute: ActivatedRoute,
    private _coursService: CoursService,
    private _evalService: EvaluationsService,
    private _notesServices: NotesService,
    private _router: Router,
  ) { }

  public cours: Cours[] = [];
  public evalModel: CreateEvalModel | undefined;

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this._evalService.getEvaluation(+id).subscribe((evaluation) => {
          this.evalModel = new CreateEvalModel();
          this.evalModel.id = evaluation!.id;
          this.evalModel.sujet = evaluation!.sujet;
          this.evalModel.date = this.formatDate(evaluation!.date);
          this.evalModel.idCours = evaluation!.idCours;
          this.evalForm.setValue({
            idCours: evaluation!.idCours,
            sujet: evaluation!.sujet,
            date: this.formatDate(evaluation!.date)
          });
        });
      }
    });
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
    if (this.evalModel && this.evalModel.id) {
      Object.assign(this.evalModel, this.evalForm.value);
      this._evalService.updateEvaluation(this.evalModel).subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this._router.navigate(['cours-details', this.evalModel?.idCours]);
        },
        error: (error) => console.error('API Error:', error)
      });
    } else {
      this.evalModel = new CreateEvalModel();
      Object.assign(this.evalModel, this.evalForm.value);
      this._evalService.addEvaluation(this.evalModel)
        .subscribe({
          next: (response) => {
            console.error('API Response:', response);
            this._coursService.getElevesByCoursId(this.evalModel!.idCours).subscribe({
              next: (eleves: any) => {
                eleves.value.forEach((e: Eleve) => {
                  let note = new Note();
                  note.idEvaluation = response.id;
                  note.idUser = e.id;
                  this._notesServices.addNote(note)
                    .subscribe({
                      next: (response) => console.log(response),
                      error: (error) => console.error('Error saving notes:', error)
                    });
                })
                this._router.navigate(['cours-details', this.evalModel?.idCours]);
              }
            })
          },
          error: (error) => console.error('API Error:', error)
        });
    }
  }

  public onClick() {
    this._router.navigate(['cours']);
  }

  public shouldShowError(controlName: string) {
    return !this.evalForm.get(controlName)!.valid &&
      this.evalForm.get(controlName)!.touched;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
