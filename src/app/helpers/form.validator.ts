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
}

// Update Profile validation
@Injectable()
export class ProfileUpdateValidator {
    tagState$: Observable<ProfileModal>;
    profileDetails = initialTag ;

    constructor(
        private authService: AuthService,
        private profileStore: Store<ProfileModal>
    ) {
        this.tagState$ = this.profileStore.select('profileTags');
        this.tagState$.subscribe((state) => {
            this.profileDetails = state;
        });
    }

    // Update bio email updation
    emailValidation(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
            // check current email for user
            if (this.profileDetails.profileDetails['email'] !== control.value) {
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
            if (this.profileDetails.profileDetails['extra'].username !== control.value) {
                if (control.value.length >= 4) {
                    setTimeout(() => {
                        this.authService.userExists(control.value).subscribe( data => {
                            if (data.code === 0) {
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

    /**
     * Checking for the valid age input on register form
     * @param control: Form birth date input
     */
    validAge(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
            // if (control.value.indexOf('_') !== -1 || control.value === '') {
            // // console.log('incomplete date');
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
}

