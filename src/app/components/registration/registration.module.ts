import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../../pipes/search.pipe';
import { DpDatePickerModule } from 'ng2-date-picker';

// components
import { RegistrationComponent } from './registration.component';
import { RegistrationBasicComponent } from './registration-basic/registration-basic.component';
import { RegistrationAddSkillComponent } from './registration-add-skill/registration-add-skill.component';

// modules
import { SharedModule } from '../../shared/shared.module';

// routes
export const routes = [
  { path: '', redirectTo: 'information', pathMatch: 'full' },
  { path: 'information', component: RegistrationBasicComponent },
  { path: 'addskill', component: RegistrationAddSkillComponent }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    DpDatePickerModule
  ],
  declarations: [
    RegistrationComponent,
    RegistrationBasicComponent,
    RegistrationAddSkillComponent,
    SearchFilterPipe
  ],
})
export class RegistrationModule { }
