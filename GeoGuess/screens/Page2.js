import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

// Conjunt de localitzacions de drift al Japó (latitud, longitud, descripció)
const locations = [
  { id: 1, latitude: 35.6062, longitude: 139.4044, title: "Daikoku Futo", description: "Un dels llocs més populars per fer drift a Yokohama." },
  { id: 2, latitude: 35.7051, longitude: 139.8125, title: "Tama River", description: "Zona coneguda per les curses de carrer a Tòquio." },
  { id: 3, latitude: 34.6959, longitude: 135.5104, title: "Meihan Sportsland", description: "Un circuit conegut a Nara per competicions de drift." },
  { id: 4, latitude: 34.4697, longitude: 135.7947, title: "Kansai Circuit", description: "Un circuit molt popular entre els aficionats al drift a Osaka." },
  { id: 5, latitude: 35.3342, longitude: 138.6939, title: "Fuji Speedway", description: "Un circuit emblemàtic que acull esdeveniments de motors." },
  { id: 6, latitude: 35.4101, longitude: 138.2492, title: "Hakone Turnpike", description: "Una carretera muntanyenca popular per a les curses de drift." },
  { id: 7, latitude: 35.3606, longitude: 138.7274, title: "Izu Skyline", description: "Una carretera escènica ideal per fer drift i gaudir de les vistes." },
  { id: 8, latitude: 37.7922, longitude: 139.0918, title: "Aso Farm Land", description: "Un bon lloc per a l'exhibició de vehicles i activitats de drift." },
];

export default function Page2({ navigation }) {
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.title}>Localitzacions Drift Japó</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35.6812, // Coordenades inicials (Exemple: Tòquio)
          longitude: 139.7671,
          latitudeDelta: 5, // Ampliem el delta per mostrar més àrea
          longitudeDelta: 5,
        }}
      >
        {/* Mostra els marcadors per a cada localització de drift */}
        {locations.map(location => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.title}
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{location.title}</Text>
                <Text>{location.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Botó per tornar enrere */}
      <Button
        title="Torna enrere"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

// Estils per al component
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  map: {
    width: '100%',
    height: '70%', 
  },
  callout: {
    width: 150, // Amplada del callout
  },
  calloutTitle: {
    fontWeight: 'bold',
  },
});
