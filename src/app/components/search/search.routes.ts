import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchAllComponent } from './search-all/search-all.component';
import { SearchSpotfeedComponent } from './search-spotfeed/search-spotfeed.component';
import { SearchPostComponent } from './search-post/search-post.component';
import { SearchPeopleComponent } from './search-people/search-people.component';
import { SearchChannelComponent } from './search-channel/search-channel.component';
import { SearchComponent } from './search.component'
import { SearchCommunityComponent } from './search-community/search-community.component';

export const SearchRoutes = [
 {
    path: 'search',
    component: SearchComponent,
    children: [
      { path: 'all', component: SearchAllComponent },
      { path: 'channel', component: SearchChannelComponent },
      { path: 'community', component: SearchCommunityComponent },
      { path: 'people', component: SearchPeopleComponent },
      { path: 'post', component: SearchPostComponent },
      { path: 'spotfeed', component: SearchSpotfeedComponent }
    ]
 }
]
