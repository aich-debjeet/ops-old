import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruncatePipe } from './truncate.pipe';
import { SearchUniquePipe } from './uniquesearch.pipe';
import { SearchFilterPipe } from './search.pipe';
import { ChannelFilterPipe } from './channel-filter.pipe';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ TruncatePipe, SearchUniquePipe, SearchFilterPipe, ChannelFilterPipe ],
  exports:      [ TruncatePipe, SearchUniquePipe, SearchFilterPipe, ChannelFilterPipe ]
})

export class SharedPipesModule { }
