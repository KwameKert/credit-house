import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ErrorAndConfirmationModalComponent,
  ModalType,
} from '../error-and-confirmation-modal/error-and-confirmation-modal.component';
import { ErrorAndConfirmDataModel } from '../error-and-confirmation-modal/modal-content.model';

@Component({
  selector: 'app-git-version-modal',
  templateUrl: './git-version-modal.component.html',
  styleUrls: ['./git-version-modal.component.scss'],
})
export class GitVersionModalComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  gitVersionData: ErrorAndConfirmDataModel = {
    message: 'GIT VERSION',
    description: 'Nice description',
    modalType: ModalType.List,
    listArray: ['NICE', 'ONE'],
  };

  ngOnInit(): void {
    // this.displayVersionInfo();
  }

  @HostListener('keydown.shift.control.v')
  displayVersionInfo(): void {
    console.log('im here');
    this.dialog.open(ErrorAndConfirmationModalComponent, {
      data: this.gitVersionData,
      width: '560px',
    });
  }
}
