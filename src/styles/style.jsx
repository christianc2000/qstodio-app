import { StyleSheet } from 'react-native';
import colors from './colors';

// Estilos para MainScreen
const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PRIMARY
    },
    containerOn: {
        flex: 1,
        padding: 25,
        alignItems: "center",
        backgroundColor: colors.FONDO,
        borderBottomLeftRadius: 70,
        borderTopRightRadius: 70
    },
});

//Estilos del inicioScreen
const inicioStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PRIMARY
    },
    containerOnTop: {
        height: 60
    },
    containerOnBottom: {
        flex: 1,
        backgroundColor: colors.FONDO,
        
    },
    containerFila: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:25,
       
    },
})

export { loginStyles, inicioStyles };
