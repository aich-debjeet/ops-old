import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { AuthRightBlockComponent } from './auth-right-block/auth-right-block.component';
import { AppButtonComponent } from './button/button.component';
import { QuickAccessComponent } from './quick-access/quick-access.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ChannelComponent } from './channel/channel.component';
import { SpotfeedCardComponent } from './spotfeed-card/spotfeed-card.component';
import { FooterComponent } from './footer/footer.component';
import { PostCardComponent } from './post-card/post-card.component';
import { ModalComponent } from './modal/modal.component';

// Media
import { NgvPlayerComponent } from './ngv-player/ngv-player.component';
import { MediaSelectorComponent } from './media-selector/media-selector.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Uploader
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgxfUploaderModule } from 'ngxf-uploader';
import { MediaComponent } from './media/media.component';
import { TAB_COMPONENTS } from './tabs/tabset';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

import { VideplayerComponent } from './videplayer/videplayer.component';
import { BlogeditorComponent } from './blogeditor/blogeditor.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgxfUploaderModule.forRoot(),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [
    ModalComponent,
    AuthRightBlockComponent,
    AppButtonComponent,
    QuickAccessComponent,
    NavigationComponent,
    ChannelComponent,
    SpotfeedCardComponent,
    FooterComponent,
    PostCardComponent,
    NgvPlayerComponent,
    MediaSelectorComponent,
    VideplayerComponent,
    MediaComponent,
    TAB_COMPONENTS,
    BlogeditorComponent
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
    NgvPlayerComponent,
    MediaSelectorComponent,
    VideplayerComponent,
    MediaComponent,
    TAB_COMPONENTS,
    BlogeditorComponent
  ]

})
export class SharedModule { }
