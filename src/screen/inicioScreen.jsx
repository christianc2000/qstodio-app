import { SafeAreaView, Text, View } from 'react-native';
import { inicioStyles } from '../styles/style';
import React, { useState } from 'react';
import colors from '../styles/colors';
import CardButton from '../components/buttoncard';

const Inicio = ({ navigation }) => {
    const handleContactoPress = () => {
        // Lógica para manejar el evento de presionar el botón
        console.log('Botón presionado');
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                        <CardButton height={90} width={90} icon="map-marker" title="Tracking" onPress={() => navigation.navigate('Tracking')} />
                        <CardButton height={90} width={90} icon="address-book-o" title="Contacto" onPress={() => navigation.navigate('Contacto')} />
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
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Inicio;