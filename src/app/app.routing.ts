import { Routes, RouterModule } from '@angular/router';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileBioComponent } from './components/profile-bio/profile-bio.component';
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
import { AccountTypeComponent } from './components/account-type/account-type.component';
import { RegisterInterestComponent } from './components/register-interest/register-interest.component';
import { SettingsComponent } from './components/settings/settings.component';

// Guard
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
 { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
 { path: 'login', component: LoginComponent },
 { path: 'registration', component: RegistrationComponent },
 { path: 'forgot-password', component: ForgotPasswordComponent },
 { path: 'reset-password', component: ResetPasswordComponent },
 { path: 'profile', component: ProfileComponent },
 { path: 'profile-bio', component: ProfileBioComponent },
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
 { path: 'acccount-type', component: AccountTypeComponent },
 { path: 'register-interest', component: RegisterInterestComponent },
 { path: 'settings', component: SettingsComponent },
 // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
