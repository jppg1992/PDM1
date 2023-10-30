import React from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { Marker } from "react-native-maps";

import * as Speech from "expo-speech";

const DATA = [
  {
    id: "1",
    title: "Município: Hulha Negra",
    imageUri:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bandeira-hulhanegra.jpg/120px-Bandeira-hulhanegra.jpg",
  },
  {
    id: "2",
    title: "População: 6.894",
    imageUri:
      "data:image/png;base64,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",
  },
  {
    id: "3",
    title: "PIB: R$ 213.292,63",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnFvkJq0bKoevObHflkUZfm8PgZaB7K6U4UA&usqp=CAU",
  },
];
export default function MapBage() {
  const CliqueSimples = async (item) => {
    await Speech.speak(`${item.title}`, {
      language: "pt-BR",
      voice: "pt-br-x-ptd-local",
    });
  };
  const CliqueLongo = async (item) => {
    const navigation = useNavigation();
    await Speech.speak(`${item.title}`, {
      language: "pt-BR",
      voice: "pt-br-x-ptd-local",
    });
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
            <Image
              source={{ uri: item.imageUri }}
              style={styles.itemImage}
              key={item.id}
            />
            <Text style={styles.buttonText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={renderItemNovo}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -31.407868075151647,
          longitude: -53.868801845885365,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
      >
        <Marker
          coordinate={{
            latitude: -31.407868075151647,
            longitude: -53.868801845885365,
          }}
          title={"Bagé"}
          description={"Município de Bagé"}
        ></Marker>
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "50%",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    width: "80%",
    marginLeft: 10,
  },
  item: {
    display: "flex",
    textAlign: "center",

    backgroundColor: "blue",
    color: "white",
    padding: 4,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 32,
    marginLeft: 10,
  },
  itemImage: {
    width: 56,
    height: 56,
    borderRadius: 100,
  },
  detalheItem: {
    display: "flex",
    flexDirection: "row",
  },
});
