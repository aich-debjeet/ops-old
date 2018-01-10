import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruncatePipe } from './truncate.pipe';
import { SearchUniquePipe } from './uniquesearch.pipe';
import { ChannelFilterPipe } from './channel-filter.pipe';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ TruncatePipe, SearchUniquePipe, ChannelFilterPipe ],
  exports:      [ TruncatePipe, SearchUniquePipe, ChannelFilterPipe ]
})

export class SharedPipesModule { }
