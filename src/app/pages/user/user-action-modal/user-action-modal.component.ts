import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActionModel, Actiontype } from './user-action-model';
import { CreateUser, User } from '../../../core/models/user/user.model';

@Component({
  selector: 'app-user-action-modal',
  templateUrl: './user-action-modal.component.html',
  styleUrls: ['./user-action-modal.component.scss'],
})
export class UserActionModalComponent implements OnInit {
  title: string = '';
  actionType!: Actiontype;
  description!: string;
  userForm!: FormGroup;
  status = [
    { id: 'ACTIVE', name: 'Active' },
    { id: 'INACTIVE', name: 'Inactive' },
  ];
  roles = [{ id: 'ADMIN', name: 'Admin' }];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modelData: ActionModel,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initData(this.modelData);
    this.setupUserForm();

    if (this.modelData.type == Actiontype.UPDATE) {
      this.patchForm(this.modelData.data);
    }
  }

  initData(data: ActionModel) {
    this.actionType = data.type;
    this.title = data.title;
    this.description = data.description;
  }

  private setupUserForm(): void {
    this.userForm = this.fb.group({
      id: [],
      email: [null, Validators.required],
      fullName: [null, Validators.required],
      status: [null, Validators.required],
      role: [null, Validators.required],
      password: 'password',
    });
  }

  submitForm(user: CreateUser) {
    this.dialogRef.close(user);
  }

  patchForm(user: User) {
    this.userForm.setValue({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      status: user.status,
      password: '',
    });
    this.userForm.controls['email'].disable();
  }
}
