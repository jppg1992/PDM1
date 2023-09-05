import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View, Pressable, Text } from "react-native";

import * as Speech from "expo-speech";

export default function App() {
  const [valor1, setValor1] = useState("");
  const [valor2, setValor2] = useState("");
  let resultado = 0;

  const soma = () => {
    resultado = parseFloat(valor1) + parseFloat(valor2);
    alert(`O resultado é ${resultado}`);
    Speech.speak(`O resultado da soma de ${valor1} mais ${valor2} é igual a ${resultado}`, { language: "pt-BR" });
  };

  const subtrai = () => {
    resultado = parseFloat(valor1) - parseFloat(valor2);
    alert(`O resultado é ${resultado}`);
    Speech.speak(`O resultado da subtracão de ${valor1} menos ${valor2} é igual a ${resultado}`, { language: "pt-BR" });
  };

  const multiplica = () => {
    resultado = parseFloat(valor1) * parseFloat(valor2);
    alert(`O resultado é ${resultado}`);
    Speech.speak(`O resultado da multiplicação de ${valor1} vezes ${valor2} é igual a ${resultado}`, { language: "pt-BR" });
  };

  const divide = () => {
    resultado = parseFloat(valor1) / parseFloat(valor2);
    alert(`O resultado é ${resultado}`);
    Speech.speak(`O resultado da divisão de ${valor1} por ${valor2} é igual a ${resultado}`, { language: "pt-BR" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Digite o valor 1"
          onChangeText={(val1) => setValor1(val1)}
          value={valor1}
        ></TextInput>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Digite o valor 2"
          onChangeText={(val2) => setValor2(val2)}
          value={valor2}
        ></TextInput>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={soma} onLongPress={() => alert("clique simples da proxima vez")} style={styles.buttonSoma}>
          <Text style={styles.buttonText}>Somar</Text>
        </Pressable>

        <Pressable onPress={subtrai} onLongPress={() => alert("clique simples da proxima vez")} style={styles.buttonSubtrai}>
          <Text style={styles.buttonText}>Subtrair</Text>
        </Pressable>

        <Pressable
          onPress={multiplica}
          onLongPress={() => alert("clique simples da proxima vez")}
          style={styles.buttonMultiplica}
        >
          <Text style={styles.buttonText}>Multiplicar</Text>
        </Pressable>

        <Pressable onPress={divide} onLongPress={() => alert("clique simples da proxima vez")} style={styles.buttonDividir}>
          <Text style={styles.buttonText}>Dividir</Text>
        </Pressable>
      </View>

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
  buttonSoma: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonSubtrai: {
    backgroundColor: "red",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonMultiplica: {
    backgroundColor: "green",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonDividir: {
    backgroundColor: "orange",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
