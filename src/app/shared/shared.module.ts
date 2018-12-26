import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReadMoreComponent } from '../helpers/read-more.component';
import { ShareButtonsModule } from 'ngx-sharebuttons';
// import { MediaModule } from '../components/media/media.module';

import { AuthRightBlockComponent } from './auth-right-block/auth-right-block.component';
import { AppButtonComponent } from './button/button.component';
import { QuickAccessComponent } from './quick-access/quick-access.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationLogoComponent } from './navigation-logo/navigation-logo.component';
import { ChannelComponent } from './channel/channel.component';
import { SpotfeedCardComponent } from './spotfeed-card/spotfeed-card.component';
import { FooterComponent } from './footer/footer.component';
import { PostCardComponent } from './post-card/post-card.component';
import { PostCardSearchComponent } from './post-card-search/post-card-search.component';
import { ModalComponent } from './modal/modal.component';
import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { SharedPipesModule } from './../pipes/shared-pipes.module';
import { UtcDatePipe } from './../pipes/utcdate.pipe';

import { MediumEditorComponent } from './meditor/meditor.component';

// Uploader
import { TabComponents } from './tabs/tabset';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

import { VideplayerComponent } from './videplayer/videplayer.component';
import { AudioPlayerComponent } from './audioplayer/audioplayer.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { DropdownDirective } from './dropdown/dropdown.directive';
import { DropdownNotClosableZoneDirective } from './dropdown/dropdown-not-closable-zone.directive';
import { DropdownOpenDirective } from './dropdown/dropdown-open.directive';

import { MediaComponent } from '../components/media/media.component';
import { PostComponent } from './post/post.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentComponent } from './comment/comment.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserCardNewComponent } from './user-card-new/user-card-new.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// modal new
import {Modal, ModalContent} from './modal-new/Modal';
import {RouteModal} from './modal-new/RouteModal';
import { ScrollToDirective } from './scrollto/scroll-to.directive';
import { OpportunityCardComponent } from './opportunity-card/opportunity-card.component';
import { EventCardComponent } from './event-card/event-card.component';
import { ChannelSearchComponent } from './channel-search/channel-search.component';
import { SearchChannelCardComponent } from './search-channel-card/search-channel-card.component';
import { CommunityCardComponent } from './community-card/community-card.component';
import { PlaceholderNotificationComponent } from './placeholder-notification/placeholder-notification.component';
import { PortfolioMediaComponent } from './portfolio-media/portfolio-media.component';
import { ReportPopoupComponent } from './report-popoup/report-popoup.component';
import { PortfolioViewMediaComponent } from './portfolio-view-media/portfolio-view-media.component';
import { OpportunityApplicationCardComponent } from './opportunity-application-card/opportunity-application-card.component';
import { OpporunitySearchCardComponent } from './opporunity-search-card/opporunity-search-card.component';
import { EventSearchCardComponent } from './event-search-card/event-search-card.component';
import { UserCardSearchComponent } from './user-card-search/user-card-search.component';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';
import { WikiProfileCardComponent } from './wiki-profile-card/wiki-profile-card.component';
import { TermsAndConditionsContentComponent } from './terms-and-conditions-content/terms-and-conditions-content.component';
import { WidgetCollaboratorsComponent } from './widget-collaborators/widget-collaborators.component';
import { CollaboratorCardComponent } from './collaborator-card/collaborator-card.component';
import { AppearDirective } from './appear/appear.directive';
import { PeopleToFollowComponent } from './people-to-follow/people-to-follow.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    SharedPipesModule,
    LazyLoadImageModule,
    ShareButtonsModule
  ],
  declarations: [
    // TruncatePipe,
    UtcDatePipe,
    ModalComponent,
    AuthRightBlockComponent,
    AppButtonComponent,
    QuickAccessComponent,
    NavigationComponent,
    NavigationLogoComponent,
    ChannelComponent,
    SpotfeedCardComponent,
    FooterComponent,
    PostCardComponent,
    PostCardSearchComponent,
    CountrySelectorComponent,
    VideplayerComponent,
    AudioPlayerComponent,
    TabComponents,
    MediumEditorComponent,
    CreateChannelComponent,
    ComingSoonComponent,
    DropdownDirective,
    DropdownNotClosableZoneDirective,
    DropdownOpenDirective,
    PostComponent,
    CommentListComponent,
    CommentComponent,
    UserCardComponent,
    UserCardNewComponent,
    Modal,
    RouteModal,
    ModalContent,
    ScrollToDirective,
    OpportunityCardComponent,
    EventCardComponent,
    ChannelSearchComponent,
    SearchChannelCardComponent,
    CommunityCardComponent,
    ReadMoreComponent,
    PlaceholderNotificationComponent,
    PortfolioMediaComponent,
    ReportPopoupComponent,
    PortfolioViewMediaComponent,
    OpportunityApplicationCardComponent,
    OpporunitySearchCardComponent,
    EventSearchCardComponent,
    UserCardSearchComponent,
    ConfirmBoxComponent,
    WikiProfileCardComponent,
    TermsAndConditionsContentComponent,
    WidgetCollaboratorsComponent,
    CollaboratorCardComponent,
    AppearDirective,
    PeopleToFollowComponent
  ],
  exports: [
    OpportunityCardComponent,
    AuthRightBlockComponent,
    AppButtonComponent,
    QuickAccessComponent,
    NavigationComponent,
    NavigationLogoComponent,
    ChannelComponent,
    SpotfeedCardComponent,
    FooterComponent,
    PostCardComponent,
    PostCardSearchComponent,
    ModalComponent,
    CountrySelectorComponent,
    VideplayerComponent,
    AudioPlayerComponent,
    TabComponents,
    ComingSoonComponent,
    DropdownDirective,
    DropdownNotClosableZoneDirective,
    DropdownOpenDirective,
    PostComponent,
    CommentComponent,
    UserCardComponent,
    UserCardNewComponent,
    UtcDatePipe,
    Modal,
    RouteModal,
    ModalContent,
    EventCardComponent,
    SearchChannelCardComponent,
    CommunityCardComponent,
    ReadMoreComponent,
    PortfolioMediaComponent,
    ReportPopoupComponent,
    PortfolioViewMediaComponent,
    OpportunityApplicationCardComponent,
    OpporunitySearchCardComponent,
    EventSearchCardComponent,
    UserCardSearchComponent,
    ConfirmBoxComponent,
    WikiProfileCardComponent,
    TermsAndConditionsContentComponent,
    WidgetCollaboratorsComponent,
    CollaboratorCardComponent,
    AppearDirective,
    PeopleToFollowComponent
  ]
})
export class SharedModule { }
