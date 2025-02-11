import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  httpClient = inject(HttpClient);
  private baseUrl: string = 'https://peticiones.online/api/users';

  constructor() {  }

  getAllWithObservable(): Observable<ApiResponse>{
    return this.httpClient.get<ApiResponse>(this.baseUrl);
  }

  eliminarUsuario(id: string): Observable<User> {
    return this.httpClient.delete<User>(`https://peticiones.online/api/users/${id}`);
  }

  getById(_id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${_id}`);
  }

  getByIdWithPromises(_id: string): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>(`${this.baseUrl}/${_id}`))
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.httpClient.post<User>(`https://peticiones.online/api/users`, user);
  }

  updateUser(id: string, userData: Partial<User>): Observable<User> {
    return this.httpClient.put<User>(`https://peticiones.online/api/users/${id}`, userData);
  }
}
