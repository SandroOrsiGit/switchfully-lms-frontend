import {AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";

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
      return {passwordsNotMatching: true};
    }
  }

  // Check if the end date is after the start date. If not then add the error endDateBeforeStartDate= true to the form
  static dateLessThan(from: string, to: string) {
    return (group: FormGroup): ValidationErrors | null => {
      const startDate = group.controls[from];
      const endDate = group.controls[to];
      if (startDate.value > endDate.value) {
        return {
          endDateBeforeStartDate: true
        };
      }
      return null
    }
  }

  static requiredList(list: string): ValidationErrors | null {
    return (group: FormGroup): ValidationErrors | null => {
      const selectList = group.controls[list]
      return selectList.value && selectList.value.length > 0 ? null : {
        requiredList: {
          valid: false
        }
      };
    }

  }
}
