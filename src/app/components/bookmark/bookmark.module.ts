import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BookmarkComponent } from './bookmark.component';

const routes: Routes = [
  { path: '', component: BookmarkComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BookmarkComponent
  ]
})
export class BookmarkModule { }
