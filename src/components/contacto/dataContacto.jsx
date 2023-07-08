import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from '../card.jsx';
import colors from '../../styles/colors.jsx';

const ScrollableContainer = React.memo(({ nombre, nro }) => {
    return (

        <View style={styles.cardContainer}>
            <View style={styles.textContainer}>
                <Text style={[styles.texto, { fontWeight: 'bold' }]}>{nombre}</Text>
                <Text style={styles.texto}>{nro}</Text>
            </View>
        </View>

    );
});

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
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
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    texto: {
        fontSize: 14,
        color: colors.BLACK,
    },
});

export default ScrollableContainer;
