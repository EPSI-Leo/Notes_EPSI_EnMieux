import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private _Notes: Observable<Note[]>;

  constructor(private http: HttpClient) {
    this._Notes = this.http.get<Note[]>('/api/Note');
  }

  public addNote(note: Note): Observable<any> {
    const body = JSON.stringify(note);
    console.log(body)
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post('/api/Note', body, { headers })
  }

  public removeNote(id: number): Observable<any> {
    return this.http.delete(`/api/Note/${id}`)
  }

  public updateNote(note: Note): Observable<any> {
    const body = JSON.stringify(note);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put(`/api/Note/${note.id}`, body, { headers })
  }

  public getNote(id: number): Observable<Note | undefined> {
    return this.http.get<Note>(`/api/Note/${id}`);
  }

  public getNotesByCoursId(id: number): Observable<Note[]> {
    return this.http.get<Note[]>(`/api/Note/GetNotesByCoursId/${id}`);
  }

  public getNotes(): Observable<Note[]> {
    return this._Notes;
  }
}
