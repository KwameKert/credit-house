import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavItem } from './shared/components/menu-list-item/nav-item';
import { fromAuthSelectors } from './store/selectors';
import { select, Store } from '@ngrx/store';
import { RootState } from './store/models/root.model';
import { SidebarService } from './core/services/sidebar.service';
import { Route } from 'src/app/core/models/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'credit-house';
  isAuthenticated: boolean = false;
  navItems: NavItem[] = [];

  constructor(
    public sideBarService: SidebarService,
    private breakpointObserver: BreakpointObserver,
    private store: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.loadMenu();
    this.initializeSelectors();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  loadMenu(): void {
    this.navItems = [
      {
        displayName: 'Dashboard',
        iconName: 'home',
        route: Route.DASHBOARD,
      },
      {
        displayName: 'Customers',
        iconName: 'contacts',
        route: Route.CUSTOMER,
      },

      {
        displayName: 'Companies',
        iconName: 'business_center',
        route: Route.COMPANY,
      },

      {
        displayName: 'Transactions',
        iconName: 'autorenew',
        route: Route.TRANSACTION,
        children: [
          {
            displayName: 'Savings',
            iconName: 'savings',
            route: Route.SAVINGS,
          },
          {
            displayName: 'Loans',
            iconName: 'credit_card',
            route: Route.LOAN,
          },
        ],
      },
      {
        displayName: 'Settings',
        iconName: 'settings',
        route: Route.SETTING,
        children: [
          {
            displayName: 'Users',
            iconName: 'people',
            route: Route.USER,
          },
          {
            displayName: 'Issues',
            iconName: 'warning',
            route: Route.ISSUES,
          },
        ],
      },
    ];
  }

  initializeSelectors(): void {
    this.store
      .pipe(select(fromAuthSelectors.selectIsAuthenticated))
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      });
  }
}
