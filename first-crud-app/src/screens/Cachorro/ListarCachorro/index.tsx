import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Pressable, KeyboardAvoidingView, Alert, AlertButton, FlatList } from "react-native";

import meuestilo from "../../../../meuestilo";
import { useFocusEffect } from "@react-navigation/native";
import { Cachorro } from "../../../models/Cachorro";
import { CachorroService } from "../../../services/CachorroService";

const ListarCachorros = () => {
  const [cachorros, setCachorros] = useState<Cachorro[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();

  const loadCachorros = async () => {
    setIsRefreshing(true);
    try {
      const result = await CachorroService.findAll();
      setCachorros(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCachorros();
      console.log("useFocus");
    }, [])
  );

  const deleteCachorro = (cachorro: Cachorro) => {
    const cancelBtn: AlertButton = { text: "Cancelar" };
    const deleteBtn: AlertButton = {
      text: "Apagar",
      onPress: () => {
        CachorroService.delete(cachorro).then(() => loadCachorros());
      },
    };

    Alert.alert(`Apagar cachorro "${cachorro.nome}?"`, "Essa ação não pode ser desfeita!", [deleteBtn, cancelBtn]);
  };

  const editCachorro = (item: Cachorro) => {
    navigation.navigate("Manter Cachorro", { cachorro: item });
  };

  const render = ({ item }: { item: Cachorro }) => {
    return (
      <View style={meuestilo.itemCard} key={item.id}>
        <Pressable
          style={({ pressed }) => [{ backgroundColor: pressed ? "#f1f1f1" : "transparent" }, meuestilo.listItem]}
          onLongPress={() => deleteCachorro(item)}
          onPress={() => {
            editCachorro(item);
          }}
        >
          {/* <Image source={{ uri: item.imageUri }} style={meuestilo.itemImage} /> */}
          <View>
            <Text>ID: {item.id}</Text>
            <Text>Nome: {item.nome}</Text>
            <Text>Raça: {item.raca}</Text>
            <Text>Nascimento: {item.datanascimento}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={meuestilo.containerlistar} behavior="padding">
      <FlatList
        data={cachorros}
        renderItem={render}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={() => loadCachorros()}
        refreshing={isRefreshing}
      />
    </KeyboardAvoidingView>
  );
};
export default ListarCachorros;
