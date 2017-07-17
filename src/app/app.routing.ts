import { Routes, RouterModule } from '@angular/router';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessageComponent } from './components/message/message.component';
import { SpotfeedComponent } from './components/spotfeed/spotfeed.component';
import { SpotfeedPremiumComponent } from './components/spotfeed-premium/spotfeed-premium.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { OpportunityComponent } from './components/opportunity/opportunity.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { EventsComponent } from './components/events/events.component';
import { SearchComponent } from './components/search/search.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RegistrationProfileComponent } from './components/registration-profile/registration-profile.component';
import { RegistrationAddSkillComponent } from './components/registration-add-skill/registration-add-skill.component';
import { RegistrationBasicComponent } from './components/registration-basic/registration-basic.component';
import { RegistrationWelcomeComponent } from './components/registration-welcome/registration-welcome.component';

// Guard
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
 { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
 { path: 'login', component: LoginComponent },
 { path: 'forgot-password', component: ForgotPasswordComponent },
 { path: 'reset-password', component: ResetPasswordComponent },
 { path: 'profile', component: ProfileComponent },
 { path: 'message', component: MessageComponent },
 { path: 'spotfeed', component: SpotfeedComponent },
 { path: 'spotfeed-premium', component: SpotfeedPremiumComponent },
 { path: 'notification', component: NotificationComponent },
 { path: 'portfolio', component: PortfolioComponent },
 { path: 'opportunity', component: OpportunityComponent },
 { path: 'jobs', component: JobsComponent },
 { path: 'job-details', component: JobDetailsComponent },
 { path: 'events', component: EventsComponent },
 { path: 'search', component: SearchComponent },
 { path: 'settings', component: SettingsComponent },
 { path: 'registration/profile', component: RegistrationProfileComponent },
 { path: 'registration/addskill', component: RegistrationAddSkillComponent },
 { path: 'registration-basic', component: RegistrationBasicComponent },
 { path: 'registration-welcome', component: RegistrationWelcomeComponent },
 // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
