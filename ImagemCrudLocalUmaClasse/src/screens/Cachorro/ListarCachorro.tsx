import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
    View, Text, Pressable, TouchableOpacity, KeyboardAvoidingView,
    Alert, Platform, AlertButton, Button, FlatList,
    Image
} from 'react-native';
import { Cachorro } from '../../model/Cachorro';
import { CachorroService } from '../../servico/CachorroService';
import meuestilo from '../../../meuestilo';
import { useFocusEffect } from '@react-navigation/native';


const ListarCachorroes = () => {
    const [cachorroes, setCachorroes] = useState<Cachorro[]>([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const navigation = useNavigation();
    const loadCachorroes = async () => {
        setIsRefreshing(true);
        try {
            const result = await CachorroService.findAll();
            setCachorroes(result);
        } catch (error) {
            console.log(error);
        } finally {
            setIsRefreshing(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadCachorroes();
            console.log("useFocus")
        }, [])
    );

    const deleteCachorro = (cachorro: Cachorro) => {
        const cancelBtn: AlertButton = { text: 'Cancelar' }
        const deleteBtn: AlertButton = {
            text: 'Apagar',
            onPress: () => {
                CachorroService.delete(cachorro).then(() => loadCachorroes())
            }
        }

        Alert.alert(`Apagar cachorro "${cachorro.nome}?"`, 'Essa ação não pode ser desfeita!', [deleteBtn, cancelBtn])
    }

    const editCachorro = (item: Cachorro) => {
        navigation.navigate('Manter Cachorro', { cachorro: item });
    }

    const render = ({ item }: { item: Cachorro }) => {
        return <View style={meuestilo.itemCard} key={item.id}>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? '#f1f1f1' : 'transparent' }, meuestilo.listItem]}
                onLongPress={() => deleteCachorro(item)}
                onPress={() => { editCachorro(item) }}
            >
                <View style={meuestilo.alinhamentoLinha}>
                    <Image style={meuestilo.image} source={{ uri: item.foto }} />

                    {/* // coloca alinhamento em coluna justificado flex-start */}
                    <View style={meuestilo.alinhamentoColuna}>
                        <Text style={meuestilo.itemStyle}>{item.nome}</Text>
                        <Text style={meuestilo.itemStyle}>{item.sexo} </Text>
                        {/* fecha alinhamento colunas */}
                    </View>
                    {/* fecha alinhamento linhas */}
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
                data={cachorroes}
                renderItem={render}
                keyExtractor={item => item.id.toString()}
                onRefresh={() => loadCachorroes()}
                refreshing={isRefreshing}
            />
        </KeyboardAvoidingView>
    );
};
export default ListarCachorroes

