import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
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
    title: "IFSul",
    name: "Ifsul",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBRHdTA0-Nk6TemNzZcxRUbMUw1JZYxhpxbvwGoacSGlCuzZNhxMeBadi_7-f-08fka-g&usqp=CAU",
  },
  {
    id: "2",
    title: "Unipampa",
    name: "Unipampa",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYd1rHdTvItnL5Icynw6WkOnquZwx-4OMm7cFIwAoNbg&s",
  },
  {
    id: "3",
    title: "Ideau",
    name: "Ideau",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLbRPdNe-Y9ArvMfREY7Mn5I9gwpXZQLKw0Sz7RPI3tw&s",
  },
  {
    id: "4",
    title: "Todos",
    name: "Todos",
    imageUri:
      "https://tm.ibxk.com.br/2021/12/20/20095730932072.jpg?ims=1200x675",
  },
];
export default function Lista() {
  const navigation = useNavigation();
  const CliqueSimples = async (item) => {
    await Speech.speak(`Você clicou em ${item.name}`, {
      language: "pt-BR",
      voice: "pt-br-x-ptd-local",
    });
    navigation.navigate(item.title);
  };
  const CliqueLongo = async (item) => {
    const navigation = useNavigation();
    await Speech.speak(`Você clicou em ${item.name}`, {
      language: "pt-BR",
      voice: "pt-br-x-ptd-local",
    });

    navigation.navigate(`${item.name}`);
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
    <View style={styles.container}>
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
    width: 64,
    height: 64,
    borderRadius: 100,
  },
  detalheItem: {
    display: "flex",
    flexDirection: "row",
  },
});
