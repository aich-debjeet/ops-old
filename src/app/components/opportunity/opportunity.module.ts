import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OpportunitySearchComponent } from './opportunity-search/opportunity-search.component';
import { OpportunityCreateComponent } from './opportunity-create/opportunity-create.component';
import { OpportunityComponent } from './opportunity.component';

// opportunity module routes
const opportunityRoutes: Routes = [
  {
    path: '',
    component: OpportunityComponent,
    // redirectTo: 'search',
    children: [
      { path: 'search', component: OpportunitySearchComponent },
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
    OpportunitySearchComponent,
    OpportunityCreateComponent,
    OpportunityComponent
  ]
})
export class OpportunityModule { }
