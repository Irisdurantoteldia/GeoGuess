import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

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
                            <Text style={styles.cell}>{item.range}</Text>
                            <Text style={styles.cell}>{item.score}</Text>
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
        backgroundColor: '#81c774', // Fons lleugerament diferenciat
        borderRadius: 10,
        padding: 15,
        marginTop: 20, // Més avall del títol
        flex: 1, // Ocupa l'espai disponible
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15,
        textAlign: 'center',
    },
    tableContainer: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    cell: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        width: '45%',
        textAlign: 'center',
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
