import { Injectable } from '@angular/core';
import { IssuePage } from '../models/setting/issue.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../models/common/core.model';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(private httpClient: HttpClient) {}

  fetchIssues(pageData: Pagination): Observable<IssuePage> {
    return this.httpClient
      .get<IApiResponse<IssuePage>>(
        `${environment.baseApi}/upload_issues/?page=${pageData.page}&size=${pageData.size}`
      )
      .pipe(
        map((response: IApiResponse<IssuePage>) => {
          return response.data;
        })
      );
  }
}
