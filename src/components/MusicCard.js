import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import utils from '../styles/utils';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MusicCard({ nome, artista, curtida, onPlay }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPlay}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="musical-notes-outline" size={70} color="#606060" />
                <View>
                    <Text style={styles.utils.nome}>{nome}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: '5%' }}>
                        <Text style={styles.utils.description}>Música</Text>
                        <View style={styles.circle}></View>
                        <Text style={styles.utils.description}>{artista}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                <Ionicons name="heart-outline" size={45} color={curtida ? 'red' : 'white'} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    ...utils,
    card: {
        width: '100%',
        paddingVertical: '1%',
        paddingRight: '4%',
        backgroundColor: '#171717',
        flexDirection: 'row',
        gap: '2%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    circle: {
        backgroundColor: '#818181',
        borderRadius: '50%',
        width: 10,
        height: 10,
        marginTop: '4%'
    }
});
