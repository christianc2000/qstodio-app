import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, PermissionsAndroid } from 'react-native';

import colors from '../styles/colors';
import MenuWithContent from '../components/contacto/menucontacto';
import axios from 'axios';
import { API_URL } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Contacto = ({ navigation }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const idInfantes = await AsyncStorage.getItem('id_infantes');
                console.log('id infante: ' + idInfantes);
                const responseC = await axios.get(API_URL + 'contactos/' + idInfantes);
                console.log("DESE LA RESPUESTA" + responseC);
                setContacts(responseC);
                const responseL = await axios.get(API_URL + 'llamadas/' + idInfantes);
                setContacts(responseL);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // Aquí puedes agregar tus variables de estado, si es necesario
    const [contacts, setContacts] = useState([]);
    const [callHistory, setCallHistory] = useState([]);
    console.log("DESDE EL CONTACTO" + contacts.size);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MenuWithContent contacts={contacts.data} callHistory={callHistory.data} />
        </SafeAreaView>
    );
};

export default Contacto;
