import { Component, OnInit, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  imageBaseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() { }
}
