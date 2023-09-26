import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, TextInput, View, SafeAreaView, FlatList, Text, TouchableOpacity, Image } from "react-native";

import * as Speech from "expo-speech";

const DATA = [
  {
    id: "1",
    title: "DINHEIRO",
    perc: 0.1,
    imageUri:
      "https://images.vexels.com/media/users/3/143188/isolated/preview/5f44f3160a09b51b4fa4634ecdff62dd-icone-de-dinheiro.png",
  },
  {
    id: "2",
    title: "CARTÃO",
    perc: 0.05,
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHftKXUj3zxqLgRivk0SR9DV57CXUhPs9wAwaIPS8&s",
  },
  {
    id: "3",
    title: "PIX",
    perc: 0,
    imageUri: "https://logodownload.org/wp-content/uploads/2020/02/pix-bc-logo-0.png",
  },
];
export default function App() {
  const [valor1, setValor1] = useState(undefined);
  const [valor2, setValor2] = useState(undefined);
  const [valor3, setValor3] = useState(undefined);
  const [valor4, setValor4] = useState(undefined);

  _loadAllVoices = async () => {
    const availableVoices = await Speech.getAvailableVoicesAsync();
    console.log("🚀 ~ file: App.js:36 ~ _loadAllVoices= ~ availableVoices:", availableVoices);
    //  this.setState({
    // voiceList: availableVoices,
    //  voice: availableVoices[0].identifier,
    //r});
  };

  const carne = 5.3;
  const frango = 4.7;
  const queijo = 4.0;
  const vento = 8.0;

  const soma = () => {
    let resultado =
      parseFloat(valor1 ?? 0) * carne +
      parseFloat(valor2 ?? 0) * frango +
      parseFloat(valor3 ?? 0) * queijo +
      parseFloat(valor4 ?? 0) * vento;
    return resultado;
  };

  const CliqueSimples = async (item) => {
    const total = soma();
    const descAcres = total * item.perc;
    const totalFinal = item.id == "1" ? total - descAcres : total + descAcres;

    if (totalFinal > 0) {
      alert(
        `Você pediu ${valor1 ?? 0} pastel de carne, ${valor2 ?? 0} pastel de frango, ${valor3 ?? 0} pastel de queijo, ${
          valor4 ?? 0
        } pastel de vento e Total do seu pedido é R$${totalFinal.toFixed(2)}`
      );
      _loadAllVoices();

      Speech.speak(
        `Você pediu ${valor1 ?? 0} pastel de carne,
    ${valor2 ?? 0} pastel de frango, ${valor3 ?? 0} pastel de queijo,
    ${valor4 ?? 0} pastel de vento e o total do seu pedido é R$${totalFinal.toFixed(2) ?? 0}`,
        {
          language: "pt-BR",
          voice: "pt-br-x-ptd-local",
        }
      );
    } else {
      alert("Você deve pedir ao menos 1 pastel.");
      Speech.speak("Você deve pedir ao menos 1 pastel.", { language: "pt-BR" });
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
          placeholder="CARNE "
          onChangeText={(val1) => setValor1(val1 === "" ? 0 : val1)}
          value={valor1}
        ></TextInput>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="FRANGO"
          onChangeText={(val2) => setValor2(val2 === "" ? 0 : val2)}
          value={valor2}
        ></TextInput>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="QUEIJO"
          onChangeText={(val3) => setValor3(val3 === "" ? 0 : val3)}
          value={valor3}
        ></TextInput>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="VENTO"
          onChangeText={(val4) => setValor4(val4 === "" ? 0 : val4)}
          value={valor4}
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
