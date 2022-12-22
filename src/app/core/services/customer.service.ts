import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../models/common/core.model';
import { Customer } from '../models/customer/customer.model';
import { LocalStorageService } from './local-storage.service';
import { TOKEN } from '../models/common/common.constants';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private url: string = `${environment.baseApi}/customer`;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

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
    console.log('data from servie -->', data);
    // const storedToken = this.localStorageService.getStorageValue(TOKEN);
    // const headers = new HttpHeaders();

    // headers.append('Authorization', `Bearer ${storedToken}`);
    return this.httpClient
      .post<IApiResponse<any>>(`${this.url}/upload`, data)
      .pipe(
        map((response: IApiResponse<any>) => {
          return response.data;
        })
      );
  }

  fetchCustomers(): Observable<Customer[]> {
    return this.httpClient.get<IApiResponse<Customer[]>>(`${this.url}`).pipe(
      map((response: IApiResponse<Customer[]>) => {
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
}
