import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from '../reducers/company.reducer';
import { CompanyState } from '../models/company.model';

const companySelector = createFeatureSelector<CompanyState>(
  fromStore.customerFeatureKey
);

export const selectCompanies = createSelector(
  companySelector,
  (state: CompanyState) => state.companies
);

export const selectCompaniesTotal = createSelector(
  companySelector,
  (state: CompanyState) => state.companyTotal
);

export const selectCompanyPagination = createSelector(
  companySelector,
  (state: CompanyState) => state.pagination
);
