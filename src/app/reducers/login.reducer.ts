import { ActionReducer, Action } from '@ngrx/store';
import { Login } from '../models/login.model';

import { LoginActions } from '../actions/login.action';


export const LoginReducer: ActionReducer<Login[]> = (state: Login[] = [], {payload, type}: Action) =>  {
	switch (type) {
		case LoginActions.USER_LOGIN:
			console.log(payload);
			return Object.assign({}, state, {
		        success: true
		      });

		case LoginActions.USER_LOGIN_SUCCESS:
			console.log('login sucess');
			return Object.assign({}, state, {
		        completed: payload,
		        success: true
	     	 });

		case LoginActions.USER_LOGIN_FAILED:
			console.log('login Faild');
			// const galleries = action.payload;

			// return state,action.payload,
      
	      return Object.assign({}, state, {
	        success: false
	      });

		default:
			return state;
	}
}