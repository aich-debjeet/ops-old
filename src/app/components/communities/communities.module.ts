import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule, Routes } from '@angular/router';
import { CommunitiesComponent } from './communities.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxfUploaderModule } from 'ngxf-uploader';
import { CommunitiesInnerComponent } from './communities-inner/communities-inner.component';
import { SharedPipesModule } from './../../pipes/shared-pipes.module';


const routes: Routes = [
  {
    path: '',
    component: CommunitiesComponent,
  }, {
    path: ':communitiesId',
    component: CommunitiesInnerComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NgxfUploaderModule.forRoot(),
    InfiniteScrollModule ,
    SharedPipesModule
  ],
  declarations: [
    CommunitiesComponent,
    CommunitiesInnerComponent,
  ]
})
export class CommunitiesModule { }
