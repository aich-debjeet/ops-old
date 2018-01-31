import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { SharedPipesModule } from '../../pipes/shared-pipes.module'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

// Guard
import { AuthGuard } from './../../guard/auth.guard';
import { HomePostComponent } from './home-post/home-post.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'channel'},
      { path: 'spotfeed', component: HomeSpotfeedComponent},
      { path: 'channel', component: HomeChannelComponent},
      { path: 'post', component: HomePostComponent}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MasonryModule,
    SharedPipesModule,
    InfiniteScrollModule,
    NgxCarouselModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    HomeChannelComponent,
    HomeSpotfeedComponent,
    HomeRightBlockComponent,
    HomePostComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class HomeModule { }
