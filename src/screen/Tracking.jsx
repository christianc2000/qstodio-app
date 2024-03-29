import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, PermissionsAndroid, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import colors from '../styles/colors';
import Select from '../components/selectTracking';
import axios from 'react-native-axios';
import { API_URL } from '../api';


const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            // Aquí puedes hacer lo que necesites con la ubicación (enviarla a la base de datos, etc.)
            console.log('Ubicación actual:', latitude, longitude);
        },
        (error) => {
            console.log('Error al obtener la ubicación:', error);
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
        }
    );
};

const Tracking = ({ navigation }) => {
    const [region, setRegion] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        requestLocationPermission();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentLocation();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const sendLocationToDatabase = (latitude, longitude) => {
        axios.post(`${API_URL}/token-infante`, {
            latitude: latitude,
            longitude: longitude,
        })
            .then((response) => {
                console.log('Ubicación enviada exitosamente a la base de datos:', response.data);
            })
            .catch((error) => {
                console.log('Error al enviar la ubicación a la base de datos:', error);
            });
    };

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getCurrentLocation();
            } else {
                console.log('Location permission denied');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
                setLoading(false); // Se establece loading en false después de obtener la ubicación
            },
            (error) => {
                console.log(error);
                setLoading(false); // Se establece loading en false en caso de error
            },
            { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.mainContainer}>

                {/* Mapa de Google */}
                <View style={styles.mapContainer}>
                    {loading ? ( // Se muestra el indicador de carga mientras loading es true
                        <ActivityIndicator style={[styles.loadingIndicator, { backgroundColor: 'white' }]} size="large" color={colors.GRAYTEXTLIGHT} />
                    ) : (
                        <MapView style={styles.map} region={region} showsUserLocation={true} />
                    )}
                </View>

                {/* Selector de opciones */}
                <Select />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.YELLOW2,
    },
    mapContainer: {
        height: 300,
        marginTop: 5,
        marginHorizontal: 20,
        borderWidth: 2,
        borderColor: colors.GRAYTEXTLIGHT,
    },
    map: {
        flex: 1,
    },

    loadingIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Tracking;
