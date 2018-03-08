import { Component, OnInit } from '@angular/core';
import { Modal } from '../modal-new/Modal';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  imageBaseUrl: string = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
