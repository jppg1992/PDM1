import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, TextInput, View, SafeAreaView, FlatList, Text, TouchableOpacity, Image } from "react-native";

import * as Speech from "expo-speech";

const DATA = [
  {
    id: "1",
    title: "VIP",
    adultos: 10.0,
    criancas: 5.0,
    imageUri:
      "https://static.vecteezy.com/ti/vetor-gratis/p3/23259666-de-icone-vip-para-design-grafico-logotipo-site-midia-social-aplicativo-movel-interface-do-usuario-vetor.jpg",
  },
  {
    id: "2",
    title: "TOP",
    adultos: 20.0,
    criancas: 10.0,
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ5Z4SAdgHI3cXmXtiCiitr_gMmRfIbDUrsYprbKrr6J1VNRk4S-B12b-mhUOnmiF0Vgo&usqp=CAU",
  },
  {
    id: "3",
    title: "OPENBAR",
    adultos: 30.0,
    criancas: 20.0,
    imageUri: "https://i.pinimg.com/1200x/12/e3/f2/12e3f27e5ecafe76acbe863605e45388.jpg",
  },
];
export default function App() {
  const [valor1, setValor1] = useState(undefined);
  const [valor2, setValor2] = useState(undefined);

  const soma = (item) => {
    let resultado = parseFloat(valor1 ?? 0) * item.adultos + parseFloat(valor2 ?? 0) * item.criancas;
    return resultado;
  };

  const CliqueSimples = async (item) => {
    const totalFinal = soma(item);

    if (totalFinal > 0) {
      alert(
        `Você pediu ${valor1 ?? 0} ingressos para adultos, 
        ${valor2 ?? 0} ingressos para crianças e o Total do seu pedido é R$${totalFinal.toFixed(2)}`
      );

      Speech.speak(
        `Você pediu ${valor1 ?? 0} ingressos para adultos, 
      ${valor2 ?? 0} ingressos para crianças e o Total do seu pedido é R$${totalFinal.toFixed(2)}`,
        {
          language: "pt-BR",
          voice: "pt-br-x-pte-local",
        }
      );
    } else {
      alert("Você deve pedir ao menos 1 ingresso.");
      Speech.speak("Você deve pedir ao menos 1 ingresso.", { language: "pt-BR", voice: "pt-br-x-pte-local" });
    }
  };
  const CliqueLongo = (item) => {
    alert(`Item Clicado Longo ${item.title}`);
  };
  const renderItemNovo = ({ item }) => {
    return (
      <View style={styles.item} key={item.id}>
        <TouchableOpacity style={styles.title} onPress={() => CliqueSimples(item)} onLongPress={() => CliqueLongo(item)}>
          <View style={styles.detalheItem}>
            <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
            <Text style={styles.buttonText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Qtd Adultos.."
          onChangeText={(val1) => setValor1(val1 === "" ? 0 : val1)}
          value={valor1}
        ></TextInput>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Qtd Crianças"
          onChangeText={(val2) => setValor2(val2 === "" ? 0 : val2)}
          value={valor2}
        ></TextInput>
      </View>

      <SafeAreaView style={styles.container}>
        <FlatList data={DATA} renderItem={renderItemNovo} keyExtractor={(item) => item.id} />
      </SafeAreaView>

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
    marginTop: "20%",
  },
  input: {
    backgroundColor: "#A0A0A0",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  item: {
    backgroundColor: "blue",
    color: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 32,
  },
  itemImage: {
    width: 32,
    height: 32,
    marginLeft: 4,
    marginRight: 8,
    backgroundColor: "#eee",
    borderRadius: 40,
    elevation: 2,
  },
  detalheItem: {
    display: "flex",
    flexDirection: "row",
  },
});
