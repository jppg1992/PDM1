import { useNavigation, useRoute } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import * as Speech from "expo-speech";
import { useState, useEffect } from "react";
import { Cachorro } from "../../../models/Cachorro";
import { CachorroService } from "../../../services/CachorroService";

export default function ManterCachorro() {
  const [formCachorro, setFormCachorro] = useState<Partial<Cachorro>>({});

  const route = useRoute();
  const { cachorro } = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    buscaCachorro(cachorro);
  }, [cachorro]);

  const buscaCachorro = (cachorro: Cachorro) => {
    setFormCachorro(cachorro);
  };

  const salvar = async () => {
    if (formCachorro.id) {
      const cachorro = new Cachorro(formCachorro);
      console.log(cachorro);
      cachorro.latir();
      const result = await CachorroService.update(cachorro);
      alert("Registro atualizado!");
      await Speech.speak("Cachorro atualizado com sucesso", {
        language: "pt-BR",
        voice: "pt-br-x-ptd-local",
      });
      cachorro.uivar();
      limparFormulario();
    } else {
      const cachorro = new Cachorro(formCachorro);
      const result = await CachorroService.create(cachorro);
      await cachorro.latir();
      await Speech.speak("Cachorro inserido com sucesso", {
        language: "pt-BR",
        voice: "pt-br-x-ptd-local",
      });
      alert("Registro Adicionado!");
      cachorro.uivar();
      limparFormulario();
    }
  };

  const limparFormulario = () => {
    setFormCachorro({});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        value={formCachorro.nome}
        onChangeText={(val) => {
          setFormCachorro({
            ...formCachorro,
            nome: val,
          });
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite a raça"
        value={formCachorro.raca}
        onChangeText={(val) => {
          setFormCachorro({
            ...formCachorro,
            raca: val,
          });
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite a data de nascimento"
        value={formCachorro.datanascimento}
        onChangeText={(val) => {
          setFormCachorro({
            ...formCachorro,
            datanascimento: val,
          });
        }}
      />

      <TouchableOpacity onPress={() => salvar()} onLongPress={() => salvar()}>
        <View>
          <Text style={styles.btn}>Salvar</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => limparFormulario()} onLongPress={() => limparFormulario()}>
        <View>
          <Text style={styles.btnC}>Cancelar</Text>
        </View>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "gray",
    paddingVertical: 1,
    paddingHorizontal: 1,
    marginTop: 2,
    height: 40,
    width: 250,
    borderRadius: 8,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "800",
    padding: 10,
    borderRadius: 8,
  },
  btnC: {
    backgroundColor: "white",
    color: "black",
    fontWeight: "800",
    padding: 10,
    borderRadius: 8,
    borderColor: "black",
  },
});
