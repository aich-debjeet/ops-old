import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { TextMaskModule } from 'angular2-text-mask';
import { SearchFilterPipe } from '../../pipes/search.pipe';
import { DpDatePickerModule } from 'ng2-date-picker';
// helper
// import {  passwordValidator, passwordConfirmation } from '../../helpers/password.validator';

// Routes
import { RegistrationRoutes as routes } from './registration.routes';
import { RegistrationBasicComponent } from './registration-basic/registration-basic.component';
import { RegistrationProfileComponent } from './registration-profile/registration-profile.component';
import { RegistrationAddSkillComponent } from './registration-add-skill/registration-add-skill.component';
import { RegistrationWelcomeComponent } from './registration-welcome/registration-welcome.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TextMaskModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    DpDatePickerModule
  ],
  declarations: [
    RegistrationComponent,
    RegistrationBasicComponent,
    RegistrationProfileComponent,
    RegistrationAddSkillComponent,
    RegistrationWelcomeComponent,
    SearchFilterPipe
  ],
})
export class RegistrationModule { }
