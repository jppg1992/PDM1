import { Database } from "../database/Database";
import { Cliente } from "../model/Cliente";

export class ClienteService {
  static readonly TABLE = `cliente`;

  static async create(obj: Cliente) {
    const result = await Database.runQuery(
      `
        INSERT INTO ${this.TABLE} (
            nome,
            cpf,
            endereco,
            datanascimento,
            foto) 
            VALUES (?,?,?,?,?)`,
      [obj.nome, obj.cpf, obj.endereco, obj.datanascimento, obj.foto]
    );
    obj.id = result.insertId;
    return obj;
  }

  static async update(obj: Cliente) {
    const query = `UPDATE ${this.TABLE} 
        set nome =? ,   
        cpf =? ,  
        endereco =? ,  
        datanascimento =? ,  
        foto =?  
        WHERE id = ?;`;
    const result = await Database.runQuery(query, [obj.nome, obj.cpf, obj.endereco, obj.datanascimento, obj.foto, obj.id]);
    return result.rowsAffected > 0;
  }

  static async delete(obj: Cliente) {
    const query = `DELETE FROM ${this.TABLE} WHERE id = ?;`;
    const result = await Database.runQuery(query, [obj.id]);

    return result.rowsAffected > 0;
  }

  static async tryRemoveImage(id: number) {}

  static async findById(id: number) {
    const query = `SELECT * FROM ${this.TABLE} WHERE id = ?;`;
    const result = await Database.runQuery(query, [id]);

    if (result.rows.length != 1) {
      throw new Error("Cliente não existe");
    }

    const raw = result.rows.item(0);
    const obj = new Cliente(raw);

    return obj;
  }

  static async findAll() {
    const query = `SELECT * FROM ${this.TABLE};`;
    const result = await Database.runQuery(query);
    return result.rows._array.map((row) => new Cliente(row));
  }
}
