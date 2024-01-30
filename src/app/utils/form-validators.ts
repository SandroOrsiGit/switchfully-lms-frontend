import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class FormValidator {
    static passwordsMatch(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const passwordConfirm = control.get('passwordConfirm')?.value;

        // Check if passwords are matching. If not then add the error 'passwordsNotMatching: true' to the form
        if (
            password === passwordConfirm &&
            password !== null &&
            passwordConfirm !== null
        ) {
            return null;
        } else {
            return { passwordsNotMatching: true };
        }
    }

    // Check if the end date is after the start date. If not then add the error endDateBeforeStartDate= true to the form
  static dateLessThan(control: AbstractControl) {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;
    if (startDate > endDate) {
      return {
        endDateBeforeStartDate: true
      };
    }

    return null;
  }
}
