import { Component, OnInit, AfterViewInit, Output, Input, ElementRef, EventEmitter, OnChanges } from '@angular/core';
import * as Choices from 'choices.js';
import { Observable } from 'rxjs/Observable';
import { parse, format, asYouType } from 'libphonenumber-js';

// countries
import { countries } from './countries';

import { find as _find } from 'lodash';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss']
})

export class CountrySelectorComponent implements OnInit, AfterViewInit, OnChanges {
  search: (term: string) => Observable<any[]>;
  @Output() onCountrySelection: EventEmitter<any> = new EventEmitter<any>();
  @Input() onNumberUpdate: string;
  @Input() countrySelForm: string;
  @Input('countryCode') set selectCountry(value) {
    this.selectedCountryId = value;
  };
  countries: any[];
  country: string;
  selectedCountry: any;
  selectedCountryId = '';
  fullNumber: string;
  countryIcon: string;
  localNumber: number;
  placeholder: string;
  private selector: any;

  onSelectCountry(event) {
    console.log(event)
    this.selectedCountryId = event.trim();
    // console.log('this.selectedCountryId', event);
    this.countryIcon = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/1x1/' + event.toLowerCase() + '.svg';
    const countryData = this.getCountry(event);
    console.log(countryData)
    this.onCountrySelection.emit(countryData);
  }

  /**
   * Get country details from the country id
   */
  getCountry(countryId: any) {
    return _find(this.countries, function(country: any) {
      return country.value === countryId;
    });
  }

  ngOnInit() {
    //
  }

