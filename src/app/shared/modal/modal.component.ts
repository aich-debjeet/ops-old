import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ModalService } from './modal.component.service';

@Component({
    selector: 'app-modal',
    styleUrls: ['./modal.component.scss'],
    template: `
      <div [ngClass]="{'closed': !isOpen}">
        <div class="ng-modal-overlay" (click)="close(true)"></div>
        <div class="ng-modal">
          <div class="body">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    `
})

export class ModalComponent implements OnInit {
  @Input() modalId: string;
  @Input() modalTitle: string;
  @Input() blocking = false;
  isOpen = false;

  // @HostListener('keyup') onMouseEnter(event) {
  //   this.keyup(event);
  // }

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    this.modalService.registerModal(this);
  }

  close(checkBlocking = false): void {
    this.modalService.close(this.modalId, checkBlocking);
  }

  // private keyup(event: KeyboardEvent): void {
  //   if (event.keyCode === 27) {
  //     this.modalService.close(this.modalId, true);
  //   }
  // }
}
