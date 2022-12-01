import { Component, OnInit } from '@angular/core';
import { Icons } from 'src/app/core/models/common/icons';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public Icons = Icons;
  constructor(public sideBarService: SidebarService) {}

  ngOnInit(): void {}
}
