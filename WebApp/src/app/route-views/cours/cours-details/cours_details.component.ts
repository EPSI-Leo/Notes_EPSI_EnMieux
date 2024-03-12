import { EvaluationsService } from './../../../services/evaluations.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from 'src/app/models/cours';
import { Eleve } from 'src/app/models/eleve';
import { Evaluation } from 'src/app/models/evaluation';
import { Note } from 'src/app/models/note';
import { CoursService } from 'src/app/services/cours.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-cours_details',
  templateUrl: './cours_details.component.html',
  styleUrls: ['./cours_details.component.scss']
})
export class DetailsCoursComponent {

  public cours: Cours | undefined;
  public eleves: Eleve[] = [];
  public evals: Evaluation[] = [];
  public notes: Note[] = [];

  public constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _coursService: CoursService,
    private _evalService: EvaluationsService,
    private _notesService: NotesService,
  ) { }

  ngOnInit(): void {
    this._activeRoute.params.subscribe(params => {
      const coursId = +params['id']; // Convert id to number
      this._coursService.getCours(coursId).subscribe((cours: Cours | undefined) => {
        this.cours = cours;
      });
      this._coursService.getElevesByCoursId(coursId).subscribe((eleves: any) => {
        this.eleves = eleves.value;
      });
      this._evalService.getEvaluationsByCoursId(coursId).subscribe((evals: Evaluation[]) => {
        this.evals = evals;
      });
      this._notesService.getNotesByCoursId(coursId).subscribe((notes: Note[]) => {
        this.notes = notes;
      });
    });
  }

  public getGrade(studentId: number, evaluationId: number): string {
    const note = this.notes.find(n => n.idUser === studentId && n.idEvaluation === evaluationId);
    return note ? `${note.valeur}` : '';
  }

  public setGrade(value: any, studentId: number, evaluationId: number): void {
    const noteIndex = this.notes.findIndex(n => n.idUser === studentId && n.idEvaluation === evaluationId);
    this.notes[noteIndex].valeur = +value.value;
    this._notesService.updateNote(this.notes[noteIndex])
      .subscribe({
        next: (response) => {
          console.log('Notes saved successfully:', response);
        },
        error: (error) => {
          console.error('Error saving notes:', error);
        }
      });
  }

  public getCoeff(studentId: number, evaluationId: number): string {
    const note = this.notes.find(n => n.idUser === studentId && n.idEvaluation === evaluationId);
    return note ? `${note.coefficient}` : '';
  }

  public setCoeff(value: any, studentId: number, evaluationId: number): void {
    const noteIndex = this.notes.findIndex(n => n.idUser === studentId && n.idEvaluation === evaluationId);
    this.notes[noteIndex].coefficient = +value.value;
    this._notesService.updateNote(this.notes[noteIndex])
      .subscribe({
        next: (response) => {
          console.log('Notes saved successfully:', response);
        },
        error: (error) => {
          console.error('Error saving notes:', error);
        }
      });
  }

  public onSubmit() {

    this._coursService.updateCours(this.cours!)
      .subscribe({
        next: (response) => {
          console.log('API Response:', response);
        },
        error: (error) => {
          console.error('API Error:', error);
        },
      });
  }
}
