import { Routes, RouterModule } from '@angular/router';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';

//Guard
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes =[
 { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
 { path: 'login', component: LoginComponent },
 { path: 'registration', component: RegistrationComponent },
 { path: 'forgot-password', component: ForgotPasswordComponent },
 { path: 'reset-password', component: ResetPasswordComponent },
 { path: 'profile', component: ProfileComponent },
 // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
