import { Component, Inject, OnInit } from '@angular/core';
import { Icons } from 'src/app/core/models/common/icons';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ErrorAndConfirmDataModel } from './modal-content.model';

export enum ModalType {
  Error,
  Confirm,
  List,
}

@Component({
  selector: 'app-error-and-confirmation-modal',
  templateUrl: './error-and-confirmation-modal.component.html',
  styleUrls: ['./error-and-confirmation-modal.component.scss'],
})
export class ErrorAndConfirmationModalComponent implements OnInit {
  public ModalTypeCategory = ModalType;
  public modalType?: ModalType;
  public messageTitle: string = '';
  public messageDescription: string = '';
  public Icons = Icons;
  public confirmButtonText: string = '';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ErrorAndConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorAndConfirmDataModel
  ) {}

  ngOnInit(): void {
    this.initData(this.data);
  }

  initData(data: ErrorAndConfirmDataModel) {
    this.modalType = data.modalType;
    this.messageTitle = data.message;
    this.messageDescription = data.description;
    if (data.confirmButtonText) {
      this.confirmButtonText = data.confirmButtonText;
    }
  }

  cancelModal(): void {
    this.dialogRef.close();
  }

  confirmDialog() {
    this.data.onConfirm?.().subscribe(
      (data) => {
        console.log('confirm here');
        this.dialogRef.close(data);
      },
      (error) => {
        this.modalType = ModalType.Error;
        this.messageTitle = error.error.errorCode
          ? error.error.errorCode
          : error.name;
        if (this.data.onError) {
          this.data.onError();
        }
      }
    );
  }
}
