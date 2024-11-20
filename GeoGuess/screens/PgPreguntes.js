import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import MapView, { Marker, Polyline } from 'react-native-maps';
import db from '../Firebase/FirebaseConfig';
import haversine from 'haversine';
import { useNavigation } from '@react-navigation/native';

const PgPreguntes = () => {
    const [questionsList, setQuestionsList] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userMarkerPosition, setUserMarkerPosition] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [distance, setDistance] = useState(null);
    const navigation = useNavigation();

    const fetchQuestions = async () => {
        try {
            const qCol = collection(db, 'Preguntes');
            const questionsSnapshot = await getDocs(qCol);
            const qList = questionsSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    Title: data.Title,
                    Geopoint: {
                        latitude: data.Geopoint.latitude,
                        longitude: data.Geopoint.longitude,
                    },
                };
            });
            setQuestionsList(qList);
            if (qList.length > 0) {
                setCurrentQuestionIndex(0);
            }
        } catch (error) {
            console.error('Error al carregar les preguntes:', error);
        }
    };

    const handleCheck = () => {
        if (userMarkerPosition) {
            setIsChecked(true);
            const from = userMarkerPosition;
            const to = questionsList[currentQuestionIndex].Geopoint;

            // Comprova que hi ha dades de Geopoint per a la pregunta
            if (to && to.latitude && to.longitude) {
                const distanceCalculated = haversine(from, to, { unit: 'kilometer' });
                setDistance(distanceCalculated); // Guarda la distància calculada
            } else {
                Alert.alert('Ubicació no vàlida', 'Aquesta pregunta no té ubicació associada.');
            }
        } else {
            Alert.alert('Atenció!', 'Si us plau, selecciona la teva resposta al mapa abans de fer clic a "Check".');
        }
    };

    const nextQuestion = () => {
        if (isChecked) {
            // Afegir la distància calculada a la pregunta
            const currentDist = distance;
            questionsList[currentQuestionIndex].distance = currentDist;

            setUserMarkerPosition(null);
            setIsChecked(false);
            setDistance(null);
            if (currentQuestionIndex < questionsList.length - 1) {
                setCurrentQuestionIndex((prev) => prev + 1);
            } else {
                // Un cop es van passar totes les preguntes, navega a la pantalla de puntuació
                const distances = questionsList.map((question) => question.distance || 0);
                navigation.navigate('Puntuacio', { distances });
            }
        } else {
            Alert.alert('Atenció!', 'Si us plau, selecciona la teva resposta al mapa abans de continuar.');
        }
    };

    const finishQuiz = () => {
        // Afegir la distància de la última pregunta abans d'acabar
        if (distance) {
            questionsList[currentQuestionIndex].distance = distance;
        }
        navigation.navigate('Puntuacio', { distances: questionsList.map((q) => q.distance || 0) });
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    if (questionsList.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.loading}>Carregant pregunta...</Text>
            </View>
        );
    }

    const currentQuestion = questionsList[currentQuestionIndex];

    return (
        <View style={styles.container}>
            {/* Indicador de pregunta (número de la pregunta i total) */}
            <View style={styles.questionNumberContainer}>
                <Text style={styles.questionNumber}>
                    {`Pregunta ${currentQuestionIndex + 1} de ${questionsList.length}`}
                </Text>
            </View>

            {/* Títol de la pregunta */}
            <View style={styles.questionContainer}>
                <Text style={styles.question}>
                    {currentQuestion?.Title}
                </Text>
            </View>

            {/* Mapa a la part central */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 40.4637, // Centre aproximat d'Espanya
                    longitude: -3.7492, // Centre aproximat d'Espanya
                    latitudeDelta: 8.5, // Ajusta aquest valor per a l'ampliació vertical
                    longitudeDelta: 8.5, // Ajusta aquest valor per a l'ampliació horitzontal
                }}
                onPress={(e) => {
                    if (!isChecked) {
                        setUserMarkerPosition(e.nativeEvent.coordinate);
                    }
                }}
                mapType="satellite"
                showsCompass={false}
                showsUserLocation={false}
            >
                {/* Aquí van els markers i polyline */}
                {isChecked && currentQuestion?.Geopoint && (
                    <Marker
                        coordinate={currentQuestion?.Geopoint}
                        title="Ubicació real"
                        pinColor="green"
                    />
                )}

                {userMarkerPosition && (
                    <Marker
                        coordinate={userMarkerPosition}
                        title="Resposta Seleccionada"
                        pinColor={isChecked && distance < 10 ? 'green' : 'red'}
                    />
                )}

                {userMarkerPosition && isChecked && (
                    <Polyline
                        coordinates={[currentQuestion?.Geopoint, userMarkerPosition]}
                        strokeColor="yellow"
                        strokeWidth={3}
                    />
                )}
            </MapView>


            {isChecked && distance && (
                <Text style={styles.distanceText}>
                    Distància entre punts: {distance.toFixed(2)} Km.
                </Text>
            )}

            <View style={styles.bottomContainer}>
                {currentQuestionIndex < questionsList.length - 1 ? (
                    <>
                        {/* Botons per a preguntes anteriors a l'última */}
                        <TouchableOpacity style={styles.checkButton} onPress={handleCheck}>
                            <Text style={styles.checkButtonText}>Check</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={nextQuestion}>
                            <Text style={styles.buttonText}>Següent pregunta</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        {/* Botó Check per a l'última pregunta */}
                        {!isChecked && (
                            <TouchableOpacity style={styles.checkButton} onPress={handleCheck}>
                                <Text style={styles.checkButtonText}>Check</Text>
                            </TouchableOpacity>
                        )}

                        {/* Botó Next només si s'ha fet Check */}
                        {isChecked && (
                            <TouchableOpacity style={styles.checkButton} onPress={finishQuiz}>
                                <Text style={styles.checkButtonText}>Next</Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4caf50',
        paddingTop: 40, // Augmenta la separació superior
        paddingBottom: 40,
        paddingHorizontal: 10,
    },
    questionNumberContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#4caf50',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        zIndex: 10, // Perquè estigui per sobre del mapa i altres components
    },
    questionNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: 10,
    },
    questionContainer: {
        width: '100%', // Ocupa tot l'ample
        backgroundColor: '#4caf50',
        paddingVertical: 15,
        paddingTop: 20,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 5,
    },
    question: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    map: {
        width: '100%',
        height: 500,
        marginBottom: 10,
        borderRadius: 15,
    },
    bottomContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
    },
    checkButton: {
        backgroundColor: '#81c774',
        paddingVertical: 12,
        paddingHorizontal: 100,
        borderRadius: 25,
        marginBottom: 10,
    },
    checkButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#81c774',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginTop: 15,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    distanceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8B0000', // Canviat a vermell
        marginBottom: 10,
        textAlign: 'center', // Alineació al centre
    },
    loading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4caf50',
    },
});

export default PgPreguntes;
