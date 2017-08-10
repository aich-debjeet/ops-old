import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthRightBlockComponent } from './auth-right-block/auth-right-block.component';
import { AppButtonComponent } from './button/button.component';
import { QuickAccessComponent } from './quick-access/quick-access.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ChannelComponent } from './channel/channel.component';
import { SpotfeedCardComponent } from './spotfeed-card/spotfeed-card.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ 
    AuthRightBlockComponent, 
    AppButtonComponent,
    QuickAccessComponent,
    NavigationComponent,
    ChannelComponent,
    SpotfeedCardComponent
  ],
  exports: [
     AuthRightBlockComponent, 
     AppButtonComponent,
     QuickAccessComponent,
     NavigationComponent,
     ChannelComponent,
     SpotfeedCardComponent
  ]

})
export class SharedModule { }
