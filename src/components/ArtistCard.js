import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import utils from '../styles/utils'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function ArtistCard({ nome }) {
    return (
        <TouchableOpacity style={styles.card}>
            <FontAwesome6 name="user-circle" size={70} color="#606060" />
            <View>
                <Text style={styles.nome}>{nome}</Text>
                <Text style={styles.description}>Artista</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ...utils,

    card: {
        width: '100%',
        paddingVertical: '1%',
        paddingHorizontal: '2%',
        backgroundColor: '#171717',
        flexDirection: 'row',
        gap: '2%',
        borderRadius: 10,
        alignItems: 'center'
    },

    nome: {
        color: 'white',
        fontSize: 26,
        fontWeight: 700,
    },

    description: {
        color: '#818181',
        fontSize: 18,
        fontWeight: 700,
    },
})