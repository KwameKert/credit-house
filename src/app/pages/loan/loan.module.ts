import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanListViewComponent } from './loan-list-view/loan-list-view.component';
import { Routes, RouterModule } from '@angular/router';
import { Route } from 'src/app/core/models/common';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { LoanActionModalComponent } from './loan-action-modal/loan-action-modal.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerModule } from '../customer/customer.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Route.LOAN,
  },
  {
    path: Route.LOAN,
    component: LoanListViewComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    LoanListViewComponent,
    LoanActionModalComponent,
    LoanDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CustomerModule,
  ],
})
export class LoanModule {}
