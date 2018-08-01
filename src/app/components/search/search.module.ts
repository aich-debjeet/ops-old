import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchSpotfeedComponent } from './search-spotfeed/search-spotfeed.component';
import { SearchPostComponent } from './search-post/search-post.component';
import { SearchPeopleComponent } from './search-people/search-people.component';
import { SearchChannelComponent } from './search-channel/search-channel.component';

import { SearchRoutes as routes } from './search.routes';
import { SearchComponent } from './search.component';

import { SharedPipesModule } from './../../pipes/shared-pipes.module';
import { SharedModule } from './../../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule } from 'ngx-masonry';
import { SearchOpportunityComponent } from './search-opportunity/search-opportunity.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedPipesModule,
    SharedModule,
    InfiniteScrollModule,
    // TagInputModule,
    // BrowserAnimationsModule,
    NgxMasonryModule
  ],
  declarations: [
    SearchComponent,
    SearchSpotfeedComponent,
    SearchPostComponent,
    SearchPeopleComponent,
    SearchChannelComponent,
    SearchOpportunityComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchModule { }
