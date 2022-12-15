import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Icons } from 'src/app/core/models/common/icons';
import { fromAuthActions } from 'src/app/store/actions';
import { RootState } from 'src/app/store/models/root.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public Icons = Icons;
  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  logout(): void {
    this.store.dispatch(fromAuthActions.logout());
  }
}
