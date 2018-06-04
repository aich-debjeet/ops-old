import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { SearchSpotfeedComponent } from './search-spotfeed/search-spotfeed.component';
// import { SearchPostComponent } from './search-post/search-post.component';
// import { SearchPeopleComponent } from './search-people/search-people.component';
// import { SearchChannelComponent } from './search-channel/search-channel.component';
// import { SearchCommunityComponent } from './search-community/search-community.component';

import { SearchComponent } from './search.component';

// Guard
import { AuthGuard } from './../../guard/auth.guard';

export const SearchRoutes = [
 {
    path: '',
    canActivate: [AuthGuard],
    component: SearchComponent,
    // children: [
    //   { path: 'channel', component: SearchChannelComponent },
    //   { path: 'community', component: SearchCommunityComponent },
    //   { path: 'people', component: SearchPeopleComponent },
    //   { path: 'post', component: SearchPostComponent },
    //   { path: 'spotfeed', component: SearchSpotfeedComponent }
    // ]
 }
]
