export class Cachorro {
    public id : string;
    public nome : string;
    public sexo: string;
    public datanascimento: string;
    public raca : string;
    public foto: string;
    
    constructor(obj?: Partial<Cachorro>) {
        if (obj) {
            this.id = obj.id
            this.nome = obj.nome
            this.raca = obj.raca
            this.sexo = obj.sexo
            this.datanascimento = obj.datanascimento
            this.foto = obj.foto
         }
    }

    toObjeto() {
        const cachorro =  {
                    id : this.id,
                    nome : this.nome,
                    raca : this.raca,
                    sexo : this.sexo,
                    datanascimento : this.datanascimento,
                    foto : this.foto
         }
         return cachorro
    }
   
     toString() {
        const fields = Object.values(this).join(', ')
        return `Cachorro [${fields}]`
    }
};
