import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMusic } from '../context/MusicContext';
import utils from '../styles/utils';

export default function MusicControls({playSound, pauseSound}) {
    const { sound, isPlaying, currentMusicData } = useMusic();

    if (!sound) return null;

    return (
        <View style={styles.container}>
            <View>
                <Text style={[styles.utils.nome, { fontSize: 20 }]}>{currentMusicData.nome || 'teste nome musica'}</Text>
                <Text style={[styles.utils.description, { fontSize: 16 }]}>{currentMusicData.artista}</Text>
            </View>
            {!isPlaying ? 
                <TouchableOpacity onPress={() => playSound(currentMusicData.id)}>
                    <Ionicons name="play-circle-sharp" size={50} color="white" />
                </TouchableOpacity>
            : 
                <TouchableOpacity onPress={() => pauseSound()}>
                    <Ionicons name="pause-circle" size={50} color="white" />
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    ...utils,

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#323232',
        padding: 10,
        width: '107%'
    },
});
