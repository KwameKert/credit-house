import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user/user.model';
import {
  ErrorAndConfirmationModalComponent,
  ModalType,
} from 'src/app/shared/components/error-and-confirmation-modal/error-and-confirmation-modal.component';
import { ErrorAndConfirmDataModel } from 'src/app/shared/components/error-and-confirmation-modal/modal-content.model';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { RootState } from 'src/app/store/models/root.model';
import { Store } from '@ngrx/store';
import { fromUserActions } from 'src/app/store/actions';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnChanges {
  @Input() user?: User;
  @Output() editUserEvent = new EventEmitter<any>();
  status!: string;
  statusIcon!: string;

  confirmStatus!: ErrorAndConfirmDataModel;
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private store: Store<RootState>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.setUserStatus();
    }
  }

  ngOnInit(): void {
    this.confirmStatus = {
      message: `${this.status} User ?`,
      description: `This action set the user status to  ${this.status?.toLowerCase()}. Do you want to proceed?`,
      modalType: ModalType.Confirm,
      onConfirm: () =>
        this.userService.updateUserStatus(
          this.user!.id!,
          this.status.toLowerCase()
        ),
    };
  }

  setUserStatus() {
    this.status = this.user?.status === 'ACTIVE' ? 'Disable' : 'Enable';
    this.statusIcon = this.user?.status === 'ACTIVE' ? 'lock' : 'lock_open';
  }

  editUser() {
    this.editUserEvent.emit(this.user);
  }

  toggleUserStatus() {
    const dialog = this.dialog.open(ErrorAndConfirmationModalComponent, {
      data: this.confirmStatus,
      width: '500px',
    });

    dialog.afterClosed().subscribe(() => {
      this.store.dispatch(
        fromUserActions.fetchUsers({ data: { page: 0, size: 5 } })
      );
    });
  }
}
