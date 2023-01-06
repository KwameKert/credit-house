import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Widget } from '../models/dashboard/dashboard.model';
import { IApiResponse } from '../models/common/core.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private url: string = `${environment.baseApi}/dashboard`;

  constructor(private httpClient: HttpClient) {}

  getGender(): Observable<Widget[]> {
    return this.httpClient
      .get<IApiResponse<Widget[]>>(`${this.url}/gender`)
      .pipe(
        map((response: IApiResponse<Widget[]>) => {
          return response.data;
        })
      );
  }

  getSector(): Observable<Widget[]> {
    return this.httpClient
      .get<IApiResponse<Widget[]>>(`${this.url}/sector`)
      .pipe(
        map((response: IApiResponse<Widget[]>) => {
          return response.data;
        })
      );
  }

  getEducation(): Observable<Widget[]> {
    return this.httpClient
      .get<IApiResponse<Widget[]>>(`${this.url}/education`)
      .pipe(
        map((response: IApiResponse<Widget[]>) => {
          return response.data;
        })
      );
  }

  getInactive(): Observable<number> {
    return this.httpClient
      .get<IApiResponse<number>>(`${this.url}/inactive`)
      .pipe(
        map((response: IApiResponse<number>) => {
          return response.data;
        })
      );
  }

  getActive(): Observable<number> {
    return this.httpClient.get<IApiResponse<number>>(`${this.url}/active`).pipe(
      map((response: IApiResponse<number>) => {
        return response.data;
      })
    );
  }
}
