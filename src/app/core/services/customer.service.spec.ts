import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/app/core/models/customer/customer.model';

const customerSuccess: Customer = {
  id: '23423423',
  customerId: 'asdf89345',
  customerName: 'kwameCustome',
  phoneNumber: '023423423',
  idType: 'NHIS',
  idNumber: '23423SDFD',
  dateOfBirth: '2220SDFA',
  educationalLevel: 'JHS',
  gender: 'M',
  maritalStatus: 'SINGLE',
  createdTime: '234242',
  companyCode: 'ASDFAS',
};

const customerFetch: Customer[] = [
  customerSuccess,
  customerSuccess,
  customerSuccess,
];

describe('CustomerService', () => {
  const url: string = `${environment.baseApi}/customer`;

  let service: CustomerService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService],
    });
    service = TestBed.inject(CustomerService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call customers and get mock response', () => {
    service.fetchCustomers({ page: 0, size: 10 }).subscribe((response: any) => {
      expect(response).toEqual(customerFetch);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: url + '?page=0&size=10',
    });

    req.flush({
      data: customerFetch,
      message: 'Customers found successfully',
    });
  });

  it('should create customer and return mock response', () => {
    service
      .createCustomer({
        customerId: 'asdf89345',
        customerName: 'kwameCustome',
        phoneNumber: '023423423',
        idType: 'NHIS',
        idNumber: '23423SDFD',
        dateOfBirth: '2220SDFA',
        educationalLevel: 'JHS',
        gender: 'M',
        maritalStatus: 'SINGLE',
        createdTime: '234242',
        companyCode: 'ASDFAS',
      })
      .subscribe((response: Customer) => {
        expect(response).toEqual(customerSuccess);
      });

    const req = httpController.expectOne({
      method: 'POST',
      url: url + '/',
    });

    req.flush({
      data: customerSuccess,
      message: 'Customer created successfully',
    });
  });

  it('should upload bulk customer and return mock response', () => {
    service.uploadCustomers(new FormData()).subscribe((response: Customer) => {
      expect(response).toEqual(customerSuccess);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: url + '/upload',
    });

    req.flush({
      data: customerSuccess,
      message: 'Customers uploaded successfully',
    });
  });
});
