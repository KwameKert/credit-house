import { TestBed } from '@angular/core/testing';

import { CompanyService } from './company.service';
import { environment } from 'src/environments/environment';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Company } from '../models/company/company.model';

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

describe('CompanyService', () => {
  const url: string = `${environment.baseApi}/company/`;

  let service: CompanyService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService],
    });
    service = TestBed.inject(CompanyService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call companies and get mock response', () => {
    service.fetchCompanies({ page: 0, size: 10 }).subscribe((response: any) => {
      expect(response).toEqual(companiesFetch);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: url + '?page=0&size=10',
    });

    req.flush({
      data: companiesFetch,
      message: 'Companies found successfully',
    });
  });

  it('should create company and return mock response', () => {
    service
      .createCompany({
        name: 'Ama & Kofi Ventures',
        code: '13',
        institutionType: 'Cat A',
        status: 'ACTIVE',
      })
      .subscribe((response: Company) => {
        expect(response).toEqual(companySuccess);
      });

    const req = httpController.expectOne({
      method: 'POST',
      url,
    });
    req.flush({
      data: companySuccess,
      message: 'Company created successfully',
    });
  });

  it('should update company and return mock response', () => {
    service
      .updateCompany({
        id: '234sdfw',
        name: 'Ama & Kofi Ventures',
        code: '13',
        institutionType: 'Cat A',
        status: 'ACTIVE',
      })
      .subscribe((response: Company) => {
        expect(response).toEqual(companySuccess);
      });

    const req = httpController.expectOne({
      method: 'PUT',
      url: url + '234sdfw',
    });
    req.flush({
      data: companySuccess,
      message: 'Company updated successfully',
    });
  });
});
