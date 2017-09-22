import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// SharedModule
import { SharedModule } from '../../shared/shared.module';
import { MasonryModule } from 'angular2-masonry';

// Component
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeChannelComponent } from './home-channel/home-channel.component';
import { HomeSpotfeedComponent } from './home-spotfeed/home-spotfeed.component';
import { HomeRightBlockComponent } from './home-right-block/home-right-block.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'spotfeed'},
      { path: 'spotfeed', component: HomeSpotfeedComponent},
      { path: 'channel', component: HomeChannelComponent}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MasonryModule,
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
