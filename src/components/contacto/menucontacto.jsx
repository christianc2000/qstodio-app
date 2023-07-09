import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import colors from '../../styles/colors';
import CallItem from './datallamada';

class MenuWithContent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'Option 1',
        };
    }

    handleOptionPress = (option) => {
        this.setState({ selectedOption: option });
    };

    renderItem = ({ item }) => (
        <View style={styles.cardContainer}>
            <View style={styles.textContainer}>
                <Text style={[styles.texto, { fontWeight: 'bold' }]}>{item.name}</Text>
                <Text style={styles.texto}>{item.number}</Text>
            </View>
        </View>
    );

    renderItemCall = ({ item }) => {
        const { hours, minutes, seconds } = item.duration;
        const formattedDuration = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        return (
            <CallItem type={item.rawType} duration={formattedDuration} date={item.dateTime} contact={{ name: item.name, number: item.phoneNumber }} />
        );
    };

    render() {
        const { selectedOption } = this.state;
        const { contacts, callHistory } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.menu}>
                    <TouchableOpacity
                        style={[styles.option,{borderTopLeftRadius:10, borderBottomLeftRadius:10}, selectedOption === 'Option 1' && styles.selectedOption]}
                        onPress={() => this.handleOptionPress('Option 1')}
                    >
                        <Text style={styles.optionText}>Registros</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.option,{borderTopRightRadius:10, borderBottomRightRadius:10}, selectedOption === 'Option 2' && styles.selectedOption]}
                        onPress={() => this.handleOptionPress('Option 2')}
                    >
                        <Text style={styles.optionText}>Llamadas</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    {selectedOption === 'Option 1' && (
                        <View style={{ flex: 1, height: Dimensions.get('window').height - 200 }}>
                            <Text style={[styles.texto, { padding: 5, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }]}>
                                Contactos ({contacts.length})
                            </Text>
                            <FlatList
                                data={contacts}
                                renderItem={this.renderItem}
                                keyExtractor={(item) => item.id}
                                scrollEventThrottle={32} // Ajusta este valor para controlar la velocidad de desplazamiento
                                initialNumToRender={10} // Ajusta este valor a un número menor  
                            />
                        </View>
                    )}
                    {selectedOption === 'Option 2' && (
                        <View style={{ flex: 1, height: Dimensions.get('window').height - 200 }}>
                            <Text style={[styles.texto, { padding: 5, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }]}>
                                Llamadas ({callHistory.length})
                            </Text>
                            <FlatList
                                data={callHistory}
                                renderItem={this.renderItemCall}
                                keyExtractor={(item) => item.id}
                                scrollEventThrottle={32} // Ajusta este valor para controlar la velocidad de desplazamiento
                                initialNumToRender={10} // Ajusta este valor a un número menor  
                            />
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop:20,
        
    },
    menu: {
        flexDirection: 'row',
       
    },
    option: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        width: '50%',
        borderWidth: 1,
        borderColor: colors.PRIMARY,
    },
    selectedOption: {
        backgroundColor: colors.PRIMARY,
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.WHITE,
    },
    content: {
        flex: 1,
        marginTop:10,
      
    },
    texto: {
        color: colors.BLACK,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingVertical: 6,
        paddingHorizontal: 16,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        
        justifyContent: 'space-between',
    },
    textoCard: {
        fontSize: 14,
        color: colors.BLACK,
    },
});

export default MenuWithContent;
