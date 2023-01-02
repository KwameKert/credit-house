import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Loan } from 'src/app/core/models/loan/loan.model';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';
import { fromLoanActions } from 'src/app/store/actions';
import { RootState } from 'src/app/store/models/root.model';
import { fromLoanSelectors } from 'src/app/store/selectors';
import {
  ActionModel,
  Actiontype,
} from '../../user/user-action-modal/user-action-model';
import { LoanActionModalComponent } from '../loan-action-modal/loan-action-modal.component';

@Component({
  selector: 'app-loan-list-view',
  templateUrl: './loan-list-view.component.html',
  styleUrls: ['./loan-list-view.component.scss'],
})
export class LoanListViewComponent implements OnInit {
  dataSource: MatTableDataSource<Loan> = new MatTableDataSource();
  subscriptions!: Subscription;
  isLoanLoading: boolean = false;
  columnsToDisplay = [
    { columnName: 'Account Number', columnData: 'accountNumber' },
    { columnName: 'Disbursed Amount', columnData: 'disbursedAmount' },
    { columnName: 'Sectors', columnData: 'sectors' },
    { columnName: 'Loan Status', columnData: 'loanStatus' },
  ];

  displayColumns = [
    'accountNumber',
    'disbursedAmount',
    'sectors',
    'loanStatus',
  ];
  columnsToDisplayWithExpand = [...this.displayColumns, 'expand'];
  expandedElement: Loan | null | undefined;
  loans?: Loan[];
  selectedLoan?: Loan;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  constructor(private store: Store<RootState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadLoans({ size: this.pageSize, page: this.currentPage });
    this.initializeSelectors();
  }

  initializeSelectors() {
    this.subscriptions = this.store
      .pipe(select(fromLoanSelectors.selectLoans))
      .subscribe((loans: Loan[]) => {
        if (loans.length) {
          this.loans = loans.map((loan) => {
            return {
              ...loan,
              loanStatus: loan.loanStatus === 1 ? 'ACTIVE' : 'INACTIVE',
            };
          });
          this.dataSource = new MatTableDataSource(loans);
        }
      });

    this.subscriptions.add(
      this.store
        .pipe(select(fromLoanSelectors.selectLoanTotal))
        .subscribe((loanCount: number) => {
          this.totalRows = loanCount;
        })
    );
  }

  loadLoans(pageData: Pagination): void {
    this.store.dispatch(fromLoanActions.paginateLoan({ data: pageData }));
    this.store.dispatch(fromLoanActions.fetchLoans({ data: pageData }));
  }

  addLoan() {
    const data = this.getCreateAction();
    this.triggerActionLoanDialog(data);
  }

  triggerUploadLoan() {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '560px',
      data: {
        title: 'Loan Bulk Upload',
        description: 'Upload a csv file with the correct data',
      },
    });
    dialogRef.afterClosed().subscribe((form: FormData) => {
      if (form) {
        this.store.dispatch(fromLoanActions.uploadLoans({ data: form }));
      }
    });
  }

  onSelectLoan(data: any) {
    this.selectedLoan = data;
  }

  triggerActionLoanDialog(data: ActionModel) {
    const dialogRef = this.dialog.open(LoanActionModalComponent, {
      data,
      width: '560px',
    });
    dialogRef.afterClosed().subscribe((loan: Loan) => {
      if (loan) {
        this.store.dispatch(fromLoanActions.addLoan(loan));
      }
    });
  }

  getCreateAction(): ActionModel {
    const data: ActionModel = {
      type: Actiontype.CREATE,
      title: 'Add Loan',
      description: 'Fill form details to add a new loan',
    };
    return data;
  }
}
