import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListViewComponent } from './company-list-view/company-list-view.component';
import { Routes, RouterModule } from '@angular/router';
import { Route } from 'src/app/core/models/common';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Route.COMPANY,
  },
  {
    path: Route.COMPANY,
    component: CompanyListViewComponent,
    //canActivate: [AuthGuard, PageGuarda]
  },
];

@NgModule({
  declarations: [CompanyListViewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CompanyModule {}
