import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';
import { createAction, props } from '@ngrx/store';
import { CompanyCreate } from 'src/app/core/models/company/company.model';
import { Company, CompanyPage } from '../../core/models/company/company.model';

export const COMPANY_FETCH = '[Company Page] Fetch companies';
export const COMPANY_ADD = '[Company Page] Add company';
export const COMPANY_UPDATE = '[Company Page] Update company';
export const COMPANY_FETCH_SUCCESS = '[Company Page] Fetch company success';
export const COMPANY_PAGINATION = '[Company Page] Add company pagination';

export const addCompany = createAction(COMPANY_ADD, props<CompanyCreate>());
export const updateCompany = createAction(COMPANY_UPDATE, props<Company>());
export const fetchCompanies = createAction(
  COMPANY_FETCH,
  props<{ data: Pagination }>()
);
export const fetchCompaniesSuccess = createAction(
  COMPANY_FETCH_SUCCESS,
  props<{ data: CompanyPage }>()
);
export const paginateCustomer = createAction(
  COMPANY_PAGINATION,
  props<{ data: Pagination }>()
);
