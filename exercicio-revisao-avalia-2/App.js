import * as React from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { useNavigation } from "@react-navigation/native";
import MapIdeau from "./components/MapIdeau";
import MapIf from "./components/MapIf";
import MapUni from "./components/MapUni";
import Lista from "./components/Lista";
import MapTodos from "./components/MapTodos";

function IfScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MapIf />
    </View>
  );
}

function UniScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MapUni />
    </View>
  );
}

function IdeauScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MapIdeau />
    </View>
  );
}

function ListaScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Lista />
    </View>
  );
}

function TodosScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MapTodos />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Lista">
        <Drawer.Screen name="IFSul" component={IfScreen} />
        <Drawer.Screen name="Unipampa" component={UniScreen} />
        <Drawer.Screen name="Ideau" component={IdeauScreen} />
        <Drawer.Screen name="Lista" component={ListaScreen} />
        <Drawer.Screen name="Todos" component={TodosScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
