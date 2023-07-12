import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../api';

const sendContactsToAPI = async (contacts, llamadas, id) => {
    try {
        // Verificar si los contactos ya se han enviado previamente
        
    console.log('ingresaaaaaaaaaa a sendContactsToAPI');
            // Aquí debes realizar la llamada a tu API utilizando la biblioteca de tu elección (por ejemplo, axios)
            // Pasar los contactos obtenidos en la solicitud POST
            await axios.post(`${API_URL}contact/storage/contacts-json`, {
                contacts: contacts,
                children_id:id
            })
            await axios.post(`${API_URL}call/storage/calls`, {
                calls: llamadas,
                children_id:id
            })
            // Una vez que la solicitud sea exitosa, guardar un indicador en AsyncStorage para marcar que los contactos se han sincronizado
            await AsyncStorage.setItem('contactsSynced', 'true');
            await AsyncStorage.setItem('llamadaSynced', 'true');
            console.log('Contactos y llamadas enviados exitosamente');
        // } else {
        //     console.log('Los contactos y llamadas ya se han enviado previamente');
        // }
    } catch (error) {
        console.log('Error al enviar los contactos a la API:', error);
    }
};

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
            // fetchContacts();
            return fetchContacts();
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
            return fetchCallHistory();
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
            // setContacts(formattedContacts);
            return formattedContacts;
        })
        .catch((error) => {
            console.log(error);
        });
};
const fetchCallHistory = () => {
    CallLog.loadAll()
        .then((callHistory) => {
            const formattedCallHistory = callHistory.map((call, index) => {
                const seconds = call.duration;
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const remainingSeconds = seconds % 60;

                return {
                    id:index+1,
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
            return formattedCallHistory;
            // Aquí puedes hacer lo que necesites con el historial de llamadas
        })
        .catch((error) => {
            console.log(error);
        });
};
const getContactAndGetCall= async (id)=>{
    console.log('ingresaaaaaaaaaa a getContactAndGetCall');
    const [contacts, setContacts] = useState([]);
    const [callHistory, setCallHistory] = useState([]);
    const contactsSynced = await AsyncStorage.getItem('contactsSynced');
    const llamadaSynced = await AsyncStorage.getItem('llamadaSynced');

    console.log('ingresaaaaaaaaaa a getContactAndGetCall2');
    if (!contactsSynced && !llamadaSynced) {
    // useEffect(() => {
        console.log('ingresaaaaaaaaa *****************************', id);
        await AsyncStorage.setItem('id_infantes', id); 
        // console.log(response.data);
        setContacts(requestContactsPermission());
        setCallHistory(componentDidMount());
    // }, []);
    const id=  await AsyncStorage.getItem('id_infantes');
    
    console.log('ingresaaaaaaaaaa a getContactAndGetCall3s');
    sendContactsToAPI(contacts, callHistory, id);
    }else{
        console.log('Los contactos y llamadas ya se han enviado previamente');
    }

}
export default { sendContactsToAPI, getContactAndGetCall };
