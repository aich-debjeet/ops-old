import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruncatePipe } from './truncate.pipe';
import { SearchUniquePipe } from './uniquesearch.pipe';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ TruncatePipe, SearchUniquePipe ],
  exports:      [ TruncatePipe, SearchUniquePipe ]
})

export class SharedPipesModule { }
