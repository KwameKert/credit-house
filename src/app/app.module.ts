import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { metaReducers, reducers } from './store/reducers';
import * as fromAuthEffects from './store/effects/auth.effects';
import * as fromUserEffects from './store/effects/user.effects';
import * as fromCustomerEffects from './store/effects/customer.effects';
import * as fromCompanyEffects from './store/effects/company.effects';
import * as fromTransactionEffects from './store/effects/transaction.effects';
import * as fromLoanEffects from './store/effects/loan.effects';
import * as fromDashboardEffects from './store/effects/dashboard.effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/http-interceptors/auth.interceptor';
import { LoaderInterceptor } from './core/http-interceptors/loader.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ErrorInterceptor } from './core/http-interceptors/error.interceptor';

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([
      fromAuthEffects.AuthEffects,
      fromUserEffects.UserEffects,
      fromCustomerEffects.CustomerEffects,
      fromCompanyEffects.CompanyEffects,
      fromTransactionEffects.TransactionEffect,
      fromLoanEffects.LoanEffects,
      fromDashboardEffects.DashboardEffects,
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
