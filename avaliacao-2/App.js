import * as React from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import MapHulha from "./components/MapHulha";
import MapBage from "./components/MapBage";
import MapAcegua from "./components/MapAcegua";

function BageScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MapBage />
    </View>
  );
}

function HulhaScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MapHulha />
    </View>
  );
}

function AceguaScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MapAcegua />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Aceguá">
        <Drawer.Screen name="Aceguá" component={AceguaScreen} />
        <Drawer.Screen name="Bagé" component={BageScreen} />
        <Drawer.Screen name="Ulha Negra" component={HulhaScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
