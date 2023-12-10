export class Cliente {
  public id: string;
  public nome: string;
  public cpf: string;
  public datanascimento: string;
  public endereco: string;
  public foto: string;

  constructor(obj?: Partial<Cliente>) {
    if (obj) {
      this.id = obj.id;
      this.nome = obj.nome;
      this.cpf = obj.cpf;
      this.endereco = obj.endereco;
      this.datanascimento = obj.datanascimento;
      this.foto = obj.foto;
    }
  }

  toObjeto() {
    const cliente = {
      id: this.id,
      nome: this.nome,
      raca: this.cpf,
      sexo: this.endereco,
      datanascimento: this.datanascimento,
      foto: this.foto,
    };
    return cliente;
  }

  toString() {
    const fields = Object.values(this).join(", ");
    return `Cliente [${fields}]`;
  }
}
