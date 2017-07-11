import { ActionReducer, Action } from '@ngrx/store';
import { Login, initialTag } from '../models/login.model';

import { authActions } from '../actions/auth.action';


export const LoginReducer: ActionReducer<any> = (state = initialTag, {payload, type}: Action) =>  {
	switch (type) {
		case authActions.USER_LOGIN:
			console.log(payload);
			return Object.assign({}, state, {
		        success: true
		      });

		case authActions.USER_LOGIN_SUCCESS:
			console.log('login sucess');
			return Object.assign({}, state, {
		        completed: payload,
		        success: true
	     	 });

		case authActions.USER_LOGIN_FAILED:
			console.log('login Faild');      
			return Object.assign({}, state, {
			success: false
			});

		default:
			return state;
	}
}