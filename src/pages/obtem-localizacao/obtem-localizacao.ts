import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";

import { Localizacao } from "../../models/localizacao";

@Component({
  selector: 'page-obtem-localizacao',
  templateUrl: 'obtem-localizacao.html'
})
export class ObtemLocalizacaoPage {
  localizacao: Localizacao;
  marker: Localizacao;

  constructor(private navParams: NavParams,
              private viewCtrl: ViewController) {
    this.localizacao = this.navParams.get('localizacao');
    if (this.navParams.get('isSet')) {
      this.marker = this.localizacao;
    }
  }

  onSetMarker(event: any) {
    console.log(event);
    this.marker = new Localizacao(event.coords.lat, event.coords.lng);
  }

  confirma() {
    this.viewCtrl.dismiss({localizacao: this.marker});
  }

  cancela() {
    this.viewCtrl.dismiss();
  }
}