import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  Pagination,
  TableColumn,
} from 'src/app/shared/components/generic-table/generc-table.model';
import { fromTransactionActions } from 'src/app/store/actions';
import { RootState } from 'src/app/store/models/root.model';
import {
  CreateTransaction,
  Transaction,
} from '../../../core/models/transaction/transaction.model';
import { MatTableDataSource } from '@angular/material/table';
import { fromTransactionSelectors } from 'src/app/store/selectors';
import {
  ActionModel,
  Actiontype,
} from '../../user/user-action-modal/user-action-model';
import { MatDialog } from '@angular/material/dialog';
import { TransactionActionModalComponent } from '../transaction-action-modal/transaction-action-modal.component';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-transaction-list-view',
  templateUrl: './transaction-list-view.component.html',
  styleUrls: ['./transaction-list-view.component.scss'],
})
export class TransactionListViewComponent implements OnInit {
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();
  columnsToDisplay: TableColumn[] = [
    { columnName: 'Customer ID', columnData: 'customerId' },
    { columnName: 'Account Number', columnData: 'accountNumber' },
    { columnName: 'Transaction Id', columnData: 'transactionId' },
    { columnName: 'Transaction Type', columnData: 'transactionType' },
    { columnName: 'Transaction Date', columnData: 'transactionDate' },
  ];
  displayColumns = [
    'customerId',
    'accountNumber',
    'transactionId',
    'transactionType',
    'transactionDate',
  ];
  columnsToDisplayWithExpand = [...this.displayColumns, 'expand'];
  expandedElement: Transaction | null | undefined;
  transactions?: Transaction[];
  selectedTransaction?: Transaction;
  totalRows = 0;
  pageSize = 10;
  isTransactionLoading!: boolean;
  currentPage = 0;
  subscriptions!: Subscription;
  constructor(private store: Store<RootState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTransactions({ size: this.pageSize, page: this.currentPage });
    this.initializeSelectors();
  }

  loadTransactions(pageData: Pagination): void {
    this.store.dispatch(
      fromTransactionActions.paginateTransaction({ data: pageData })
    );
    this.store.dispatch(
      fromTransactionActions.fetchTransactions({ data: pageData })
    );
  }

  initializeSelectors() {
    this.subscriptions = this.store
      .pipe(select(fromTransactionSelectors.selectTransactions))
      .subscribe((transactions: Transaction[]) => {
        if (transactions.length) {
          this.transactions = transactions.map((transaction) => {
            return {
              ...transaction,
              transactionType:
                transaction.transactionType === 1 ? 'WITHDRAWAL' : 'DEPOSIT',
            };
          });
          this.dataSource = new MatTableDataSource(transactions);
        }
      });

    this.subscriptions.add(
      this.store
        .pipe(select(fromTransactionSelectors.selectTransactionTotal))
        .subscribe((transactionCount: number) => {
          this.totalRows = transactionCount;
        })
    );

    this.subscriptions.add(
      this.store
        .pipe(select(fromTransactionSelectors.selectTransactionLoading))
        .subscribe((loading: boolean) => {
          this.isTransactionLoading = loading;
        })
    );
  }

  addTransaction() {
    const data = this.getCreateAction();
    this.triggerActionTransactionDialog(data);
  }

  triggerUploadTransaction() {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '560px',
      data: {
        title: 'Transaction Bulk Upload',
        description: 'Upload a csv file with the correct data',
      },
    });
    dialogRef.afterClosed().subscribe((form: FormData) => {
      if (form) {
        this.store.dispatch(
          fromTransactionActions.uploadTransactions({ data: form })
        );
      }
    });
  }

  onSelectTransaction(data: any) {}

  triggerActionTransactionDialog(data: ActionModel) {
    const dialogRef = this.dialog.open(TransactionActionModalComponent, {
      data,
      width: '560px',
    });
    dialogRef.afterClosed().subscribe((transaction: CreateTransaction) => {
      if (transaction) {
        this.store.dispatch(fromTransactionActions.addTransaction(transaction));
      }
    });
  }

  getCreateAction(): ActionModel {
    const data: ActionModel = {
      type: Actiontype.CREATE,
      title: 'Add Transaction',
      description: 'Fill form details to add a new transaction',
    };
    return data;
  }
}
