import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Guard
import { AuthGuard } from './guard/auth.guard';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

// Routes
import { routes } from './app.routing';

// Reducers
import { AuthReducer } from './reducers/auth.reducer';

// Effects
import { AuthEffect } from './effects/auth.effect';

// Services
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardProfileCoverComponent } from './components/dashboard/dashboard-profile-cover/dashboard-profile-cover.component';
import { DashboardSecondaryNavbarComponent } from './components/dashboard/dashboard-secondary-navbar/dashboard-secondary-navbar.component';
import { DashboardWidgetCalendarComponent } from './components/dashboard/dashboard-widget-calendar/dashboard-widget-calendar.component';
import { DashboardWidgetEventsComponent } from './components/dashboard/dashboard-widget-events/dashboard-widget-events.component';
import { DashboardWidgetProjectsComponent } from './components/dashboard/dashboard-widget-projects/dashboard-widget-projects.component';
import { DashboardWidgetCommunitiesComponent } from './components/dashboard/dashboard-widget-communities/dashboard-widget-communities.component';
import { DashboardWidgetOpportunitiesComponent } from './components/dashboard/dashboard-widget-opportunities/dashboard-widget-opportunities.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { QuickAccessComponent } from './shared/quick-access/quick-access.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
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
    RegistrationProfileComponent,
    RegistrationAddSkillComponent,
    RegistrationBasicComponent,
    RegistrationWelcomeComponent,
    DashboardComponent,
    DashboardProfileCoverComponent,
    DashboardSecondaryNavbarComponent,
    DashboardWidgetCalendarComponent,
    DashboardWidgetEventsComponent,
    DashboardWidgetProjectsComponent,
    DashboardWidgetCommunitiesComponent,
    DashboardWidgetOpportunitiesComponent,
    NavigationComponent,
    QuickAccessComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({ loginTags: AuthReducer }),
    RouterModule.forRoot(routes),
    EffectsModule.run(AuthEffect)
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
