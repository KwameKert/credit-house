import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ActionModel,
  Actiontype,
} from '../../user/user-action-modal/user-action-model';
import { Loan } from 'src/app/core/models/loan/loan.model';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loan-action-modal',
  templateUrl: './loan-action-modal.component.html',
  styleUrls: ['./loan-action-modal.component.scss'],
})
export class LoanActionModalComponent implements OnInit {
  title: string = '';
  actionType!: Actiontype;
  description!: string;
  loanForm!: FormGroup;
  subscription!: Subscription;
  status = [
    { id: '0', name: 'ACTIVE' },
    { id: '1', name: 'INACTIVE' },
  ];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoanActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modelData: ActionModel,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initData(this.modelData);
    this.setupLoanForm();
  }

  initData(data: ActionModel) {
    this.actionType = data.type;
    this.title = data.title;
    this.description = data.description;
  }

  private setupLoanForm(): void {
    this.loanForm = this.fb.group({
      id: [],
      customerId: [null, Validators.required],
      loanStarDate: [null, Validators.required],
      loanEndDate: [null, Validators.required],
      loanStatus: [null, Validators.required],
      sectors: [null, Validators.required],
      companyCode: [null, Validators.required],
      accountNumber: [null, Validators.required],
      lastPaymentDate: [null, Validators.required],
      disbursedAmount: [null, Validators.required],
      interestAmount: [null, Validators.required],
      transactionId: [],
    });
  }

  submitForm(loan: Loan) {
    // let transactionDate =
    //   transaction.transactionDate.toString().replace('T', ' ') + ':00';
    this.dialogRef.close(loan);
  }
}
