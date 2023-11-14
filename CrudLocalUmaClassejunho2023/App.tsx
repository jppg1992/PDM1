import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ManterMarcador from './src/screens/Marcador/ManterMarcador';
import { Database } from './src/database/Database';
import ListarMarcadores from './src/screens/Marcador/ListarMarcado';
import { Marcador } from './src/model/Marcador';

function ListarScreen({ }) {
  return (
    <ListarMarcadores></ListarMarcadores>
  );
}
function ManterScreen({ }) {
  return (
   <ManterMarcador></ManterMarcador>
  );
}
const Drawer = createDrawerNavigator();


 
export default function App() {
  useEffect(() => {
    // Database.ReinitDb().then(() => console.log("Banco Iniciado")) 
     Database.initDb().then(() => 
     console.log("Banco Iniciado")
     )
   }, []);
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Manter Marcador">
        <Drawer.Screen name="Manter Marcador" component={ManterScreen} 
          initialParams={{ marcador: new Marcador() }}/>
        <Drawer.Screen name="Listar Marcadores" component={ListarScreen} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}