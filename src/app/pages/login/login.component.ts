import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginRequest } from '../../core/models/authentication/auth.model';
import { RootState } from '../../store/models/root.model';
import { fromAuthActions } from 'src/app/store/actions';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  name: string = '';

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  loginEvent(loginRequest: LoginRequest): void {
    this.store.dispatch(fromAuthActions.login(loginRequest));
  }
}
