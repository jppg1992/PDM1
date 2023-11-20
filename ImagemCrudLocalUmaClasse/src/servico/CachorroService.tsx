import { Database } from "../database/Database"
import { Cachorro } from "../model/Cachorro"

export class CachorroService {
    static readonly TABLE = `cachorro`
    
    static async create(obj: Cachorro) {
        const result = await Database.runQuery(`
        INSERT INTO ${this.TABLE} (
            nome,
            raca,
            sexo,
            datanascimento,
            foto) 
            VALUES (?,?,?,?,?)`, [
                obj.nome,             
                obj.raca,
                obj.sexo,             
                obj.datanascimento,             
                obj.foto             
        ])
        obj.id = result.insertId
        return obj
    }

    static async update(obj: Cachorro) {
        const query = `UPDATE ${this.TABLE} 
        set nome =? ,   
        raca =? ,  
        sexo =? ,  
        datanascimento =? ,  
        foto =?  
        WHERE id = ?;`
        const result = await Database.runQuery(query, [
            obj.nome,            
            obj.raca, 
            obj.sexo,           
            obj.datanascimento,            
            obj.foto,            
            obj.id
        ])
        return result.rowsAffected > 0
    }

    static async delete(obj: Cachorro) {

        const query = `DELETE FROM ${this.TABLE} WHERE id = ?;`
        const result = await Database.runQuery(query, [obj.id])

        return result.rowsAffected > 0
    }

    static async tryRemoveImage(id: number) {
       
    }

    static async findById(id: number) {
        const query = `SELECT * FROM ${this.TABLE} WHERE id = ?;`
        const result = await Database.runQuery(query, [id])

        if (result.rows.length != 1) {
            throw new Error('Cachorro não existe')
        }

        const raw = result.rows.item(0)
        const obj = new Cachorro(raw)

        return obj
    }

    static async findAll() {
        const query = `SELECT * FROM ${this.TABLE};`
        const result = await Database.runQuery(query)
        return result.rows._array.map(row => new Cachorro(row))
    }
 

}