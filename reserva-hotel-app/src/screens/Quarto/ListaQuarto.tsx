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
import { Quarto } from "../../model/Quarto";
import styles from "../../../styles";
import { useFocusEffect } from "@react-navigation/native";
import { QuartoService } from "../../service/QuartoService";

const ListarQuartos = () => {
  const [quartos, setQuartos] = useState<Quarto[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();
  const loadQuartos = async () => {
    setIsRefreshing(true);
    try {
      const result = await QuartoService.findAll();
      setQuartos(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadQuartos();
      console.log("useFocus");
    }, [])
  );

  const deleteQuarto = (quarto: Quarto) => {
    const cancelBtn: AlertButton = { text: "Cancelar" };
    const deleteBtn: AlertButton = {
      text: "Apagar",
      onPress: () => {
        QuartoService.delete(quarto).then(() => loadQuartos());
      },
    };

    Alert.alert(`Apagar quarto "${quarto.numero}?"`, "Essa ação não pode ser desfeita!", [deleteBtn, cancelBtn]);
  };

  const editQuarto = (item: Quarto) => {
    navigation.navigate("Manter Quarto", { quarto: item });
  };

  const render = ({ item }: { item: Quarto }) => {
    return (
      <View style={styles.itemCard} key={item.id}>
        <Pressable
          style={({ pressed }) => [{ backgroundColor: pressed ? "#f1f1f1" : "transparent" }, styles.listItem]}
          onLongPress={() => deleteQuarto(item)}
          onPress={() => {
            editQuarto(item);
          }}
        >
          <View style={styles.alinhamentoLinha}>
            <Image style={styles.image} source={{ uri: item.foto }} />

            {/* // coloca alinhamento em coluna justificado flex-start */}
            <View style={styles.alinhamentoColuna}>
              <Text style={styles.itemStyle}>{item.descricao}</Text>
              <Text style={styles.itemStyle}>{item.numero} </Text>
              <Text style={styles.itemStyle}>R${item.valor} </Text>

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
        data={quartos}
        renderItem={render}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={() => loadQuartos()}
        refreshing={isRefreshing}
      />
    </KeyboardAvoidingView>
  );
};
export default ListarQuartos;
