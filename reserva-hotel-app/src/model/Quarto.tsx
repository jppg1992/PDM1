export class Quarto {
  public id: string;
  public descricao: string;
  public numero: string;
  public valor: string;
  public foto: string;

  constructor(obj?: Partial<Quarto>) {
    if (obj) {
      this.id = obj.id;
      this.descricao = obj.descricao;
      this.numero = obj.numero;
      this.valor = obj.valor;
      this.foto = obj.foto;
    }
  }

  toObjeto() {
    const quarto = {
      id: this.id,
      nome: this.descricao,
      raca: this.numero,
      sexo: this.valor,
      foto: this.foto,
    };
    return quarto;
  }

  toString() {
    const fields = Object.values(this).join(", ");
    return `Quarto [${fields}]`;
  }
}
