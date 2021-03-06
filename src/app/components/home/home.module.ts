import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeChannelComponent } from './home-channel/home-channel.component';
import { HomeSpotfeedComponent } from './home-spotfeed/home-spotfeed.component';
import { HomeRightBlockComponent } from './home-right-block/home-right-block.component';
import { SharedPipesModule } from '../../pipes/shared-pipes.module'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NguCarouselModule } from '@ngu/carousel';
import { HomePostComponent } from './home-post/home-post.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'post' },
      // { path: 'channel', component: HomeChannelComponent},
      { path: 'post', component: HomePostComponent }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxMasonryModule,
    SharedPipesModule,
    InfiniteScrollModule,
    NguCarouselModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    HomeChannelComponent,
    HomeSpotfeedComponent,
    HomeRightBlockComponent,
    HomePostComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeModule { }
