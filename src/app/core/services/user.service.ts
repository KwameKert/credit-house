import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUser, User, UsersPage } from '../models/user/user.model';
import { IApiResponse } from '../models/common/core.model';
import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  fetchUsers(pageData: Pagination): Observable<UsersPage> {
    return this.httpClient
      .get<IApiResponse<UsersPage>>(
        `${environment.baseApi}/users/?page=${pageData.page}&size=${pageData.size}`
      )
      .pipe(
        map((response: IApiResponse<UsersPage>) => {
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
      .put<IApiResponse<User>>(`${environment.baseApi}/users/${data.id}`, data)
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

  updateUserStatus(id: string, status: string): Observable<User> {
    return this.httpClient
      .put<IApiResponse<User>>(
        `${environment.baseApi}/users/${status}/${id}`,
        {}
      )
      .pipe(
        map((response: IApiResponse<User>) => {
          return response.data;
        })
      );
  }
}
