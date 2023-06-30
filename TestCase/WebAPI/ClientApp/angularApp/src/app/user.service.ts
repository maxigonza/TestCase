import { HttpClient } from '@angular/common/http';
import {EventEmitter, Inject, Injectable } from '@angular/core';
import {AppConfig} from "../types/AppConfig";
import { BehaviorSubject, tap } from 'rxjs';
import {APP_CONFIG} from "../providers/config.provider";
import {User} from "../types/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private selectedUserSubject = new BehaviorSubject<any>(null);
  selectedUser = this.selectedUserSubject.asObservable();

  userUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) { }

  getUsers() {
     return this.http.get<User[]>(`${this.config.apiEndpoint}/user/all`);
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.config.apiEndpoint}/user/` + id);
  }

  addUser(user: User) {
    user.id = 0;
    user.isAdmin = Boolean(Number(user.isAdmin));
    return this.http.post(`${this.config.apiEndpoint}/user/add`, user).pipe(
      tap(() => {
        this.userUpdated.emit();
      })
    );
  }

  updateUser(user: User) {
    user.isAdmin = Boolean(Number(user.isAdmin));
    return this.http.post(`${this.config.apiEndpoint}/user/update?id=` + user.id, user).pipe(
      tap(() => {
        this.userUpdated.emit();
      })
    );
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.config.apiEndpoint}/user?id=` + id);
  }

  setSelectedUser(user: User) {
    this.selectedUserSubject.next(user);
  }
}
