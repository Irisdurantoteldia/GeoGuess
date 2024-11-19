import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

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
            <Text style={styles.title}>Resultat Final</Text>

            {/* Llista de puntuacions */}
            <FlatList
                data={distances.map((distance, index) => ({
                    key: index.toString(),
                    distance,
                    score: calculateScore(distance),
                }))}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.text}>Distància: {item.distance.toFixed(2)} km</Text>
                        <Text style={styles.text}>Puntuació: {item.score}/10</Text>
                    </View>
                )}
            />

            {/* Puntuació mitjana */}
            <Text style={styles.averageText}>Puntuació Mitjana: {averageScore}/10</Text>

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
        backgroundColor: '#4caf50',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 40,
        marginBottom: 20,
    },
    item: {
        backgroundColor: '#81c774',
        padding: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginVertical: 8,
        width: '100%',  // Fes que els quadres siguin més amples ajustant el percentatge
    },
    text: {
        fontSize: 16,
        color: 'white',
    },
    averageText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'yellow',
        padding: 20,
        marginVertical: 30,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#81c774',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 20,
        padding: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Puntuacio;
