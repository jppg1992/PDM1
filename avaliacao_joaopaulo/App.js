import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import * as Speech from "expo-speech";

const DATA = [
  {
    id: "1",
    title: "AVISTA",
    percentual: 0.08,
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNGMYq4Pr8PLuUgAMFLQXY-gah3kXL9ktm4yBU0RLtNBZLDFSavFCO9-pPPO2Iii6bnx0&usqp=CAU",
  },
  {
    id: "2",
    title: "PRAZO 30 DIAS",
    percentual: 0.0,
    imageUri: "https://cdn-icons-png.flaticon.com/512/6160/6160069.png",
  },
  {
    id: "3",
    title: "PRAZO 60 DIAS",
    percentual: 0.09,
    imageUri:
      "https://static.vecteezy.com/ti/vetor-gratis/p3/12932238-icone-de-contagem-regressiva-60-dias-restantes-para-promocao-de-vendas-banner-promocional-de-vendas-faltam-60-dias-gratis-vetor.jpg",
  },
];
export default function App() {
  const [nome, setNome] = useState("");
  const [valor1, setValor1] = useState(undefined);
  const [valor2, setValor2] = useState(undefined);
  const [valor3, setValor3] = useState(undefined);

  const soma = () => {
    // valor1 = Refrigerantes
    // valor2 = Salgadinhos
    // valor3 = Sobremesa
    let resultado =
      parseFloat(valor1 ?? 0) * 4.3 +
      parseFloat(valor2 ?? 0) * 5.25 +
      parseFloat(valor3 ?? 0) * 100.0;
    return resultado;
  };

  const CliqueSimples = async (item) => {
    if (!nome) {
      alert("Por favor preencha o nome do comprador.");
      Speech.speak("Por favor preencha o nome do comprador.", {
        language: "pt-BR",
        voice: "pt-br-x-pte-local",
      });
      return 0;
    }
    const total = soma();
    const descAcres = total * item.percentual;

    const totalFinal = item.id == "3" ? total + descAcres : total - descAcres;

    if (totalFinal > 0) {
      alert(`${nome} o total da sua compra foi de R$${totalFinal.toFixed(2)}`);

      Speech.speak(
        `${nome} o total da sua compra foi de R$${totalFinal.toFixed(2)}`,
        {
          language: "pt-BR",
          voice: "pt-br-x-pte-local",
        }
      );
    } else {
      alert("Você deve pedir ao menos 1 produto.");
      Speech.speak("Você deve pedir ao menos 1 produto.", {
        language: "pt-BR",
        voice: "pt-br-x-pte-local",
      });
    }
  };
  const CliqueLongo = (item) => {
    CliqueSimples(item);
  };
  const renderItemNovo = ({ item }) => {
    return (
      <View style={styles.item} key={item.id}>
        <TouchableOpacity
          style={styles.title}
          onPress={() => CliqueSimples(item)}
          onLongPress={() => CliqueLongo(item)}
        >
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
          placeholder="Nome..."
          onChangeText={(nome) => setNome(nome)}
          value={nome}
        ></TextInput>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Qtd Refrigerantes: UN "
          onChangeText={(val1) => setValor1(val1 === "" ? 0 : val1)}
          value={valor1}
        ></TextInput>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Qtd Salgadinhos: UN "
          onChangeText={(val2) => setValor2(val2 === "" ? 0 : val2)}
          value={valor2}
        ></TextInput>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Qtd Sobremesa: KG ex(1.250)"
          onChangeText={(val3) => setValor3(val3 === "" ? 0 : val3)}
          value={valor3}
        ></TextInput>
      </View>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItemNovo}
          keyExtractor={(item) => item.id}
        />
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
    width: 40,
    height: 40,
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
