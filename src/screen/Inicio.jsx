import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { inicioStyles } from '../styles/style';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import CardButton from '../components/buttoncard';
import axios from 'axios';
import { API_URL } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Inicio = ({ onLogout}) => {
    const navigation = useNavigation();

    const handleContactoPress = () => {
        // Lógica para manejar el evento de presionar el botón
        console.log('Botón presionado');
    };
    const [currentAccessToken, setCurrentAccessToken] = useState();

    useEffect(() => {
        if (!currentAccessToken) {
            retrieveAccessToken();
        }
    }, []);

    const retrieveAccessToken = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            setCurrentAccessToken(token);
        } catch (error) {
            console.log('Error retrieving access token:', error);
        }
    };


    const handleTokenLogout = async () => {
        console.log('accessToken: ' + currentAccessToken);
        try {
            console.log(`${API_URL}disabled/token`);
            const response = await axios.post(`${API_URL}disabled/token`, {
                token: currentAccessToken
            });
            if (response.status === 200) {
                onLogout();
                console.log("Logout exitoso");
            } else {
                console.log("No se pudo hacer el logout");
            }
        } catch (error) {
            console.log('Error disabling token en INICIO:', error);
        }
    }
    const handleTrackingPress = () => {
        navigation.navigate('Tracking');
    };

    const handleContactoNavigate = () => {
        navigation.navigate('Contacto');
    };

    const [isHeaderVisible, setHeaderVisible] = useState(true);

    const handleScroll = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const headerHeight = 50; // Ajusta esto al tamaño real de tu header

        if (currentOffset > headerHeight) {
            setHeaderVisible(false);
        } else {
            setHeaderVisible(true);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={inicioStyles.container}>
                    <View style={inicioStyles.containerOnBottom}>
                        <Text style={{
                            padding: 25,
                            fontSize: 22,
                            fontWeight: "700",
                            color: colors.BLACK,
                        }}>Información</Text>
                        <View style={[inicioStyles.containerFila]}>
                            <CardButton height={90} width={90} icon="user" title="Perfil" onPress={handleContactoPress} />
                            <CardButton height={90} width={90} icon="map-marker" title="Tracking" onPress={handleTrackingPress} />
                            <CardButton height={90} width={90} icon="address-book-o" title="Contacto" onPress={handleContactoNavigate} />
                        </View>
                        <Text style={{
                            padding: 25,
                            fontSize: 22,
                            fontWeight: "700",
                            color: colors.BLACK,
                        }}>Analizar</Text>
                        <View style={[inicioStyles.containerFila, { marginBottom: 10, justifyContent: 'space-between' }]}>
                            <CardButton height={140} width={140} lottie="w" title="Whatsapps" onPress={handleContactoPress} />
                            <CardButton height={140} width={140} lottie="t" title="Telegram" onPress={handleContactoPress} />
                        </View>
                        <View style={[inicioStyles.containerFila, { justifyContent: 'space-between' }]}>
                            <CardButton height={140} width={140} lottie="c" title="Cámara" onPress={handleContactoPress} />
                            <CardButton height={140} width={140} lottie="d" title="Descarga" onPress={handleContactoPress} />
                        </View>
                        <View style={{ marginTop: 100, paddingHorizontal: 25, alignItems: "center" }}>
                            <TouchableOpacity style={[styles.btn, { padding: 10 }]} onPress={handleTokenLogout}>
                                <Text style={styles.text}>Salir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#DD1D1D',
        borderRadius: 10,
        marginBottom: 10,
        width: "100%",
        height: 42,
        paddingHorizontal: 5,
    },
    text: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 14,
        color: '#fff',
    },
});

export default Inicio;
