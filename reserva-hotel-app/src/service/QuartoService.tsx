import { Database } from "../database/Database";
import { Quarto } from "../model/Quarto";

export class QuartoService {
  static readonly TABLE = `quarto`;

  static async create(obj: Quarto) {
    const result = await Database.runQuery(
      `
        INSERT INTO ${this.TABLE} (
            descricao,
            numero,
            valor, 
            foto) 
            VALUES (?,?,?,?)`,
      [obj.descricao, obj.numero, obj.valor, obj.foto]
    );
    obj.id = result.insertId;
    return obj;
  }

  static async update(obj: Quarto) {
    const query = `UPDATE ${this.TABLE} 
        set descricao =? ,   
        numero =? ,  
        valor =? ,   
        foto =?  
        WHERE id = ?;`;
    const result = await Database.runQuery(query, [obj.descricao, obj.numero, obj.valor, obj.foto, obj.id]);
    return result.rowsAffected > 0;
  }

  static async delete(obj: Quarto) {
    const query = `DELETE FROM ${this.TABLE} WHERE id = ?;`;
    const result = await Database.runQuery(query, [obj.id]);

    return result.rowsAffected > 0;
  }

  static async tryRemoveImage(id: number) {}

  static async findById(id: number) {
    const query = `SELECT * FROM ${this.TABLE} WHERE id = ?;`;
    const result = await Database.runQuery(query, [id]);

    if (result.rows.length != 1) {
      throw new Error("Quarto não existe");
    }

    const raw = result.rows.item(0);
    const obj = new Quarto(raw);

    return obj;
  }

  static async findAll() {
    const query = `SELECT * FROM ${this.TABLE};`;
    const result = await Database.runQuery(query);
    return result.rows._array.map((row) => new Quarto(row));
  }
}
