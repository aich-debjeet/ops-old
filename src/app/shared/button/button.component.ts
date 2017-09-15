import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  handleClick(event: any) {
    this.onClick.emit(event);
  }
};
