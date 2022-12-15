import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
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
    service.fetchUsers().subscribe((response: any) => {
      console.log(response);
      expect(response).toEqual(usersFetch);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: url,
    });

    req.flush({
      data: usersFetch,
      message: 'Users found successfully',
    });
  });
});
