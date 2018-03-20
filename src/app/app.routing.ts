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
import { DirectoryListComponent } from './components/directory-list/directory-list.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsComponent } from './components/terms/terms.component';
import { AboutComponent } from './components/about/about.component';

// Guard
import { AuthGuard } from './guard/auth.guard';
import { AuthlogoutGuard } from './guard/authlogout.guard';

export const routes: Routes = [
//  { path: '',  pathMatch: 'full', redirectTo: 'main-home'},
 { path: '', component: LogoutHomeComponent, canActivate: [AuthlogoutGuard] },
 { path: 'logout', component: LogoutComponent },
 { path: 'privacy-policy', component: PrivacyPolicyComponent },
 { path: 'terms', component: TermsComponent },
 { path: 'about', component: AboutComponent },
 { path: 'login', component: LoginComponent, canActivate: [AuthlogoutGuard] },
 { path: 'learn', component: LearnComponent, canActivate: [AuthGuard] },
 { path: 'channel/:id', component: ChannelInnerComponent, canActivate: [AuthGuard] },
 { path: 'reg', loadChildren: './components/registration/registration.module#RegistrationModule' },
 { path: 'account', loadChildren: './components/forgot-password/forgot-password.module#ForgotPasswordModule'},
 { path: 'home', loadChildren: './components/home/home.module#HomeModule', canActivate: [AuthGuard] },
 { path: 'reset-password', component: ResetPasswordComponent },
 { path: 'profile', loadChildren: './components/profile/profile.module#ProfileModule' },
//  { path: 'media', loadChildren: './components/media/media.module#ProfileModule' },
 { path: 'user/message', component: MessageComponent, canActivate: [AuthGuard] },
 { path: 'user/status/list', component: StatusListComponent, canActivate: [AuthGuard] },
 { path: 'user/media/list', loadChildren: './components/media-list/media-list.module#MediaListModule', canActivate: [AuthGuard]},
 { path: 'spotfeed/:id', component: SpotfeedComponent, canActivate: [AuthGuard] },
 { path: 'spotfeed-premium', component: SpotfeedPremiumComponent, canActivate: [AuthGuard] },
 { path: 'directory', component: DirectoryListComponent, canActivate: [AuthGuard] },
 { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
 { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard] },
 { path: 'planner', component: PlannerComponent, canActivate: [AuthGuard] },
 { path: 'network', component: NetworkComponent, canActivate: [AuthGuard] },
 { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
 { path: 'event', loadChildren: './components/events/events.module#EventsModule'},
 { path: 'user/settings', component: SettingsComponent, canActivate: [AuthGuard] },
 { path: 'explore', component: ExploreComponent, canActivate: [AuthGuard] },
 { path: 'channel', component: ChannelListComponent, canActivate: [AuthGuard] },
 { path: 'resources', component: ResourceComponent, canActivate: [AuthGuard] },
 { path: 'communities', component: CommunitiesComponent, canActivate: [AuthGuard] },
 { path: 'search', loadChildren: './components/search/search.module#SearchModule', canActivate: [AuthGuard] },
 { path: 'org', loadChildren: './components/organization/organization.module#OrganizationModule'},
 { path: 'opportunity', loadChildren: './components/opportunity/opportunity.module#OpportunityModule', canActivate: [AuthGuard] },
 { path: 'dwc', loadChildren: './components/dance-world-cup/dance-world-cup.module#DanceWorldCupModule'},
 { path: 'page-not-found', component: NotFoundPageComponent },
 { path: '**', redirectTo: 'page-not-found' },
];
