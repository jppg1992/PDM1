import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Platform,
  AlertButton,
  Button,
  FlatList,
  Image,
} from "react-native";
import { Cliente } from "../../model/Cliente";
import { ClienteService } from "../../service/ClienteService";
import styles from "../../../styles";
import { useFocusEffect } from "@react-navigation/native";

const ListarClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();
  const loadClientes = async () => {
    setIsRefreshing(true);
    try {
      const result = await ClienteService.findAll();
      setClientes(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadClientes();
      console.log("useFocus");
    }, [])
  );

  const deleteCliente = (cliente: Cliente) => {
    const cancelBtn: AlertButton = { text: "Cancelar" };
    const deleteBtn: AlertButton = {
      text: "Apagar",
      onPress: () => {
        ClienteService.delete(cliente).then(() => loadClientes());
      },
    };

    Alert.alert(`Apagar cliente "${cliente.nome}?"`, "Essa ação não pode ser desfeita!", [deleteBtn, cancelBtn]);
  };

  const editCliente = (item: Cliente) => {
    navigation.navigate("Manter Cliente", { cliente: item });
  };

  const render = ({ item }: { item: Cliente }) => {
    return (
      <View style={styles.itemCard} key={item.id}>
        <Pressable
          style={({ pressed }) => [{ backgroundColor: pressed ? "#f1f1f1" : "transparent" }, styles.listItem]}
          onLongPress={() => deleteCliente(item)}
          onPress={() => {
            editCliente(item);
          }}
        >
          <View style={styles.alinhamentoLinha}>
            <Image style={styles.image} source={{ uri: item.foto }} />

            {/* // coloca alinhamento em coluna justificado flex-start */}
            <View style={styles.alinhamentoColuna}>
              <Text style={styles.itemStyle}>Nome: {item.nome}</Text>
              <Text style={styles.itemStyle}>CPF: {item.cpf} </Text>
              <Text style={styles.itemStyle}>End.:{item.endereco} </Text>
              <Text style={styles.itemStyle}>Nasc.:{item.datanascimento} </Text>

              {/* fecha alinhamento colunas */}
            </View>
            {/* fecha alinhamento linhas */}
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.containerlistar} behavior="padding">
      <FlatList
        data={clientes}
        renderItem={render}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={() => loadClientes()}
        refreshing={isRefreshing}
      />
    </KeyboardAvoidingView>
  );
};
export default ListarClientes;
