import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { USERS_DB } from '../db/users.db';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private arrUsuarios: IUser[];

  constructor() {
    this.arrUsuarios = USERS_DB;
  }

  getAll(): IUser[] {
    return this.arrUsuarios;
  }

  getById(id: number): IUser | undefined {
    return this.arrUsuarios.find(u => u.id === id);
  }
  
}
