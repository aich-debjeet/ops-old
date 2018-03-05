import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruncatePipe } from './truncate.pipe';
import { SearchUniquePipe } from './uniquesearch.pipe';
import { StringReplacePipe } from './string-replace.pipe';
import { ChannelFilterPipe } from './channel-filter.pipe';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    TruncatePipe,
    SearchUniquePipe,
    StringReplacePipe,
    ChannelFilterPipe
  ],
  exports: [
    TruncatePipe,
    SearchUniquePipe,
    StringReplacePipe,
    ChannelFilterPipe
  ]
})

export class SharedPipesModule { }
