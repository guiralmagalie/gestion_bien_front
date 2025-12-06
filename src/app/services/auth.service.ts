import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number;
  name: string;
  // role: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API_URL = 'http://localhost:8083/api-rdv/v1/auth/login';

  private userSubject = new BehaviorSubject<User | null>(this.loadUser());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  private loadUser(): User | null {
    const data = localStorage.getItem('auth_user');
    return data ? JSON.parse(data) : null;
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.http.post<any>(this.API_URL, body).pipe(
      tap(response => {

        const user: User = {
          id: response.id ?? 0,
          name: response.username,
          // role: response.role ?? 'USER',
          token: response.token
        };

        localStorage.setItem('auth_user', JSON.stringify(user));
        localStorage.setItem('auth_token', response.token);

        this.userSubject.next(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    if (this.userSubject.value) return true;

    const stored = localStorage.getItem('auth_user');
    if (stored) {
      this.userSubject.next(JSON.parse(stored));
      return true;
    }
    return false;
  }

  currentUser() {
    return this.userSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
