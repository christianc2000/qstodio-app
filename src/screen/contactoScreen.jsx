import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import CallLog from 'react-native-call-log';

import colors from '../styles/colors';
import MenuWithContent from '../components/contacto/menucontacto';


const Contacto = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [callHistory, setCallHistory] = useState([]);

    useEffect(() => {
        requestContactsPermission();
        componentDidMount();
    }, []);

    const requestContactsPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: 'Contacts',
                    message: 'This app would like to view your contacts.',
                    buttonPositive: 'Please accept bare mortal',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                fetchContacts();
            } else {
                console.log('Contacts permission denied');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const componentDidMount = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
                {
                    title: 'Call Log Example',
                    message: 'Access your call logs',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                fetchCallHistory();
            } else {
                console.log('Call Log permission denied');
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    const fetchContacts = () => {
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
                setContacts(formattedContacts);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fetchCallHistory = () => {
        CallLog.loadAll()
            .then((callHistory) => {
                const formattedCallHistory = callHistory.map((call) => {
                    const seconds = call.duration;
                    const minutes = Math.floor(seconds / 60);
                    const hours = Math.floor(minutes / 60);
                    const remainingSeconds = seconds % 60;

                    return {
                        ...call,
                        duration: {
                            hours,
                            minutes,
                            seconds: remainingSeconds,
                        },
                    };
                });

                console.log("LLAMADAS: ", formattedCallHistory);
                setCallHistory(formattedCallHistory);
                // Aquí puedes hacer lo que necesites con el historial de llamadas
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MenuWithContent contacts={contacts} callHistory={callHistory} />

        </SafeAreaView>
    );
};

export default Contacto;
