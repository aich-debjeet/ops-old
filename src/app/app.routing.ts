import { Routes, RouterModule } from '@angular/router';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountTypeComponent } from './components/account-type/account-type.component';
import { RegisterInterestComponent } from './components/register-interest/register-interest.component';

//Guard
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes =[
 { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
 { path: 'login', component: LoginComponent },
 { path: 'registration', component: RegistrationComponent },
 { path: 'acccount-type', component: AccountTypeComponent },
 { path: 'register-interest', component: RegisterInterestComponent },

 // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
