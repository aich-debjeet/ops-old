import { Routes, RouterModule } from '@angular/router';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

//Guard
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes =[
 { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
 { path: 'login', component: LoginComponent },
 // otherwise redirect to home
  { path: '**', redirectTo: '' }
];