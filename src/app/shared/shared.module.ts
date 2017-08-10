import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthRightBlockComponent } from './auth-right-block/auth-right-block.component';
import { AppButtonComponent } from './button/button.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ 
    AuthRightBlockComponent, AppButtonComponent 
  ],
  exports: [
     AuthRightBlockComponent, 
     AppButtonComponent
  ]

})
export class SharedModule { }
