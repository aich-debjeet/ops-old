import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './directory.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DirectoryComponent,
    children: [
      { path: '', redirectTo: 'listing' },
      { path: 'listing', component: DirectoryComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DirectoryComponent]
})
export class DirectoryModule { }
