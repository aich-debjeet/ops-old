import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OpportunityComponent } from './opportunity.component';

import { OpportunityCreateComponent } from './opportunity-create/opportunity-create.component';

import { OpportunitySearchComponent } from './opportunity-search/opportunity-search.component';
import { OpportunitySearchRecommendedComponent } from './opportunity-search/opportunity-search-recommended/opportunity-search-recommended.component';
import { OpportunitySearchAppliedComponent } from './opportunity-search/opportunity-search-applied/opportunity-search-applied.component';
import { OpportunitySearchCreatedComponent } from './opportunity-search/opportunity-search-created/opportunity-search-created.component';

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
    RouterModule.forChild(opportunityRoutes)
  ],
  declarations: [
    OpportunityComponent,
    OpportunityCreateComponent,
    OpportunitySearchComponent,
    OpportunitySearchRecommendedComponent,
    OpportunitySearchAppliedComponent,
    OpportunitySearchCreatedComponent
  ]
})
export class OpportunityModule { }
