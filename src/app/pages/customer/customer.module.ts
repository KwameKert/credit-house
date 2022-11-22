import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListViewComponent } from './customer-list-view/customer-list-view.component';
import { Routes, RouterModule } from '@angular/router';
import { Route } from 'src/app/core/models/common';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Route.CUSTOMER,
  },
  {
    path: Route.CUSTOMER,
    component: CustomerListViewComponent,
    //canActivate: [AuthGuard, PageGuarda]
  },
];

@NgModule({
  declarations: [CustomerListViewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CustomerModule {}
