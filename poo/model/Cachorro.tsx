import * as Speech from "expo-speech";

export class Cachorro {
  public id: number;
  public nome: string;
  public raca: string;
  public datanascimento: string;

  constructor(obj?: Partial<Cachorro>) {
    if (obj) {
      this.id = obj.id;
      this.nome = obj.nome;
      this.raca = obj.raca;
      this.datanascimento = obj.datanascimento;
    }
  }

  latir() {
    Speech.speak("Au au au ", {
      language: "pt-BR",
      voice: "pt-br-x-ptd-local",
    });
  }

  uivar() {
    Speech.speak("Auuuuuuuuuuuuuuuuuuuuuuuuuhuhuhuhuhuh", {
      language: "pt-BR",
      voice: "pt-br-x-ptd-local",
    });
  }

  public toString(): string {
    const fields = Object.values(this).join(",");
    return `Cachorro [${fields}]`;
  }
}
