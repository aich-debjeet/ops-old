import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
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
    PostCardComponent
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
    ModalComponent
  ]

})
export class SharedModule { }
