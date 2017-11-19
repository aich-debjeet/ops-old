import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OpportunityComponent } from './opportunity.component';
import { OpportunityViewComponent } from './opportunity-view/opportunity-view.component';
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
      { path: 'create', component: OpportunityCreateComponent },
      { path: 'view', component: OpportunityViewComponent }
    ]
  }
]

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MasonryModule,
    ReactiveFormsModule,
    RouterModule.forChild(opportunityRoutes)
  ],
  declarations: [
    OpportunityComponent,
    OpportunityCreateComponent,
    OpportunitySearchComponent,
    OpportunitySearchRecommendedComponent,
    OpportunitySearchAppliedComponent,
    OpportunitySearchCreatedComponent,
    OpportunityViewComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OpportunityModule { }
