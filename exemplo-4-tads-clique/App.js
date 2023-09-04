import { useState } from "react";
import { StyleSheet, View, Button, TextInput, TouchableOpacity, Text } from "react-native";

export default function App() {
  const [nome, setNome] = useState("");

  const mostra = () => {
    alert(`Nome: ${nome}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o Nome"
          onChangeText={(nome) => setNome(nome)}
          value={nome}
        ></TextInput>
      </View>

      <Button title="Capturar" onPress={mostra}>
        Capturar
      </Button>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={mostra}
        onLongPress={() => {
          alert("Clique simples na próxima vez!");
        }}
      >
        <Text style={[styles.button, styles.buttonOutline, styles.buttonText, styles.buttonOutlineText]}>Capturar</Text>
      </TouchableOpacity>
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
    backgroundColor: "blue",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
