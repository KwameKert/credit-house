import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '../core/models/common';
import { LoanModule } from './loan/loan.module';
import { CompanyModule } from './company/company.module';
import { TransactionModule } from './transaction/transaction.module';
import { CustomerModule } from './customer/customer.module';
import { DashboardComponent } from './settings/dashboard/dashboard.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: Route.COMPANY,
        loadChildren: () =>
          import('./company/company.module').then((m) => m.CompanyModule),
      },
      {
        path: Route.TRANSACTION,
        loadChildren: () =>
          import('./transaction/transaction.module').then(
            (m) => m.TransactionModule
          ),
      },
      {
        path: Route.LOAN,
        loadChildren: () =>
          import('./loan/loan.module').then((m) => m.LoanModule),
      },
      {
        path: Route.CUSTOMER,
        loadChildren: () =>
          import('./customer/customer.module').then((m) => m.CustomerModule),
      },
      {
        path: Route.USER,
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: Route.DASHBOARD,
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    LoginModule,
    UserModule,
    LoanModule,
    TransactionModule,
    CustomerModule,
    CompanyModule,
    RouterModule.forChild(routes),
  ],
})
export class PagesModule {}
