import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './directory.component';
import { RouterModule, Routes } from '@angular/router';
import { DirectoryListComponent } from './directory-list/directory-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SharedModule } from '../../shared/shared.module';
import { DirectoryProfileComponent } from './directory-profile/directory-profile.component';
import { SharedPipesModule } from '../../pipes/shared-pipes.module';

const routes: Routes = [
  {
    path: '',
    component: DirectoryComponent,
    children: [
      { path: '', redirectTo: 'home' },
      { path: 'home', component: DirectoryListComponent },
      { path: 'profile/:id', component: DirectoryProfileComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    LazyLoadImageModule,
    SharedPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DirectoryComponent,
    DirectoryListComponent,
    DirectoryProfileComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DirectoryModule { }