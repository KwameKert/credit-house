import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { fromAuthActions } from 'src/app/store/actions';
import { fromAuthSelectors } from 'src/app/store/selectors';
import { LoginRequest } from '../../../core/models/authentication/auth.model';
import { RootState } from '../../../store/models/root.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Output() credentials = new EventEmitter<LoginRequest>();
  subscriptions: Subscription[] = [];
  loginForm!: FormGroup;
  isLoggingIn = false;
  subscription!: Subscription;

  constructor(private fb: FormBuilder, private store: Store<RootState>) {}

  ngOnInit(): void {
    this.setupLoginForm();
    this.subscription = this.store
      .pipe(select(fromAuthSelectors.selectIsLoggingIn))
      .subscribe((isLoggingIn: boolean) => {
        this.isLoggingIn = isLoggingIn;

        if (!this.isLoggingIn) {
          this.resetPasswordValidationInput();
        }
      });
  }

  private setupLoginForm(): void {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login(loginCredentials: LoginRequest): void {
    this.credentials.emit(loginCredentials);
  }

  resetPasswordValidationInput() {
    const password = 'password';
    this.loginForm.get(password)?.clearAsyncValidators();
    this.loginForm.get(password)?.updateValueAndValidity();
    this.loginForm.get(password)?.reset();
    this.loginForm.get(password)?.setValidators([Validators.required]);
    this.loginForm.get(password)?.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
}
