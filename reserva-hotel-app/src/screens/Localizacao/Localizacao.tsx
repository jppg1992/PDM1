import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";

export default function Localizacao() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -31.33036476513109,
        longitude: -54.10718015146392,
        latitudeDelta: 0.9,
        longitudeDelta: 0.9,
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
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
