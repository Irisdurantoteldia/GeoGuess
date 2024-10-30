import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Exemple d'una pantalla
import DetailsScreen from './screens/DetailsScreen'; // Exemple d'una altra pantalla
import Page1 from './screens/Page1';
import Page2 from './screens/Page2';


const Stack = createNativeStackNavigator();


export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
       <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
       <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }}/>
       <Stack.Screen name="Page1" component={Page1} options={{ headerShown: false }}/>
       <Stack.Screen name="Page2" component={Page2} options={{ headerShown: false }}/>
     </Stack.Navigator>
   </NavigationContainer>
 );
}
