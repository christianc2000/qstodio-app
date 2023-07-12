import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../api';
import React, { useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import CallLog from 'react-native-call-log';


const sendContactsToAPI = async (contacts, llamadas, id) => {
    try {
        // Verificar si los contactos ya se han enviado previamente

        console.log('ingresaaaaaaaaaa a sendContactsToAPI');
        // Aquí debes realizar la llamada a tu API utilizando la biblioteca de tu elección (por ejemplo, axios)
        // Pasar los contactos obtenidos en la solicitud POST
        await axios.post(`${API_URL}contact/store/contacts-json`, {
            contacts: contacts,
            children_id: id
        })
        console.log("ENVIÓ CONTACTOS");
        await axios.post(`${API_URL}call/store/calls`, {
            calls: llamadas,
            children_id: id
        })
        console.log("ENVIÓ LLAMADAS");
        // Una vez que la solicitud sea exitosa, guardar un indicador en AsyncStorage para marcar que los contactos se han sincronizado
        await AsyncStorage.setItem('contactsSynced', 'true');
        await AsyncStorage.setItem('llamadaSynced', 'true');
        console.log('Contactos y llamadas enviados exitosamente');
      
    } catch (error) {
        console.log('Error al enviar los contactos a la API:', error);
    }
};

const requestContactsPermission = async () => {
    try {
        console.log("permiso para contactos");
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title: 'Contacts',
                message: 'This app would like to view your contacts.',
                buttonPositive: 'Please accept bare mortal',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("permiso aceptado contacto");
            const formattedContacts = await fetchContacts();
            return formattedContacts;
        } else {
            console.log('Contacts permission denied');
            return [];
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

const componentDidMount = async () => {
    try {
        console.log("permiso para llamadas");
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
            {
                title: 'Call Log Example',
                message: 'Access your call logs',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("permiso aceptado llamadas");
            const formattedCallHistory = await fetchCallHistory();
            return formattedCallHistory;
        } else {
            console.log('Call Log permission denied');
            return [];
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

const fetchContacts = () => {
    return new Promise((resolve, reject) => {
        Contacts.getAll()
            .then((contacts) => {
                const filteredContacts = contacts
                    .filter((contact) => contact.phoneNumbers[0]?.number)
                    .sort((a, b) => a.displayName.localeCompare(b.displayName));

                const formattedContacts = filteredContacts.map((contact, index) => ({
                    id: index + 1,
                    name: contact.displayName,
                    number: contact.phoneNumbers[0]?.number || '',
                }));

                console.log(formattedContacts);
                // setContacts(formattedContacts);
                resolve(formattedContacts);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

const fetchCallHistory = () => {
    return new Promise((resolve, reject) => {
        CallLog.loadAll()
            .then((callHistory) => {
                const formattedCallHistory = callHistory.map((call, index) => {
                    const seconds = call.duration;
                    const minutes = Math.floor(seconds / 60);
                    const hours = Math.floor(minutes / 60);
                    const remainingSeconds = seconds % 60;

                    return {
                        id: index + 1,
                        ...call,
                        duration: {
                            hours,
                            minutes,
                            seconds: remainingSeconds,
                        },
                    };
                });

                console.log("LLAMADAS: ", formattedCallHistory);
                // setCallHistory(formattedCallHistory);
                resolve(formattedCallHistory);
                // Aquí puedes hacer lo que necesites con el historial de llamadas
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

const getContactAndGetCall = async () => {
    console.log('ingresaaaaaaaaaa a getContactAndGetCall');


    const contactsSynced = await AsyncStorage.getItem('contactsSynced');
    const llamadaSynced = await AsyncStorage.getItem('llamadaSynced');

    console.log('ingresaaaaaaaaaa a getContactAndGetCall2');
    if (!contactsSynced && !llamadaSynced) {
        // useEffect(() => {

        const id = await AsyncStorage.getItem('id_infantes');
        console.log('ingresaaaaaaaaa *****************************', id);

        // console.log(response.data);
        const contactsHistory = await requestContactsPermission();

        const callsHistory = await componentDidMount();
        // }, []);


        console.log('ingresaaaaaaaaaa a getContactAndGetCall3s');
        sendContactsToAPI(contactsHistory, callsHistory, id);
    } else {
        console.log('Los contactos y llamadas ya se han enviado previamente');
    }

}
export default getContactAndGetCall;
