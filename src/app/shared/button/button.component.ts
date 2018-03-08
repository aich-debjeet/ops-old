import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class AppButtonComponent {
  @Input() className: string;
  @Input() type: string;
  @Input() follow: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  imageBaseLink: string = environment.API_IMAGE;

  handleClick(event: any) {
    this.onClick.emit(event);
  }
};
