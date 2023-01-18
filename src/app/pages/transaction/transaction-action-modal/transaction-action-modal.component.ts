import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ActionModel,
  Actiontype,
} from '../../user/user-action-modal/user-action-model';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CreateTransaction } from '../../../core/models/transaction/transaction.model';
import { Subscription } from 'rxjs';
import { SelectModel } from '../../../core/models/common/core.model';

@Component({
  selector: 'app-transaction-action-modal',
  templateUrl: './transaction-action-modal.component.html',
  styleUrls: ['./transaction-action-modal.component.scss'],
})
export class TransactionActionModalComponent implements OnInit {
  title: string = '';
  actionType!: Actiontype;
  description!: string;
  transactionForm!: FormGroup;
  subscription!: Subscription;
  transactionType = [
    { id: '0', name: 'DEPOSIT' },
    { id: '1', name: 'WITHDRAWAL' },
  ];
  customers!: SelectModel[];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TransactionActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modelData: ActionModel,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initData(this.modelData);
    this.setupTransactionForm();
  }

  initData(data: ActionModel) {
    this.actionType = data.type;
    this.title = data.title;
    this.description = data.description;
  }

  private setupTransactionForm(): void {
    this.transactionForm = this.fb.group({
      id: [],
      customerId: [null, Validators.required],
      transactionType: [null, Validators.required],
      companyCode: [null, Validators.required],
      accountNumber: [null, Validators.required],
      transactionDate: [null, Validators.required],
      transactionId: [],
    });
  }

  submitForm(transaction: CreateTransaction) {
    let transactionDate =
      transaction.transactionDate.toString().replace('T', ' ') + ':00';
    this.dialogRef.close({
      ...transaction,
      transactionDate,
    });
  }
}
