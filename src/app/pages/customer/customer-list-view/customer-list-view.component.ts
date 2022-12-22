import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { fromCustomerActions } from 'src/app/store/actions';
import { RootState } from 'src/app/store/models/root.model';
import { fromCustomerSelectors } from 'src/app/store/selectors';
import { Customer } from '../../../core/models/customer/customer.model';
import { Router } from '@angular/router';
import { Route } from 'src/app/core/models/common';
import { CustomerUploadComponent } from '../customer-upload/customer-upload.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-list-view',
  templateUrl: './customer-list-view.component.html',
  styleUrls: ['./customer-list-view.component.scss'],
})
export class CustomerListViewComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource();
  subscriptions!: Subscription;
  isCustomerLoading: boolean = false;
  columnsToDisplay = [
    { columnName: 'Customer Name', columnData: 'customerName' },
    { columnName: 'Phone Number', columnData: 'phoneNumber' },
    { columnName: 'Id Type', columnData: 'idType' },
    { columnName: 'Gender', columnData: 'gender' },
  ];

  displayColumns = ['customerName', 'phoneNumber', 'idType', 'gender'];
  columnsToDisplayWithExpand = [...this.displayColumns, 'expand'];
  expandedElement: Customer | null | undefined;
  customers!: Customer[];
  selectedCustomer?: Customer;

  constructor(
    private store: Store<RootState>,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.initializeSelectors();
  }

  loadCustomers(): void {
    this.store.dispatch(fromCustomerActions.fetchCustomers());
  }

  initializeSelectors(): void {
    this.subscriptions = this.store
      .pipe(select(fromCustomerSelectors.selectCustomers))
      .subscribe((customers: Customer[]) => {
        if (customers.length) {
          this.customers = customers;
        }
      });

    this.subscriptions.add(
      this.store
        .pipe(select(fromCustomerSelectors.selectCustomerUploadStatus))
        .subscribe((customerLoading: boolean) => {
          this.isCustomerLoading = customerLoading;
        })
    );
  }

  onSelectCustomer(data: Customer) {
    this.selectedCustomer = data;
  }

  addCustomer() {
    this.router.navigate([Route.CUSTOMER + '/add']);
  }

  triggerUploadCustomer() {
    const dialogRef = this.dialog.open(CustomerUploadComponent, {
      width: '560px',
    });
    dialogRef.afterClosed().subscribe((form: FormData) => {
      if (form) {
        console.log('form', form);
        this.store.dispatch(
          fromCustomerActions.uploadCustomers({ data: form })
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
