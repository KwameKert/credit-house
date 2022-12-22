import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/core/models/customer/customer.model';
import { fromCustomerActions } from 'src/app/store/actions';
import { RootState } from 'src/app/store/models/root.model';
import { fromCustomerSelectors } from 'src/app/store/selectors';
import { Router } from '@angular/router';
import { Route } from 'src/app/core/models/common';

@Component({
  selector: 'app-customer-manager',
  templateUrl: './customer-manager.component.html',
  styleUrls: ['./customer-manager.component.scss'],
})
export class CustomerManagerComponent implements OnInit, OnDestroy {
  customerForm!: FormGroup;
  subscription?: Subscription;
  gender = [
    { id: 'M', name: 'Male' },
    { id: 'F', name: 'Female' },
  ];

  maritalStatus = [
    { id: 'MARRIED', name: 'Married' },
    { id: 'SINGLE', name: 'Single' },
    { id: 'DIVORCE', name: 'Divorced' },
    { id: 'WIDOW(ER)', name: 'Widow(er)' },
  ];

  idType = [
    { id: 'NHIS', name: 'National Health Insurance Scheme' },
    { id: 'Ghana Card', name: 'Ghana Card' },
    { id: 'Driver License', name: 'Driver License' },
    { id: 'Voters Card', name: 'Voters Card' },
    { id: 'Passport', name: 'Passport' },
  ];
  educationalLevel = [
    { id: 'Basic', name: 'Basic' },
    { id: 'JHS', name: 'Junior High' },
    { id: 'SHS', name: 'Senior High' },
    { id: 'Tertiary', name: 'Tertiary' },
    { id: 'None', name: 'None' },
  ];
  constructor(
    private fb: FormBuilder,
    private store: Store<RootState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    //reseting saved customer
    this.store.dispatch(fromCustomerActions.resetCustomerSaved());
    this.setupCustomerForm();
  }

  private setupCustomerForm(): void {
    this.customerForm = this.fb.group({
      id: [],
      customerId: [null, Validators.required],
      customerName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      idType: [null, Validators.required],
      idNumber: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      educationalLevel: [null, Validators.required],
      gender: [null, Validators.required],
      maritalStatus: [null, Validators.required],
      companyCode: [null, Validators.required],
    });
  }

  submitForm(customer: Customer) {
    this.store.dispatch(fromCustomerActions.addCustomer(customer));
    this.redirectToList();
  }

  redirectToList() {
    this.subscription = this.store
      .pipe(select(fromCustomerSelectors.selectCustomerSavedStatus))
      .subscribe((customerSaved: boolean) => {
        if (customerSaved) {
          this.router.navigate([Route.CUSTOMER]);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
