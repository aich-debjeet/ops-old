import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SharedPipesModule } from '../../pipes/shared-pipes.module';

const routes: Routes = [
  { path: '',
    component:  ExploreComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExploreComponent]
})
export class ExploreModule { }
