import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Database } from "./src/database/Database";
import ListarClientes from "./src/screens/Cliente/ListaCliente";
import ManterCliente from "./src/screens/Cliente/ManterCliente";
import { Cliente } from "./src/model/Cliente";
import ManterQuarto from "./src/screens/Quarto/ManterQuarto";
import { Quarto } from "./src/model/Quarto";
import ListarQuartos from "./src/screens/Quarto/ListaQuarto";
import Localizacao from "./src/screens/Localizacao/Localizacao";
import ReservarQuarto from "./src/screens/Quarto/Reserva/ReservarQuarto";
import PagarReserva from "./src/screens/Quarto/Reserva/PagarReserva";

function NossaLocalizacao({}) {
  return <Localizacao />;
}

function ListarScreen({}) {
  return <ListarClientes />;
}

function ManteScreen({}) {
  return <ManterCliente />;
}

function RegistrarQuarto({}) {
  return <ManterQuarto />;
}

function ListaQuartos({}) {
  return <ListarQuartos />;
}

function ReservarQuartos({}) {
  return <ReservarQuarto />;
}

const Drawer = createDrawerNavigator();

export default function App() {
  useEffect(() => {
    // Database.ReinitDb().then(() => console.log("Banco Iniciado"))
    Database.initDb().then(() => console.log("Banco Iniciado"));
  }, []);
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Nossa Localização">
        <Drawer.Screen name="Nossa Localização" component={NossaLocalizacao} />
        <Drawer.Screen name="Listar Clientes" component={ListarScreen} />
        <Drawer.Screen name="Manter Cliente" component={ManteScreen} initialParams={{ cliente: new Cliente() }} />
        <Drawer.Screen name="Listar Quartos" component={ListaQuartos} />
        <Drawer.Screen name="Manter Quarto" component={RegistrarQuarto} initialParams={{ quarto: new Quarto() }} />
        <Drawer.Screen name="Reservar Quarto" component={ReservarQuartos} />
        <Drawer.Screen
          name="Pagar Reserva"
          component={PagarReserva}
          options={{
            drawerLabel: () => null, // Oculta o rótulo do menu
            drawerItemStyle: { display: "none" }, // Oculta o item do menu
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
