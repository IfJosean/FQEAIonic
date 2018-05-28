import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];
  filtro: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items) { }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    if (this.filtro == null) {
      this.currentItems = this.items.search({
        name: val
      });
    }
    if (this.filtro == 'name') {
      this.currentItems = this.items.search({
        name: val
      });
    }
    if (this.filtro == 'surname') {
      this.currentItems = this.items.search({
        surname: val
      });
    }
    if (this.filtro == 'role') {
      this.currentItems = this.items.search({
        role: val
      });
    }
    if (this.filtro == 'state') {
      this.currentItems = this.items.search({
        state: val
      });
    }
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

}
