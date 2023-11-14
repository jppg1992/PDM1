export class Marcador {
    public id: number;
    public titulo: string;
    public descricao: string;
    public referencia: string;
    public lat: number;
    public lon: number;

    constructor(obj?: Partial<Marcador>) {
        if (obj) {
            this.id = obj.id
            this.titulo = obj.titulo
            this.descricao = obj.descricao
            this.referencia=obj.referencia
            this.lat = obj.lat
            this.lon = obj.lon
        }
    }

    toString() {
        const fields = Object.values(this).join(', ')
        return `Marcador [${fields}]`
    }

    toObjeto() {
        const marcador = {
            id: this.id,
            titulo: this.titulo,
            descricao: this.descricao,
            referencia:this.referencia,
            lat: this.lat,
            lon: this.lon
        }

        return marcador
    }
};