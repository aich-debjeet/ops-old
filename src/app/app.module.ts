import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

// External Service
import { ImageCropperModule } from 'ngx-image-cropper';
import { ToastrModule } from 'ngx-toastr';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { NguCarouselModule } from '@ngu/carousel';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AgmCoreModule } from '@agm/core';
import { QuillModule } from 'ngx-quill';

// Pipes
import { OrderByPipe } from './pipes/order.pipe';
import { UniquePipe } from './pipes/unique.pipe';
import { SearchNamePipe } from './pipes/name.pipe';
import { SharedPipesModule } from './pipes/shared-pipes.module';

// Guard
import { AuthGuard } from './guard/auth.guard';
import { AuthlogoutGuard } from './guard/authlogout.guard';

// Routes
import { routes } from './app.routing';

// Reducers
import { reducer } from './app.reducer';

// Effects
import { AuthEffect } from './effects/auth.effect';
import { HomeEffect } from './effects/home.effect';
import { MediaEffect } from './effects/media.effect';
import { SharedEffect } from './effects/shared.effect';
import { ProfileEffect } from './effects/profile.effect';
import { MessageEffect } from './effects/message.effects';
import { NotificationEffect } from './effects/notification.effect';
import { SearchEffect } from './effects/search.effect';
import { OrganizationEffect } from './effects/organization.effect';
import { EventEffect } from './effects/event.effect';
import { ExploreEffect } from './effects/explore.effect';
import { ClaimProfileEffect } from './effects/claim-profile.effect';
import { OpportunityEffect } from 'app/effects/opportunity.effect';
import { CommunitiesEffect } from 'app/effects/communities.effect';

// Services
import { ServicesModule } from './services/services.module';
import { TokenService } from './helpers/token.service';
import { ApiService } from './helpers/api.service';
import { GeneralUtilities } from './helpers/general.utils';
import { ScrollHelper } from './helpers/scroll.helper';
import { AuthService } from './services/auth.service';
import { MediaService } from './services/media.service';
import { GeneralService } from './services/api.service';
import { ModalService } from './shared/modal/modal.component.service';
import { HomeService } from './services/home.service';
import { MessageService } from './services/message.service';
import { NotificationService } from './services/notification.service';
import { SearchService } from './services/search.service';
import { LocalStorageService } from './services/local-storage.service';
import { OpportunityService } from './services/opportunity.service';
import { ExploreService } from './services/explore.service';
import { ClaimProfileService } from './services/claim-profile.service';
import { FileService } from './services/file.service';
import { PusherService } from './services/pusher.service';
import { CommunitiesService } from './services/communities.service';
import { SharedService } from './services/shared.service';

// Component module
import { SharedModule } from './shared/shared.module';
import { MediaModule } from './components/media/media.module';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { ChannelInnerComponent } from './components/channel-inner/channel-inner.component';
import { LearnComponent } from './components/learn/learn.component';
import { ResourceComponent } from './components/resource/resource.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { StatusListComponent } from './components/status-list/status-list.component';
import { PlannerComponent } from './components/planner/planner.component';
import { NetworkComponent } from './components/network/network.component';
import { ProjectComponent } from './components/project/project.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SpotfeedComponent } from './components/spotfeed/spotfeed.component';
import { SpotfeedPremiumComponent } from './components/spotfeed-premium/spotfeed-premium.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LogoutHomeComponent } from './components/logout-home/logout-home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsComponent } from './components/terms/terms.component';
import { AboutComponent } from './components/about/about.component';
import { DirectoryEffect } from './effects/directory.effect';
import { DirectoryService } from './services/directory.service';
import { NgProgressModule } from 'ngx-progressbar';
import { BookmarkEffect } from './effects/bookmark.effect';
import { BookmarkService } from './services/bookmark.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    SpotfeedComponent,
    SpotfeedPremiumComponent,
    SettingsComponent,
    LogoutHomeComponent,
    LogoutComponent,
    ChannelInnerComponent,
    LearnComponent,
    ResourceComponent,
    NotFoundPageComponent,
    OrderByPipe,
    UniquePipe,
    SearchNamePipe,
    StatusListComponent,
    PlannerComponent,
    NetworkComponent,
    ProjectComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ops-app' }),
    SharedPipesModule,
    SharedModule,
    MediaModule,
    ImageCropperModule,
    ReactiveFormsModule,
    FormsModule,
    ServicesModule,
    HttpModule,
    NgxMasonryModule,
    InfiniteScrollModule,
    TextMaskModule,
    StoreModule.provideStore(reducer),
    RouterModule.forRoot(routes),
    NgxMyDatePickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
      preventDuplicates: true,
    }),
    ShareButtonsModule.forRoot(),
    EffectsModule.run(AuthEffect),
    EffectsModule.run(HomeEffect),
    EffectsModule.run(SharedEffect),
    EffectsModule.run(ProfileEffect),
    EffectsModule.run(MessageEffect),
    EffectsModule.run(NotificationEffect),
    EffectsModule.run(MediaEffect),
    EffectsModule.run(SearchEffect),
    EffectsModule.run(OrganizationEffect),
    EffectsModule.run(OpportunityEffect),
    EffectsModule.run(EventEffect),
    EffectsModule.run(ExploreEffect),
    EffectsModule.run(ClaimProfileEffect),
    EffectsModule.run(CommunitiesEffect),
    EffectsModule.run(DirectoryEffect),
    EffectsModule.run(BookmarkEffect),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: 'AIzaSyDHx_cyWUg9okHlTH8M_kvduvWFSV3nShc'
    }),
    NguCarouselModule,
    LazyLoadImageModule,
    QuillModule,
    NgProgressModule,
  ],
  providers: [
    AuthService,
    PusherService,
    MessageService,
    AuthGuard,
    SharedService,
    AuthlogoutGuard,
    GeneralService,
    ApiService,
    TokenService,
    MediaService,
    ModalService,
    HomeService,
    NotificationService,
    SearchService,
    GeneralUtilities,
    ScrollHelper,
    LocalStorageService,
    OpportunityService,
    ExploreService,
    ClaimProfileService,
    FileService,
    CommunitiesService,
    DirectoryService,
    BookmarkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
