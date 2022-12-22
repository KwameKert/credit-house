import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ErrorAndConfirmationModalComponent,
  ModalType,
} from '../error-and-confirmation-modal/error-and-confirmation-modal.component';
import { ErrorAndConfirmDataModel } from '../error-and-confirmation-modal/modal-content.model';
import { VERSION } from '../../../../environments/version';

@Component({
  selector: 'app-git-version-modal',
  templateUrl: './git-version-modal.component.html',
  styleUrls: ['./git-version-modal.component.scss'],
})
export class GitVersionModalComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  gitVersionData: ErrorAndConfirmDataModel = {
    message: 'APP INFO',
    description: `Application version is: ` + VERSION.version,
    modalType: ModalType.List,
    listArray: [`GIT Hash: ${VERSION.hash}`],
  };

  ngOnInit(): void {
    // this.displayVersionInfo();
  }

  @HostListener('keydown.shift.control.v')
  displayVersionInfo(): void {
    this.dialog.open(ErrorAndConfirmationModalComponent, {
      data: this.gitVersionData,
      width: '560px',
    });
  }
}
