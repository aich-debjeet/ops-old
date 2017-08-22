import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SearchAllComponent } from './search-all/search-all.component';
import { SearchSpotfeedComponent } from './search-spotfeed/search-spotfeed.component';
import { SearchPostComponent } from './search-post/search-post.component';
import { SearchPeopleComponent } from './search-people/search-people.component';
import { SearchChannelComponent } from './search-channel/search-channel.component';
import { SearchIconComponent } from './search-icon.component'

import { SearchIconRoutes as routes } from './search-icon.routes';
import { SearchCommunityComponent } from './search-community/search-community.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    SearchAllComponent,
    SearchSpotfeedComponent,
    SearchPostComponent,
    SearchPeopleComponent,
    SearchChannelComponent,
    SearchIconComponent,
    SearchCommunityComponent
  ]
})
export class SearchIconModule { }
