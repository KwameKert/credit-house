import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';
import { CustomersPage } from '../models/customer/customer.model';
import { Observable, map } from 'rxjs';
import { IApiResponse } from '../models/common/core.model';
import { environment } from 'src/environments/environment';
import {
  Company,
  CompanyCreate,
  CompanyPage,
} from '../models/company/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  url: string = `${environment.baseApi}/company/`;
  constructor(private httpClient: HttpClient) {}

  fetchCompanies(pageData: Pagination): Observable<CompanyPage> {
    return this.httpClient
      .get<IApiResponse<CompanyPage>>(
        `${this.url}?page=${pageData.page}&size=${pageData.size}`
      )
      .pipe(
        map((response: IApiResponse<CompanyPage>) => {
          return response.data;
        })
      );
  }

  createCompany(data: CompanyCreate): Observable<Company> {
    return this.httpClient
      .post<IApiResponse<Company>>(`${this.url}`, data)
      .pipe(
        map((response: IApiResponse<Company>) => {
          return response.data;
        })
      );
  }

  updateCompany(data: Company): Observable<Company> {
    return this.httpClient
      .put<IApiResponse<Company>>(`${this.url}${data.id}`, data)
      .pipe(
        map((response: IApiResponse<Company>) => {
          return response.data;
        })
      );
  }
}
