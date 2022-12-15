import { NotificationService } from 'src/app/core/services/notification.service';
import SpyObj = jasmine.SpyObj;

export class SpyTestUtils {
  static createNotificationSpy(): SpyObj<NotificationService> {
    const snackBar = jasmine.createSpyObj('MatSnackBar', [
      'open',
      'openFromComponent',
      'close',
    ]);
    return spyOnAllFunctions(new NotificationService(snackBar), true);
  }
}
