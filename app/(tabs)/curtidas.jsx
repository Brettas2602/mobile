import { ScrollView, StyleSheet, Text, View } from "react-native";
import utils from "@/src/styles/utils";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MusicCard from '../../src/components/MusicCard'

export default function curtidas() {
    return (
        <View style={styles.container}> 
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: '4%', marginBottom: '4%' }}>
                <FontAwesome5 name="user-circle" size={50} color="white" />
                <Text style={styles.utils.h1}>Curtidas</Text>
            </View>

            <ScrollView contentContainerStyle={{gap: 10}} style={{flex: 1, width: '100%'}}>
                <MusicCard nome='Mirror Ball' artista='Você' curtida={true} />
                <MusicCard nome='Burn for You' artista='Notize' curtida={true} />
                <MusicCard nome='Musica 1' artista='Você' curtida={true} />
                <MusicCard nome='Musica 2' artista='Você' curtida={true} />
                <MusicCard nome='Musica 3' artista='Você' curtida={true} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    ...utils,

    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10
    },
})