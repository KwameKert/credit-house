import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  LoginRequest,
  LoginResponse,
} from '../models/authentication/auth.model';
import { IApiResponse } from '../models/common/core.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<IApiResponse<LoginResponse>>(
        `${environment.baseApi}/auth/signin/`,
        credentials
      )
      .pipe(
        map((response: IApiResponse<LoginResponse>) => {
          return response.data;
        })
      );
  }
}
