import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CoursService {
  constructor(private http: HttpClient, private sessionService: SessionService) {}

  getCoursByIdProf(): Observable<any[]> {
    const idProf = this.sessionService.getAuthUser()?.id;

    if (!idProf) {
      // Gérer le cas où idProf n'est pas disponible
      return new Observable<any[]>(observer => observer.error('IdProf not available'));
    }

    return this.http.get<any[]>(`/api/Cours/ByIdProf/${idProf}`);
  }
}
