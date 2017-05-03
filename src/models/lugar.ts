import { Localizacao } from "./localizacao";

export class Lugar {
  constructor(public titulo: string,
              public descricao: string,
              public localizacao: Localizacao,
              public imageUrl: string) {
  }
}