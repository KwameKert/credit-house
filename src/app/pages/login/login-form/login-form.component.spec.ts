import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { RootState } from 'src/app/store/models/root.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { reducers } from '../../../store/reducers/index';
import { LoginFormComponent } from './login-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let store: Store<RootState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        StoreModule.forRoot(reducers),
      ],

      declarations: [LoginFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ui elements must be included', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-base-input-field')).toBeDefined();
    expect(compiled.querySelector('app-base-button')).toBeDefined();
  });

  it('should test form validity; false when is null', () => {
    const form = component.loginForm;
    const usernameInput = form.controls['username'];
    usernameInput.setValue('');
    expect(usernameInput.errors).toBeDefined();
  });

  it('should test form validity; true when parameters are defined', () => {
    const form = component.loginForm;
    const usernameInput = form.controls['username'];
    const passwordInput = form.controls['password'];
    usernameInput.setValue('kwame');
    passwordInput.setValue('password2123');
    expect(form.valid).toBeTruthy();
  });
});