  initCountrySelector(selectorId: string) {
    console.log(selectorId)
    if (selectorId === 'country-options-reg') {
      const el = 'country-options-reg';
      this.selector = new Choices(document.getElementById(el), {
        searchFields: ['label', 'value', 'customProperties.description'],
        choices: this.countries,
        callbackOnCreateTemplates: function(strToEl) {
          const classNames = this.config.classNames;
          const itemSelectText = this.config.itemSelectText;

          return {
            item: function(data) {
              return strToEl('\
                <div\
                  class="' + String(classNames.item) + ' ' + String(data.highlighted ? classNames.highlightedState : classNames.itemSelectable) + '"\
                  data-item\
                  data-id="' + String(data.id) + '"\
                  data-value="' + String(data.value) + '"\
                  ' + String(data.active ? 'aria-selected="true"' : '') + '\
                  ' + String(data.disabled ? 'aria-disabled="true"' : '') + '\
                  >\
                  <span style="margin-right:10px;"><img width="18" src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/1x1/' + data.value.toLowerCase() + '.svg"/></span>' + '\
                </div>\
              ');
            },
            choice: function(data) {
              return strToEl('\
                <div\
                  class="' + String(classNames.item) + ' ' + String(classNames.itemChoice) + ' ' + String(data.disabled ? classNames.itemDisabled : classNames.itemSelectable) + '"\
                  data-select-text="' + String(itemSelectText) + '"\
                  data-choice \
                  ' + String(data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable') + '\
                  data-id="' + String(data.id) + '"\
                  data-value="' + String(data.value) + '"\
                  ' + String(data.groupId > 0 ? 'role="treeitem"' : 'role="option"') + '\
                  >\
                  <span style="margin-right:10px;">\
                  <img width="18" src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/1x1/' + data.value.toLowerCase() + '.svg"/></span> ' + String(data.label) + '\
                </div>\
              ');
            },
          };
        }
      });
      // console.log('otp this.selectedCountryId', this.selectedCountryId);
      if (this.selectedCountryId.length > 0) {
        this.selector.setValueByChoice(this.selectedCountryId);
      } else {
        this.selector.setValueByChoice('IN');
      }
    } else if (selectorId === 'country-options-otp') {
      const el = 'country-options-otp';
      this.selector = new Choices(document.getElementById(el), {
        searchFields: ['label', 'value', 'customProperties.description'],
        choices: this.countries,
        callbackOnCreateTemplates: function(strToEl) {
          const classNames = this.config.classNames;
          const itemSelectText = this.config.itemSelectText;

          return {
            item: function(data) {
              return strToEl('\
                <div\
                  class="' + String(classNames.item) + ' ' + String(data.highlighted ? classNames.highlightedState : classNames.itemSelectable) + '"\
                  data-item\
                  data-id="' + String(data.id) + '"\
                  data-value="' + String(data.value) + '"\
                  ' + String(data.active ? 'aria-selected="true"' : '') + '\
                  ' + String(data.disabled ? 'aria-disabled="true"' : '') + '\
                  >\
                  <span style="margin-right:10px;"><img width="18" src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/1x1/' + data.value.toLowerCase() + '.svg"/></span>' + '\
                </div>\
              ');
            },
            choice: function(data) {
              return strToEl('\
                <div\
                  class="' + String(classNames.item) + ' ' + String(classNames.itemChoice) + ' ' + String(data.disabled ? classNames.itemDisabled : classNames.itemSelectable) + '"\
                  data-select-text="' + String(itemSelectText) + '"\
                  data-choice \
                  ' + String(data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable') + '\
                  data-id="' + String(data.id) + '"\
                  data-value="' + String(data.value) + '"\
                  ' + String(data.groupId > 0 ? 'role="treeitem"' : 'role="option"') + '\
                  >\
                  <span style="margin-right:10px;">\
                  <img width="18" src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/1x1/' + data.value.toLowerCase() + '.svg"/></span> ' + String(data.label) + '\
                </div>\
              ');
            },
          };
        }
      });
      // console.log('otp this.selectedCountryId', this.selectedCountryId);
      if (this.selectedCountryId.length > 0) {
        this.selector.setValueByChoice(this.selectedCountryId);
      } else {
        this.selector.setValueByChoice('IN');
      }
    } else if (selectorId === 'country-options-set') {
      const el = 'country-options-set';
      this.selector = new Choices(document.getElementById(el), {
        searchFields: ['label', 'value', 'customProperties.description'],
        choices: this.countries,
        callbackOnCreateTemplates: function(strToEl) {
          const classNames = this.config.classNames;
          const itemSelectText = this.config.itemSelectText;

          return {
            item: function(data) {
              return strToEl('\
                <div\
                  class="' + String(classNames.item) + ' ' + String(data.highlighted ? classNames.highlightedState : classNames.itemSelectable) + '"\
                  data-item\
                  data-id="' + String(data.id) + '"\
                  data-value="' + String(data.value) + '"\
                  ' + String(data.active ? 'aria-selected="true"' : '') + '\
                  ' + String(data.disabled ? 'aria-disabled="true"' : '') + '\
                  >\
                  <span style="margin-right:10px;"><img width="18" src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/1x1/' + data.value.toLowerCase() + '.svg"/></span>' + '\
                </div>\
              ');
            },
            choice: function(data) {
              return strToEl('\
                <div\
                  class="' + String(classNames.item) + ' ' + String(classNames.itemChoice) + ' ' + String(data.disabled ? classNames.itemDisabled : classNames.itemSelectable) + '"\
                  data-select-text="' + String(itemSelectText) + '"\
                  data-choice \
                  ' + String(data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable') + '\
                  data-id="' + String(data.id) + '"\
                  data-value="' + String(data.value) + '"\
                  ' + String(data.groupId > 0 ? 'role="treeitem"' : 'role="option"') + '\
                  >\
                  <span style="margin-right:10px;">\
                  <img width="18" src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/1x1/' + data.value.toLowerCase() + '.svg"/></span> ' + String(data.label) + '\
                </div>\
              ');
            },
          };
        }
      });
      // console.log('otp this.selectedCountryId', this.selectedCountryId);
      if (this.selectedCountryId.length > 0) {
        this.selector.setValueByChoice(this.selectedCountryId);
      } else {
        this.selector.setValueByChoice('IN');
      }
    }
  }

  /**
   *
   */
  ngOnChanges(changes: any) {
  }

  /**
   * On Number Change
   * @param event
   */
  onChangeNumber(event) {
    // // this.fullNumber =  this.selectedCountry;
    // if (event !== '' && event.length > 2) {

    //   const x = new asYouType().input(event);
    //   const xx = format(event, 'IN', 'National');
    //   const formatter = new asYouType();

    //   formatter.input(event);
    //   this.selectedCountry = formatter.country;

    //   // const country = formatter.country.toLowerCase();
    //   // const sel = this.selector;
    //   this.selector.setValueByChoice(formatter.country); // Choice with value of 'Two' has now been selected.

    //   // Wait for 1 second to change to local number
    //   // setTimeout(this.formatLocal, 500);

    // }
  }

  ngAfterViewInit() {

    // this.onSelectCountry('IN');

  }

  constructor() {
    this.countries = countries;
  }
}
