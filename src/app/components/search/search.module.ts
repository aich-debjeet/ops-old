import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchSpotfeedComponent } from './search-spotfeed/search-spotfeed.component';
import { SearchPostComponent } from './search-post/search-post.component';
import { SearchPeopleComponent } from './search-people/search-people.component';
import { SearchChannelComponent } from './search-channel/search-channel.component';
import { SearchCommunityComponent } from './search-community/search-community.component';

import { SearchRoutes as routes } from './search.routes';
import { SearchComponent } from './search.component';

import { SharedPipesModule } from './../../pipes/shared-pipes.module';
import { SharedModule } from './../../shared/shared.module';
import { MasonryModule } from 'angular2-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedPipesModule,
    SharedModule,
    MasonryModule,
    InfiniteScrollModule
  ],
  declarations: [
    SearchComponent,
    SearchSpotfeedComponent,
    SearchPostComponent,
    SearchPeopleComponent,
    SearchChannelComponent,
    SearchCommunityComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchModule { }
