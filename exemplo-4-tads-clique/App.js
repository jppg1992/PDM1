import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import * as Speech from "expo-speech";
import { Button, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function App() {
  const [nome, setNome] = useState("");

  const mostrarNome = () => {
    alert("Nome da pessoa: " + nome);
    Speech.speak(`Olá você digitou ${nome}`, { language: "pt-Br" });
  };

  return (
    <View style={meuestilo.container}>
      <View style={meuestilo.inputContainer}>
        <TextInput
          style={meuestilo.input}
          placeholder="Digite o Nome"
          onChangeText={(par) => setNome(par)}
          value={nome}
        ></TextInput>

        <TouchableOpacity
          onPress={mostrarNome}
          onLongPress={() => alert("clique simples da proxima vez")}
          style={[meuestilo.button, meuestilo.buttonOutline]}
        >
          <Text style={meuestilo.buttonOutlineText}>Capturar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={mostrarNome}
          onLongPress={() => alert("clique simples da proxima vez")}
          style={meuestilo.button}
        >
          <Text style={meuestilo.buttonText}>Capturar</Text>
        </TouchableOpacity>

        <Pressable onPress={mostrarNome} onLongPress={() => alert("clique simples da proxima vez")} style={meuestilo.button}>
          <Text style={meuestilo.buttonText}>Capturar</Text>
        </Pressable>

        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const meuestilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#A0A0A0",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
