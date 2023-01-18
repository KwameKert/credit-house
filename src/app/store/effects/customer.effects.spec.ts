import { TestBed } from '@angular/core/testing';

import { CustomerEffects } from './customer.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, Subject } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { fromCustomerSelectors } from '../selectors';
import { fromCustomerActions } from '../actions';
import { Customer } from 'src/app/core/models/customer/customer.model';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/core/services/notification.service';

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
describe('CustomerEffects', () => {
  const url: string = `${environment.baseApi}/customer`;

  let effects: CustomerEffects;
  let action$: Observable<any>;
  let httpController: HttpTestingController;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CustomerEffects,
        provideMockActions(() => action$),
        provideMockStore({
          initialState: { customers: [] },
          selectors: [
            {
              selector: fromCustomerSelectors.selectCustomerPagination,
              value: {
                page: 0,
                size: 10,
              },
            },
          ],
        }),
        {
          provide: NotificationService,
          useValue: notificationServiceSpy,
        },
      ],
    });
    effects = TestBed.inject(CustomerEffects);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should fire a fetch customers and get a success', (done) => {
    action$ = of(
      fromCustomerActions.fetchCustomers({ data: { page: 0, size: 10 } })
    );
    effects.fetchCustomers$.subscribe((result: any) => {
      expect(result).toEqual(
        fromCustomerActions.fetchCustomersSuccess({
          data: { customers: customerFetch, total: 10 },
        })
      );
    });
    fetchCustomerSuccessMock();
    done();
  });

  it('should fire a create customer and get a success', (done) => {
    action$ = of(
      fromCustomerActions.addCustomer({
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
    );
    effects.addCustomer$.subscribe((result: any) => {
      expect(result).toEqual(fromCustomerActions.addCustomerSuccess());
    });
    addCustomerSuccessMock();
    done();
  });

  // it('should fire a upload customer and get a success', (done) => {
  //   notificationServiceSpy.info();
  //   action$ = of(fromCustomerActions.uploadCustomers({ data: new FormData() }));
  //   effects.uploadCustomers$.subscribe((result: any) => {
  //     expect(result).toEqual(
  //       fromCustomerActions.fetchCustomers({ data: { page: 0, size: 10 } })
  //     );
  //   });
  //   uploadCustomerSuccessMock();
  //   done();
  // });

  function fetchCustomerSuccessMock() {
    httpController
      .expectOne({ method: 'GET', url: url + '?page=0&size=10' })
      .flush({
        data: { customers: customerFetch, total: 10 },
        message: 'Customers fetched successfully',
      });
  }

  function addCustomerSuccessMock() {
    httpController.expectOne({ method: 'POST', url: url + '/' }).flush({
      data: customerSuccess,
      message: 'Customer created successfully',
    });
  }

  function uploadCustomerSuccessMock() {
    httpController.expectOne({ method: 'POST', url: url + '/upload' }).flush({
      data: customerSuccess,
      message: 'Customer uploaded successfully',
    });
  }
});
