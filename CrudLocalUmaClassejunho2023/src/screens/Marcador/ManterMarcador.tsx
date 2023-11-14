import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Marcador } from '../../model/Marcador'
import { MarcadorService } from '../../servico/MarcadorService'

const ManterMarcador = () => {
  const [formMarcador, setFormMarcador] = useState<Partial<Marcador>>({})

  const route = useRoute();
  const { marcador } = route.params

  const navigation = useNavigation()

  useEffect(() => {
    buscaMarcador(marcador)
  }, [marcador])


  const buscaMarcador = (marcador: Marcador) => {
    setFormMarcador(marcador);
  };

  const salvar = async () => {
    if (formMarcador.id) {
      const marcador = new Marcador(formMarcador)
      console.log(marcador)
      const result = await MarcadorService.update(marcador)
      alert('Registro atualizado!');
      limparFormulario();
    } else {
      const marcador = new Marcador(formMarcador)
      const result = await MarcadorService.create(marcador)
      alert('Registro Adicionado!');
      limparFormulario();
    }
  }

  const limparFormulario = () => {
    setFormMarcador({})
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Titulo"
          value={formMarcador.titulo}
          onChangeText={titulo => setFormMarcador({
            ...formMarcador,
            titulo: titulo
          })}
          style={styles.input}
        />
        <TextInput
          placeholder="Descrição"
          value={formMarcador.descricao}
          onChangeText={descricao => setFormMarcador({
            ...formMarcador,
            descricao: descricao
          })}
          style={styles.input}
        />
        <TextInput
          placeholder="Referencia"
          value={formMarcador.referencia}
          onChangeText={referencia => setFormMarcador({
            ...formMarcador,
            referencia: referencia
          })}
          style={styles.input}
        />
        <TextInput
          placeholder="Latitude"
          value={formMarcador.lat?.toString()}
          onChangeText={lat => setFormMarcador({
            ...formMarcador,
            lat: lat
          })}
          style={styles.input}
        />
        <TextInput
          placeholder="Longitude"
          value={formMarcador.lon?.toString()}
          onChangeText={lon => setFormMarcador({
            ...formMarcador,
            lon: lon
          })}
          style={styles.input}
        />
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

export default ManterMarcador

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
})