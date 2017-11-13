import {Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnDestroy } from '@angular/core';


@Component({
    selector: "modal-content",
    template: `<ng-content></ng-content>`
})
export class ModalContent {

}

// refer from https://www.npmjs.com/package/ngx-modal
@Component({
    selector: 'app-modal-new',
    styleUrls: ['./modal.component.scss'],
    template: `
        <div class="modal"
            tabindex="-1"
            role="dialog"
            #modalRoot
            (keydown.esc)="closeOnEscape ? close() : 0"
            [ngClass]="{ in: isOpened, fade: isOpened }"
            [ngStyle]="{ display: isOpened ? 'block' : 'none' }"
            (click)="closeOnOutsideClick ? close() : 0">
            <div [class]="'modal-block ' + modalClass" (click)="preventClosing($event)">
                <div class="body" tabindex="0" *ngIf="isOpened">
                    <div class="modal-cus-body">
                        <ng-content select="modal-content"></ng-content>
                    </div>
                </div>
            </div>
        </div>
        `
})
export class Modal implements OnDestroy {

    // -------------------------------------------------------------------------
    // Inputs
    // -------------------------------------------------------------------------
    @Input()
    public modalClass: string;

    @Input()
    public closeOnEscape: boolean = true;

    @Input()
    public closeOnOutsideClick: boolean = true;

    @Input()
    public title: string;

    @Input()
    public hideCloseButton = false;

    @Input()
    public cancelButtonLabel: string;

    @Input()
    public submitButtonLabel: string;

    @Input()
    public backdrop = true;

    // -------------------------------------------------------------------------
    // Outputs
    // -------------------------------------------------------------------------
    @Output()
    public onOpen = new EventEmitter(false);

    @Output()
    public onClose = new EventEmitter(false);

    @Output()
    public onSubmit = new EventEmitter(false);

    // -------------------------------------------------------------------------
    // Public properties
    // -------------------------------------------------------------------------
    public isOpened = false;

    // -------------------------------------------------------------------------
    // Private properties
    // -------------------------------------------------------------------------
    @ViewChild('modalRoot')
    public modalRoot: ElementRef;

    private backdropElement: HTMLElement;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor() {
        this.createBackDrop();
    }

    // -------------------------------------------------------------------------
    // Lifecycle Methods
    // -------------------------------------------------------------------------
    ngOnDestroy() {
        document.body.className = document.body.className.replace(/modal-open\b/, '');
        if (this.backdropElement && this.backdropElement.parentNode === document.body) {
            document.body.removeChild(this.backdropElement);
        }
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    open(...args: any[]) {
        if (this.isOpened) {
            return;
        }
        this.isOpened = true;
        this.onOpen.emit(args);
        document.body.appendChild(this.backdropElement);
        window.setTimeout(() => this.modalRoot.nativeElement.focus(), 0);
        document.body.className += 'modal-open';
    }

    close(...args: any[]) {
        if (!this.isOpened) {
            return;
        }

        this.isOpened = false;
        this.onClose.emit(args);
        document.body.removeChild(this.backdropElement);
        document.body.className = document.body.className.replace(/modal-open\b/, '');
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    public preventClosing(event: MouseEvent) {
        event.stopPropagation();
    }

    private createBackDrop() {
        this.backdropElement = document.createElement('div');
        this.backdropElement.classList.add('fade');
        this.backdropElement.classList.add('in');
        if (this.backdrop) {
            this.backdropElement.classList.add('modal-backdrop');
        }
    }

}
