import { TestBed } from '@angular/core/testing';

import { CompanyEffects } from './company.effects';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { fromCompanySelectors } from '../selectors';
import { provideMockActions } from '@ngrx/effects/testing';
import { fromCompanyActions, fromCustomerActions } from '../actions';
import { Company } from 'src/app/core/models/company/company.model';

const companySuccess: Company = {
  id: 'asdf234343',
  name: 'Ama & Kofi Ventures',
  code: '13',
  institutionType: 'Cat A',
  status: 'ACTIVE',
};

const companiesFetch: Company[] = [
  companySuccess,
  companySuccess,
  companySuccess,
];
describe('CompanyEffects', () => {
  let effects: CompanyEffects;
  const url: string = `${environment.baseApi}/company/`;

  let action$: Observable<any>;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CompanyEffects,
        provideMockStore({
          initialState: { companies: [], pagination: { page: 0, size: 10 } },
          selectors: [
            {
              selector: fromCompanySelectors.selectCompanyPagination,
              value: {
                page: 0,
                size: 10,
              },
            },
          ],
        }),
        provideMockActions(() => action$),
      ],
    });
    effects = TestBed.inject(CompanyEffects);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should fire a fetch company and get a success', (done) => {
    action$ = of(
      fromCompanyActions.fetchCompanies({ data: { page: 0, size: 10 } })
    );
    effects.fetchCompanies$.subscribe((result: any) => {
      console.log();
      expect(result).toEqual(
        fromCompanyActions.fetchCompaniesSuccess({
          data: { companies: companiesFetch, total: 10 },
        })
      );
    });
    fetchCompanySuccessMock();
    done();
  });

  it('should fire a create customer and get a success', (done) => {
    action$ = of(
      fromCompanyActions.addCompany({
        name: 'Ama & Kofi Ventures',
        code: '13',
        institutionType: 'Cat A',
        status: 'ACTIVE',
      })
    );
    effects.addCompany$.subscribe((result: any) => {
      expect(result).toEqual(
        fromCompanyActions.fetchCompanies({ data: { page: 0, size: 10 } })
      );
    });
    createCompanySuccessMock();
    done();
  });

  it('should fire a update customer and get a success', (done) => {
    action$ = of(
      fromCompanyActions.updateCompany({
        id: '2342sdf',
        name: 'Ama & Kofi Ventures',
        code: '13',
        institutionType: 'Cat A',
        status: 'ACTIVE',
      })
    );
    effects.updateCompany$.subscribe((result: any) => {
      expect(result).toEqual(
        fromCompanyActions.fetchCompanies({ data: { page: 0, size: 10 } })
      );
    });
    updateCompanySuccessMock();
    done();
  });

  function fetchCompanySuccessMock() {
    httpController
      .expectOne({ method: 'GET', url: url + '?page=0&size=10' })
      .flush({
        data: { companies: companiesFetch, total: 10 },
        message: 'Companies fetched successfully',
      });
  }

  function createCompanySuccessMock() {
    httpController.expectOne({ method: 'POST', url }).flush({
      data: companySuccess,
      message: 'Companies created successfully',
    });
  }

  function updateCompanySuccessMock() {
    httpController.expectOne({ method: 'PUT', url: url + '2342sdf' }).flush({
      data: companySuccess,
      message: 'Companies created successfully',
    });
  }
});
