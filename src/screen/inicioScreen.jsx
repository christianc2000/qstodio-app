import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { inicioStyles } from '../styles/style';
import React, { useState } from 'react';
import colors from '../styles/colors';
import CardButton from '../components/buttoncard';

const Inicio = ({ navigation }) => {
    const handleContactoPress = () => {
        // Lógica para manejar el evento de presionar el botón
        console.log('Botón presionado');
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
                        <View style={{ marginTop: 100, paddingHorizontal: 25, alignItems: "center" }}>
                            <TouchableOpacity
                                style={[styles.btn, { padding: 10 }]}
                            >
                                <Text style={styles.text}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
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