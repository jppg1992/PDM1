import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { Cachorro } from "./model/Cachorro";
import { useState } from "react";

export default function App() {
  const [formCachorro, setFormCachorro] = useState<Partial<Cachorro>>({});

  const instanciar = () => {
    const cachorro = new Cachorro(formCachorro);
    cachorro.latir();
    alert("Cachorro instanciado: " + cachorro.toString());
    cachorro.uivar();
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o ID"
        value={formCachorro.id?.toString()}
        onChangeText={(val) => {
          if (!Number.isNaN(parseInt(val)))
            setFormCachorro({
              ...formCachorro,
              id: parseInt(val) ?? 0,
            });
        }}
      />

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

      <TouchableOpacity onPress={() => instanciar()} onLongPress={() => instanciar()}>
        <View>
          <Text style={styles.btn}>Salvar</Text>
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
});
