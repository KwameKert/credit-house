import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';
import { concatMap, map } from 'rxjs';
import { CreateUser, User } from 'src/app/core/models/user/user.model';
import { UserService } from '../../core/services/user.service';
import { fromUserActions } from '../actions';
import { UserState } from '../models/user.model';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  fetchUsers$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromUserActions.fetchUsers),
      concatMap(() => {
        return this.userService.fetchUsers().pipe(
          map((response: User[]) => {
            return this.managefetchUsers(response);
          })
        );
      })
    )
  );

  addUser$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromUserActions.addUser),
      concatMap((request: CreateUser) => {
        return this.userService.createUser(request).pipe(
          map(() => {
            return fromUserActions.fetchUsers();
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
            return fromUserActions.fetchUsers();
          })
        );
      })
    )
  );

  private managefetchUsers(users: User[]): TypedAction<string> {
    const userState: UserState = { users };
    return fromUserActions.fetchUserSuccess(userState);
  }
}
