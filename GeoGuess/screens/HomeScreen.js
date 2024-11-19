import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/images/geoguess.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>

        {/* Título "GEO" en la parte superior con el icono más grande */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>GE</Text>
          <Image source={require('../assets/logo.png')} style={styles.logoImage} />
        </View>

        {/* Texto "GUESS" en una línea separada */}
        <Text style={styles.subtitleText}>GUESS</Text>

        {/* Botón de "Let's start!" */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.startButton} 
            onPress={() => navigation.navigate('PgPreguntes')}>
            <Text style={styles.startButtonText}>Let's start!</Text>
          </TouchableOpacity>

          {/* Botón de información al lado del botón de inicio */}
          <TouchableOpacity 
            style={styles.infoButton} 
            onPress={() => navigation.navigate('Informacio')}>
            <Text style={styles.infoText}>i</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Colocar el contenido más arriba
    paddingTop: 100, // Ajusta este valor para subir el contenido
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, // Espacio pequeño entre "GEO" y "GUESS"
  },
  titleText: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#2e7d32',
    fontFamily: 'Georgia', // Usa una fuente serif para darle un toque más elegante
  },
  logoImage: {
    width: 90, // Icono más grande
    height: 60,
    marginLeft: 0,
  },
  subtitleText: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#2e7d32',
    fontFamily: 'Georgia', // Fuente serif para que coincida con el estilo del título
    marginBottom: 30, 
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, 
  },
  startButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginRight: 30,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Verdana',
  },
  infoButton: {
    backgroundColor: '#4caf50', 
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 24,
    color: '#ffffff',
  },
});
