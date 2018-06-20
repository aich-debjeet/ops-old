import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// modules
import { SharedModule } from '../../shared/shared.module';
import { NgxMasonryModule } from 'ngx-masonry';

// components
import { PortfolioComponent } from './portfolio.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'u'
}, {
  path: 'u',
  component: PortfolioComponent
}, {
  path: 'u/:username',
  component: PortfolioComponent
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxMasonryModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PortfolioComponent]
})
export class PortfolioModule { }
