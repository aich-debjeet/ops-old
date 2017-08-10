import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { PasswordOptionComponent } from './password-option/password-option.component';
import { PasswordMailComponent } from './password-mail/password-mail.component';
import { PasswordSmsComponent } from './password-sms/password-sms.component';

const routes: Routes= [
    { path: '', redirectTo:'password_reset' , pathMatch: 'full' },
    { path: 'password_reset', component: ForgotPasswordComponent },
    { path: 'send_password_reset', component: PasswordOptionComponent },
    { path: 'reset_mail_send', component: PasswordMailComponent },
    { path: 'confirm_pin_rest', component: PasswordSmsComponent }    
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ForgotPasswordComponent, 
    PasswordOptionComponent, 
    PasswordMailComponent, PasswordSmsComponent]
})
export class ForgotPasswordModule { }
