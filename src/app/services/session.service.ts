import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private userKey = 'userKey';

  setAuthUser(user: User): void {
    const userString = JSON.stringify(user);
    localStorage.setItem(this.userKey, userString);
  }

  getAuthUser(): User | null {
    const userString = localStorage.getItem(this.userKey);
    return userString ? JSON.parse(userString) : null;
  }

  clearAuthUser(): void {
    localStorage.removeItem(this.userKey);
  }

  isAuthenticated(): boolean {
    return !!this.getAuthUser();
  }
}
