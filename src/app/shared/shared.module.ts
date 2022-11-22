import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MaterialModule } from '../core/material/material.module';

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, NavBarComponent],
})
export class SharedModule {}
