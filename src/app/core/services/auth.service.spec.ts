import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';
import {
  LoginResponse,
  LoginRequest,
} from '../models/authentication/auth.model';

const loginResponse: LoginResponse = {
  user: {
    fullName: 'kwamekert',
    email: 'kwame@gmail.com',
    role: 1,
  },
  token: 'werwerwerwerwerwerw',
};

describe('AuthService', () => {
  const url: string = `${environment.baseApi}/auth/signin/`;
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login and get mock response', () => {
    const loginParams: LoginRequest = {
      username: 'kwame',
      password: 'password',
    };
    service.login(loginParams).subscribe((response: LoginResponse) => {
      expect(response).toEqual(loginResponse);
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: url,
    });

    req.flush({ data: loginResponse, message: 'User Login successful' });
  });
});
