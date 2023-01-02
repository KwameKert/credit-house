import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavItem } from './shared/components/menu-list-item/nav-item';
import { fromAuthActions } from './store/actions';
import { fromAuthSelectors } from './store/selectors';
import { select, Store } from '@ngrx/store';
import { RootState } from './store/models/root.model';
import { SidebarService } from './core/services/sidebar.service';

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
        displayName: 'Customers',
        iconName: 'contacts',
        route: 'customer',
        // children: [
        //   {
        //     displayName: 'Feedback',
        //     iconName: 'feedback',
        //     route: 'customer',
        //   },
        // ],
      },
      {
        displayName: 'Companies',
        iconName: 'business_center',
        route: 'company',
      },
      {
        displayName: 'Transactions',
        iconName: 'autorenew',
        route: 'transaction',
      },
      {
        displayName: 'Settings',
        iconName: 'settings',
        route: 'user',
        children: [
          {
            displayName: 'Users',
            iconName: 'people',
            route: 'user',
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
