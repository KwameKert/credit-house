import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { Route } from 'src/app/core/models/common';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Route.USER,
  },
  // {
  //   path: Route.USER,
  //   component: DashboardComponent,
  //   //canActivate: [AuthGuard, PageGuarda]
  // },
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class SettingsModule {}
