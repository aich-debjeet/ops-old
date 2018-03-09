import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruncatePipe } from './truncate.pipe';
import { SearchUniquePipe } from './uniquesearch.pipe';
import { StringReplacePipe } from './string-replace.pipe';
import { FirstCharCapsPipe } from './first-char-caps.pipe';
import { ChannelFilterPipe } from './channel-filter.pipe';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    TruncatePipe,
    SearchUniquePipe,
    StringReplacePipe,
    FirstCharCapsPipe,
    ChannelFilterPipe
  ],
  exports: [
    TruncatePipe,
    SearchUniquePipe,
    StringReplacePipe,
    FirstCharCapsPipe,
    ChannelFilterPipe
  ]
})

export class SharedPipesModule { }
