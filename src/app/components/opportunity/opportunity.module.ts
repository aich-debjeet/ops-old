import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TextMaskModule } from 'angular2-text-mask';
import { DpDatePickerModule } from 'ng2-date-picker';

import { OpportunityComponent } from './opportunity.component';
import { OpportunityViewComponent } from './opportunity-view/opportunity-view.component';
import { OpportunityCreateComponent } from './opportunity-create/opportunity-create.component';
import { OpportunitySearchComponent } from './opportunity-search/opportunity-search.component';
import { OpportunitySearchRecommendedComponent } from './opportunity-search/opportunity-search-recommended/opportunity-search-recommended.component';
import { OpportunitySearchAppliedComponent } from './opportunity-search/opportunity-search-applied/opportunity-search-applied.component';
import { OpportunitySearchCreatedComponent } from './opportunity-search/opportunity-search-created/opportunity-search-created.component';

// shared module
import { SharedModule } from '../../shared/shared.module';
import { NgxMasonryModule } from 'ngx-masonry';

import { SharedPipesModule } from './../../pipes/shared-pipes.module';
import { OpportunityEditComponent } from './opportunity-edit/opportunity-edit.component';
import { OpportunityAuditionComponent } from './forms/opportunity-audition/opportunity-audition.component';

// opportunity module routes
const opportunityRoutes: Routes = [
  {
    path: '',
    component: OpportunityComponent,
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      {
        path: 'search',
        component: OpportunitySearchComponent,
        children: [
          // { path: '', redirectTo: 'recommended', pathMatch: 'full' },
          { path: 'recommended', component: OpportunitySearchRecommendedComponent },
          { path: 'applied', component: OpportunitySearchAppliedComponent },
          { path: 'created', component: OpportunitySearchCreatedComponent }
        ]
      },
      { path: 'create', component: OpportunityCreateComponent },
      { path: 'view/:id', component: OpportunityViewComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: OpportunityEditComponent, pathMatch: 'full' }
    ]
  }
]

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    TextMaskModule,
    DpDatePickerModule,
    NgxMasonryModule,
    SharedPipesModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    RouterModule.forChild(opportunityRoutes)
  ],
  declarations: [
    OpportunityComponent,
    OpportunityCreateComponent,
    OpportunitySearchComponent,
    OpportunitySearchRecommendedComponent,
    OpportunitySearchAppliedComponent,
    OpportunitySearchCreatedComponent,
    OpportunityViewComponent,
    OpportunityEditComponent,
    OpportunityAuditionComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OpportunityModule { }
