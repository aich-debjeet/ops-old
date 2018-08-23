import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruncatePipe } from './truncate.pipe';
import { SearchUniquePipe } from './uniquesearch.pipe';
import { StringReplacePipe } from './string-replace.pipe';
import { FirstCharCapsPipe } from './first-char-caps.pipe';
import { ChannelFilterPipe } from './channel-filter.pipe';
import { NewLinePipe } from './new-line.pipe';
import { SafeHtmlPipe } from './safehtml.pipe';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    TruncatePipe,
    SearchUniquePipe,
    StringReplacePipe,
    FirstCharCapsPipe,
    ChannelFilterPipe,
    NewLinePipe,
    SafeHtmlPipe
  ],
  exports: [
    TruncatePipe,
    SearchUniquePipe,
    StringReplacePipe,
    FirstCharCapsPipe,
    ChannelFilterPipe,
    NewLinePipe,
    SafeHtmlPipe
  ]
})

export class SharedPipesModule { }
