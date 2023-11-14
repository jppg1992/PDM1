import { Database } from "../database/Database"
import { Marcador } from "../model/Marcador"

export class MarcadorService {
    static readonly TABLE = `marcador`
    
    static async create(obj: Marcador) {
        const result = await Database.runQuery(`
        INSERT INTO ${this.TABLE} (
            titulo,
            descricao,
            referencia,
            lat,
            lon) 
            VALUES (?,?,?,?,?)`, [
                obj.titulo,             
                obj.descricao,
                obj.referencia,             
                obj.lat,             
                obj.lon             
        ])
        obj.id = result.insertId
        return obj
    }

    static async update(obj: Marcador) {
        const query = `UPDATE ${this.TABLE} 
        set titulo =? ,   
        descricao =? ,  
        referencia =? ,  
        lat =? ,  
        lon =?  
        WHERE id = ?;`
        const result = await Database.runQuery(query, [
            obj.titulo,            
            obj.descricao, 
            obj.referencia,           
            obj.lat,            
            obj.lon,            
            obj.id
        ])
        return result.rowsAffected > 0
    }

    static async delete(obj: Marcador) {

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
            throw new Error('Macrador não existe')
        }

        const raw = result.rows.item(0)
        const obj = new Marcador(raw)

        return obj
    }

    static async findAll() {
        const query = `SELECT * FROM ${this.TABLE};`
        const result = await Database.runQuery(query)
        return result.rows._array.map(row => new Marcador(row))
    }
 

}