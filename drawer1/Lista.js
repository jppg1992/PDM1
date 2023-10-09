import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,  
  View,
  Image,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    imageUri:'https://conteudo.imguol.com.br/c/entretenimento/54/2020/04/28/cachorro-pug-1588098472110_v2_900x506.jpg.webp'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    imageUri:'https://conteudo.imguol.com.br/c/entretenimento/54/2020/04/28/cachorro-pug-1588098472110_v2_900x506.jpg.webp'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    imageUri:'https://conteudo.imguol.com.br/c/entretenimento/54/2020/04/28/cachorro-pug-1588098472110_v2_900x506.jpg.webp'
  },
];


const Lista = () => {
  const [selectedId, setSelectedId] = useState(null);

  
  const LongClick=(item)=>{
    alert('voce pressionou longo e '+ item.title);
   }
 
   const ShortClick=(item)=>{
    alert('voce pressionou curto e '+ item.title);
   }

  const renderItemNovo = ({ item })=> {
    return <View style={meuestilo.item} key={item.id}>
        <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? '#f1f1f1' : 'transparent' }, meuestilo.title]}
            onLongPress={() => { LongClick(item) }}
            onPress={() => { ShortClick(item) }}
        >
            
            <View>
                <Image source={{ uri: item.imageUri }} style={meuestilo.itemImage} /> 
                <Text style={meuestilo.id}>Id: {item.id}</Text>
                <Text style={meuestilo.title}>Title: {item.title}</Text>
            </View>
        </Pressable>
    </View>
}

  
  return (
    <SafeAreaView style={meuestilo.container}>
      <FlatList
        data={DATA}
        renderItem={renderItemNovo}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const meuestilo = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  
  itemImage: {
    width: 64,
    height: 64,
    marginLeft: 10,
    marginRight: 15,
    backgroundColor: '#eee',
    borderRadius: 40,
    elevation: 2
}
});

export default Lista;