import { Component, Input, OnInit } from '@angular/core';
import { NavItem } from '../menu-list-item/nav-item';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Input() navItems: NavItem[] = [];
  constructor() {}

  ngOnInit(): void {}
}
