import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Evaluation } from 'src/app/models/evaluation';
import { EvaluationsService } from 'src/app/services/evaluations.service';

@Component({
  selector: 'app-eval-list',
  templateUrl: './eval-list.component.html',
  styleUrls: ['./eval-list.component.scss']
})
export class EvalListComponent {

  evals: Evaluation[] = [];

  public constructor(
    private _evalService: EvaluationsService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._evalService.getEvaluationsByProfId().subscribe((evals: Evaluation[]) => {
      this.evals = evals;
    });
  }

  onDeleteClick(evalId: number) {
    this._evalService.removeEvaluation(evalId).subscribe({
      next: (response) => {
        console.log(response)
        this._router.navigate(['/eval']);
      },
      error: (error) => console.error('Error while fetching cours:', error)
    });
  }

  public onClick(e: Evaluation) {
    this._router.navigate(['/cours-details', e.idCours]);
  }

  public goToAdd() {
    this._router.navigate(['/eval-add']);
  }

}
