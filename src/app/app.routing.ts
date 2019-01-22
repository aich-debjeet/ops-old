import { Routes } from '@angular/router';

// components
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SpotfeedComponent } from './components/spotfeed/spotfeed.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LogoutHomeComponent } from './components/logout-home/logout-home.component';
import { ChannelInnerComponent } from './components/channel-inner/channel-inner.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
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
    { path: 'channel/:id', component: ChannelInnerComponent, canActivate: [AuthGuard] },
    { path: 'reg', loadChildren: './components/registration/registration.module#RegistrationModule' },
    { path: 'account', loadChildren: './components/forgot-password/forgot-password.module#ForgotPasswordModule' },
    { path: 'home', loadChildren: './components/home/home.module#HomeModule', canActivate: [AuthGuard] },
    { path: 'profile', loadChildren: './components/profile/profile.module#ProfileModule' },
    { path: 'spotfeed/:id', component: SpotfeedComponent, canActivate: [AuthGuard] },
    { path: 'notification', loadChildren: './components/notification/notification.module#NotificationModule', canActivate: [AuthGuard] },
    { path: 'message', loadChildren: './components/message/message.module#MessageModule', canActivate: [AuthGuard] },
    { path: 'portfolio', loadChildren: './components/portfolio/portfolio.module#PortfolioModule' },
    { path: 'event', loadChildren: './components/events/events.module#EventsModule' },
    { path: 'explore', loadChildren: './components/explore/explore.module#ExploreModule', canActivate: [AuthGuard] },
    { path: 'user/settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'communities', loadChildren: './components/communities/communities.module#CommunitiesModule', canActivate: [AuthGuard] },
    { path: 'search', loadChildren: './components/search/search.module#SearchModule', canActivate: [AuthGuard] },
    { path: 'org', loadChildren: './components/organization/organization.module#OrganizationModule' },
    { path: 'opportunity', loadChildren: './components/opportunity/opportunity.module#OpportunityModule', canActivate: [AuthGuard] },
    { path: 'invite', loadChildren: './components/invite-people/invite-people.module#InvitePeopleModule' },
    { path: 'bookmark', loadChildren: './components/bookmark/bookmark.module#BookmarkModule', canActivate: [AuthGuard] },
    { path: 'page-not-found', component: NotFoundPageComponent },
    { path: '**', redirectTo: 'page-not-found' },
];
