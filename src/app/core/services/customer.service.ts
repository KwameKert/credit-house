import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../models/common/core.model';
import { Customer, CustomersPage } from '../models/customer/customer.model';
import { LocalStorageService } from './local-storage.service';
import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private url: string = `${environment.baseApi}/customer`;

  constructor(private httpClient: HttpClient) {}

  createCustomer(data: Customer): Observable<Customer> {
    return this.httpClient
      .post<IApiResponse<Customer>>(`${this.url}/`, data)
      .pipe(
        map((response: IApiResponse<Customer>) => {
          return response.data;
        })
      );
  }

  uploadCustomers(data: any): Observable<any> {
    return this.httpClient
      .post<IApiResponse<any>>(`${this.url}/upload`, data)
      .pipe(
        map((response: IApiResponse<any>) => {
          return response.data;
        })
      );
  }

  fetchCustomers(pageData: Pagination): Observable<CustomersPage> {
    return this.httpClient
      .get<IApiResponse<CustomersPage>>(
        `${this.url}?page=${pageData.page}&size=${pageData.size}`
      )
      .pipe(
        map((response: IApiResponse<CustomersPage>) => {
          return response.data;
        })
      );
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.httpClient.get<IApiResponse<Customer>>(`${this.url}/id`).pipe(
      map((response: IApiResponse<Customer>) => {
        return response.data;
      })
    );
  }

  searchCustomerById(customerId: string): Observable<Customer[]> {
    return this.httpClient
      .get<IApiResponse<Customer[]>>(`${this.url}/search/${customerId}`)
      .pipe(
        map((response: IApiResponse<Customer[]>) => {
          return response.data;
        })
      );
  }
}
