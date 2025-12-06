import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

export interface CreateUserDto {
  id?: string;
  username: string;
  firstname: string;
  lastname: string;
  usercode?: string;
  email: string;
  password: string;
  userType?: UserType;

  userRoleID?: string[] | null; // liste d'UUID
  phoneNumber?: string;
  phoneCountryCode?: string;
  image?: string;
}

export enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  MANAGER = 'MANAGER'
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:8083/api-rdv/v1/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getAll(): Observable<CreateUserDto[]> {
    return this.http.get<CreateUserDto[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getById(id: string): Observable<CreateUserDto> {
    return this.http.get<CreateUserDto>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(user: CreateUserDto): Observable<CreateUserDto> {
    return this.http.post<CreateUserDto>(this.baseUrl, user, { headers: this.getHeaders() });
  }

  update(id: string, user: CreateUserDto): Observable<CreateUserDto> {
    return this.http.put<CreateUserDto>(`${this.baseUrl}/${id}`, user, { headers: this.getHeaders() });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}