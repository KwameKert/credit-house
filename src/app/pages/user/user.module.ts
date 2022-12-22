import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListViewComponent } from './user-list-view/user-list-view.component';
import { Routes, RouterModule } from '@angular/router';
import { Route } from 'src/app/core/models/common';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserActionModalComponent } from './user-action-modal/user-action-modal.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Route.USER,
  },
  {
    path: Route.USER,
    component: UserListViewComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [UserListViewComponent, UserActionModalComponent, UserDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class UserModule {}
