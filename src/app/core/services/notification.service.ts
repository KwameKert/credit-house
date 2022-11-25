import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  NOTIFICATION_TYPE,
  NotificationComponent,
} from '../../shared/components/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private DEFAULT_TIMING = 5000;
  constructor(public snackBar: MatSnackBar) {}

  success(message: string, parameters?: any, time?: number): void {
    this.openSnackbar(
      message,
      NOTIFICATION_TYPE.SUCCESS,
      time ? time : this.DEFAULT_TIMING,
      parameters
    );
  }

  error(message: string, parameters?: any, time?: number): void {
    this.openSnackbar(
      message,
      NOTIFICATION_TYPE.ERROR,
      time ? time : this.DEFAULT_TIMING,
      parameters,
      'error'
    );
  }

  info(message: string, parameters?: any, time?: number): void {
    this.openSnackbar(
      message,
      NOTIFICATION_TYPE.INFO,
      time ? time : this.DEFAULT_TIMING,
      parameters,
      'info'
    );
  }

  warn(message: string, parameters?: any, time?: number): void {
    this.openSnackbar(
      message,
      NOTIFICATION_TYPE.WARN,
      time ? time : this.DEFAULT_TIMING,
      parameters,
      'warn'
    );
  }

  private openSnackbar(
    message: string,
    type: string,
    timing: number,
    parameters?: any,
    panelClass?: any
  ): void {
    const config: any = {
      data: parameters ? { message, type, parameters } : { message, type },
      panelClass: ['notification', panelClass],
    };
    if (type !== NOTIFICATION_TYPE.ERROR) {
      config.duration = timing ? timing : this.DEFAULT_TIMING;
    }
    this.snackBar.openFromComponent(NotificationComponent, config);
  }
}
