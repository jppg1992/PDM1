import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform, Pressable, StyleSheet, Text,
  TextInput, TouchableOpacity, View, Image, AlertButton, Alert
} from 'react-native'
import { Cachorro } from '../../model/Cachorro'
import { CachorroService } from '../../servico/CachorroService'

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


const ManterCachorro = () => {
  const [formCachorro, setFormCachorro] = useState<Partial<Cachorro>>({})
  const [pickedImagePath, setPickedImagePath] = useState("");
  const route = useRoute();
  const { cachorro } = route.params

  const pastaImagens = `${FileSystem.documentDirectory}imagensAppCachorro/`;

  const navigation = useNavigation()

  useEffect(() => {
    buscaCachorro(cachorro)
  }, [cachorro])


  const buscaCachorro = (cachorro: Cachorro) => {
    setFormCachorro(cachorro);
    if (cachorro.foto!=null){
      setPickedImagePath(cachorro.foto)
    }
  };

  const salvar = async () => {
    if (formCachorro.id) {
      const cachorro = new Cachorro(formCachorro)
      console.log(cachorro)
      const result = await CachorroService.update(cachorro)
      alert('Registro atualizado!');
      limparFormulario();
    } else {
      const cachorro = new Cachorro(formCachorro)
      const result = await CachorroService.create(cachorro)
      alert('Registro Adicionado!');
      limparFormulario();
    }
  }

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
      console.log(destino)
      setFormCachorro({
        ...
        formCachorro, foto: destino
      })
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
      console.log(destino)
      setFormCachorro({
        ...
        formCachorro, foto: destino
      })
      return destino;

      // return Asset.fromURI(foto.assets[0].uri).downloadAsync();
    }

  };


  const tirarFoto = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galeriaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus !== 'granted' && galeriaStatus !== 'granted') {
      throw new Error('Permissões de acesso à câmera e à galeria negadas');
    }

    const galeria: AlertButton = { text: "Abrir a galeria", onPress: () => abrirGaleria() }
    const camera: AlertButton = { text: "Abrir a câmera", onPress: () => abrirCamera() }
    Alert.alert('Local da foto', 'escolha', [galeria, camera])
  };


  const limparFormulario = () => {
    setFormCachorro({})
    setPickedImagePath("")
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>

      <View style={styles.inputContainer}>
        <Pressable onPress={() => tirarFoto()}>
          <View style={styles.imageContainer}>
            {pickedImagePath !== "" && (
              <Image source={{ uri: pickedImagePath }} style={styles.image} />
            )}
            {pickedImagePath === "" && (
              <Image source={require("../../../assets/camera.png")}
                style={styles.image} />
            )}
          </View>
        </Pressable>

        <TextInput
          placeholder="Nome"
          value={formCachorro.nome}
          onChangeText={nome => setFormCachorro({
            ...formCachorro,
            nome: nome
          })}
          style={styles.input}
        />
        <TextInput
          placeholder="Raça"
          value={formCachorro.raca}
          onChangeText={raca => setFormCachorro({
            ...formCachorro,
            raca: raca
          })}
          style={styles.input}
        />
        <TextInput
          placeholder="Sexo"
          value={formCachorro.sexo}
          onChangeText={sexo => setFormCachorro({
            ...formCachorro,
            sexo: sexo
          })}
          style={styles.input}
        />
        <TextInput
          placeholder="Data Nascimento"
          value={formCachorro.datanascimento?.toString()}
          onChangeText={datanascimento => setFormCachorro({
            ...formCachorro,
            datanascimento: datanascimento
          })}
          style={styles.input}
        />
        {/* <TextInput
          placeholder="Foto"
          value={formCachorro.foto?.toString()}
          onChangeText={foto => setFormCachorro({
            ...formCachorro,
            foto: foto
          })}
          style={styles.input}
        /> */}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={salvar}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={limparFormulario}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default ManterCachorro

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  imageContainer: {
    padding: 30,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    resizeMode: "cover",
  },
})