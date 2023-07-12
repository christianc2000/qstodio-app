import { loginStyles } from '../styles/style';
import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, Keyboard } from "react-native";
import LottieView from "lottie-react-native";
import CustomButton from '../components/buttonin';
import colors from '../styles/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API_URL } from '../api';
import axios, { Axios } from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getContactAndGetCall  from '../services/inicializacion';

const Login = ({ onLogin, navigation }) => {

    const [tokenArray, setTokenArray] = useState(Array(6).fill(''));
    const [errorMessage, setErrorMessage] = useState('');

    const inputRefs = useRef([]);

    const handleTokenChange = (value, index) => {
        const newTokenArray = [...tokenArray];
        newTokenArray[index] = value;
        setTokenArray(newTokenArray);

        if (newTokenArray.every(token => token !== '')) {
            setErrorMessage('');
        }
    };

    const handleTokenSubmit = async () => {
        if (tokenArray.some(token => token === '')) {
            setErrorMessage('Por favor, complete todos los campos');
            return;
        }

        const token = tokenArray.join('');
        console.log('Token ingresado:', token);
        //LLAMAMOS A LA API PARA VERIFICAR QUE EL TOKEN ESTÉ CORRECTO Y NOS PERMITA EL ACCESO, Y ESTO LUEGO SE GUARDARÁ EN ASYNC LOCALSTORAGE PARA QUE NO SEA NECESARIO ESTAR COLOCANDO EL TOKEN HASTA QUE SE DESHABILITE EL TOKEN
        if (token.length > 0) {
            try {
                const response = await axios.post(`${API_URL}register-token-kid`, {
                    token: token
                }).then((respon)=>{
                    console.log('ingresa xdxdxdxd ');

                    if (respon.status === 200) {
                        // Llamar a la función onLogin y pasar el token
                        onLogin(token);
                        
                    console.log('ingresa xdxdxdxd ', respon.data);
                        
    
                        getContactAndGetCall(respon.data.data.children_id);
                        
                        // Redirigir al usuario a la pantalla de Inicio
                        console.log("ANTES DEL NAVIGATION");
                       // navigation.navigate('Inicio');
                        console.log("DESPUÉS DEL NAVIGATION");
                        // sendContactsToAPI();
                    } else {
                        setErrorMessage('Error al iniciar sesión. Por favor, verifica el token.');
                    }
                });

                
            } catch (error) {
                console.log("ERROR EN LA PANTALLA LOGIN: " + error);

                if (error.response) {
                    const { status, data } = error.response;

                    if (status === 404) {
                        setErrorMessage('Token no encontrado. Por favor, verifica el token.');
                    } else if (status === 400) {
                        setErrorMessage('Token inválido. Por favor, intenta nuevamente.');
                    } else if (status === 409) {
                        setErrorMessage('Token ya utilizado. Por favor, inténtalo nuevamente.');
                    } else {
                        setErrorMessage('Error de conexión. Por favor, inténtalo nuevamente.');
                    }
                } else {
                    setErrorMessage('Error de conexión. Por favor, inténtalo nuevamente.');
                }
            }
        } else {
            console.log("no se guardo correctamente los datos del input del token");
        }



    };


    const handleInputSubmit = (index) => {
        if (index < tokenArray.length - 1) {
            inputRefs.current[index + 1].focus();
        } else {
            Keyboard.dismiss();
            handleTokenSubmit();
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                extraScrollHeight={200}
            >
                <View style={loginStyles.container}>
                    <View style={loginStyles.containerOn}>
                        <LottieView
                            resizeMode={"contain"}
                            style={{ width: 250, height: 250 }}
                            source={require("../imagenes/Lottie/68033-black-family.json")}
                            autoPlay
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "500",
                                color: "#333",
                                marginBottom: 20,
                            }}
                        >
                            Ingresa tu token de acceso
                        </Text>
                        <View style={styles.container}>
                            {[...Array(6)].map((_, index) => (
                                <View key={index} style={styles.inputContainer}>
                                    <TextInput
                                        ref={ref => inputRefs.current[index] = ref}
                                        style={styles.input}
                                        value={tokenArray[index]}
                                        onChangeText={(value) => handleTokenChange(value, index)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                        returnKeyType={index < tokenArray.length - 1 ? 'next' : 'done'}
                                        onSubmitEditing={() => handleInputSubmit(index)}
                                    />
                                </View>
                            ))}
                        </View>

                        {errorMessage !== '' && (
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                        )}

                        <CustomButton label={"Ingresar"} padding={10} onPress={handleTokenSubmit} />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
    },
    inputContainer: {
        marginHorizontal: 2,
    },
    input: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        textAlign: 'center',
        color: 'black',
        borderColor: colors.PRIMARY,
    },
    errorMessage: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default Login;
