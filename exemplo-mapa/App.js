import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";

export default function App() {
  return (
    <View style={styles.container}>
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
            latitude: -31.3302738,
            longitude: -54.0719644,
          }}
          title={"Titulo do Marcador"}
          description={"Aqui vai mais informação"}
        ></Marker>

        <Marker
          coordinate={{
            latitude: -31.3305838,
            longitude: -54.0711444,
          }}
          title={"IFsul-Aula de PDM1"}
          description={"Aula de mapas"}
        ></Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: "25%",
    paddingTop: "25%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
