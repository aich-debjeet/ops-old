import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private router: Router,private route: ActivatedRoute ) { }

  ngOnInit() {
  }

  submitData(value){
    console.log(value);
    this.router.navigate(['account/send_password_reset']);
  }

}
