import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunitySearchComponent } from './opportunity-search/opportunity-search.component';
import { OpportunityCreateComponent } from './opportunity-create/opportunity-create.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OpportunitySearchComponent, OpportunityCreateComponent]
})
export class OpportunityModule { }
