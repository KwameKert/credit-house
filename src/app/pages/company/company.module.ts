import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListViewComponent } from './company-list-view/company-list-view.component';
import { Routes, RouterModule } from '@angular/router';
import { Route } from 'src/app/core/models/common';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Route.COMPANY,
  },
  {
    path: Route.COMPANY,
    component: CompanyListViewComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [CompanyListViewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CompanyModule {}
