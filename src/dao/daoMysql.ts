import { _Pool } from "./mysql";
import { iBase, iCondicaoSQL } from "../interface";

export function SelectOne(classe: iBase, id: number): Promise<iBase> {
  return new Promise((resolve) => {
    _Pool.getConnection((err, conexao) => {
      if (err) {
        resolve();
      } else {
        conexao.query(
          `SELECT * FROM ${classe.nome_tabela} WHERE _id = ${id}`,
          function (err, result) {
            if (err) {
              resolve();
            } else {
              conexao.release();
              resolve(result[0]);
            }
          }
        );
      }
    });
  });
}

export function InsertORM(classe: iBase): Promise<void> {
  return new Promise((resolve) => {
    _Pool.getConnection((err, conexao) => {
      if (err) throw "Erro no Insert1";

      conexao.query(
        `INSERT INTO ${classe.nome_tabela} SET ?`,
        classe,
        (error, result) => {
          console.log(`INSERT INTO ${classe.nome_tabela} SET ?`, classe);
          if (error) throw "Error no Insert2";
          console.log(result);
          resolve();
        }
      );
    });
  });
}

export function SelectORM(
  classe: string,
  condition: iCondicaoSQL[]
): Promise<iBase[]> {
  return new Promise((resolve) => {
    _Pool.getConnection((err, conexao) => {
      let campos = "";
      let values: string[] = [];
      condition.map((item) => {
        campos += `${campos == "" ? "" : " AND "} ${item.campo} ${
          item.operador
        } ? `;
        values.push(
          item.operador == "LIKE" ? "%" + item.valor + "%" : item.valor
        );
      });

      if (err) throw "Error";

      console.log(`SELECT * FROM ${classe} WHERE ${campos}`);

      conexao.query(
        `SELECT * FROM ${classe} WHERE ${campos}`,
        values,
        (err, result) => {
          if (err) throw "SQL inválido";
          conexao.release();
          resolve(result);
        }
      );
    });
  });
}
