import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { ModalService } from './modal.component.service';

@Component({
    selector: 'app-modal',
    styleUrls: ['./modal.component.scss'],
    providers: [ ModalService ],
    template: `
      <div [ngClass]="('modal__' + size + ' ' + (!isOpen ? 'closed' : ''))">
        <div class="ng-modal-overlay" (click)="close(true)"></div>
        <div [ngClass]="size" class="ng-modal">
          <div class="body">
            <span *ngIf="closeHidden === false" class="right-align" title="close" (click)="close(true)">
              <img class="pointer" width="24" src="http://d33wubrfki0l68.cloudfront.net/e85a9c443cca11a2d6a6aca634490f2f2e6bdc55/44c4b/img/svg/ico_close-38.svg"/>
            </span>
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    `
})

export class ModalComponent implements OnInit {
  @Input() open: boolean;
  @Input() modalId: string;
  @Input() modalTitle: string;
  @Input() blocking = false;
  @Input() size: string;
  @Input() closeHidden = false;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  isOpen = false;

  constructor(private modalService: ModalService) {
    //
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    this.keyup(ev);
  }

  openMe() {
    if (this.open === true) {
      console.log('start as open');
      this.modalService.open(this.modalId);
    } else {
      console.log('start  as closed');
    }
  }

  ngOnInit() {
    this.modalService.registerModal(this);
    this.openMe();
  }

  close(checkBlocking = false): void {
    this.modalService.close(this.modalId, checkBlocking);
    this.onClose.emit(false);
  }

  private keyup(event: KeyboardEvent): void {
    if (event.keyCode === 27) {
      if (this.open === true) {
        this.onClose.emit(false);
      } else {
        this.modalService.close(this.modalId, true);
        this.onClose.emit(false);
      }
    }
  }
}
