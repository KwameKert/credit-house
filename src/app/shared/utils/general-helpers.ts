import { AbstractControl } from '@angular/forms';
import { isArray, isEmpty, isObject } from 'lodash';

export class GeneralHelpers {
  public static cleanObjectArray(object: any): any {
    return Object.keys(object)
      ?.filter(
        (key) =>
          object[key] !== null &&
          object[key] !== undefined &&
          object[key] !== ''
      )
      ?.reduce((obj: any, key) => {
        if (Array.isArray(object[key])) {
          obj[key] = object[key]?.filter(
            (item: any) => item !== null && item !== undefined && item !== ''
          );
        } else {
          obj[key] = object[key];
        }
        return obj;
      }, {});
  }

  public static refactorObj(obj: any): any {
    Object.keys(obj).forEach((prop) => {
      const propValue = obj[prop];
      if (propValue === null || propValue === '' || propValue === undefined) {
        delete obj[prop];
      } else if (isArray(propValue)) {
        obj[prop] = propValue.map((i) => this.refactorObj(i));
      } else if (isObject(propValue)) {
        obj[prop] = this.refactorObj(propValue);
      }
    });
    return obj;
  }

  public static convertObjectToQueryString(object: any): string {
    if (isEmpty(object)) {
      return '';
    }
    const queryString = Object.keys(object)
      .map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
      })
      .join('&');

    return queryString;
  }

  public static getFormErrorMessage(
    control: AbstractControl,
    label: string,
    patternErrorMessage?: string
  ): string | null {
    if (control.hasError('required')) {
      return `${label} is required`;
    }
    if (control.hasError('pattern')) {
      return patternErrorMessage || `${label} is invalid`;
    }
    if (control.hasError('email')) {
      return `${label} is invalid`;
    }
    if (control.hasError('minlength')) {
      return `${label} must be at least ${
        control.getError('minlength')?.requiredLength
      } characters`;
    }
    if (control.hasError('maxlength')) {
      return `${label} must be at most ${
        control.getError('maxlength')?.requiredLength
      } characters`;
    }
    if (control.hasError('min')) {
      return `${label} must be at least ${control.getError('min')?.min}`;
    }
    if (control.hasError('max')) {
      return `${label} must be at most ${control.getError('max')?.max}`;
    }

    return null;
  }

  public static clearFormErrors(form: AbstractControl | any): void {
    form.reset();
    Object.keys(form.controls).forEach((key) => {
      form.get(key)?.setErrors(null);
    });
  }
}
