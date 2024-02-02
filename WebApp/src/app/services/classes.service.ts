import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classe } from '../models/classe';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private _Classe: Observable<Classe[]>;

  constructor(private http: HttpClient) {
    this._Classe = this.http.get<Classe[]>('/api/Classe');
  }

  public addClasse(classe: Classe): Observable<any> {
    return this.http.post('/api/Classe', JSON.stringify(classe))
  }

  public removeClasse(id: number): Observable<any> {
    return this.http.delete(`/api/Classe/${id}`)
  }

  public updateClasse(classe: Classe): Observable<any> {
    return this.http.put(`/api/Classe/${classe.id}`, JSON.stringify(classe))
  }

  public getClasse(id: number): Observable<Classe | undefined> {
    return this.http.get<Classe>(`/api/Classe/${id}`);
  }

  public getClasses(): Observable<Classe[]> {
    return this._Classe;
  }
}
