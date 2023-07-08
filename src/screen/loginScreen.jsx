import { loginStyles } from '../styles/style';
import React, { useState } from 'react';
import { View, Text, SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";
import TokenInput from '../components/tokeninput';
import CustomButton from '../components/buttonin';


const Login = () => {
    const [token, setToken] = useState('');
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                            // fontFamily: 'roboto-medium',
                            fontSize: 20,
                            fontWeight: "500",
                            color: "#333",
                            marginBottom: 30,
                        }}
                    >
                        Ingresa tu token de acceso
                    </Text>
                    <TokenInput />
                    <CustomButton label={"Ingresar"} padding={10} />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Login;