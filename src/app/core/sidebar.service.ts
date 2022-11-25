import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public currentUrl = new BehaviorSubject<string>('');
  sideBarOpen: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  toggleSideBar(): void {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
