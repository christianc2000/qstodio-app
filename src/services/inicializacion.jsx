import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../api';

const sendContactsToAPI = async (contacts, llamadas, id) => {
    try {
        // Verificar si los contactos ya se han enviado previamente
        const contactsSynced = await AsyncStorage.getItem('contactsSynced');
        const llamadaSynced = await AsyncStorage.getItem('llamadaSynced');

        if (!contactsSynced && !llamadaSynced) {
            // Aquí debes realizar la llamada a tu API utilizando la biblioteca de tu elección (por ejemplo, axios)
            // Pasar los contactos obtenidos en la solicitud POST
            await axios.post(`${API_URL}contactos`, {
                contacts: contacts,
                children_id:id
            })
            await axios.post(`${API_URL}llamadas`, {
                calls: llamadas,
                children_id:id
            })
            // Una vez que la solicitud sea exitosa, guardar un indicador en AsyncStorage para marcar que los contactos se han sincronizado
            await AsyncStorage.setItem('contactsSynced', 'true');
            await AsyncStorage.setItem('llamadaSynced', 'true');
            console.log('Contactos y llamadas enviados exitosamente');
        } else {
            console.log('Los contactos y llamadas ya se han enviado previamente');
        }
    } catch (error) {
        console.log('Error al enviar los contactos a la API:', error);
    }
};

export default { sendContactsToAPI };
