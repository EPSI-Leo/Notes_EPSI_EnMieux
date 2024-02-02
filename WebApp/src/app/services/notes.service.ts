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
    return this.http.post('/api/Note', JSON.stringify(note))
  }

  public removeNote(id: number): Observable<any> {
    return this.http.delete(`/api/Note/${id}`)
  }

  public updateNote(note: Note): Observable<any> {
    return this.http.put(`/api/Note/${note.id}`, JSON.stringify(note))
  }

  public getNote(id: number): Observable<Note | undefined> {
    return this.http.get<Note>(`/api/Note/${id}`);
  }

  public getNotes(): Observable<Note[]> {
    return this._Notes;
  }
}
