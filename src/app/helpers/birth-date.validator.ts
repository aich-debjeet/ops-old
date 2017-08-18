import { FormControl, AbstractControl} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class BirthDateValidator {

    static validateAge(AC: AbstractControl) {

      const dob = AC.get('dob').value;
      console.log(dob);
      const age = 12;
      let isValidAge;

        if (age >= 13) {
          isValidAge = true;
        } else {
          isValidAge = false;
        }

        return isValidAge ? { validAge: true } : null;
    }
}
