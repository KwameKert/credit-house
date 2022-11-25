import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../core/sidebar.service';
import { Icons } from 'src/app/core/models/common/icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public Icons = Icons;
  constructor(public sideBarService: SidebarService) { }

  ngOnInit(): void {
  }

}
