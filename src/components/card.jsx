import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children }) => {
    return (
        <View style={styles.card}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'center', // Alineación vertical centrada
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
});

export default Card;
