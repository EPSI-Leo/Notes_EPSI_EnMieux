import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private httpClient: HttpClient, private sessionService: SessionService) {}

  login(username: string, password: string): Observable<any> {
    const credentials = {
      username: username,
      password: password
    };

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.httpClient.post<any>('/api/Auth/login', credentials, httpOptions)
      .pipe(
        tap(response => this.handleSuccessfulLogin(response)),
        catchError(error => this.handleError('login', error))
      );
  }

  private handleSuccessfulLogin(response: any): void {
    const user = response.user;
    this.sessionService.setAuthUser(user);
  }

  private handleError(operation: string, error: any): Observable<never> {
    console.error(`${operation} failed: ${error.message}`);
    return throwError(error.message || 'Server error');
  }
}
