import { iBase, iCondicaoSQL } from "../interface";
import { SelectOne, SelectORM, InsertORM } from "../dao/daoMysql";

export abstract class Base implements iBase {
  _id: number = 0;
  private _itens: iBase[] = [];
  abstract nome_tabela: string;

  private populate(value: iBase) {
    Object.assign(this, value);
  }

  insert(): Promise<void> {
    return new Promise(async (resolve) => {
      await InsertORM(this);
      resolve();
    });
  }

  findOne(id: number): Promise<void> {
    return new Promise(async (resolve) => {
      let obj = await SelectOne(this, id);
      this.populate(obj);
      resolve();
    });
  }
  select(x: iCondicaoSQL[]): Promise<void> {
    return new Promise(async (resolve) => {
      this._itens = await SelectORM(this.nome_tabela, x);
      resolve();
    });
  }

  static teste<iBase>(arg: iBase, x: iCondicaoSQL[]): Promise<iBase[]> {
    return new Promise(async (resolve) => {
      let y: iBase[] = [];
      //y = await SelectORM("cliente", x);
      resolve(y);
    });
  }
}
