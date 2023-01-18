import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/core/models/customer/customer.model';
import { RootState } from 'src/app/store/models/root.model';
import { fromCustomerSelectors } from 'src/app/store/selectors';
import { SelectModel } from '../../../core/models/common/core.model';
import { fromCustomerActions } from 'src/app/store/actions';

@Component({
  selector: 'app-customer-search-field',
  templateUrl: './customer-search-field.component.html',
  styleUrls: ['./customer-search-field.component.scss'],
})
export class CustomerSearchFieldComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  customers!: SelectModel[];
  @Input() control?: any;
  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.initializeSelectors();
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

  onSearch(data: any) {
    let searchText = data.term;
    this.store.dispatch(
      fromCustomerActions.searchCustomerById({ payload: searchText })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
