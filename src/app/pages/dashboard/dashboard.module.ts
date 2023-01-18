import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenderWidgetComponent } from './gender-widget/gender-widget.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { RouterModule, Routes } from '@angular/router';
import { Route } from 'src/app/core/models/common';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { StatusWidgetComponent } from './status-widget/status-widget.component';
import { EducationWidgetComponent } from './education-widget/education-widget.component';
import { SectorWidgetComponent } from './sector-widget/sector-widget.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Route.DASHBOARD,
  },
  {
    path: Route.DASHBOARD,
    component: LandingComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [GenderWidgetComponent, LandingComponent, StatusWidgetComponent, EducationWidgetComponent, SectorWidgetComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
