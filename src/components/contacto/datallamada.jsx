import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../card';
import colors from '../../styles/colors';

const CallItem = ({ type, duration, date, contact }) => {
    const renderCallTypeIcon = () => {
        let iconSource;

        switch (type) {
            case 1://llamada entrante
                iconSource = require('../../imagenes/llamadas/llamadaEntrante.png');
                break;
            case 2://llamada saliente
                iconSource = require('../../imagenes/llamadas/llamadaSaliente.png');
                break;
            case 3://llamada perdida
                iconSource = require('../../imagenes/llamadas/llamadaPerdida.png');
                break;
            case 5://llamada rechazada
                iconSource = require('../../imagenes/llamadas/llamadaRechazada.png');
                break;
            default:
                iconSource = null;
        }

        return (
            <Image style={styles.callTypeIcon} source={iconSource} />
        );
    };
    return (
        <View style={{ paddingBottom: 5 }}>
            <Card >
                <View style={[styles.cardContainer]}>
                    {renderCallTypeIcon()}
                    <View style={styles.callDetails}>
                        <Text style={styles.contactName}>{contact.name === null ? 'Desconocido' : contact.name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.callInfo}>
                                {type === 1 ? 'Llamada entrante' : type === 2 ? 'Llamada saliente' : type === 3 ? 'Llamada perdida' : type === 4 ? 'llamada rechazada' : ''}
                            </Text>
                            <Text style={styles.contactNumber}>{contact.number}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.callInfo}>{`${duration}`}</Text>
                            <Text style={styles.callInfo}>{` ${date}`}</Text>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    callTypeIcon: {
        width: 30,
        height: 30,
        marginRight: 10,

    },
    callDetails: {
        flex: 1,

    },
    contactName: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    contactNumber: {
        fontSize: 14,
        color: colors.SECONDARY,
    },
    callInfo: {
        fontSize: 12,
        color: '#999999',

    },
    cardContainer: {
        flexDirection: 'row',
    },
    textContainer: {

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    texto: {
        fontSize: 14,
        color: "#333",

    },
});

export default CallItem;
