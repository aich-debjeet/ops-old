import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SharedPipesModule } from '../../pipes/shared-pipes.module';
import { NguCarouselModule } from '@ngu/carousel';
import { ExplorePostsComponent } from './explore-posts/explore-posts.component';
import { ExploreChannelsComponent } from './explore-channels/explore-channels.component';
import { ExploreProfilesComponent } from './explore-profiles/explore-profiles.component';

const routes: Routes = [
  { path: '',
    component:  ExploreComponent,
    children: [
      { path: '', redirectTo: 'post' },
      { path: 'post', component: ExplorePostsComponent },
      { path: 'channel', component: ExploreChannelsComponent },
      { path: 'profile', component: ExploreProfilesComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedPipesModule,
    NguCarouselModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ExploreComponent,
    ExplorePostsComponent,
    ExploreChannelsComponent,
    ExploreProfilesComponent
  ]
})
export class ExploreModule { }
