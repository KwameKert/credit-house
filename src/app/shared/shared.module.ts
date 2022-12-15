import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MaterialModule } from '../core/material/material.module';
import { NotificationComponent } from './components/notification/notification.component';
import { ErrorAndConfirmationModalComponent } from './components/error-and-confirmation-modal/error-and-confirmation-modal.component';
import { GitVersionModalComponent } from './components/git-version-modal/git-version-modal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BaseSelectFieldComponent } from './components/base-select-field/base-select-field.component';
import { BaseInputFieldComponent } from './components/base-input-field/base-input-field.component';
import { BaseButtonComponent } from './components/base-button/base-button.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [
    NavBarComponent,
    NotificationComponent,
    ErrorAndConfirmationModalComponent,
    GitVersionModalComponent,
    ProfileComponent,
    MenuListItemComponent,
    SideBarComponent,
    BaseSelectFieldComponent,
    BaseInputFieldComponent,
    BaseButtonComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    AvatarModule,
  ],
  exports: [
    MaterialModule,
    NavBarComponent,
    GitVersionModalComponent,
    MenuListItemComponent,
    SideBarComponent,
    BaseSelectFieldComponent,
    BaseInputFieldComponent,
    BaseButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AvatarModule,
  ],
})
export class SharedModule {}
