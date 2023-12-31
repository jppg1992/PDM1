import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {  StyleSheet,View, Text, Image, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from "react-native";
import styles from '../../../../styles.js'
 
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

const PagarReserva = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const { quarto } = route.params;
  const CliqueSimples = async (item) => {
    await Speech.speak(
      `Você confirmou o pagamento com ${item.title} a reserva do quarto ${quarto.descricao} número ${quarto.numero}, no valor total de R$${quarto.valor}`,
      {
        language: "pt-BR",
        voice: "pt-br-x-ptd-local",
      }
    );
    navigation.navigate("Nossa Localização");
  };
  const CliqueLongo = (item) => {
    alert(`Item Clicado Longo ${item.title}`);
  };
  const renderItemNovo = ({ item }) => {
    return (
      <View style={styled.item} key={item.id}>
        <TouchableOpacity style={styles.title} onPress={() => CliqueSimples(item)} onLongPress={() => CliqueLongo(item)}>
          <View style={styled.detalheItem}>
            <Image source={{ uri: item.imageUri }} style={styled.itemImage} />
            <Text style={styled.buttonText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <View style={styles.itemCard} key={quarto.id}>
        <View style={styles.alinhamentoLinha}>
          <Image style={styles.image} source={{ uri: quarto.foto }} />

          {/* // coloca alinhamento em coluna justificado flex-start */}
          <View style={styles.alinhamentoColuna}>
            <Text style={styles.itemStyle}>{quarto.descricao}</Text>
            <Text style={styles.itemStyle}> {quarto.numero}</Text>
            <Text style={styles.itemStyle}> R${quarto.valor}</Text>
            {/* fecha alinhamento colunas */}
          </View>
          {/* fecha alinhamento linhas */}
        </View>
      </View>
      <SafeAreaView style={styled.buttonContainer} >
        <FlatList data={DATA} renderItem={renderItemNovo} keyExtractor={(item) => item.id} />
      </SafeAreaView>

      <StatusBar style="auto" />
    </>
  );
};

export default PagarReserva;

const styled = StyleSheet.create({


  itemStyle: {
    fontSize: 14,
    padding: 5,
  },
  buttonContainer: {
   
    paddingTop: 50,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  item: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 2,
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
})
