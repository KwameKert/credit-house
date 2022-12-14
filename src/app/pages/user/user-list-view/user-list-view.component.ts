import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { CreateUser, User } from 'src/app/core/models/user/user.model';
import { fromUserActions } from 'src/app/store/actions';
import { RootState } from 'src/app/store/models/root.model';
import { fromUserSelectors } from 'src/app/store/selectors';
import { MatDialog } from '@angular/material/dialog';
import { UserActionModalComponent } from '../user-action-modal/user-action-modal.component';
import { TableColumn } from 'src/app/shared/components/generic-table/generc-table.model';
import {
  UserActionModel,
  Actiontype,
} from '../user-action-modal/user-action-model';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UserListViewComponent implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  columnsToDisplay: TableColumn[] = [
    { columnName: 'Full Name', columnData: 'fullName' },
    { columnName: 'Email', columnData: 'email' },
    { columnName: 'Role', columnData: 'role' },
    { columnName: 'Status', columnData: 'status' },
  ];
  displayColumns = ['fullName', 'email', 'role', 'status'];
  columnsToDisplayWithExpand = [...this.displayColumns, 'expand'];
  expandedElement: User | null | undefined;
  users?: User[];
  selectedUser?: User;

  constructor(private store: Store<RootState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
    this.initializeSelectors();
  }

  loadUsers(): void {
    this.store.dispatch(fromUserActions.fetchUsers());
  }

  initializeSelectors(): void {
    this.store
      .pipe(select(fromUserSelectors.selectUsers))
      .subscribe((users: User[]) => {
        if (users.length) {
          this.users = users;
          this.dataSource = new MatTableDataSource(users);
          console.log('data source', this.dataSource);
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  triggerActionUserDialog(data: UserActionModel) {
    const dialogRef = this.dialog.open(UserActionModalComponent, {
      data,
      width: '560px',
    });
    dialogRef.afterClosed().subscribe((user: CreateUser) => {
      if (user) {
        data.type == Actiontype.CREATE
          ? this.store.dispatch(fromUserActions.addUser(user))
          : this.store.dispatch(fromUserActions.editUser(user));
      }
    });
  }

  addUser() {
    const createActionModel = this.getCreateAction();
    this.triggerActionUserDialog(createActionModel);
  }

  editUser(user: User) {
    const editActionModel = this.getEditAction(user);
    this.triggerActionUserDialog(editActionModel);
  }

  getCreateAction(): UserActionModel {
    const data: UserActionModel = {
      type: Actiontype.CREATE,
      title: 'Add User',
      description: 'Fill form details to add a new user',
    };
    return data;
  }

  getEditAction(user: User): UserActionModel {
    const data: UserActionModel = {
      type: Actiontype.UPDATE,
      title: 'Edit User',
      data: user,
      description: 'Fill form details to edit a new user',
    };
    return data;
  }

  selectUser(data: User) {
    this.selectedUser = data;
  }
}
