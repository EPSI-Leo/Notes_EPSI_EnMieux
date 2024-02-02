import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _Users: Observable<User[]>;

  constructor(private http: HttpClient) {
    this._Users = this.http.get<User[]>('/api/User');
  }

  public addUser(user: User): Observable<any> {
    return this.http.post('/api/User', JSON.stringify(user))
  }

  public removeUser(id: number): Observable<any> {
    return this.http.delete(`/api/User/${id}`)
  }

  public updateUser(user: User): Observable<any> {
    return this.http.put(`/api/User/${user.id}`, JSON.stringify(user))
  }

  public getUser(id: number): Observable<User | undefined> {
    return this.http.get<User>(`/api/User/${id}`);
  }

  public getUsers(): Observable<User[]> {
    return this._Users;
  }
}
