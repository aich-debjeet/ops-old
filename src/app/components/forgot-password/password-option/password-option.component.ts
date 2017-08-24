import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-option',
  templateUrl: './password-option.component.html',
  styleUrls: ['./password-option.component.scss']
})
export class PasswordOptionComponent implements OnInit {
  resetForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.resetForm = fb.group({
      'typePassword': ['mail', Validators.required],
    })

  }

  ngOnInit() {

  }

  submitForm(value) {
    console.log(value);
    if(value.typePassword == "mail"){
      this.router.navigate(['account/reset_mail_send']);
    }else{
      this.router.navigate(['account/confirm_pin_rest']);
    }

  }

}
