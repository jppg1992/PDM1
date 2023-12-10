import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  AlertButton,
  Alert,
} from "react-native";
import { Cliente } from "../../model/Cliente";
import { ClienteService } from "../../service/ClienteService";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const ManterCliente = () => {
  const [formCliente, setFormCliente] = useState<Partial<Cliente>>({});
  const [pickedImagePath, setPickedImagePath] = useState("");
  const route = useRoute();
  const { cliente } = route.params;

  const pastaImagens = `${FileSystem.documentDirectory}imagensAppHotel/`;

  const navigation = useNavigation();

  useEffect(() => {
    buscaCliente(cliente);
  }, [cliente]);

  const buscaCliente = (cliente: Cliente) => {
    setFormCliente(cliente);
    if (cliente.foto != null) {
      setPickedImagePath(cliente.foto);
    }
  };

  const salvar = async () => {
    if (formCliente.id) {
      const cliente = new Cliente(formCliente);
      console.log(cliente);
      const result = await ClienteService.update(cliente);
      alert("Registro atualizado!");
      limparFormulario();
    } else {
      const cliente = new Cliente(formCliente);
      const result = await ClienteService.create(cliente);
      alert("Registro Adicionado!");
      limparFormulario();
    }
  };

  const abrirGaleria = async () => {
    let foto: ImagePicker.ImagePickerResult;
    foto = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(foto);
    if (!foto.canceled) {
      setPickedImagePath(foto.assets[0].uri);
      const nomeImagem = `${Date.now()}.jpg`;
      const destino = pastaImagens + nomeImagem;

      await FileSystem.makeDirectoryAsync(pastaImagens, { intermediates: true });
      await FileSystem.copyAsync({ from: foto.assets[0].uri, to: destino });
      console.log(destino);
      setFormCliente({
        ...formCliente,
        foto: destino,
      });
      return destino;

      // return Asset.fromURI(foto.assets[0].uri).downloadAsync();
    }
  };

  const abrirCamera = async () => {
    let foto: ImagePicker.ImagePickerResult;
    foto = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(foto);
    if (!foto.canceled) {
      setPickedImagePath(foto.assets[0].uri);
      const nomeImagem = `${Date.now()}.jpg`;
      const destino = pastaImagens + nomeImagem;

      await FileSystem.makeDirectoryAsync(pastaImagens, { intermediates: true });
      await FileSystem.copyAsync({ from: foto.assets[0].uri, to: destino });
      console.log(destino);
      setFormCliente({
        ...formCliente,
        foto: destino,
      });
      return destino;

      // return Asset.fromURI(foto.assets[0].uri).downloadAsync();
    }
  };

  const tirarFoto = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galeriaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus !== "granted" && galeriaStatus !== "granted") {
      throw new Error("Permissões de acesso à câmera e à galeria negadas");
    }

    const galeria: AlertButton = { text: "Abrir a galeria", onPress: () => abrirGaleria() };
    const camera: AlertButton = { text: "Abrir a câmera", onPress: () => abrirCamera() };
    Alert.alert("Local da foto", "escolha", [galeria, camera]);
  };

  const limparFormulario = () => {
    setFormCliente({});
    setPickedImagePath("");
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.inputContainer}>
        <Pressable onPress={() => tirarFoto()}>
          <View style={styles.imageContainer}>
            {pickedImagePath !== "" && <Image source={{ uri: pickedImagePath }} style={styles.image} />}
            {pickedImagePath === "" && <Image source={require("../../../assets/camera.png")} style={styles.image} />}
          </View>
        </Pressable>

        <TextInput
          placeholder="Nome"
          value={formCliente.nome}
          onChangeText={(nome) =>
            setFormCliente({
              ...formCliente,
              nome: nome,
            })
          }
          style={styles.input}
        />
        <TextInput
          placeholder="CPF"
          value={formCliente.cpf}
          onChangeText={(cpf) =>
            setFormCliente({
              ...formCliente,
              cpf: cpf,
            })
          }
          style={styles.input}
        />
        <TextInput
          placeholder="Endereço"
          value={formCliente.endereco}
          onChangeText={(endereco) =>
            setFormCliente({
              ...formCliente,
              endereco: endereco,
            })
          }
          style={styles.input}
        />
        <TextInput
          placeholder="Data Nascimento"
          value={formCliente.datanascimento?.toString()}
          onChangeText={(datanascimento) =>
            setFormCliente({
              ...formCliente,
              datanascimento: datanascimento,
            })
          }
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={salvar} style={styles.button}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={limparFormulario} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ManterCliente;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  imageContainer: {
    padding: 10,
    marginLeft: 50,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    resizeMode: "cover",
  },
});
