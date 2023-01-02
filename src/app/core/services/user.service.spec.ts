import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../models/common/core.model';
import { User } from '../models/user/user.model';

import { UserService } from './user.service';

const usersFetch: User[] = [
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

const userSuccess: User = {
  email: 'kwamekert@gmail.com',
  role: 1,
  status: 'ACTIVE',
  createdOn: '2021-02-10',
  updatedOn: '2021-02-10',
};
describe('UserService', () => {
  const url: string = `${environment.baseApi}/users/`;

  let service: UserService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call users and get mock response', () => {
    service.fetchUsers({ page: 0, size: 10 }).subscribe((response: any) => {
      expect(response).toEqual(usersFetch);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: url + '?page=0&size=10',
    });

    req.flush({
      data: usersFetch,
      message: 'Users found successfully',
    });
  });

  it('should create user and return mock response', () => {
    service
      .createUser({
        email: 'kwamekert@gmail.com',
        role: 1,
        fullName: 'kwamekert',
      })
      .subscribe((response: User) => {
        expect(response).toEqual(userSuccess);
      });

    const req = httpController.expectOne({
      method: 'POST',
      url,
    });

    req.flush({
      data: userSuccess,
      message: 'User created successfully',
    });
  });

  it('should create update and return mock response', () => {
    service
      .updateUser({
        id: '123023232',
        email: 'kwamekert@gmail.com',
        role: 1,
        fullName: 'kwamekert',
      })
      .subscribe((response: User) => {
        expect(response).toEqual(userSuccess);
      });

    const req = httpController.expectOne({
      method: 'PUT',
      url: url + '123023232',
    });

    req.flush({
      data: userSuccess,
      message: 'User created successfully',
    });
  });
});
