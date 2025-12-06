import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

export interface CreateUserDto {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  userCode?: string;
  emailAddress: string;
  password: string;
  userType?: UserType;
  userRoleID?: string[] | null; 
  phoneNumber?: string;
  phoneCountryCode?: string;
  userImage?: string;
}

export enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  MANAGER = 'MANAGER'
}

// Interface pour la réponse paginée
export interface PaginatedResponse<T> {
  items: T[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
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

  // Mettez à jour pour accepter les paramètres de pagination
  getAll(page: number = 0, size: number = 20): Observable<PaginatedResponse<CreateUserDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    return this.http.get<PaginatedResponse<CreateUserDto>>(this.baseUrl, { 
      headers: this.getHeaders(),
      params 
    });
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

  deleteUsers(ids: number | number[]): Observable<void> {
  const idList = Array.isArray(ids) ? ids : [ids];

  let params = new HttpParams();
  idList.forEach(id => {
    params = params.append('userIds', id.toString());
  });

  return this.http.delete<void>(`${this.baseUrl}/`, {
    headers: this.getHeaders(),
    params
  });
}

}