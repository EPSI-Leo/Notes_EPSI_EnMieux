import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours } from '../models/cours';
import { Eleve } from '../models/eleve';
import { Classe } from '../models/classe';
import { CreateCoursModel } from '../models/createCoursModel';


@Injectable({
  providedIn: 'root',
})
export class CoursService {

  private _Cours: Observable<Cours[]>;

  constructor(private http: HttpClient, private sessionService: SessionService) {
    this._Cours = this.http.get<Cours[]>('/api/Cours');
  }

  public addCours(cours: CreateCoursModel): Observable<any> {
    const body = JSON.stringify(cours);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post('/api/Cours', body, { headers })
  }

  public removeCours(id: number): Observable<any> {
    return this.http.delete(`/api/Cours/${id}`)
  }

  public updateCours(cours: CreateCoursModel): Observable<any> {
    const body = JSON.stringify(cours);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put(`/api/Cours/${cours.id}`, body, { headers })
  }

  public getCours(id: number): Observable<Cours | undefined> {
    return this.http.get<Cours>(`/api/Cours/${id}`);
  }

  public getAllCours(): Observable<Cours[]> {
    return this._Cours;
  }

  public getElevesByCoursId(id: number): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(`/api/Cours/GetUsersByCoursId/${id}`);
  }

  public getClassesByCoursId(id: number): Observable<Classe[]> {
    return this.http.get<Classe[]>(`/api/Cours/getClassesByCoursId/${id}`);
  }

  public getCoursByIdProf(): Observable<any[]> {
    const idProf = this.sessionService.getAuthUser()?.id;

    if (!idProf) {
      // Gérer le cas où idProf n'est pas disponible
      return new Observable<any[]>(observer => observer.error('IdProf not available'));
    }

    return this.http.get<any[]>(`/api/Cours/ByIdProf/${idProf}`);
  }
}
