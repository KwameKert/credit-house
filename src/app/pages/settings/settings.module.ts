import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Route } from 'src/app/core/models/common';
import { IssuesComponent } from './issues/issues.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { IssuesDetailsComponent } from './issues-details/issues-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Route.ISSUES,
  },
  {
    path: Route.ISSUES,
    component: IssuesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [IssuesComponent, IssuesDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class SettingsModule {}
