import { Platform } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import Geolocation from 'react-native-geolocation-service';

const sendLocationToWebSocket = () => {
  // Aquí debes implementar la lógica para enviar la ubicación a tu websocket
  // Puedes utilizar la biblioteca de tu elección para establecer una conexión websocket y enviar la ubicación
  // Ejemplo: 
  // const location = ... // Obtén la ubicación actual del dispositivo utilizando Geolocation.getCurrentPosition()
  // websocket.send(JSON.stringify(location));
};

const startLocationService = () => {
  // Ejecuta la función sendLocationToWebSocket cada 10 segundos
  const timerId = BackgroundTimer.setInterval(() => {
    sendLocationToWebSocket();
  }, 10000);

  // Limpia el intervalo y detiene el servicio al detener la aplicación o cambiar de pantalla
  const cleanup = () => {
    BackgroundTimer.clearInterval(timerId);
    Geolocation.stopObserving();
  };

  // Detiene el servicio al cerrar la aplicación en iOS
  if (Platform.OS === 'ios') {
    const stopBackgroundTask = () => {
      cleanup();
      BackgroundTimer.stopBackgroundTimer();
    };

    BackgroundTimer.startBackgroundTimer();
    Geolocation.getCurrentPosition(sendLocationToWebSocket);
    BackgroundTimer.addEventListener('backgroundTimerStopped', stopBackgroundTask);
  }

  return cleanup;
};

export default startLocationService;
