import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Lugar } from "../../models/lugar";
import { LugaresService } from "../../services/lugares";

@Component({
  selector: 'page-lugar',
  templateUrl: 'lugar.html'
})
export class LugarPage {
  lugar: Lugar;
  index: number;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private lugaresService: LugaresService) {
    this.lugar = this.navParams.get('lugar');
    this.index = this.navParams.get('index');
  }

  sai() {
    this.viewCtrl.dismiss();
  }

  remove() {
    this.lugaresService.removeLugar(this.index);
    this.sai();
  }
}