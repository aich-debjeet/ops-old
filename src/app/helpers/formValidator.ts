import { FormControl, AbstractControl} from '@angular/forms';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';


// function checkUser(control: AbstractControl){
//     private _dataService: AuthService;
//      this._dataService
//             .emailExists(control.value)
//             .subscribe((data) => {
//                 console.log(data);
//             },
//                 error => console.log(error),
//                 () => console.log('Get all Items complete'));
//     console.log(control.value);
// }

// Match password
@Injectable()
export class formValidation {

    constructor(private _authService: AuthService) {
        let value = 'ddd'
         this._authService
            .emailUserExists(value)
            // .subscribe((data) => {
            //     console.log(data);
            // },
            //     error => console.log(error),
            //     () => console.log('Get all Items complete'));
    }
    

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let confirmPassword = AC.get('confirmpassword').value; // to get value in input tag
        if(password != confirmPassword) {
            AC.get('confirmpassword').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }



    static emailExsists (control: AbstractControl) {
       let dd = this.emailExsists
        let value = control.value;
        // if(value.length >= 4){
        //        _authService.emailUserExists(value);
        //     // .subscribe((data) => {
        //     //     console.log(data);
        //     // },
        //     // error => console.log(error),
        //     // () => console.log('Get all Items complete'));
            
        // }

        // console.log(value);

        // if
            
        //    AuthService.emailExists(value)
        //     .subscribe((data) => {
        //         console.log(data);
        //     },
        //     error => console.log(error),
        //     () => console.log('Get all Items complete'));
            
    }

    static NoWhitespaceValidator (control: AbstractControl) {
        let value = control.value;
        let isWhitespace =  value.indexOf(' ') >= 0;
        return isWhitespace ? { whitespace: true } : null 
    }

    // static emailExsists (control: AbstractControl) {

    //     // return AuthService.emailExists(control)
    //    return ss(control);
    //     // let value = control.value;
    //     // console.log(value);

    //     //  this._dataService
    //     //     .emailExists(value)
    //     //     .subscribe((data) => {
    //     //         console.log(data);
    //     //     },
    //     //         error => console.log(error),
    //     //         () => console.log('Get all Items complete'));
        
    // }


// private data: AuthService;

    // public emailExsist(control: AbstractControl) {
        
    //     // dat
    //     let value = this._dataService.emailExsis
    //     // this._dataService
    //     //     .emailExists(value)

    //     // console.log(value);
    // }

    // static emailExsist (control: AbstractControl) {
    //     let value = control.value;
    //     let service = AuthService.emailExists(value)

    //      this._dataService
    //         .emailExists(value)
    //         .subscribe((data) => {
    //             console.log(data);
    //         },
    //             error => console.log(error),
    //             () => console.log('Get all Items complete'));
        
    // }

    // private getAllItems(value): void {
    //     this._dataService
    //         .emailExists(value)
    //         .subscribe((data) => {
    //             console.log(data);
    //         },
    //             error => console.log(error),
    //             () => console.log('Get all Items complete'));
    // }
}
