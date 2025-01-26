import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import utils from '../styles/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from "axios";

const MUSIC_API_URL = "http://192.168.1.7:8080/api/musics"

export default function MusicCard({ music, onPlay, load }) {

    async function alternarCurtida() {
            const result = await axios.put(MUSIC_API_URL,
                {
                    id: music.id,
                    nome: music.nome,
                    artista: music.artista,
                    fileName: music.fileName,
                    curtida: !music.curtida,
                    createdAt: music.createdAt
                }
            )
            load()
    }

    return (
        <TouchableOpacity style={styles.card} onPress={onPlay}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '87%'}}>
                <Ionicons name="musical-notes-outline" size={70} color="#606060" />
                <View style={{width: '75%'}}>
                    <View>
                        <Text style={[styles.utils.nome]}>{music.nome}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: '5%', width: '60%' }}>
                        <Text style={styles.utils.description}>Música</Text>
                        <View style={styles.circle}></View>
                        <Text style={styles.utils.description}>{music.artista}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={alternarCurtida} style={{ alignItems: 'flex-end' }}>
                <Ionicons name="heart" size={45} color={music.curtida ? 'red' : 'white'} />
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
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    circle: {
        backgroundColor: '#818181',
        borderRadius: '50%',
        width: 10,
        height: 10,
        marginTop: '4%',
    }
});
