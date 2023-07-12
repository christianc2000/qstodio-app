import axios from 'axios';
import RNFS from 'react-native-fs';

const sendImagesToAPI = async (carpeta, childrenid) => {
  const folderPath = `${RNFS.DocumentDirectoryPath}/${carpeta}`; // Ruta completa de la carpeta de imágenes
  const files = await RNFS.readDir(folderPath); // Obtener la lista de archivos en la carpeta

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const filePath = file.path;

    try {
      // Obtén el contenido del archivo en base64 utilizando RNFS.readFile
      const content = await RNFS.readFile(filePath, 'base64');

      // Crea un objeto FormData y agrega el contenido del archivo
      const formData = new FormData();
      formData.append('photo', content);
      formData.append('children_id', childrenid);

      // Realiza la solicitud POST a la API con el objeto FormData
      const response = await axios.post(`${API_URL}controlDownload`, formData);

      // Maneja la respuesta de la API si es necesario
      console.log('Respuesta de la API:', response.data);
    } catch (error) {
      // Maneja el error al enviar la imagen a la API
      console.log('Error al enviar la imagen a la API:', error);
    }
  }

  // Se han enviado todas las imágenes
  console.log('Todas las imágenes han sido enviadas a la API');
};

// Ejecuta la función sendImagesToAPI con los parámetros deseados
(async () => {
  const carpeta = 'nombre_de_la_carpeta'; // Reemplaza con el nombre de tu carpeta
  const childrenid = 'id_del_niño'; // Reemplaza con el ID del niño
  await sendImagesToAPI(carpeta, childrenid);
  // Tarea completada
})();
