import { LugaresService } from './../../services/lugares';
import { Localizacao } from './../../models/localizacao';
import { ObtemLocalizacaoPage } from './../obtem-localizacao/obtem-localizacao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { Geolocation} from "@ionic-native/Geolocation";
import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { NgForm } from "@angular/forms/src/forms";

/**
 * Generated class for the AdicionaLugar page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var cordova: any;

@Component({
  selector: 'page-adiciona-lugar',
  templateUrl: 'adiciona-lugar.html',
})
export class AdicionaLugarPage {
  localizacao: Localizacao = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  localizacaoIsSet = false;
  
  private imageUrl: string;

  constructor(private navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private geolocation: Geolocation,
              private camera: Camera,
              private file: File,
              private lugaresService: LugaresService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionaLugar');
  }

  abreMapa() {
    const modal = this.modalCtrl.create(ObtemLocalizacaoPage,
      {localizacao: this.localizacao, isSet: this.localizacaoIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.localizacao = data.location;
          this.localizacaoIsSet = true;
        }
      }
    );
  }

  localiza() {
    const loader = this.loadingCtrl.create({
      content: 'Obtendo a localização'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.localizacao.lat = location.coords.latitude;
          this.localizacao.lng = location.coords.longitude;
          this.localizacaoIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Não foi possível obter localização!',
            duration: 2500
          });
          toast.present();
        }
      );
  }

  tiraFoto() {
    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(
        imageData => {
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          const newFileName = new Date().getUTCMilliseconds() + '.jpg';
          
          this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
            .then(
              (data: any) => {
                this.imageUrl = data.nativeURL;
                //this.camera.cleanup();
                // File.removeFile(path, currentName);
              }
            )
            .catch(
              (err: any) => {
                this.imageUrl = '';
                const toast = this.toastCtrl.create({
                  message: 'Não foi possível salvar imagem. Tente novamente.',
                  duration: 2500
                });
                toast.present();
                //this.camera.cleanup();
              }
            );

          this.imageUrl = imageData;
        }
      )
      .catch(
        err => {
          const toast = this.toastCtrl.create({
            message: 'Não foi possível obter foto. Tente novamente.',
            duration: 2500
          });
          toast.present();
        }
      );
  }

  onSubmit(form: NgForm) {
    this.lugaresService
      .adicionaLugar(form.value.titulo, form.value.descricao, this.localizacao, this.imageUrl);
    form.reset();
    this.localizacao = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.localizacaoIsSet = false;
  }

}
