import { FormControl, AbstractControl} from '@angular/forms';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import {Moment} from 'moment';
import * as moment from 'moment';

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

    // check for valid name
    checkForValidName(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
            if (!control.value.replace(/\s/g, '').length) {
                resolve({ invalidName: true });
            }
            resolve(null);
        });
        return q;
    }

    // async check if email already exist
    checkEmail(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
            setTimeout(() => {
                this.authService.emailUser(control.value.toLowerCase()).subscribe( data => {
                    if (data.SUCCESS.code === 1) {
                        resolve({ 'emailAccExists': true });
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
            const contactDetails = {
                contactNumber: control.value,
                countryCode: '91'
            };
            this.authService.mobileNumberCheck(contactDetails).subscribe( data => {
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
            if (control.value.length >= 3) {
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
            // check if date has entered completely
            if (control.value.indexOf('_') > -1) {
                // console.log('incomplete');
                // resolve({ 'invalidDOB': true });
                return;
            }
            const dateArr =  control.value.split('-');
            // console.log('dateArr', dateArr);

            // if (!Date.parse(control.value)) {
            //     console.log('INVALID DATE');
            //     resolve({ 'invalidDOB': true });
            //     return;
            // }

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

            const today = moment();
            const dateArr =  control.value.split('-');

            const month = dateArr[1];
            const day = dateArr[0];
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
             if (toDate <= this.fromDate) {
                resolve({ 'isvalid': true });
             }
             if (moment(new Date(year, month, day)).format('YYYYMMDD') > moment(today).format('YYYYMMDD')) {
                //  console.log('here')
                resolve({ 'invalidWorkDate': true });
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
        console.log(control)
        const q = new Promise((resolve, reject) => {
            // if (control.value.indexOf('_') !== -1 || control.value === '') {
            // return resolve(null);
            // }
            const today = moment();
            
            //  console.log(moment(today).format('YYYYMMDD'))
            const dateArr =  control.value.split('-');
            // console.log(dateArr)

            const month = dateArr[1];
            const day = dateArr[0];
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
            //  console.log(this.fromDate)
            //   console.log(control.value)
            //  console.log(moment(control.value).format('YYYYMMDD'))
            //  console.log(moment(new Date(year, month, day)).format('YYYYMMDD'))
             if (moment(new Date(year, month, day)).format('YYYYMMDD') > moment(today).format('YYYYMMDD')) {
                //   console.log('here')
                resolve({ 'invalidWorkDate': true });
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
                    this.authService.emailUser(control.value.toLowerCase).subscribe( data => {
                        if (data.SUCCESS.code === 1) {
                            resolve({ 'isEmailUnique': true });
                        }
                        resolve(null);
                        });
                }, 1000);
            } else {
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
            } else {
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
                    this.authService.mobileNumberCheck(control.value).subscribe( data => {
                        if (data.SUCCESS.code === 1) {
                            resolve({ 'isMobileUnique': true });
                        }
                        resolve(null);
                        });
                }, 1000);
            } else {
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

@Injectable()
export class EmailValidator {
    public static isValid(email: FormControl) {
        const q = new Promise((resolve, reject) => {
            setTimeout(() => {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(String(email).toLowerCase())) {
                    resolve({ isInvalidEmail: false });
                } else {
                    resolve({ isInvalidEmail: true });
                }
            }, 100);
        });
        return q;
    }
}

// Match password
@Injectable()
export class FormValidation {

    // otp length validation
    static validateOtp(AC: AbstractControl) {
        const otp = AC.value.toString();
        if (otp.length !== 6) {
            return { invalidOtp: true };
        }
        return null;
    }

    // old date validation
    static validateOldDate(AC: AbstractControl) {
        const date = AC.value;
        const currentDate = moment().format('YYYYMMDD');
        const chooseDate = moment(date).format('YYYYMMDD');
        if (currentDate > chooseDate) {
            return { oldDate: true };
        }
        return null;
    }

    static validateAge(control: AbstractControl) {
        const dob = control.value.formatted;
        if (control.value.formatted) {
            const dateArr =  control.value.formatted.split('-');
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

            const birthDate = new Date(year, month, day);
            const ageDifMs = Date.now() - birthDate.getTime();
            const ageDate = new Date(ageDifMs); // miliseconds from epoch
            const age = Math.abs(ageDate.getUTCFullYear() - 1970);

            if (age <= 13) {
                return { isUnderAge: true };
            } else if (age >= 100) {
                return { isOverAge: true };
            }
        }
        return null;
    }

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
        return isWhitespace ? { whitespace: true } : null;
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

    static validPhone (control: AbstractControl) {
        const phoneNumber = control.value;
        if (phoneNumber.trim() === '' || phoneNumber.trim().length === 0) {
            return { isInvalidPhoneNumber: true };
        }
        if (phoneNumber.match(/[a-z][A-Z]/i)) {
            // console.log('number contains chars');
            return { isInvalidPhoneNumber: true };
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

@Injectable()
export class PasswordValidation {
    static MatchPassword(AC: AbstractControl) {
       const password = AC.get('password').value; // to get value in input tag
       const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            AC.get('confirmPassword').setErrors({ matchPassword: true });
            return;
        }
        return null;
    }
}
