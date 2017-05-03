import { LugaresService } from './../services/lugares';
import { ObtemLocalizacaoPage } from './../pages/obtem-localizacao/obtem-localizacao';
import { AdicionaLugarPage } from './../pages/adiciona-lugar/adiciona-lugar';
import { LugarPage } from './../pages/lugar/lugar';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AgmCoreModule } from "angular2-google-maps/core";
import { Geolocation} from "@ionic-native/Geolocation";
import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LugarPage,
    AdicionaLugarPage,
    ObtemLocalizacaoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAv3OphQg-v5hayJwaLApFVtvTp622oWtc'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LugarPage,
    AdicionaLugarPage,
    ObtemLocalizacaoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Camera,
    File,
    LugaresService
  ]
})
export class AppModule {}
