import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Text>User:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: 200,
          marginVertical: 10,
          paddingHorizontal: 10,
        }}
        placeholder="Escriu el teu nom"
        value={userName}
        onChangeText={text => setUserName(text)}
      />

      <Button
        title="Go to Page1"
        onPress={() => navigation.navigate('Page1', { userName })}
      />
      <Button
       title="Go to Page2"
       onPress={() => navigation.navigate('Page2')}
     />
    </View>
  );
}
