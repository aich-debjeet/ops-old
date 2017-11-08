import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { OrganizationService } from '../services/organization.service';

@NgModule({
  providers: [
    ProfileService,
    OrganizationService
  ],
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ServicesModule { }
