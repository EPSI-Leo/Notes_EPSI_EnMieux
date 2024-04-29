import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluation } from '../models/evaluation';
import { SessionService } from './session.service';
import { CreateEvalModel } from '../models/createEvalModel';

@Injectable({
  providedIn: 'root'
})
export class EvaluationsService {

  private _Evaluations: Observable<Evaluation[]>;

  constructor(private http: HttpClient, private sessionService: SessionService) {
    this._Evaluations = this.http.get<Evaluation[]>('/api/Evaluation');
  }

  public addEvaluation(evaluation: CreateEvalModel): Observable<any> {
    const body = JSON.stringify(evaluation);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post('/api/Evaluation', body, { headers });
  }

  public removeEvaluation(id: number): Observable<any> {
    return this.http.delete(`/api/Evaluation/${id}`)
  }

  public updateEvaluation(evaluation: CreateEvalModel): Observable<any> {
    const body = JSON.stringify(evaluation);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put(`/api/Evaluation/${evaluation.id}`, body, { headers });
  }

  public getEvaluation(id: number): Observable<Evaluation | undefined> {
    return this.http.get<Evaluation>(`/api/Evaluation/${id}`);
  }

  public getEvaluationsByCoursId(id: number): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`/api/Evaluation/GetEvaluationsByCoursId/${id}`);
  }

  public getEvaluationsByProfId(): Observable<Evaluation[]> {
    const idProf = this.sessionService.getAuthUser()?.id;
    return this.http.get<Evaluation[]>(`/api/Evaluation/GetEvaluationsByProfId/${idProf}`);
  }

  public getEvaluations(): Observable<Evaluation[]> {
    return this._Evaluations;
  }
}
