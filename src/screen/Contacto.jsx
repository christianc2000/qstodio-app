import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import CallLog from 'react-native-call-log';

import colors from '../styles/colors';
import MenuWithContent from '../components/contacto/menucontacto';
import axios from 'axios';
import { API_URL } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Contacto = ({ navigation, route }) => {
  
    console.log(route);
    console.log(AsyncStorage.getItem('id_infantes'));
    const { id} = route.params;
    // const id = await AsyncStorage.getItem('id_infantes');
    axios.post(API_URL+'contact/kid/'+ id)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <MenuWithContent contacts={contacts} callHistory={callHistory} /> */}

        </SafeAreaView>
    );
};

export default Contacto;
