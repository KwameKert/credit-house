import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanListViewComponent } from './loan-list-view/loan-list-view.component';
import { Routes, RouterModule } from '@angular/router';
import { Route } from 'src/app/core/models/common';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

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
  declarations: [LoanListViewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class LoanModule {}
