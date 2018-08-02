import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchSpotfeedComponent } from './search-spotfeed/search-spotfeed.component';
import { SearchPostComponent } from './search-post/search-post.component';
import { SearchPeopleComponent } from './search-people/search-people.component';
import { SearchChannelComponent } from './search-channel/search-channel.component';
import { SearchOpportunityComponent } from './search-opportunity/search-opportunity.component';
import { SearchEventComponent } from './search-event/search-event.component';

import { SearchRoutes as routes } from './search.routes';
import { SearchComponent } from './search.component';

import { SharedPipesModule } from './../../pipes/shared-pipes.module';
import { SharedModule } from './../../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule } from 'ngx-masonry';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedPipesModule,
    SharedModule,
    InfiniteScrollModule,
    NgxMasonryModule
  ],
  declarations: [
    SearchComponent,
    SearchSpotfeedComponent,
    SearchPostComponent,
    SearchPeopleComponent,
    SearchChannelComponent,
    SearchOpportunityComponent,
    SearchEventComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchModule { }
