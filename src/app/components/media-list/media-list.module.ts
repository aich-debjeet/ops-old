import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MediaListComponent } from './media-list.component';
import { RecentListComponent } from './recent-list/recent-list.component';
import { PopularListComponent } from './popular-list/popular-list.component';
import { SharedModule } from '../../shared/shared.module';
import { MasonryModule } from 'angular2-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes: Routes = [
    { path: '',
      component:  MediaListComponent,
      children: [
        { path: '', component: RecentListComponent },
        { path: 'recent', component: RecentListComponent },
        { path: 'popular', component: PopularListComponent }
      ]
    },
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MasonryModule,
    InfiniteScrollModule
  ],
  declarations: [
    MediaListComponent,
    RecentListComponent,
    PopularListComponent
  ]
})
export class MediaListModule { }
