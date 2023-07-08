import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'fade',
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={myConfig}
        />
        <Stack.Screen
          name="Contacto"
          component={ContactoScreen}
          options={myConfig}
        />
        <Stack.Screen
          name="Tracking"
          component={TrackingScreen}
          options={myConfig}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
