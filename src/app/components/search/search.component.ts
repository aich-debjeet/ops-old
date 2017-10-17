import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  previousUrl: string;
  activeTab = 'tab-all';
  showSearchPlaceholder = true;

  constructor(router: Router) {

    router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe(e => {
      this.previousUrl = e['url'];
      // console.log('prev:', this.previousUrl);
    });

    // router.navigate(['search/people']);

  }

  ngOnInit() {
  }

  searchAction(searchQuery:  string) {
    console.log('searchQuery', searchQuery);
  }

  /**
   * Search input on focus
   */
  searchOnFocus() {
    this.showSearchPlaceholder = false;
  }

  /**
   * Search input on blur
   */
  searchOnBlur() {
    this.showSearchPlaceholder = true;
  }

  /**
   * Select tab
   * @param tab id: string
   */
  selectTab(tabId: string) {
    this.activeTab = tabId;
  }

}
