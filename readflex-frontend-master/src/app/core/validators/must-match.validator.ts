import { AbstractControl, ValidatorFn } from '@angular/forms';

export function mustMatch(controlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.parent) {
      return null; // Form is not yet built
    }

    const matchingControl = control.parent.get(controlName);
    if (!matchingControl) {
      return null; // Matching control is not found
    }

    // Return error if values don't match
    return control.value === matchingControl.value ? null : { mustMatch: true };
  };
}
