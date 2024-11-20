import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function Informacio({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Header ajustat més avall */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Informació:</Text>
            </View>

            {/* Contingut principal */}
            <View style={styles.content}>
                <Text style={styles.title}>Rangs i puntuació</Text>

                {/* Contenidor amb subtítol i imatge al costat */}
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>Rangs i puntuacions:</Text>
                    <Image source={require('../assets/logo.png')} style={styles.logoImage} />
                </View>

                <ScrollView contentContainerStyle={styles.tableContainer}>
                    {[ 
                        { range: '+2000km', score: '0/10' },
                        { range: '1501-2000km', score: '1/10' },
                        { range: '1001-1500km', score: '2/10' },
                        { range: '801-1000km', score: '3/10' },
                        { range: '601-800km', score: '4/10' },
                        { range: '401-600km', score: '5/10' },
                        { range: '201-400km', score: '6/10' },
                        { range: '101-200km', score: '7/10' },
                        { range: '51-100km', score: '8/10' },
                        { range: '11-50km', score: '9/10' },
                        { range: '0-10km', score: '10/10' },
                    ].map((item, index) => (
                        <View key={index} style={styles.row}>
                            {/* Range */}
                            <View style={styles.cellContainer}>
                                <Text style={styles.cell}>{item.range}</Text>
                                {/* Línia sota el Range */}
                                <View style={styles.separator} />
                            </View>

                            {/* Score */}
                            <View style={styles.cellContainer}>
                                <Text style={styles.cell}>{item.score}</Text>
                                {/* Línia sota el Score */}
                                <View style={styles.separator} />
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Botó Go Back ajustat més amunt */}
            <TouchableOpacity
                style={styles.goBackButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.goBackText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4caf50', // Fons verd
        padding: 20,
        paddingBottom: 50,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20, // Ajusta la separació inferior
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#4caf50', // Fons semitransparent
        paddingTop: 60,
        borderRadius: 10,
    },
    content: {
        backgroundColor: '#ffffff', // Fons lleugerament diferenciat
        borderRadius: 10,
        padding: 15,
        marginTop: 20, // Més avall del títol
        flex: 1, // Ocupa l'espai disponible
        width: '90%', // Fa el container més estret
        alignSelf: 'center', // Centra el container
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15,
        textAlign: 'center',
    },
    subtitleContainer: {
        flexDirection: 'row', // Col·loca el subtítol i la imatge en una fila
        alignItems: 'center', // Centra verticalment el subtítol i la imatge
        marginBottom: 15, // Redueix la separació entre el subtítol i la taula
        marginTop: -40, // Ajusta la posició del subtítol
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 10,
        fontFamily: 'Arial Rounded MT Bold',
    },
    logoImage: {
        width: 90, // Icono més gran
        height: 60,
    },
    tableContainer: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10, // Augmenta el marge entre les files
    },
    cellContainer: {
        flex: 1, // Asegura que les cel·les tinguin el mateix ample
        alignItems: 'center', // Centrat de les cel·les
    },
    cell: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Arial Rounded MT Bold',
    },
    separator: {
        height: 1,                  // Alçada de la línia
        backgroundColor: 'black',   // Color negre
        marginVertical: 5,          // Espai entre la cel·la i la línia
        width: '100%',               // La línia ocupa tota l'amplada de la cel·la
    },
    goBackButton: {
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
        width: '60%',
        marginVertical: 20, // Ajustat més amunt
    },
    goBackText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4caf50', // Text verd
    },
});
