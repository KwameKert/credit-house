import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

export const NOTIFICATION_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARN: 'warn',
};

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  message!: string;
  type!: string;
  parameters!: any;

  escapedMessage: string | undefined;

  icons = {
    success: 'fi-sr-check',
    error: 'fi-sr-exclamation',
    info: 'fi-sr-info',
    warn: 'fi-sr-shield-exclamation',
  } as any;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<NotificationComponent>
  ) {
    this.message = data.message;
    this.type = data.type;
    if (data.parameters) {
      this.parameters = data.parameters;
    }
  }

  ngOnInit(): void {
    this.escapedMessage = this.message;
    if (this.parameters) {
      const keys = Object.keys(this.parameters);
      const values: any = Object.values(this.parameters);
      for (let i = 0; i < keys.length; i++) {
        this.escapedMessage = this.message.replace(
          '{{' + keys[i] + '}}',
          values[i].toString()
        );
      }
    }
  }

  public getClass(): string {
    return this.type + ' ' + this.icons[this.type];
  }

  public closeDialog(): void {
    this.snackBarRef.dismiss();
  }
}
