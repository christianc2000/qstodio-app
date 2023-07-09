import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/Login';
import Inicio from '../screen/Inicio';
import Contacto from '../screen/Contacto';
import Tracking from '../screen/Tracking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/colors';
import { API_URL } from '../api';
import axios from 'axios';

const Stack = createNativeStackNavigator();

const myConfig = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: colors.PRIMARY,
  },
  headerTitleStyle: {
    color: 'white',
    fontSize: 20,
  },
  presentation: 'modal',
  animationEnabled: true,
  gestureEnabled: true,
  animationTypeForReplace: 'push',
  keyboardHandlingEnabled: true,
};

const RootNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState('');

  React.useEffect(() => {
    checkLoginStatus();
  }, []);
  //verificamos si el token aún está activo para que no nos pida ir al login, sino directamente podamos ingresar
  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token != null) {
        const response = await axios.post(`${API_URL}verify-token`, {
          token: token
        });
        console.log("RESPONSE: " + response.data);
        if (response.status === 200) {
          //setAccessToken(token);
          setIsLoggedIn(true);
        } else {
          // El token no está activo, lo eliminamos del AsyncStorage
          await AsyncStorage.removeItem('accessToken');
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.log('Error retrieving access token:', error);
    }
  };


  const handleLogin = async (token) => {
    try {

      await AsyncStorage.setItem('accessToken', token);
      console.log("SE GUARDÓ CORRECTAMENTE EL TOKEN EN EL ASYNCSTORAGE");
      console.log(token);
      setAccessToken(token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('Error saving access token:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      setAccessToken('');
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Error removing access token:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={myConfig}
        headerMode="screen"
      >
        {!isLoggedIn ? (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {({ navigation }) => (
              <Login onLogin={handleLogin} navigation={navigation} />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Inicio">
              {() => <Inicio onLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="Contacto" component={Contacto} />
            <Stack.Screen name="Tracking" component={Tracking} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
