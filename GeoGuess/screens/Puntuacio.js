import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const Puntuacio = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { distances } = route.params; // Array de distàncies des de 'PgPreguntes'

    const scoringRules = [
        { range: '+2000km', min: 2000, max: Infinity, score: 0 },
        { range: '1501-2000km', min: 1501, max: 2000, score: 1 },
        { range: '1001-1500km', min: 1001, max: 1500, score: 2 },
        { range: '801-1000km', min: 801, max: 1000, score: 3 },
        { range: '601-800km', min: 601, max: 800, score: 4 },
        { range: '401-600km', min: 401, max: 600, score: 5 },
        { range: '201-400km', min: 201, max: 400, score: 6 },
        { range: '101-200km', min: 101, max: 200, score: 7 },
        { range: '51-100km', min: 51, max: 100, score: 8 },
        { range: '11-50km', min: 11, max: 50, score: 9 },
        { range: '0-10km', min: 0, max: 10, score: 10 },
    ];

    const calculateScore = (distance) => {
        for (let rule of scoringRules) {
            if (distance >= rule.min && distance <= rule.max) {
                return rule.score;
            }
        }
        return 0;
    };

    const [scores, setScores] = useState([]);
    const [averageScore, setAverageScore] = useState(0);

    useEffect(() => {
        const calculatedScores = distances.map((distance) => calculateScore(distance));
        setScores(calculatedScores);

        const totalScore = calculatedScores.reduce((acc, curr) => acc + curr, 0);
        const average = totalScore / calculatedScores.length || 0;
        setAverageScore(average.toFixed(2));
    }, [distances]);

    return (
        <View style={styles.container}>
            {/* Títol */}
            <Text style={styles.title}>Resultat Final</Text>

            {/* Contenidor de resultats */}
            <View style={styles.resultContainer}>
                {/* Llista de puntuacions */}
                <FlatList
                    data={distances.map((distance, index) => ({
                        key: index.toString(),
                        index: index + 1, // Índex amb numeració començant des de 1
                        distance,
                        score: calculateScore(distance),
                    }))}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <View style={styles.indexContainer}>
                                <Text style={styles.indexText}>{item.index}</Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.text}>Distància: {item.distance.toFixed(2)} km</Text>
                                <Text style={styles.text}>Puntuació: {item.score}/10</Text>
                            </View>
                        </View>
                    )}
                />

                {/* Línia separadora */}
                <View style={styles.separator} />

                {/* Puntuació mitjana */}
                <Text style={styles.averageText}>Total: {averageScore}/10</Text>
            </View>

            {/* Botó per tornar a l'inici */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Tornar a l'Inici</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4caf50', // Fons verd per tota la pantalla
        justifyContent: 'center', // Centrar tot el contingut
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 40,
    },
    resultContainer: {
        backgroundColor: '#ffffff', // Fons blanc per a la taula de resultats
        borderRadius: 10,
        padding: 30,  // Augmentem el padding per fer més gran el contenidor
        width: '90%', // Ample de la taula
        maxHeight: 500, // Limitar l'altura màxima (més gran)
    },
    item: {
        backgroundColor: '#81c774',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Arial Rounded MT Bold',
    },
    separator: {
        height: 1,
        backgroundColor: '#cccccc',
        marginVertical: 15,
    },
    averageText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fbc02d', // Color groc per la puntuació mitjana
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#ffffff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
        width: '60%',
        marginVertical: 30, // Ajustat més amunt
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4caf50', // Text verd
    },
    item: {
        backgroundColor: '#81c774',
        flexDirection: 'row', // Per alinear el número amb els detalls
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
    },
    indexContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4caf50', // Color de fons per al número
        width: 30, // Ample fix per a la numeració
        height: 30, // Altura fixada
        borderRadius: 15, // Forma circular
        marginRight: 10, // Espai entre el número i els detalls
    },
    indexText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    detailsContainer: {
        flex: 1, // Ajusta l'espai restant per al text
    },

});

export default Puntuacio;
