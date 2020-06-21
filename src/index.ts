import { Base } from "./model";
import { connectON, connectOFF } from "./dao/mysql";
import { iBase } from "./interface";
import { Types } from "mysql";

class Pessoa extends Base {
  nome_tabela: string = "pessoa";
  nome: string = "";
  idade: number = 0;
  altura: number = 0;
}

class Cliente extends Base {
  nome_tabela: string = "cliente";
  nome: string = "";
  endereco: string = "";
  email = "";
}

(async () => {
  await connectON({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "mini_orm",
  });

  //let c1 = new Cliente();
  let x = Cliente.teste<Cliente>(Cliente, {
    campo: "email",
    operador: "LIKE",
    valor: "@gmail.com",
  });
  console.log(x[0].endereco);
  //console.log(typeof Cliente);
  // await c1.select([
  //   {
  //     campo: "email",
  //     operador: "LIKE",
  //     valor: "@gmail.com",
  //   },
  // ]);

  // if (c1._itens.length > 0) {
  //   console.log(c1._itens);
  // }

  // let p1 = new Pessoa();
  // p1.nome = "OLER PESSOA";
  // p1.altura = 130;
  // p1.idade = 10;
  // await p1.insert();

  await connectOFF();
})();
