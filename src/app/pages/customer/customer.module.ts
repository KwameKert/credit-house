import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListViewComponent } from './customer-list-view/customer-list-view.component';
import { Routes, RouterModule } from '@angular/router';
import { Route } from 'src/app/core/models/common';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerManagerComponent } from './customer-manager/customer-manager.component';
import { CustomerSearchFieldComponent } from './customer-search-field/customer-search-field.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Route.CUSTOMER,
  },
  {
    path: Route.CUSTOMER,
    component: CustomerListViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Route.CUSTOMER + '/add',
    component: CustomerManagerComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    CustomerListViewComponent,
    CustomerDetailsComponent,
    CustomerManagerComponent,
    CustomerSearchFieldComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [CustomerSearchFieldComponent],
})
export class CustomerModule {}
