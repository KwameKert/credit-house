import { Component, OnInit } from '@angular/core';
import { Icons } from 'src/app/core/models/common/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public Icons = Icons;
  constructor() {}

  ngOnInit(): void {}

  logout(): void {
    console.log('logging out here');
  }
}
