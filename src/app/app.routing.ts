import { Routes, RouterModule } from '@angular/router';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
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
import { LogoutHomeComponent } from './components/logout-home/logout-home.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ChannelListComponent } from './components/channel-list/channel-list.component';
import { MasonryComponent } from './components/masonry/masonry.component';
import { ChannelInnerComponent } from './components/channel-inner/channel-inner.component';
import { LearnComponent } from './components/learn/learn.component';
import { ResourceComponent } from './components/resource/resource.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { CommunitiesComponent } from './components/communities/communities.component';
import { StatusListComponent } from './components/status-list/status-list.component';
import { PlannerComponent } from './components/planner/planner.component';
import { NetworkComponent } from './components/network/network.component';
import { ProjectComponent } from './components/project/project.component';


// Guard
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
 { path: '', component: LogoutHomeComponent },
 { path: 'logout', component: LogoutComponent },
 { path: 'login', component: LoginComponent },
 { path: 'learn', component: LearnComponent, canActivate: [AuthGuard] },
 { path: 'channel/:id', component: ChannelInnerComponent },
 { path: 'reg', loadChildren: './components/registration/registration.module#RegistrationModule' },
 { path: 'account', loadChildren: './components/forgot-password/forgot-password.module#ForgotPasswordModule'},
 { path: 'home', loadChildren: './components/home/home.module#HomeModule', canActivate: [AuthGuard] },
 { path: 'reset-password', component: ResetPasswordComponent },
 { path: 'profile', loadChildren: './components/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
//  { path: 'media', loadChildren: './components/media/media.module#ProfileModule' },
 { path: 'message', component: MessageComponent, canActivate: [AuthGuard] },
 { path: 'user/status/list', component: StatusListComponent },
 { path: 'user/media/list', loadChildren: './components/media-list/media-list.module#MediaListModule'},
 { path: 'spotfeed/:id', component: SpotfeedComponent },
 { path: 'spotfeed-premium', component: SpotfeedPremiumComponent },
 { path: 'notification', component: NotificationComponent },
 { path: 'portfolio', component: PortfolioComponent },
 { path: 'planner', component: PlannerComponent },
 { path: 'network', component: NetworkComponent },
 { path: 'project', component: ProjectComponent },
 { path: 'opportunity', component: OpportunityComponent, canActivate: [AuthGuard] },
 { path: 'jobs', component: JobsComponent },
 { path: 'job-details', component: JobDetailsComponent },
 { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
 { path: 'user/settings', component: SettingsComponent },
 { path: 'explore', component: ExploreComponent, canActivate: [AuthGuard] },
 { path: 'channel', component: ChannelListComponent },
 { path: 'resources', component: ResourceComponent, canActivate: [AuthGuard] },
 { path: 'communities', component: CommunitiesComponent, canActivate: [AuthGuard] },
 { path: 'search', loadChildren: './components/search/search.module#SearchModule' },
 { path: 'page-not-found', component: NotFoundPageComponent },
 { path: '**', redirectTo: 'page-not-found' }
];
