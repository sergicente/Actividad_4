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

  // getAllWithPromises(): Promise<ApiResponse>{
  //   return lastValueFrom(this.httpClient.get<ApiResponse>(this.baseUrl));
  // }

  getById(_id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${_id}`);
  }
}
