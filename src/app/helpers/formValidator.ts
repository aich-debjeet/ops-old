import { FormControl, AbstractControl} from '@angular/forms';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Http, Headers, Response } from '@angular/http';



@Injectable()
export class DatabaseValidator {

  constructor(private authService:AuthService) {}

    checkEmail(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
        setTimeout(() => {
            this.authService.emailUser(control.value).subscribe( data => {
                

                if(data.SUCCESS.code == 1){
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
                if(data.SUCCESS.code == 1){
                    resolve({ 'isMobileUnique': true }); 
                }
                resolve(null);
                });
        }, 1000);
        });
        return q;
    }
}


// Match password
@Injectable()
export class formValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let confirmPassword = AC.get('confirmpassword').value; // to get value in input tag
        if(password != confirmPassword) {
            AC.get('confirmpassword').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }

    static NoWhitespaceValidator (control: AbstractControl) {
        let value = control.value;
        let isWhitespace =  value.indexOf(' ') >= 0;
        return isWhitespace ? { whitespace: true } : null 
    }
}

