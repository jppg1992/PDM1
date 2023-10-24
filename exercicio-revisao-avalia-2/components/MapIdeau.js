import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";

export default function MapIdeau() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -31.37562386996,
        longitude: -54.104449381141,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02,
      }}
    >
      <Marker
        coordinate={{
          latitude: -31.37562386996,
          longitude: -54.104449381141,
        }}
        title={"Ideau-Aula de PDM1"}
        description={"Aula de mapas"}
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
