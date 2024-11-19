import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Exemple d'una pantalla
import PgPreguntes from './screens/PgPreguntes';
import Informacio from './screens/Informacio';
import Puntuacio from './screens/Puntuacio';


const Stack = createNativeStackNavigator();


export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
       <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
       <Stack.Screen name="PgPreguntes" component={PgPreguntes} options={{ headerShown: false }}/>
       <Stack.Screen name="Informacio" component={Informacio} options={{ headerShown: false }}/>
       <Stack.Screen name="Puntuacio" component={Puntuacio} options={{ headerShown: false }}/>
     </Stack.Navigator>
   </NavigationContainer>
 );
}
