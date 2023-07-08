import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../styles/colors';
import ScrollTracking from '../components/tracking/scrollTracking';

const SelectComponent = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const options = [
        { label: 'Seleccione o salir', value: '' },
        { label: 'Hoy', value: '10' },
        { label: '08/06/2023', value: '9' },
        { label: '07/06/2023', value: '8' },
        { label: '06/06/2023', value: '7' },
        { label: '05/06/2023', value: '6' },
        { label: '04/06/2023', value: '5' },
        { label: '03/06/2023', value: '4' },
        { label: '02/06/2023', value: '3' },
        { label: '01/06/2023', value: '2' },
        { label: '31/05/2023', value: '1' },
        // Resto de las opciones
    ];

    const handleValueChange = (itemValue) => {
        if (itemValue != '') {
            setSelectedValue(itemValue);
            console.log('Opción seleccionada:', itemValue);
        } else {
            console.log('Opcion seleccionada:', selectedValue);
        }


        // Agregar lógica adicional para cerrar el modal si es necesario
    };

    return (
        <View style={{flex:1}}>
            <View style={styles.pickerContainer}>
                <View style={styles.container}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={handleValueChange}
                        style={styles.picker}
                        mode="modal"
                        dropdownIconColor={colors.WHITE}
                        dropdownStyle={styles.dropdownStyle}
                    >
                        {options.map((option) => (
                            <Picker.Item
                                borderWidth={2}
                                key={option.value}
                                label={option.label}
                                value={option.value}
                                style={styles.pickerItem}
                            />
                        ))}
                    </Picker>
                </View>
            </View>
            <View style={{flex:1, backgroundColor:colors.WHITE}}>
                <ScrollTracking/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 30,
        backgroundColor: 'black',
        borderRadius: 20,
        justifyContent: 'center', // Centra verticalmente los elementos dentro del contenedor
        marginHorizontal: 20,
    },
    picker: {
        maxWidth: 300,
        width: '100%', // Ancho del Picker al 100% del contenedor
        color: 'white', // Color del texto seleccionado

    },
    pickerItem: {
        maxWidth: 120,
        fontSize: 13, // Tamaño de letra para las opciones
    },
    dropdownStyle: {
        backgroundColor: 'black',
        maxWidth: 300,
        width: 120, // Ancho deseado del modal  
    },
    pickerContainer: {
        marginTop: 10,
        height: 50,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center', // Centra verticalmente los elementos dentro del contenedor
    },
});

export default SelectComponent;
