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
import { RegistrationBasicComponent } from './components/registration-basic/registration-basic.component';
import { RegistrationWelcomeComponent } from './components/registration-welcome/registration-welcome.component';




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
    RegistrationBasicComponent,
    RegistrationWelcomeComponent
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
