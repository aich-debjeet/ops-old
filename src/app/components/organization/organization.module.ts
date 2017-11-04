import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationRegComponent } from './organization-reg/organization-reg.component';

const routes: Routes = [
  {
    path: 'registration',
    component: OrganizationRegComponent
    // children: childRoutes,
  },
  // {
  //   path: 'u/:id',
  //   component: ProfileComponent,
  //   children: childRoutes,
  // }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [OrganizationRegComponent]
})
export class OrganizationModule { }
