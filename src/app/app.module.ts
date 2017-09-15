import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

// Guard
import { AuthGuard } from './guard/auth.guard';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

// Routes
import { routes } from './app.routing';
import { MasonryModule } from 'angular2-masonry';

// Reducers
import { AuthReducer } from './reducers/auth.reducer';
import { MediaReducer } from './reducers/media.reducer';
import { HomeReducer } from './reducers/home.reducer';
import { SharedReducer } from './reducers/shared.reducer';
import { ProfileReducer } from './reducers/profile.reducer';
import { MessageReducer } from './reducers/messages.reducer';
import { UserSearchReducer } from './reducers/user-search.reducer';
import { reducer } from './app.reducer';

// Effects
import { AuthEffect } from './effects/auth.effect';
import { HomeEffect } from './effects/home.effect';
import { MediaEffect } from './effects/media.effect';
import { SharedEffect } from './effects/shared.effect';
import { ProfileEffect } from './effects/profile.effect';
import { MessageEffect } from './effects/message.effects';
import { UserSearchEffect } from './effects/user-search.effect';

// Services
import { ServicesModule } from './services/services.module';
import { TokenService } from './helpers/token.service';
import { ApiService } from './helpers/api.service';
import { AuthService } from './services/auth.service';
import { MediaService } from './services/media.service';
import { GeneralService } from './services/api.service';

import { SharedModule } from './shared/shared.module';
import { TAB_COMPONENTS  } from './shared/tabs/tabset';

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
import { ExploreComponent } from './components/explore/explore.component';
import { ChannelListComponent } from './components/channel-list/channel-list.component';
import { LogoutHomeComponent } from './components/logout-home/logout-home.component';
import { MasonryComponent } from './components/masonry/masonry.component';
import { LogoutComponent } from './components/logout/logout.component';

// Shared Stuffs!
import { MediaComponent } from './shared/media/media.component';
import { MediaSelectorComponent } from './shared/media-selector/media-selector.component';
import { PopularArtistsComponent } from './shared/popular-artists/popular-artists.component';
import { NearestEventsComponent } from './shared/nearest-events/nearest-events.component';
import { OpportunitiesComponent } from './shared/opportunities/opportunities.component';

// Vide Player
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { ChannelInnerComponent } from './components/channel-inner/channel-inner.component';
import { LearnComponent } from './components/learn/learn.component';
import { ResourceComponent } from './components/resource/resource.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { CommunitiesComponent } from './components/communities/communities.component';

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
    PopularArtistsComponent,
    NearestEventsComponent,
    OpportunitiesComponent,
    ExploreComponent,
    ChannelListComponent,
    LogoutHomeComponent,
    MasonryComponent,
    LogoutComponent,
    ChannelInnerComponent,
    LearnComponent,
    ResourceComponent,
    NotFoundPageComponent,
    CommunitiesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ServicesModule,
    HttpModule,
    MasonryModule,
    StoreModule.provideStore(reducer),
    RouterModule.forRoot(routes),
    // StoreRouterConnectingModule,
    EffectsModule.run(AuthEffect),
    EffectsModule.run(HomeEffect),
    EffectsModule.run(SharedEffect),
    EffectsModule.run(ProfileEffect),
    EffectsModule.run(MessageEffect),
    EffectsModule.run(UserSearchEffect),
    EffectsModule.run(MediaEffect),
    // Video
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [
    AuthService, AuthGuard, GeneralService, ApiService, TokenService, MediaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
