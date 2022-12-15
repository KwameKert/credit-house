import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUser, User } from '../models/user/user.model';
import { IApiResponse } from '../models/common/core.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.httpClient
      .get<IApiResponse<User[]>>(`${environment.baseApi}/users/`)
      .pipe(
        map((response: IApiResponse<User[]>) => {
          return response.data;
        })
      );
  }

  createUser(data: CreateUser): Observable<User> {
    return this.httpClient
      .post<IApiResponse<User>>(`${environment.baseApi}/users/`, data)
      .pipe(
        map((response: IApiResponse<User>) => {
          return response.data;
        })
      );
  }

  updateUser(data: CreateUser): Observable<User> {
    return this.httpClient
      .put<IApiResponse<User>>(`${environment.baseApi}/users/`, data)
      .pipe(
        map((response: IApiResponse<User>) => {
          return response.data;
        })
      );
  }

  fetchUserById(id: number): Observable<User> {
    return this.httpClient
      .get<IApiResponse<User>>(`${environment.baseApi}/user/${id}`)
      .pipe(
        map((response: IApiResponse<User>) => {
          return response.data;
        })
      );
  }
}
