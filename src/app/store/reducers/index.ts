import * as fromAuth from '../reducers/auth.reducers';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from 'src/environments/environment';
import { RootState } from '../models/root.model';

export const reducers: ActionReducerMap<RootState> = {
  auth: fromAuth.reducer,
};

const reducerKeys = ['auth'];
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
