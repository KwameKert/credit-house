import * as fromAuth from '../reducers/auth.reducers';
import * as fromUser from '../reducers/user.reducers';
import * as fromCustomer from '../reducers/customer.reducer';
import * as fromCompany from '../reducers/company.reducer';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from 'src/environments/environment';
import { RootState } from '../models/root.model';

export const reducers: ActionReducerMap<RootState> = {
  auth: fromAuth.reducer,
  user: fromUser.reducer,
  customer: fromCustomer.reducer,
  company: fromCompany.reducer,
};

const reducerKeys = ['auth', 'user', 'customer', 'company'];
export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: reducerKeys })(reducer);
}

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<RootState>[] = !environment.production
  ? [debug, localStorageSyncReducer]
  : [localStorageSyncReducer];
