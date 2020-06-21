import { createPool, Pool } from "mysql";
import { iConfigDB } from "../interface";

export let _Pool: Pool;

export function connectON(config: iConfigDB): Promise<Boolean> {
  return new Promise((resolve) => {
    _Pool = createPool(config);

    _Pool.getConnection((err, conexao) => {
      if (err) {
        console.log("Conexão falhou");
        resolve(false);
      } else {
        console.log("Conexão realizada com sucesso");
        resolve(true);
      }
    });
  });
}
export function connectOFF(): Promise<Boolean> {
  return new Promise((resolve) => {
    if (_Pool) {
      console.log("Conexão encerrada");
      _Pool.end();
    }

    resolve(true);
  });
}
