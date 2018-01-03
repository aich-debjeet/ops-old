import { FormControl, AbstractControl} from '@angular/forms';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';

// state
import { ProfileModal, initialTag } from '../models/profile.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class DatabaseValidator {
    fromDate: any;
    constructor(
        private authService: AuthService,
    ) {}
    checkEmail(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
        setTimeout(() => {
            this.authService.emailUser(control.value).subscribe( data => {
                if (data.SUCCESS.code === 1) {
                    resolve({ 'isEmailUnique': true });
                }
                resolve(null);
                });
        }, 1000);
        });
        return q;
    }

    checkMobile(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
        setTimeout(() => {
            this.authService.mobilelUser(control.value).subscribe( data => {
                if (data.SUCCESS.code === 1) {
                    resolve({ 'isMobileUnique': true });
                }
                resolve(null);
                });
        }, 1000);
        });
        return q;
    }

    // User already Exsist check on DB
    userNameValidation(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
            // check current email for user
            if (control.value.length >= 4) {
                setTimeout(() => {
                    this.authService.userExists(control.value).subscribe( data => {
                        if (data.code === 0) {
                            resolve({ 'isUsernameUnique': true });
                        }
                        resolve(null);
                        });
                }, 500);
            }
        });
        return q;
    }

    /**
     * Checking for the valid age input on register form
     * @param control: Form birth date input
     */
    validAge(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
            // if (control.value.indexOf('_') !== -1 || control.value === '') {
            // return resolve(null);
            // }

            const dateArr =  control.value.split('-');

            const day = dateArr[0];
            const month = dateArr[1];
            const year = dateArr[2];

            // check for valid day number
            if (parseInt(day, 10) > 31) {
                resolve({ 'invalidDOB': true });
            }

            // check for valid month number
            if (parseInt(month, 10) > 12) {
                resolve({ 'invalidDOB': true });
            }

            // check if year is not greater that current
            if (new Date().getUTCFullYear() < year) {
                resolve({ 'invalidDOB': true });
            }

            const birthDate = new Date(year, month, day);
            const age = this.calculateAge(birthDate);

            if (age <= 13) {
                resolve({ 'isUnderAge': true });
            } else if (age >= 100) {
                resolve({ 'isOverAge': true });
            }
            resolve(null);
        });
        return q;
    }

    /**
     * Calculating the age using the date of birth
     * @param birthday: Birth dat object
     */
    calculateAge(birthday) {
        const ageDifMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    /**
     * Checking for the valid age input on register form
     * @param control: Form birth date input
     */
    validWorkToDate(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
            // if (control.value.indexOf('_') !== -1 || control.value === '') {
            // return resolve(null);
            // }

            const dateArr =  control.value.split('-');

            const day = dateArr[0];
            const month = dateArr[1];
            const year = dateArr[2];

            // check for valid day number
            if (parseInt(day, 10) > 31) {
                resolve({ 'invalidWorkDate': true });
            }

            // check for valid month number
            if (parseInt(month, 10) > 12) {
                resolve({ 'invalidWorkDate': true });
            }

            // check if year is not greater that current
            if (new Date().getUTCFullYear() < year) {
                resolve({ 'invalidWorkDate': true });
            }

             const toDate = new Date(year, month, day);
             if (this.fromDate > toDate) {
                resolve({ 'isvalid': true });
             }

            // const age = this.calculateAge(birthDate);

            // if (age <= 13) {
            //     resolve({ 'isUnderAge': true });
            // } else if (age >= 100) {
            //     resolve({ 'isOverAge': true });
            // }
            resolve(null);
        });
        return q;
    }
    /**
     * Checking for the valid age input on register form
     * @param control: Form birth date input
     */
    validWorkFromDate(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
            // if (control.value.indexOf('_') !== -1 || control.value === '') {
            // return resolve(null);
            // }

            const dateArr =  control.value.split('-');

            const day = dateArr[0];
            const month = dateArr[1];
            const year = dateArr[2];

            // check for valid day number
            if (parseInt(day, 10) > 31) {
                resolve({ 'invalidWorkDate': true });
            }

            // check for valid month number
            if (parseInt(month, 10) > 12) {
                resolve({ 'invalidWorkDate': true });
            }

            // check if year is not greater that current
            if (new Date().getUTCFullYear() < year) {
                resolve({ 'invalidWorkDate': true });
            }

             this.fromDate = new Date(year, month, day);
            // const age = this.calculateAge(birthDate);

            // if (age <= 13) {
            //     resolve({ 'isUnderAge': true });
            // } else if (age >= 100) {
            //     resolve({ 'isOverAge': true });
            // }
            resolve(null);
        });
        return q;
    }

}

// Update Profile validation
@Injectable()
export class ProfileUpdateValidator {
    tagState$: Observable<ProfileModal>;
    profileState = initialTag ;

    constructor(
        private authService: AuthService,
        private profileStore: Store<ProfileModal>
    ) {
        this.tagState$ = this.profileStore.select('profileTags');
        this.tagState$.subscribe((state) => {
            this.profileState = state;
        });
    }

