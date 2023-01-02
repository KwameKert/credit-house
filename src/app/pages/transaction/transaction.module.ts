import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListViewComponent } from './transaction-list-view/transaction-list-view.component';
import { Routes, RouterModule } from '@angular/router';
import { Route } from 'src/app/core/models/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerModule } from '../customer/customer.module';
import { TransactionActionModalComponent } from './transaction-action-modal/transaction-action-modal.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Route.SAVINGS,
  },
  {
    path: Route.SAVINGS,
    component: TransactionListViewComponent,
    canActivate: [AuthGuard],
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
