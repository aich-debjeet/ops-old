import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// SharedModule 
import { SharedModule } from '../../shared/shared.module';

// Component
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

const routes: Routes= [
    // { path: '', redirectTo:'password_reset' , pathMatch: 'full' },
    // { path: 'password_reset', component: ForgotPasswordComponent },
     { path: '', component:HomeComponent , pathMatch: 'full' },

]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
  ]
  
})
export class HomeModule { }
