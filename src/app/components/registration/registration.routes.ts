import { RegistrationComponent } from './registration.component';
import { RegistrationBasicComponent } from './registration-basic/registration-basic.component';
import { RegistrationProfileComponent } from './registration-profile/registration-profile.component';
import { RegistrationAddSkillComponent } from './registration-add-skill/registration-add-skill.component';
import { RegistrationWelcomeComponent } from './registration-welcome/registration-welcome.component';

export const RegistrationRoutes = [
    { path: '', redirectTo: 'information', pathMatch: 'full' },
    { path: 'information', component: RegistrationBasicComponent },
    { path: 'profile', component: RegistrationProfileComponent },
    { path: 'addskill', component: RegistrationAddSkillComponent },
    { path: 'welcome', component: RegistrationWelcomeComponent },
]
