import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EventModal, initialTag  } from '../../models/event.model';
import { Store } from '@ngrx/store';
import { EventActions } from 'app/actions/event.action';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dance-world-cup',
  templateUrl: './dance-world-cup.component.html',
  styleUrls: ['./dance-world-cup.component.scss']
})
export class DanceWorldCupComponent implements OnInit, AfterViewInit {

  navItem = '';
  activeTab = 'tab-3';
  contactForm: FormGroup;
  contactFormState$: any;
  contactFormState: any;
  formSubmitted = false;
  // window: Window;

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
      console.log(this.contactFormState);

      // check if form is submitted
      if (this.formSubmitted && this.contactFormState && this.contactFormState.dwc_contact_form_upload_success === true) {
        // console.log();
        this.toastr.success('Your details has been submitted successfully');
        this.resetContactForm();
      }
    });
  }

  ngOnInit() {
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

}
