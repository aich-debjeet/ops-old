import { Routes } from '@angular/router';

// components
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SpotfeedComponent } from './components/spotfeed/spotfeed.component';
import { SpotfeedPremiumComponent } from './components/spotfeed-premium/spotfeed-premium.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LogoutHomeComponent } from './components/logout-home/logout-home.component';
import { ChannelInnerComponent } from './components/channel-inner/channel-inner.component';
import { LearnComponent } from './components/learn/learn.component';
import { ResourceComponent } from './components/resource/resource.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { StatusListComponent } from './components/status-list/status-list.component';
import { PlannerComponent } from './components/planner/planner.component';
import { ProjectComponent } from './components/project/project.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsComponent } from './components/terms/terms.component';
import { AboutComponent } from './components/about/about.component';

// Guard
import { AuthGuard } from './guard/auth.guard';
import { AuthlogoutGuard } from './guard/authlogout.guard';

export const routes: Routes = [
    { path: '', component: LogoutHomeComponent, canActivate: [AuthlogoutGuard] },
    { path: 'logout', component: LogoutComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthlogoutGuard] },
    { path: 'learn', component: LearnComponent, canActivate: [AuthGuard] },
    { path: 'channel/:id', component: ChannelInnerComponent, canActivate: [AuthGuard] },
    { path: 'reg', loadChildren: './components/registration/registration.module#RegistrationModule' },
    { path: 'account', loadChildren: './components/forgot-password/forgot-password.module#ForgotPasswordModule' },
    { path: 'home', loadChildren: './components/home/home.module#HomeModule', canActivate: [AuthGuard] },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'profile', loadChildren: './components/profile/profile.module#ProfileModule' },
    { path: 'user/status/list', component: StatusListComponent, canActivate: [AuthGuard] },
    { path: 'user/media/list', loadChildren: './components/media-list/media-list.module#MediaListModule', canActivate: [AuthGuard] },
    { path: 'spotfeed/:id', component: SpotfeedComponent, canActivate: [AuthGuard] },
    { path: 'spotfeed-premium', component: SpotfeedPremiumComponent, canActivate: [AuthGuard] },
    { path: 'notification', loadChildren: './components/notification/notification.module#NotificationModule', canActivate: [AuthGuard] },
    { path: 'message', loadChildren: './components/message/message.module#MessageModule', canActivate: [AuthGuard] },
    { path: 'portfolio', loadChildren: './components/portfolio/portfolio.module#PortfolioModule' },
    { path: 'planner', component: PlannerComponent, canActivate: [AuthGuard] },
    { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
    { path: 'event', loadChildren: './components/events/events.module#EventsModule' },
    { path: 'explore', loadChildren: './components/explore/explore.module#ExploreModule', canActivate: [AuthGuard] },
    { path: 'user/settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'resources', component: ResourceComponent, canActivate: [AuthGuard] },
    { path: 'communities', loadChildren: './components/communities/communities.module#CommunitiesModule', canActivate: [AuthGuard] },
    { path: 'search', loadChildren: './components/search/search.module#SearchModule', canActivate: [AuthGuard] },
    { path: 'org', loadChildren: './components/organization/organization.module#OrganizationModule' },
    { path: 'opportunity', loadChildren: './components/opportunity/opportunity.module#OpportunityModule', canActivate: [AuthGuard] },
    { path: 'directory', loadChildren: './components/directory/directory.module#DirectoryModule', canActivate: [AuthGuard] },
    { path: 'invite', loadChildren: './components/invite-people/invite-people.module#InvitePeopleModule' },
    { path: 'bookmark', loadChildren: './components/bookmark/bookmark.module#BookmarkModule', canActivate: [AuthGuard] },
    { path: 'page-not-found', component: NotFoundPageComponent },
    { path: '**', redirectTo: 'page-not-found' },
];
