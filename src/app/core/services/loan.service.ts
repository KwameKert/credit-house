import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';
import { Loan, LoanPage } from '../models/loan/loan.model';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { IApiResponse } from '../models/common/core.model';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private httpClient: HttpClient) {}

  fetchLoans(pageData: Pagination): Observable<LoanPage> {
    return this.httpClient
      .get<IApiResponse<LoanPage>>(
        `${environment.baseApi}/loan_transaction?page=${pageData.page}&size=${pageData.size}`
      )
      .pipe(
        map((response: IApiResponse<LoanPage>) => {
          return response.data;
        })
      );
  }

  createLoan(data: Loan): Observable<Loan> {
    return this.httpClient
      .post<IApiResponse<Loan>>(`${environment.baseApi}/loan_transaction`, data)
      .pipe(
        map((response: IApiResponse<Loan>) => {
          return response.data;
        })
      );
  }

  uploadLoans(data: any): Observable<any> {
    return this.httpClient
      .post<IApiResponse<any>>(`${environment.baseApi}/loan_transaction/upload`, data)
      .pipe(
        map((response: IApiResponse<any>) => {
          return response.data;
        })
      );
  }

}
