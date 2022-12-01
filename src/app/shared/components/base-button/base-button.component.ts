import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-base-button',
  templateUrl: './base-button.component.html',
  styleUrls: ['./base-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseButtonComponent {
  @Input() disabled: boolean = false;

  @Input() loading: boolean | Observable<boolean> | null = false;

  @Input() buttonText: string = '';

  @Input() loadingText: string = '';

  @Input() buttonClass: string = '';

  @Input() iconClass: string = '';

  @Input() buttonIcon: string = '';

  @Input() loadingButtonIcon: string = '';

  @Input() type: string = 'button';

  @Input() color: string = '';

  @Input() id: string = '';

  @Input() variation: 'basic' | 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' =
    'basic';

  @Output() buttonClick: EventEmitter<any> = new EventEmitter();

  triggerButtonClick(): void {
    this.buttonClick.emit(null);
  }
}
