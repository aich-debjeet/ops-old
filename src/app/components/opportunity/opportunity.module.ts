import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OpportunityComponent } from './opportunity.component';
import { OpportunityCreateComponent } from './opportunity-create/opportunity-create.component';
import { OpportunitySearchComponent } from './opportunity-search/opportunity-search.component';
import { OpportunitySearchRecommendedComponent } from './opportunity-search/opportunity-search-recommended/opportunity-search-recommended.component';
import { OpportunitySearchAppliedComponent } from './opportunity-search/opportunity-search-applied/opportunity-search-applied.component';
import { OpportunitySearchCreatedComponent } from './opportunity-search/opportunity-search-created/opportunity-search-created.component';

// shared module
import { SharedModule } from '../../shared/shared.module';
import { MasonryModule } from 'angular2-masonry';

// opportunity module routes
const opportunityRoutes: Routes = [
  {
    path: '',
    component: OpportunityComponent,
    children: [
      {
        path: 'search',
        component: OpportunitySearchComponent,
        children: [
          { path: 'recommended', component: OpportunitySearchRecommendedComponent },
          { path: 'applied', component: OpportunitySearchAppliedComponent },
          { path: 'created', component: OpportunitySearchCreatedComponent }
        ]
      },
      { path: 'create', component: OpportunityCreateComponent }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MasonryModule,
    RouterModule.forChild(opportunityRoutes)
  ],
  declarations: [
    OpportunityComponent,
    OpportunityCreateComponent,
    OpportunitySearchComponent,
    OpportunitySearchRecommendedComponent,
    OpportunitySearchAppliedComponent,
    OpportunitySearchCreatedComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OpportunityModule { }
