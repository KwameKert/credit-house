import { Component, OnInit } from '@angular/core';
import { SidebarService } from './core/sidebar.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavItem } from './shared/components/menu-list-item/nav-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'credit-house';

  ngOnInit(): void {}
  navItems: NavItem[] = [
    {
      displayName: 'Company',
      iconName: 'recent_actors',
      route: 'company',
      children: [
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'customer',
        },
      ],
    },
    {
      displayName: 'Loan',
      iconName: 'recent_actors',
      route: 'loan',
      children: [
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'load/asdf',
        },
      ],
    },
  ];

  constructor(
    public sideBarService: SidebarService,
    private breakpointObserver: BreakpointObserver
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
