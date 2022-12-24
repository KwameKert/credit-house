import { fromCompanyActions } from '../actions';
import { CompanyState } from '../models/company.model';
import { Action, createReducer, on } from '@ngrx/store';

export const initialCompanyState: CompanyState = {
  pagination: {
    page: 0,
    size: 5,
  },
  companies: [],
  companyTotal: 0,
};

export const customerFeatureKey: string = 'company';

const companyReducer = createReducer(
  initialCompanyState,
  on(
    fromCompanyActions.fetchCompaniesSuccess,
    (state: CompanyState, { data }) => ({
      ...state,
      companies: data.companies,
      companyTotal: data.total,
    })
  ),
  on(fromCompanyActions.paginateCustomer, (state: CompanyState, { data }) => ({
    ...state,
    pagination: {
      page: data.page,
      size: data.size,
    },
  }))
);

export function reducer(state: CompanyState | undefined, action: Action): any {
  return companyReducer(state, action);
}
