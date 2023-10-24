import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";

export default function MapTodos() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -31.3305838,
        longitude: -54.0711444,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      <Marker
        coordinate={{
          latitude: -31.305804260761,
          longitude: -54.06443183068,
        }}
        title={"Unipampa-Aula de PDM1"}
        description={"Aula de mapas"}
      ></Marker>

      <Marker
        coordinate={{
          latitude: -31.3305838,
          longitude: -54.0711444,
        }}
        title={"IFsul-Aula de PDM1"}
        description={"Aula de mapas"}
      ></Marker>

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
