import React, { useState } from 'react';
import { TouchableOpacity, Text, View, VirtualizedList, StyleSheet } from 'react-native';

import colors from '../../styles/colors.jsx';

const ScrollableTracking = () => {
    const data = [
        { fecha: "07:00:00 - 09:00:00", id: "7-9" },
        { fecha: "09:00:00 - 11:00:00", id: "9-11" },
        { fecha: "11:00:00 - 13:00:00", id: "11-13" },
        { fecha: "13:00:00 - 15:00:00", id: "13-15" },
        { fecha: "15:00:00 - 17:00:00", id: "15-17" },
        { fecha: "17:00:00 - 19:00:00", id: "17-19" },
        { fecha: "19:00:00 - 21:00:00", id: "19-21" },
        { fecha: "21:00:00 - 23:00:00", id: "21-23" },
        { fecha: "23:00:00 - 01:00:00", id: "23-01" },
        { fecha: "01:00:00 - 03:00:00", id: "01-03" },
        { fecha: "03:00:00 - 05:00:00", id: "03-05" },
        { fecha: "05:00:00 - 07:00:00", id: "05-07" },
    ];

    const [selectedButton, setSelectedButton] = useState('');

    const handleButtonPress = (id) => {
        if (selectedButton === id) {
            setSelectedButton('');
        } else {
            setSelectedButton(id);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.fecha}</Text>
            <TouchableOpacity
                style={[
                    styles.button,
                    item.id === selectedButton ? styles.selectedButton : null,
                ]}
                onPress={() => handleButtonPress(item.id)}
            >
                <Text style={item.id === selectedButton ? styles.selectedButtonText : styles.buttonText}>Ver</Text>
            </TouchableOpacity>
        </View>
    );

    const getItemCount = () => data.length;

    const getItem = (data, index) => data[index];

    return (
        <View style={{ flex: 1 }}>
            <VirtualizedList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
                getItemCount={getItemCount}
                getItem={getItem}
                style={{ backgroundColor: 'white', paddingHorizontal: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
       
    },
    itemText: {
        flex: 1,
        marginRight: 10,
        color: 'black',
    },
    button: {
        width: 60,
        backgroundColor: colors.SECONDARY2,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: colors.PRIMARY, // Cambia el color al presionar el botón'
    },
    selectedButtonText: {
        color: colors.WHITE, // Cambia el color del texto'
        fontWeight: 'bold',
    },
    buttonText: {
        color: colors.BLACK,
        fontWeight: 'bold',
    },
});

export default ScrollableTracking;
