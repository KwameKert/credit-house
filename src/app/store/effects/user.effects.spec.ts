import { JsonpClientBackend } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { fromUserActions } from '../actions';
import { UserState } from '../models/user.model';

import { UserEffects } from './user.effects';

const usersFetch = [
  {
    email: 'kwamekert@gmail.com',
    fullName: 'Kwame Asante',
    role: 1,
  },
  {
    email: 'kwamekert@gmail.com',
    fullName: 'Kwame Asante',
    role: 1,
  },
];

describe('UserService', () => {
  const url: string = `${environment.baseApi}/users/`;

  let action$: Observable<any>;
  let httpController: HttpTestingController;

  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserEffects,
        provideMockStore({
          initialState: { users: [] },
        }),
        provideMockActions(() => action$),
      ],
    });
    effects = TestBed.inject(UserEffects);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  //write test to check if user list was tested

  describe('userFetch$', () => {
    it('should fire a fetch user and get a success', (done) => {
      action$ = of(fromUserActions.fetchUsers);
      effects.fetchUsers$.subscribe((result: any) => {
        expect(result).toEqual(
          fromUserActions.fetchUserSuccess(getFetchUsersState())
        );
      });
      fetchUserSuccessMock();
      done();
    });
  });

  function fetchUserSuccessMock() {
    httpController
      .expectOne({ method: 'GET', url })
      .flush({ data: usersFetch, message: 'Users fetched successfully' });
  }

  function getFetchUsersState(): UserState {
    const userState: UserState = {
      users: usersFetch,
    };
    return userState;
  }
});
