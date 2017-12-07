import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { TextMaskModule } from 'angular2-text-mask';
import { SearchFilterPipe } from '../../pipes/search.pipe'
// helper
// import {  passwordValidator, passwordConfirmation } from '../../helpers/password.validator';

// Routes
import { RegistrationRoutes as routes } from './registration.routes';
import { RegistrationBasicComponent } from './registration-basic/registration-basic.component';
import { RegistrationProfileComponent } from './registration-profile/registration-profile.component';
import { RegistrationAddSkillComponent } from './registration-add-skill/registration-add-skill.component';
import { RegistrationWelcomeComponent } from './registration-welcome/registration-welcome.component';
import { ChannelFollowComponent } from './registration-add-skill/channel-follow/channel-follow.component';
import { ShareBottonComponent } from './registration-add-skill/share-botton/share-botton.component';

import { SharedModule } from '../../shared/shared.module';
import { RegistrationDwcComponent } from './registration-dwc/registration-dwc.component';

@NgModule({
  imports: [
    CommonModule,
    TextMaskModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegistrationComponent,
    RegistrationBasicComponent,
    RegistrationProfileComponent,
    RegistrationAddSkillComponent,
    RegistrationWelcomeComponent,
    SearchFilterPipe,
    ChannelFollowComponent,
    ShareBottonComponent,
    RegistrationDwcComponent
  ],
})
export class RegistrationModule { }
