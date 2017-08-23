import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { CountrySelectorComponent } from './country-selector/country-selector.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
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
    CountrySelectorComponent
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
    CountrySelectorComponent
  ]

})
export class SharedModule { }
