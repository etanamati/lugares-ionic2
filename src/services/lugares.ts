import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";

import { Lugar } from "../models/lugar";
import { Localizacao } from "../models/localizacao";

declare var cordova: any;

@Injectable()
export class LugaresService {
  private lugares: Lugar[] = [];

  constructor(private storage: Storage,
              private file: File) {}

  adicionaLugar(titulo: string,
           descricao: string,
           localizacao: Localizacao,
           imageUrl: string) {
    const lugar = new Lugar(titulo, descricao, localizacao, imageUrl);
    this.lugares.push(lugar);
    this.storage.set('lugares', this.lugares)
      .then()
      .catch(
        err => {
          this.lugares.splice(this.lugares.indexOf(lugar), 1);
        }
      );
  }

  carregaLugares() {
    return this.lugares.slice();
  }

  obtemLugares() {
    return this.storage.get('lugares')
      .then(
        (lugares: Lugar[]) => {
          this.lugares = lugares != null ? lugares : [];
          return this.lugares;
        }
      )
      .catch(
        err => console.log(err)
      );
  }

  removeLugar(index: number) {
    const lugar = this.lugares[index];
    this.lugares.splice(index, 1);
    this.storage.set('lugares', this.lugares)
      .then(
        () => {
          this.removeArquivo(lugar);
        }
      )
      .catch(
        err => console.log(err)
      );
  }

  private removeArquivo(lugar: Lugar) {
    const currentName = lugar.imageUrl.replace(/^.*[\\\/]/, '');
    this.file.removeFile(cordova.file.dataDirectory, currentName)
      .then(
        () => console.log('Arquivo removido')
      )
      .catch(
        () => {
          console.log('Erro removendo arquivo');
          this.adicionaLugar(lugar.titulo, lugar.descricao, lugar.localizacao, lugar.imageUrl);
        }
      );
  }
}