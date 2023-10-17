import * as React from "react";
import { Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import MapIf from "./components/MapIf";
import { StyleSheet } from "react-native";
import MapUni from "./components/MapUni";
import MapIdeau from "./components/MapIdeau";
function IfScreen() {
  return (
    <View style={styles.mapContain}>
      <MapIf />
    </View>
  );
}

function UniScreen() {
  return (
    <View style={styles.mapContain}>
      <MapUni />
    </View>
  );
}

function IdeauScreen() {
  return (
    <View style={styles.mapContain}>
      <MapIdeau />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="IFSul"
          component={IfScreen}
          options={{
            tabBarIcon: () => (
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBRHdTA0-Nk6TemNzZcxRUbMUw1JZYxhpxbvwGoacSGlCuzZNhxMeBadi_7-f-08fka-g&usqp=CAU"
                style={{ width: 20, height: 20 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Unipampa"
          component={UniScreen}
          options={{
            tabBarIcon: () => (
              <Image
                style={{ width: 20, height: 20 }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYd1rHdTvItnL5Icynw6WkOnquZwx-4OMm7cFIwAoNbg&s"
              ></Image>
            ),
          }}
        />
        <Tab.Screen
          name="Ideau"
          component={IdeauScreen}
          options={{
            tabBarIcon: () => (
              <Image
                style={{ width: 20, height: 20 }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLbRPdNe-Y9ArvMfREY7Mn5I9gwpXZQLKw0Sz7RPI3tw&s"
              ></Image>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mapContain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  navContainer: {
    color: "green",
  },
});
