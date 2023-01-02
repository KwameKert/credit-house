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
import { RootState } from 'src/app/store/models/root.model';
import { Store, select } from '@ngrx/store';
import { fromCustomerActions } from 'src/app/store/actions';
import { Subscription } from 'rxjs';
import { fromCustomerSelectors } from 'src/app/store/selectors';
import { Customer } from 'src/app/core/models/customer/customer.model';
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
    private fb: FormBuilder,
    private store: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.initData(this.modelData);
    this.setupTransactionForm();
    this.initializeSelectors();
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

  onSearch(data: any) {
    let searchText = data.term;
    this.store.dispatch(
      fromCustomerActions.searchCustomerById({ payload: searchText })
    );
  }

  initializeSelectors() {
    this.subscription = this.store
      .pipe(select(fromCustomerSelectors.selectCustomers))
      .subscribe((customers: Customer[]) => {
        if (customers.length) {
          this.customers = customers.map((customer) => {
            return {
              id: customer.customerId,
              name: `${customer.customerName} (${customer.customerId})`,
            };
          });
        }
      });
  }
}
