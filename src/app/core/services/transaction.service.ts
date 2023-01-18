import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';
import { TransactionsPage } from 'src/app/core/models/transaction/transaction.model';
import { IApiResponse } from '../models/common/core.model';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Transaction } from '../models/transaction/transaction.model';
import { CreateUser } from 'src/app/core/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private httpClient: HttpClient) {}

  fetchTransactions(pageData: Pagination): Observable<TransactionsPage> {
    return this.httpClient
      .get<IApiResponse<TransactionsPage>>(
        `${environment.baseApi}/saving_transaction/?page=${pageData.page}&size=${pageData.size}`
      )
      .pipe(
        map((response: IApiResponse<TransactionsPage>) => {
          return response.data;
        })
      );
  }

  addTransaction(data: CreateUser): Observable<Transaction> {
    return this.httpClient
      .post<IApiResponse<Transaction>>(
        `${environment.baseApi}/saving_transaction`,
        data
      )
      .pipe(
        map((response: IApiResponse<Transaction>) => {
          return response.data;
        })
      );
  }

  uploadTransactions(data: any): Observable<any> {
    return this.httpClient
      .post<IApiResponse<any>>(
        `${environment.baseApi}/saving_transaction/upload`,
        data
      )
      .pipe(
        map((response: IApiResponse<any>) => {
          return response.data;
        })
      );
  }
}
