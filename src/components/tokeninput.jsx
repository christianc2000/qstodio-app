import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const TokenInput = () => {
    const [token, setToken] = useState('');

    const handleTokenChange = (value, index) => {
        // Aquí puedes manejar el cambio de cada campo de entrada de token
        // Puedes almacenar los valores de cada campo en un arreglo o cualquier otra lógica que necesites
        console.log(`Token ${index + 1}: ${value}`);
    };

    return (
        <View style={styles.container}>
            {[...Array(6)].map((_, index) => (
                <View key={index} style={styles.inputContainer}>
                    <TextInput
                        key={index}
                        style={styles.input}
                        value={token[index]}
                        onChangeText={(value) => handleTokenChange(value, index)}
                        keyboardType="numeric"
                        maxLength={1}
                    />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 30,
    },
    inputContainer: {
        marginHorizontal: 2, // Espacio horizontal entre los campos de entrada
    },
    input: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        textAlign: 'center',
        color: colors.BLACK,
        borderColor: colors.PRIMARY
    },
});

export default TokenInput;
