import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// SharedModule 
import { SharedModule } from '../../shared/shared.module';

// Component
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeChannelComponent } from './home-channel/home-channel.component';
import { HomeSpotfeedComponent } from './home-spotfeed/home-spotfeed.component';
import { HomeRightBlockComponent } from './home-right-block/home-right-block.component';

const routes: Routes= [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomeChannelComponent},
      { path: 'spotfeed', component: HomeSpotfeedComponent},
      { path: 'channel', component: HomeChannelComponent}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    HomeChannelComponent,
    HomeSpotfeedComponent,
    HomeRightBlockComponent,
  ]
  
})
export class HomeModule { }
