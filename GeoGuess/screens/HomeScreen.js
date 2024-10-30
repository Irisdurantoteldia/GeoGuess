import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/images/geoguess.jpg')} style={styles.backgroundImage}>
      {/* Contingut superposat a la imatge */}
      <View style={styles.overlay}>
        
        {/* Títol "GEO GUESS" amb logo a la "O" */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>GE</Text>
          <Image source={require('../assets/logo.png')} style={styles.logoImage} />
          <Text style={styles.titleText}> GUESS</Text>
        </View>

        {/* Botó de "Let's start!" */}
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={() => navigation.navigate('GameScreen')}>
          <Text style={styles.startButtonText}>Let's start!</Text>
        </TouchableOpacity>
        
        {/* Icona d'informació */}
        <TouchableOpacity 
          style={styles.infoButton} 
          onPress={() => navigation.navigate('InfoScreen')}>
          <Text style={styles.infoText}>i</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // La imatge ocupa tota la pantalla
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Lleuger fons blanc transparent per fer que el text sigui més llegible
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  logoImage: {
    width: 36,
    height: 36,
  },
  startButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 20,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#e0e0e0',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 24,
    color: '#555555',
  },
});