    // Update bio email updation
    emailValidation(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
            // check current email for user
            if (this.profileState.profile_details['email'] !== control.value) {
                setTimeout(() => {
                    this.authService.emailUser(control.value).subscribe( data => {
                        if (data.SUCCESS.code === 1) {
                            resolve({ 'isEmailUnique': true });
                        }
                        resolve(null);
                        });
                }, 1000);
            }else {
                resolve(null);
            }
        });
        return q;
    }

    // User already Exsist check on DB
    userNameValidation(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
            // check current email for user
            if (this.profileState.profile_details['extra'].username !== control.value) {
                if (control.value.length >= 4) {
                    setTimeout(() => {
                        this.authService.userExists(control.value).subscribe( data => {
                            if (data.SUCCESS.code === 1) {
                                resolve({ 'isUsernameUnique': true });
                            }
                            resolve(null);
                            });
                    }, 1000);
                }
            }else {
                resolve(null);
            }
        });
        return q;
    }

    // mobile already Exsist check on DB
    mobileValidation(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
            // check current email for user
            if (this.profileState.profile_details['contact'].mobile.mobile !== control.value) {
                setTimeout(() => {
                    this.authService.mobilelUser(control.value).subscribe( data => {
                        if (data.SUCCESS.code === 1) {
                            resolve({ 'isMobileUnique': true });
                        }
                        resolve(null);
                        });
                }, 1000);
            }else {
                resolve(null);
            }
        });
        return q;
    }

    /**
     * Checking for the valid age input on register form
     * @param control: Form birth date input
     */
    validAge(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
            const dateArr =  control.value.split('-');

            const day = dateArr[0];
            const month = dateArr[1];
            const year = dateArr[2];

            // check for valid day number
            if (parseInt(day, 10) > 31) {
                resolve({ 'invalidDOB': true });
            }

            // check for valid month number
            if (parseInt(month, 10) > 12) {
                resolve({ 'invalidDOB': true });
            }

            // check if year is not greater that current
            if (new Date().getUTCFullYear() < year) {
                resolve({ 'invalidDOB': true });
            }

            const birthDate = new Date(year, month, day);
            const age = this.calculateAge(birthDate);

            if (age <= 13) {
                resolve({ 'isUnderAge': true });
            } else if (age >= 100) {
                resolve({ 'isOverAge': true });
            }
            resolve(null);
        });
        return q;
    }

    /**
     * Calculating the age using the date of birth
     * @param birthday: Birth dat object
     */
    calculateAge(birthday) {
        const ageDifMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}

// Match password
@Injectable()
export class FormValidation {

    static matchPassword(AC: AbstractControl) {
       const password = AC.get('password').value; // to get value in input tag
       const confirmPassword = AC.get('confirmpassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            AC.get('confirmpassword').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }

    static noWhitespaceValidator (control: AbstractControl) {
        const value = control.value;
        const isWhitespace =  value.indexOf(' ') >= 0;
        return isWhitespace ? { whitespace: true } : null
    }

    static noCapitalLettersValidator (control: AbstractControl) {
        const value = control.value;
        if (/[A-Z]/.test(value)) {
            return { capitalLetters: true }
        }
        return null;
    }

    static usernameLengthValidator (control: AbstractControl) {
        const value = control.value;
        if (value.length === 0) {
            return null;
        }
        if (value.length < 3 || value.length > 15) {
            return { invalidLength: true }
        }
        return null;
    }

    static noSpecialCharsValidator (control: AbstractControl) {
        const value = control.value;
        if (/[ !@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
            return { specialChars: true }
        }
        return null;
    }

    /**
     * Checking for the password strength on register form
     * @param control: Form password input
     */
    static passwordStrength(control: AbstractControl) {
        if (control.value === '') {
            return;
        }
        if (control.value.length <= 4) {
            return { isWeakPassword: true };
        }
        // const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,20}$/;
        const numberCheck = /\d/;
        if (!numberCheck.test(control.value)) {
            return { isWeakPassword: true };
        }
        const charCheck = /[a-z]/i;
        if (!charCheck.test(control.value)) {
            return { isWeakPassword: true };
        }
        return null;
    }

    /**
     * Checking for the password if matches with the confirm password on register form
     * @param control: Form confirm password input
     */
    static passwordMatchCheck (control: AbstractControl) {
        if (control.value === '') {
            return;
        }
        const pass = control.get('password').value;
        if (control.value !== pass) {
        return { passwordDoesNotMatch: true };
        }
        return null;
    }

    /**
     * Checking for the valid email input on register form
     * @param control: Form email input
     */
    static validEmail(control: AbstractControl) {
        if (control.value === '') {
            return;
        }
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(control.value)) {
            return { isInvalidEmail: true };
        }
        return null;
    }

    static dwcValidDOB(control: AbstractControl) {

        const dateArr =  control.value.split('-');
        const day = dateArr[0];
        const month = dateArr[1];
        const year = dateArr[2];

        // check for valid day number
        if (parseInt(day, 10) > 31) {

            return { invalidDOB: true };
        }

        // check for valid month number
        if (parseInt(month, 10) > 12) {
            return { invalidDOB: true };
        }

        // check if year is not greater that current
        if (new Date().getUTCFullYear() < year) {
            return { invalidDOB: true };
        }

        const birthday = new Date(year, month, day);

        const date: any = new Date('01/01/2018');
        const ageDiff = date - birthday.getTime();
        const ageDate = new Date(ageDiff);
        const age =  Math.abs(ageDate.getUTCFullYear() - 1970);

        if (age >= 25) {
            return { isOverAge: true };
        }
        return null;
    }

    /**
     * checking for valid otp length
     */
    static validOtp(control: AbstractControl) {
        if (control.value === '' || control.value.length !== 6) {
            return { invalid: true };
        }
        return null;
    }
}

