import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',
    component:  ExploreComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExploreComponent]
})
export class ExploreModule { }
