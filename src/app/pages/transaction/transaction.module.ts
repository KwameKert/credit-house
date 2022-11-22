import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListViewComponent } from './transaction-list-view/transaction-list-view.component';
import { Routes, RouterModule } from '@angular/router';
import { Route } from 'src/app/core/models/common';

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
  declarations: [TransactionListViewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TransactionModule {}
