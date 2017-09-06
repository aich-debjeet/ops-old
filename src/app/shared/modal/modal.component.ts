import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { ModalService } from './modal.component.service';

@Component({
    selector: 'app-modal',
    styleUrls: ['./modal.component.scss'],
    template: `
      <div [ngClass]="('modal__' + size + ' ' + (!isOpen ? 'closed' : ''))">
        <div class="ng-modal-overlay" (click)="close(true)"></div>
        <div [ngClass]="size" class="ng-modal">
          <span class="right-align" title="close" (click)="close(true)"><i class="material-icons md-24 close-btn">X</i></span>
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
  @Input() size: string;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  isOpen = false;

  constructor(private modalService: ModalService) {
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    this.keyup(ev);
  }

  ngOnInit() {
    this.modalService.registerModal(this);
  }

  close(checkBlocking = false): void {
    this.modalService.close(this.modalId, checkBlocking);
    this.onClose.emit(false);
  }

  private keyup(event: KeyboardEvent): void {
    if (event.keyCode === 27) {
      this.modalService.close(this.modalId, true);
      this.onClose.emit(false);
    }
  }
}
