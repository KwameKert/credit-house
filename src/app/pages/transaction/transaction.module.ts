import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListViewComponent } from './transaction-list-view/transaction-list-view.component';
import { Routes, RouterModule } from '@angular/router';
import { Route } from 'src/app/core/models/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerModule } from '../customer/customer.module';
import { TransactionActionModalComponent } from './transaction-action-modal/transaction-action-modal.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Route.TRANSACTION,
  },
  {
    path: Route.TRANSACTION,
    component: TransactionListViewComponent,
    //canActivate: [AuthGuard, PageGuarda]
  },
];
@NgModule({
  declarations: [TransactionListViewComponent, TransactionActionModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CustomerModule,
  ],
})
export class TransactionModule {}
