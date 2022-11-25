import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MaterialModule } from '../core/material/material.module';
import { NotificationComponent } from './components/notification/notification.component';
import { ErrorAndConfirmationModalComponent } from './components/error-and-confirmation-modal/error-and-confirmation-modal.component';
import { GitVersionModalComponent } from './components/git-version-modal/git-version-modal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';

@NgModule({
  declarations: [
    NavBarComponent,
    NotificationComponent,
    ErrorAndConfirmationModalComponent,
    GitVersionModalComponent,
    ProfileComponent,
    MenuListItemComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    MaterialModule,
    NavBarComponent,
    GitVersionModalComponent,
    MenuListItemComponent,
  ],
})
export class SharedModule {}
