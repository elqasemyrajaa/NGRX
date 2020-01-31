import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = "http://144.91.76.98:5000/api/users";
  constructor(private http:HttpClient) { }
  /*********************Get Users********************************** */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }
  /********************Get user by ID********************************************** */
  getUserById(payload: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${payload}`);
  }
  /*****************************Create User**************************************************** */
  createUser(payload: User): Observable<User> {
    return this.http.post<User>(this.userUrl, payload);
  }
  /*****************************Update User************************************* */
  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(
      `${this.userUrl}/${user.id}`,
      user
    );
  }
  /********************************Delete User*************************************************** */
  deleteUser(payload: number) {
    return this.http.delete(`${this.userUrl}/${payload}`);
  }
}
