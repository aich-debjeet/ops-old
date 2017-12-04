import { FormControl, AbstractControl} from '@angular/forms';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as moment from 'moment';

@Injectable()
export class EventValidator {
    constructor(
    ) {}

    // Old Date Validator current date
    datevalidation(control: AbstractControl) {
        const q = new Promise((resolve, reject) => {
            const date = control.value.split('-').reverse().join('-');
            const currentDate = moment().format('YYYYMMDD');
            const chooseDate = moment(date).format('YYYYMMDD');

            if (control.value === '') {
                return;
            }

            if (currentDate > chooseDate ) {
                console.log('old date ');
                return { oldate: true };
            }
            // return null;
            // // check current email for user
            // if (control.value.length >= 4) {
            //     setTimeout(() => {
            //         this.authService.userExists(control.value).subscribe( data => {
            //             if (data.code === 0) {
            //                 resolve({ 'isUsernameUnique': true });
            //             }
            //             resolve(null);
            //             });
            //     }, 500);
            // }
        });
        return q;
    }


}

@Injectable()
export class FormValidation {

    // Old Date Validator current date
    static datevalidation(AC: AbstractControl) {
        const date = AC.value.split('-').reverse().join('-');
        const currentDate = moment().format('YYYYMMDD');
        const chooseDate = moment(date).format('YYYYMMDD');

        if (currentDate > chooseDate) {
             return { oldate: true };
        } else {
            return null
        }
    }

    // Old End Date Validator current date
    static oldEndDatevalidation(AC: AbstractControl) {
        const date = AC.value.split('-').reverse().join('-');
        const currentDate = moment().format('YYYYMMDD');
        const chooseDate = moment(date).format('YYYYMMDD');

        if (currentDate > chooseDate) {
             return { old_even_end_date: true };
        } else {
            return null
        }
    }

    // Stat date and End date validation
    static endateValidation(AC: AbstractControl) {

        console.log(AC.get('event_startdate').value);
        const startDate = AC.get('event_startdate').value.split('-').reverse().join('-');
        const endData = AC.get('event_enddate').value.split('-').reverse().join('-');
        const ts_startDate = AC.get('ts_startTime').value.split('-').reverse().join('-');
        const ts_endDate = AC.get('ts_endTime').value.split('-').reverse().join('-');

        const startSelect = moment(startDate).format('YYYYMMDD');
        const endSelect = moment(endData).format('YYYYMMDD');

        console.log(startSelect);
        console.log(AC.value);


        // Event end Date choose
        // if (endData !== '') {
        //     if (startDate === '') {
        //         console.log('blank');
        //         AC.get('event_enddate').setErrors( {startdate: true} )
        //         return
        //     }

        // }

        if (endSelect < startSelect) {
            AC.get('event_enddate').setErrors( {oldate: true} )
             return
        }
        // if (startDate > ts_startDate || endData < ts_startDate ) {
        //     console.log('ticket date true');
        // }
        return null
    }

    // Event End state validation
    // Stat date and End date validation
    static eventEndDateValidation(AC: AbstractControl) {

        console.log(AC.get('event_startdate').value);
        const startDate = AC.get('event_startdate').value.split('-').reverse().join('-');
        const endData = AC.get('event_enddate').value.split('-').reverse().join('-');
        const ts_startDate = AC.get('ts_startTime').value.split('-').reverse().join('-');
        const ts_endDate = AC.get('ts_endTime').value.split('-').reverse().join('-');

        const startSelect = moment(startDate).format('YYYYMMDD');
        const endSelect = moment(endData).format('YYYYMMDD');

        console.log(startSelect);
        console.log(AC.value);


        // Event end Date choose
        if (endData !== '') {
            if (startDate === '') {
                console.log('blank');
                AC.get('event_enddate').setErrors( {startdate: true} )
                return
            }

        }

        if (endSelect < startSelect) {
            AC.get('event_enddate').setErrors( {oldate: true} )
             return
        }
        if (startDate > ts_startDate || endData < ts_startDate ) {
            console.log('ticket date true');
        }
        return null
    }

}
