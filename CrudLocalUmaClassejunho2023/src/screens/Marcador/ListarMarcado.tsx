import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
    View, Text, Pressable, TouchableOpacity, KeyboardAvoidingView, Alert, Platform, AlertButton, Button, FlatList
} from 'react-native';
import { Marcador } from '../../model/Marcador';
import { MarcadorService } from '../../servico/MarcadorService';
import meuestilo from '../../../meuestilo';
import { useFocusEffect } from '@react-navigation/native';

const ListarMarcadores = () => {
    const [marcadores, setMarcadores] = useState<Marcador[]>([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const navigation = useNavigation();

    const loadMarcadores = async () => {
        setIsRefreshing(true);
        try {
            const result = await MarcadorService.findAll();
            setMarcadores(result);
        } catch (error) {
            console.log(error);
        } finally {
            setIsRefreshing(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadMarcadores();
            console.log("useFocus")
        }, [])
    );

    const deleteMarcador = (marcador: Marcador) => {
        const cancelBtn: AlertButton = { text: 'Cancelar' }
        const deleteBtn: AlertButton = {
            text: 'Apagar',
            onPress: () => {
                MarcadorService.delete(marcador).then(() => loadMarcadores())
            }
        }

        Alert.alert(`Apagar marcador "${marcador.titulo}?"`, 'Essa ação não pode ser desfeita!', [deleteBtn, cancelBtn])
    }

    const editMarcador = (item: Marcador) => {
        navigation.navigate('Manter Marcador', { marcador: item });
    }

    const render = ({ item }: { item: Marcador }) => {
        return <View style={meuestilo.itemCard} key={item.id}>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? '#f1f1f1' : 'transparent' }, meuestilo.listItem]}
                onLongPress={() => deleteMarcador(item)}
                onPress={() => { editMarcador(item) }}
            >
                {/* <Image source={{ uri: item.imageUri }} style={meuestilo.itemImage} /> */}
                <View>
                    <Text>ID: {item.id}</Text>
                    <Text>Titulo: {item.titulo}</Text>
                    <Text>Descricao: {item.descricao}</Text>
                    <Text>Lat: {item.lat}</Text>
                    <Text>Lon: {item.lon}</Text>
                </View>
            </Pressable>
        </View>
    }


    return (
        <KeyboardAvoidingView
            style={meuestilo.containerlistar}
            behavior="padding"
        >
            <FlatList
                data={marcadores}
                renderItem={render}
                keyExtractor={item => item.id.toString()}
                onRefresh={() => loadMarcadores()}
                refreshing={isRefreshing}
            />
        </KeyboardAvoidingView>
    );
};
export default ListarMarcadores

