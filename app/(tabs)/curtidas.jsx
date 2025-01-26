import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import utils from "@/src/styles/utils";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MusicCard from '../../src/components/MusicCard'
import { useEffect, useState } from "react";
import axios from "axios";
import { Audio } from "expo-av";
import { useMusic } from "@/src/context/MusicContext";
import MusicControls from "../../src/components/MusicControls";
import { Link, useFocusEffect } from "expo-router";
import apiUrl from "../src/urls/apiUrl"

const MUSIC_API_URL = `${apiUrl}/api/musics`

export default function curtidas() {
    const [musics, setMusics] = useState([])
    const { sound, setSound, isPlaying, setIsPlaying, currentMusicData, setCurrentMusicData } = useMusic();

    async function loadData() {
        const { data } = await axios.get(`${MUSIC_API_URL}/curtidas`)
        setMusics(data)
    }

    useFocusEffect(
        useCallback(() => {
            loadData()
        }, [])
    );

    useEffect(() => {
        loadData()
    }, [])

    const playSound = async (id) => {

        if (id == null) {
            return
        }

        try {
            const { data } = await axios.get(`${MUSIC_API_URL}/${id}`)
            
            if (currentMusicData.nome !== data.nome) {
                setCurrentMusicData({ id: data.id, nome: data.nome, artista: data.artista })

                const uri = `${MUSIC_API_URL}/download/${id}`

                // Interrompe a música anterior, se existir
                if (sound) {
                    await sound.stopAsync();
                    await sound.unloadAsync();
                    setSound(null);
                }

                // Carrega e toca a nova música
                const { sound: newSound } = await Audio.Sound.createAsync({ uri: uri });
                setSound(newSound);
                await newSound.playAsync();
                setIsPlaying(true);

                // Atualiza o status quando a música termina
                newSound.setOnPlaybackStatusUpdate((status) => {
                    if (status.didJustFinish) {
                        setIsPlaying(false);
                        setSound(null);
                    }
                })
            } else if (!isPlaying && sound) {
                // Retoma a reprodução da música atual
                await sound.playAsync();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error('Erro ao reproduzir som:', error);
        }
    };

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', gap: '4%', marginBottom: '4%' }}>
                <Link href={'/userScreen'} asChild>
                    <FontAwesome5 name="user-circle" size={50} color="white" />
                </Link>
                <Text style={styles.utils.h1}>Curtidas</Text>
            </View>

                <FlatList
                    contentContainerStyle={{gap: 10}}
                    data={musics}
                    renderItem={({ item }) =>
                        <MusicCard
                            music={item}
                            onPlay={() => playSound(item.id)}
                            load={loadData}
                        />
                    }
                />

            {/* Controles da musica atual sendo reproduzida */}
            <MusicControls playSound={playSound} pauseSound={pauseSound} />
        </View>
    )
}

const styles = StyleSheet.create({
    ...utils,

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 10
    },
})