import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, concatMap, map, withLatestFrom } from 'rxjs';
import { CreateUser, UsersPage } from 'src/app/core/models/user/user.model';
import { UserService } from '../../core/services/user.service';
import { fromUserActions } from '../actions';
import { RootState } from '../models/root.model';
import { Store } from '@ngrx/store';
import { fromUserSelectors } from '../selectors';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<RootState>
  ) {}

  fetchUsers$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromUserActions.fetchUsers),
      concatMap((request) => {
        return this.userService.fetchUsers(request.data).pipe(
          map((response: UsersPage) => {
            return fromUserActions.fetchUserSuccess({ data: response });
          })
        );
      })
    )
  );

  addUser$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromUserActions.addUser),
      withLatestFrom(this.store.select(fromUserSelectors.selectUserPagination)),
      concatMap(([request, pagination]) => {
        return this.userService.createUser(request).pipe(
          map(() => {
            return fromUserActions.fetchUsers({
              data: { size: pagination.size, page: pagination.page },
            });
          })
        );
      })
    )
  );

  updateUser$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromUserActions.editUser),
      concatMap((request: CreateUser) => {
        return this.userService.updateUser(request).pipe(
          map(() => {
            return fromUserActions.fetchUsers({ data: { size: 5, page: 0 } });
          })
        );
      })
    )
  );
}
