import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/loginScreen';
import InicioScreen from '../screen/inicioScreen';
import ContactoScreen from '../screen/contactoScreen';
import TrackingScreen from '../screen/trackingScreen';

import colors from '../styles/colors';

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

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        setAccessToken(token);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('Error retrieving access token:', error);
    }
  };

  const handleLogin = async (token) => {
    try {
      await AsyncStorage.setItem('accessToken', token);
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
              <LoginScreen onLogin={handleLogin} navigation={navigation} />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Inicio" component={InicioScreen} />
            <Stack.Screen name="Contacto" component={ContactoScreen} />
            <Stack.Screen name="Tracking" component={TrackingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
