import { Routes, RouterModule } from '@angular/router';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes =[
 // { path: '', component: AppComponent },
 { path: 'login', component: LoginComponent } 
];