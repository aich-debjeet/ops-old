import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.component.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  providers: [ ModalService ],
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  showMenu: boolean;
  constructor(
    public modalService: ModalService,
  ) { }

  /**
   * Add Media
   */
  addMedia() {
    this.modalService.open('AddMedia');
  }
  /**
   * Show/Hide Menu
   */
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  ngOnInit() {
  }

}
