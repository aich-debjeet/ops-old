import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// import { MediaModule } from '../components/media/media.module';

import { AuthRightBlockComponent } from './auth-right-block/auth-right-block.component';
import { AppButtonComponent } from './button/button.component';
import { QuickAccessComponent } from './quick-access/quick-access.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ChannelComponent } from './channel/channel.component';
import { SpotfeedCardComponent } from './spotfeed-card/spotfeed-card.component';
import { FooterComponent } from './footer/footer.component';
import { PostCardComponent } from './post-card/post-card.component';
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
import { MediaPopupComponent } from './media-popup/media-popup.component';
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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    SharedPipesModule
  ],
  declarations: [
    // TruncatePipe,
    UtcDatePipe,
    ModalComponent,
    AuthRightBlockComponent,
    AppButtonComponent,
    QuickAccessComponent,
    NavigationComponent,
    ChannelComponent,
    SpotfeedCardComponent,
    FooterComponent,
    PostCardComponent,
    CountrySelectorComponent,
    VideplayerComponent,
    AudioPlayerComponent,
    TabComponents,
    MediumEditorComponent,
    MediaPopupComponent,
    CreateChannelComponent,
    ComingSoonComponent,
    DropdownDirective,
    DropdownNotClosableZoneDirective,
    DropdownOpenDirective,
    PostComponent,
    CommentListComponent,
    CommentComponent,
    UserCardComponent
  ],
  exports: [
    AuthRightBlockComponent,
    AppButtonComponent,
    QuickAccessComponent,
    NavigationComponent,
    ChannelComponent,
    SpotfeedCardComponent,
    FooterComponent,
    PostCardComponent,
    ModalComponent,
    CountrySelectorComponent,
    VideplayerComponent,
    AudioPlayerComponent,
    TabComponents,
    MediaPopupComponent,
    ComingSoonComponent,
    DropdownDirective,
    DropdownNotClosableZoneDirective,
    DropdownOpenDirective,
    PostComponent,
    CommentComponent,
    UserCardComponent,
    UtcDatePipe,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class SharedModule { }
