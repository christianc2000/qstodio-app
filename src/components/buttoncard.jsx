import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CardButton = ({ title, width, height, onPress, icon, lottie }) => {
    console.log(lottie);
    return (
        <TouchableOpacity style={[styles.button, { height: height, width: width, maxHeight: 140, maxWidth: 140 }]} onPress={onPress}>
            {icon ? (
                <Icon name={icon} size={22} color="#000000" />
            ) : (
                lottie === "w" ? (
                    <AnimatedLottieView
                        resizeMode="contain"
                        style={{ width: 48, height: 48 }}
                        source={require("../imagenes/Lottie/139413-whatsappp-icone-verde.json")}
                        autoPlay
                    />
                ) : (
                    lottie === "t" ? (
                        <AnimatedLottieView
                            resizeMode="contain"
                            style={{ width: 48, height: 48 }}
                            source={require("../imagenes/Lottie/44061-telegram.json")}
                            autoPlay
                            speed={0.4}
                        />
                    ) : (
                        lottie === "c" ? (
                            <AnimatedLottieView
                                resizeMode="contain"
                                style={{ width: 48, height: 48 }}
                                source={require("../imagenes/Lottie/19168-camara-de-fotos.json")}
                                autoPlay
                            />
                        ) : (
                            lottie === "d" && (
                                <AnimatedLottieView
                                    resizeMode="contain"
                                    style={{ width: 48, height: 48 }}
                                    source={require("../imagenes/Lottie/92418-downloading.json")}
                                    autoPlay
                                />
                            )
                        )
                    )
                )
            )}


            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center', // Alineación vertical centrada
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        paddingTop: 5
    },
});

export default CardButton;
