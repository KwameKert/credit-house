import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListViewComponent } from './user-list-view/user-list-view.component';
import { Routes, RouterModule } from '@angular/router';
import { Route } from 'src/app/core/models/common';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Route.USER,
  },
  {
    path: Route.USER,
    component: UserListViewComponent,
    //canActivate: [AuthGuard, PageGuarda]
  },
];

@NgModule({
  declarations: [UserListViewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UserModule {}
