import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluation } from '../models/evaluation';

@Injectable({
  providedIn: 'root'
})
export class EvaluationsService {

  private _Evaluations: Observable<Evaluation[]>;

  constructor(private http: HttpClient) {
    this._Evaluations = this.http.get<Evaluation[]>('/api/Evaluation');
  }

  public addEvaluation(evaluation: Evaluation): Observable<any> {
    return this.http.post('/api/Evaluation', JSON.stringify(evaluation))
  }

  public removeEvaluation(id: number): Observable<any> {
    return this.http.delete(`/api/Evaluation/${id}`)
  }

  public updateEvaluation(evaluation: Evaluation): Observable<any> {
    return this.http.put(`/api/Evaluation/${evaluation.id}`, JSON.stringify(evaluation))
  }

  public getEvaluation(id: number): Observable<Evaluation | undefined> {
    return this.http.get<Evaluation>(`/api/Evaluation/${id}`);
  }

  public getEvaluationsByCoursId(id: number): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`/api/Evaluation/GetEvaluationsByCoursId/${id}`);
  }

  public getEvaluations(): Observable<Evaluation[]> {
    return this._Evaluations;
  }
}
