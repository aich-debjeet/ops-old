import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';

// Routes
import { RegistrationRoutes as routes } from './registration.routes';
import { RegistrationBlockComponent } from './registration-block/registration-block.component';
import { RegistrationBasicComponent } from './registration-basic/registration-basic.component';
import { RegistrationProfileComponent } from './registration-profile/registration-profile.component';
import { RegistrationAddSkillComponent } from './registration-add-skill/registration-add-skill.component';
import { RegistrationWelcomeComponent } from './registration-welcome/registration-welcome.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegistrationComponent,
    RegistrationBlockComponent,
    RegistrationBasicComponent,
    RegistrationProfileComponent,
    RegistrationAddSkillComponent,
    RegistrationWelcomeComponent
  ]
})
export class RegistrationModule { }
