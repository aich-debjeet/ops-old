import {Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnDestroy, OnInit} from '@angular/core';
import {NavigationExtras} from '@angular/router/src/router';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-route-modal',
    styleUrls: ['./modal.component.scss'],
    template: `
        <div class="modal route-modal"
            tabindex="-1"
            role="dialog"
            #modalRoot
            (keydown.esc)="closeOnEscape ? close() : 0"
            [ngClass]="{ in: isOpened, fade: isOpened }"
            [ngStyle]="{ display: isOpened ? 'block' : 'none' }"
            (click)="closeOnOutsideClick ? close() : 0">
            <div [class]="'modal-block ' + modalClass" (click)="preventClosing($event)">
                <div class="body" tabindex="0" *ngIf="isOpened">
                    <div class="modal-body">
                        <ng-content select="modal-content"></ng-content>
                    </div>
                </div>
            </div>
        </div>
        `
})
export class RouteModal implements OnInit, OnDestroy {

    // -------------------------------------------------------------------------
    // Inputs
    // -------------------------------------------------------------------------
    @Input()
    public cancelUrl: any[];

    @Input()
    public cancelUrlExtras: { relative: boolean } & NavigationExtras;

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
    // Private properties
    // -------------------------------------------------------------------------
    @ViewChild("modalRoot")
    public modalRoot: ElementRef;

    public isOpened = false;

    private backdropElement: HTMLElement;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor(private router: Router,
                private activatedRoute: ActivatedRoute) {
        this.createBackDrop();
    }

    // -------------------------------------------------------------------------
    // Lifecycle Methods
    // -------------------------------------------------------------------------
    ngOnInit() {
        this.open();
    }

    ngOnDestroy() {
        document.body.className = document.body.className.replace(/modal-open\b/, "");
        if (this.backdropElement && this.backdropElement.parentNode === document.body)
            document.body.removeChild(this.backdropElement);
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    open(...args: any[]) {
        if (this.isOpened)
            return;
        
        this.isOpened = true;
        this.onOpen.emit(args);
        document.body.appendChild(this.backdropElement);
        window.setTimeout(() => this.modalRoot.nativeElement.focus(), 0);
        document.body.className += " modal-open";
    }

    close(...args: any[]) {
        if (!this.isOpened)
            return;

        this.isOpened = false;
        this.onClose.emit(args);
        document.body.className = document.body.className.replace(/modal-open\b/, "");
        if (this.cancelUrl) {
            let navigationExtras: NavigationExtras = { };
            if (this.cancelUrlExtras) {
                if (this.cancelUrlExtras.relative) {
                    navigationExtras.relativeTo = this.activatedRoute;
                }
                navigationExtras = (Object as any).assign(navigationExtras, this.cancelUrlExtras);
            }
            this.router.navigate(this.cancelUrl, navigationExtras);

        } else {
            window.history.back();
        }
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    public preventClosing(event: MouseEvent) {
        event.stopPropagation();
    }

    private createBackDrop() {
        this.backdropElement = document.createElement("div");
        this.backdropElement.classList.add("fade");
        this.backdropElement.classList.add("in");
        if (this.backdrop) {
            this.backdropElement.classList.add("modal-backdrop");
        }
    }

}