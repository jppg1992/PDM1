import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";

export default function MapIf() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -31.3302738,
        longitude: -54.0719644,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02,
      }}
    >
      <Marker
        coordinate={{
          latitude: -31.3305838,
          longitude: -54.0711444,
        }}
        title={"IFsul-Aula de PDM1"}
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
