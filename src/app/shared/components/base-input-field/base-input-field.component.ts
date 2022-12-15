import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { GeneralHelpers } from '../../utils/general-helpers';
import { Observable, map, startWith } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-base-input-field',
  templateUrl: './base-input-field.component.html',
  styleUrls: ['./base-input-field.component.scss'],
})
export class BaseInputFieldComponent implements OnInit {
  hide = true;

  @Input() label!: string;

  @Input() loading: boolean = false;

  @Input() disabled: boolean = false;

  @Input() required: boolean = false;

  @Input() placeholder: string = '';

  @Input() icon: string = '';

  @Input() iconClass: string = '';

  @Input() iconPosition: 'start' | 'end' = 'start';

  @Input() inputClass: string = '';

  @Input() control?: any;

  @Input() patternErrorMessage?: string;

  @Input() inputHint: string = '';

  @Input() appearance: MatFormFieldAppearance = 'standard';

  @Input() type: string = 'text';

  @Input() autocomplete: string = 'off';

  @Input() filteredOptions!: Observable<any[]>;

  @Input() options!: any[];

  get errorMessage(): string | null {
    return GeneralHelpers.getFormErrorMessage(
      this.control,
      this.label,
      this.patternErrorMessage
    );
  }

  ngOnInit(): void {
    if (this.control) {
      this.filteredOptions = this.control?.valueChanges?.pipe(
        startWith(''),
        map((value: any) => this._filter(value))
      );
    }
  }

  private _filter(value: string): any[] {
    if (!_.isString(value)) {
      return [];
    }
    const filterValue = value?.toLowerCase();

    return this.options?.filter((option) =>
      option?.value?.toLowerCase()?.includes(filterValue)
    );
  }
}
