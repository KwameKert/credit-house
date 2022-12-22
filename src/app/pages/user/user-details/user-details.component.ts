import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/models/user/user.model';
import {
  Actiontype,
  UserActionModel,
} from '../user-action-modal/user-action-model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  @Input() user?: User;
  @Output() editUserEvent = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  editUser() {
    this.editUserEvent.emit(this.user);
  }
}
