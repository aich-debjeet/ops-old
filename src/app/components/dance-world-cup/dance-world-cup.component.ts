import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EventModal, initialTag  } from '../../models/event.model';
import { Store } from '@ngrx/store';
import { EventActions } from 'app/actions/event.action';
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dance-world-cup',
  templateUrl: './dance-world-cup.component.html',
  styleUrls: ['./dance-world-cup.component.scss']
})
export class DanceWorldCupComponent implements OnInit, AfterViewInit {

  navItem = '';
  activeTab = 'tab-1';
  contactForm: FormGroup;
  contactFormState$: any;
  contactFormState: any;
  formSubmitted = false;
  // window: Window;
  dwcSlider: NgxCarousel;

  constructor(
    private elRef: ElementRef,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private store: Store<EventModal>,
  ) {

    this.createContactForm();


    this.contactFormState$ = this.store.select('eventTags');
    this.contactFormState$.subscribe(state => {
      this.contactFormState = state;

      // check if form is submitted
      if (this.formSubmitted && this.contactFormState && this.contactFormState.dwc_contact_form_upload_success === true) {
        // console.log();
        this.toastr.success('Your details has been submitted successfully');
        this.resetContactForm();
      }
    });
  }

  ngOnInit() {
    this.dwcSlider = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 4000,
      interval: 4000,
      custom: 'banner',
      point: {
        visible: false,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: white;
              width: 10px;
          }
        `
      },
      load: 1,
      loop: true,
      touch: true
    }

  }

  navigateTo(id: string) {
    this.navItem = id;
  }

  tabChange(tabId: string) {
    this.activeTab = tabId;
  }


  submitContactForm(value: any) {
    // console.log(value);
    if (this.contactForm.valid) {

      this.formSubmitted = true;

      // console.log('submit valid form');
      const reqBody = {
        contactName: value.name,
        contactPhone: '',
        contactEmail: value.email,
        contactSubject: value.message
      };
      this.store.dispatch({ type: EventActions.DWC_CONTACT_FORM, payload: reqBody });
    }
    // else {
    //   console.log('invalid form');
    // }
  }

  /**
   * Reset form
   */
  resetContactForm() {
    // this.contactForm.controls['name'].setValue('');
    // this.contactForm.controls['email'].setValue('');
    // this.contactForm.controls['message'].setValue('');
    // Empty initiate form
    this.contactForm = this.fb.group({
      name: [null],
      email: [null],
      message: [null]
    })
  }

  /**
   * Submit contact form
   */
  createContactForm() {
    // Empty initiate form
    this.contactForm = this.fb.group({
      name: [null, Validators.required ],
      email: [null, Validators.required ],
      message: [null]
    })
  }

  ngAfterViewInit() {
    // this.elRef.nativeElement.querySelector('a.btn-fb-share').addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    // const shareUrl = 'http://aurut.com';
    // console.log('called');
    // const windowObj = window.open();
    // let popUp;
    // if (shareUrl) {
    //   /** Open share dialog */
    //   popUp = window.open(shareUrl, 'newwindow', '800x800');
    // }
  }

  /* This will be triggered after carousel viewed */
  afterCarouselViewedFn(data) {
    // console.log(data);
  }

  /* It will be triggered on every slide*/
  onmoveFn(data: NgxCarouselStore) {
    // console.log(data);
  }

}
