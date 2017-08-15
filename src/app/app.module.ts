import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Guard
import { AuthGuard } from './guard/auth.guard';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

// Routes
import { routes } from './app.routing';

// Reducers
import { AuthReducer } from './reducers/auth.reducer';
import { HomeReducer } from './reducers/home.reducer';
import { SharedReducer } from './reducers/shared.reducer';
import { ProfileReducer } from './reducers/profile.reducer';
import { MessageReducer } from './reducers/messages.reducer';
import { UserSearchReducer } from './reducers/user-search.reducer';

// Effects
import { AuthEffect } from './effects/auth.effect';
import { HomeEffect } from './effects/home.effect';
import { SharedEffect } from './effects/shared.effect';
import { ProfileEffect } from './effects/profile.effect';
import { MessageEffect } from './effects/message.effects';
import { UserSearchEffect } from './effects/user-search.effect';

// Services
import { AuthService } from './services/auth.service';

import { SharedModule } from './shared/shared.module';

import { ApiService } from './services/api.service';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardProfileCoverComponent } from './components/dashboard/dashboard-profile-cover/dashboard-profile-cover.component';
import { DashboardSecondaryNavbarComponent } from './components/dashboard/dashboard-secondary-navbar/dashboard-secondary-navbar.component';
import { DashboardWidgetCalendarComponent } from './components/dashboard/dashboard-widget-calendar/dashboard-widget-calendar.component';
import { DashboardWidgetEventsComponent } from './components/dashboard/dashboard-widget-events/dashboard-widget-events.component';
import { DashboardWidgetProjectsComponent } from './components/dashboard/dashboard-widget-projects/dashboard-widget-projects.component';
import { DashboardWidgetCommunitiesComponent } from './components/dashboard/dashboard-widget-communities/dashboard-widget-communities.component';
import { DashboardWidgetOpportunitiesComponent } from './components/dashboard/dashboard-widget-opportunities/dashboard-widget-opportunities.component';
import { PopularArtistsComponent } from './shared/popular-artists/popular-artists.component';
import { NearestEventsComponent } from './shared/nearest-events/nearest-events.component';
import { OpportunitiesComponent } from './shared/opportunities/opportunities.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ChannelListComponent } from './components/channel-list/channel-list.component';
import { LogoutHomeComponent } from './components/logout-home/logout-home.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    MessageComponent,
    SpotfeedComponent,
    SpotfeedPremiumComponent,
    NotificationComponent,
    PortfolioComponent,
    OpportunityComponent,
    JobsComponent,
    JobDetailsComponent,
    EventsComponent,
    SearchComponent,
    SettingsComponent,
    DashboardComponent,
    DashboardProfileCoverComponent,
    DashboardSecondaryNavbarComponent,
    DashboardWidgetCalendarComponent,
    DashboardWidgetEventsComponent,
    DashboardWidgetProjectsComponent,
    DashboardWidgetCommunitiesComponent,
    DashboardWidgetOpportunitiesComponent,
    PopularArtistsComponent,
    NearestEventsComponent,
    OpportunitiesComponent,
    ExploreComponent,
    ChannelListComponent,
    LogoutHomeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({
      loginTags: AuthReducer,
      profileTags: ProfileReducer,
      userMediaTags: ProfileReducer,
      sentMessagesTags: MessageReducer,
      userSearchTags: UserSearchReducer,
      receivedMessagesTags: MessageReducer}),
    RouterModule.forRoot(routes),
    EffectsModule.run(AuthEffect),
    EffectsModule.run(HomeEffect),
    EffectsModule.run(SharedEffect),
    EffectsModule.run(ProfileEffect),
    EffectsModule.run(MessageEffect),
    EffectsModule.run(UserSearchEffect)
  ],
  providers: [AuthService, AuthGuard, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
