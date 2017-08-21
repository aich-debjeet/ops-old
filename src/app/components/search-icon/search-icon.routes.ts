import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchAllComponent } from './search-all/search-all.component';
import { SearchSpotfeedComponent } from './search-spotfeed/search-spotfeed.component';
import { SearchPostComponent } from './search-post/search-post.component';
import { SearchPeopleComponent } from './search-people/search-people.component';
import { SearchChannelComponent } from './search-channel/search-channel.component';
import { SearchIconComponent } from './search-icon.component'
import { SearchCommunityComponent } from './search-community/search-community.component';



// export const SearchIconRoutes = [
// { path: 'searchIcon',
//       //component: SearchIconComponent,
//       children: [
//         //{ path: '/search_all', component: SearchAllComponent },
//         { path: '', component: SearchIconComponent },
//         { path: '/search_channel', component: SearchChannelComponent },
//         { path: '/search_community', component: SearchCommunityComponent },
//         { path: '/search_people', component: SearchPeopleComponent },
//         { path: '/search_post', component: SearchPostComponent },
//         { path: '/search_spotfeed', component: SearchSpotfeedComponent },
// ]
// }
// ]

export const SearchIconRoutes = [
  { path: '', component: SearchIconComponent ,
  children: [
  { path: 'search_all', component: SearchAllComponent },
  { path: 'search_channel', component: SearchChannelComponent },
  { path: 'search_community', component: SearchCommunityComponent },
  { path: 'search_people', component: SearchPeopleComponent },
  { path: 'search_post', component: SearchPostComponent },
  { path: 'search_spotfeed', component: SearchSpotfeedComponent }
  ]
 }
]
