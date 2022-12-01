import { Component, Input, OnInit } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { GeneralHelpers } from '../../utils/general-helpers';

@Component({
  selector: 'app-base-select-field',
  templateUrl: './base-select-field.component.html',
  styleUrls: ['./base-select-field.component.scss'],
})
export class BaseSelectFieldComponent {
  @Input() label!: string;

  @Input() loading: boolean = false;

  @Input() required: boolean = false;

  @Input() placeholder: string = '';

  @Input() icon: string = '';

  @Input() inputClass: string = '';

  @Input() control!: any;

  @Input() options!: any;

  @Input() patternErrorMessage?: string;

  @Input() inputHint: string = '';

  @Input() appearance: MatFormFieldAppearance = 'fill';

  @Input() type: 'material' | 'ng-select' = 'material';

  @Input() autocomplete: string = 'off';

  @Input() multiple = false;

  @Input() addTag!: any;

  @Input() itemName!: string;

  @Input() itemDescription!: string;

  @Input() notFoundText: string = 'No data found';

  @Input() bindLabel!: string;

  @Input() closeOnSelect!: boolean;

  @Input() bindValue!: string;

  @Input() minLengthTerm!: number;

  @Input() typeAhead: Subject<string> = new Subject();

  @Input() addTagText!: string;

  get errorMessage(): string | null {
    return GeneralHelpers.getFormErrorMessage(
      this.control,
      this.label,
      this.patternErrorMessage
    );
  }
}
