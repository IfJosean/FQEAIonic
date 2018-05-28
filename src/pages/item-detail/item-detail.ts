import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';

import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  oldItem;

  constructor(public navCtrl: NavController, navParams: NavParams, public items: Items, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.item = navParams.get('item') || items.defaultItem;
    this.oldItem = this.item;
  }
  modify(name, surname, role, state){

    let user = {name: name, surname: surname, role: role, state: state};

    console.log(user);
    let confirm = this.alertCtrl.create({
      title: 'Modificar a '+user.name,
      message: 'Seguro que quieres modificar '+user.name,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si quiero',
          handler: () => {
            console.log('Agree clicked');
            console.log(user);
            this.items.update(user, this.oldItem.name);
          }
        }
      ]
    });
    confirm.present();
  }

  removeItem(name, surname, role, state){
    console.log('aqu'+this.oldItem);
    let confirm = this.alertCtrl.create({
      title: 'Borrar a '+name,
      message: 'Seguro que quieres borrar '+name,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si quiero',
          handler: () => {
            this.items.remove(this.oldItem);
          }
        }
      ]
    });
    confirm.present();
  }

}
