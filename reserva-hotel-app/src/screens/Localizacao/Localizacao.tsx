import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View,Text } from "react-native";
import { Marker } from "react-native-maps";

export default function Localizacao() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}> Hotel Lager</Text>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -31.33036476513109,
        longitude: -54.10718015146392,
        latitudeDelta: 1.2,
        longitudeDelta: 1.2,
      }}
    >
      <Marker
        coordinate={{
          latitude: -31.866252707300827,
          longitude: -54.16524504731189,
        }}
        title={"Hotel Lagers Acegúa"}
        description={"Nossa filial em Acegúa"}
      ></Marker>

      <Marker
        coordinate={{
          latitude: -31.33036476513109,
          longitude: -54.10718015146392,
        }}
        title={"Hotel Lagers Bagé"}
        description={"Nossa matriz em Bagé"}
      ></Marker>

      <Marker
        coordinate={{
          latitude: -31.407868075151647,
          longitude: -53.868801845885365,
        }}
        title={"Hotel Lagers Hulha Negra"}
        description={"Nossa filial em Hulhe Negra"}
      ></Marker>
    </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    marginTop:5,
    width: "100%",
    height: "85%",
  },

  texto:{
    width: "100%",
    height: "10%",
    backgroundColor: "#0782F9",
    color: "#FFFFFF",
    textAlign: "center", 
    paddingTop:5,
    fontSize:35
  },
  container:{
    backgroundColor: "#FFFFFF",
    height: "100%",
  }
});
