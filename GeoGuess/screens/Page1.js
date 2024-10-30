import React from 'react';
import { View, Text, Button } from 'react-native';


export default function Page1({ route, navigation }) {
    const { userName } = route.params;

 return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <Text>Page1 Screen</Text>
     <Button
        title="Torna enrere"
        onPress={() => navigation.goBack()} 
      />
     <Button
       title="Go to Details"
       onPress={() => navigation.navigate('Details')}
     />
      {userName ? (
        <Text style={{ marginTop: 20 }}>Benvingut, {userName}!</Text>
      ) : null}
   </View>
 );
}
