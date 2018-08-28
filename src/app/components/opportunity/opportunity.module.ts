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
import { OpportunityProjectComponent } from './forms/opportunity-project/opportunity-project.component';
import { OpportunityJobComponent } from './forms/opportunity-job/opportunity-job.component';
import { OpportunityInternshipComponent } from './forms/opportunity-internship/opportunity-internship.component';
import { OpportunityFreelanceComponent } from './forms/opportunity-freelance/opportunity-freelance.component';
import { OpportunityVolunteerComponent } from './forms/opportunity-volunteer/opportunity-volunteer.component';
import { OpportunityApplicationsComponent } from './opportunity-applications/opportunity-applications.component';
import { QuillModule } from 'ngx-quill';
import { OpportunitySimilarCardComponent } from './opportunity-similar-card/opportunity-similar-card.component';

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
      { path: 'edit/:id', component: OpportunityEditComponent, pathMatch: 'full' },
      { path: 'applications/:id', component: OpportunityApplicationsComponent, pathMatch: 'full' }
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
    RouterModule.forChild(opportunityRoutes),
    QuillModule
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
    OpportunityAuditionComponent,
    OpportunityProjectComponent,
    OpportunityJobComponent,
    OpportunityInternshipComponent,
    OpportunityFreelanceComponent,
    OpportunityVolunteerComponent,
    OpportunityApplicationsComponent,
    OpportunitySimilarCardComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OpportunityModule { }
