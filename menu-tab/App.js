import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import OperacoesMat from './OperacoesMat';
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
     {/*   <Tab.Screen name="HomeImg" component={HomeScreen} 
        options={{
          tabBarIcon: () => (<Image source={require("./assets/favicon.png")} style={{width: 20, height: 20}} />)
      }}/> */}
      
      <Tab.Screen name="Home" component={HomeScreen} 
        options={{
          tabBarIcon: () => (<Icon  name="home" size={30} color="lightgreen"  />)
      }}/>
      
        <Tab.Screen name="Settings" component={SettingsScreen} 
        options={{
        tabBarIcon: () => (<Icon name="settings" size={30} color="lightgreen" />)
      }}/>
        <Tab.Screen name="Calculadora" component={OperacoesMat} 
        options={{
        tabBarIcon: () => (<Icon name="calculator" size={30} color="lightgreen" />)
      }}/>
      
        </Tab.Navigator>
    </NavigationContainer>
  );
}