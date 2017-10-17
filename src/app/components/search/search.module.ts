import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchAllComponent } from './search-all/search-all.component';
import { SearchSpotfeedComponent } from './search-spotfeed/search-spotfeed.component';
import { SearchPostComponent } from './search-post/search-post.component';
import { SearchPeopleComponent } from './search-people/search-people.component';
import { SearchChannelComponent } from './search-channel/search-channel.component';
import { SearchCommunityComponent } from './search-community/search-community.component';

import { SearchRoutes as routes } from './search.routes';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    SearchComponent,
    SearchAllComponent,
    SearchSpotfeedComponent,
    SearchPostComponent,
    SearchPeopleComponent,
    SearchChannelComponent,
    SearchCommunityComponent
  ]
})
export class SearchModule { }
