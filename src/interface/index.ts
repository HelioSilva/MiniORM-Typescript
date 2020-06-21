export interface iBase {
  _id: number;
  nome_tabela: string;
}

export interface iConfigDB {
  host: string;
  user: string;
  password: string;
  database: string;
}

export type oper = "=" | "LIKE";

export interface iCondicaoSQL {
  campo: string;
  valor: string;
  operador: oper;
}
