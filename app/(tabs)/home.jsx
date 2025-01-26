import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList } from "react-native";
import utils from '../../src/styles/utils';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useEffect, useState } from "react";
import { Audio } from "expo-av";
import MusicCard from '../../src/components/MusicCard';
import { Link, useFocusEffect } from "expo-router";
import axios from "axios";
import { useMusic } from "../../src/context/MusicContext";
import MusicControls from "../../src/components/MusicControls";
import apiUrl from "../src/urls/apiUrl"


const MUSIC_API_URL = `${apiUrl}/api/musics`

export default function home() {
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('Todos');
    const [musics, setMusics]= useState([])
    const [filteredMusics, setFilteredMusics] = useState([])
    const { sound, setSound, isPlaying, setIsPlaying, currentMusicData, setCurrentMusicData } = useMusic();

    async function loadData() {
        const {data} = await axios.get(MUSIC_API_URL)
        setMusics(data)
        setFilteredMusics(data)
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
            const {data} = await axios.get(`${MUSIC_API_URL}/${id}`)
            
            if (currentMusicData.nome !== data.nome) {
                setCurrentMusicData(data)
                
                const uri = `${MUSIC_API_URL}/download/${id}`

                // Interrompe a música anterior, se existir
                if (sound) {
                    await sound.stopAsync();
                    await sound.unloadAsync();
                    setSound(null);
                }

                // Carrega e toca a nova música
                const { sound: newSound } = await Audio.Sound.createAsync({uri: uri});
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

    async function searchData(search) {
        setFilteredMusics(musics.filter((music) => 
            music.nome.toLowerCase().includes(search.toLowerCase())
        ))
        setSearch(search)
    }

    return (
        <View style={styles.container}>
            {/* Header da tela */}
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: '10%' }}>
                    <Link href={'/userScreen'} asChild>
                        <FontAwesome5 name="user-circle" size={50} color="white" />
                    </Link>
                    <Text style={styles.utils.h1}>Busca</Text>
                </View>
                <Link href={'/addMusic'} asChild>
                    <Ionicons name="add-circle-outline" size={50} color="white" />
                </Link>
            </View>

            {/* Barra de pesquisa */}
            <View style={styles.searchBar}>
                <Ionicons name="search" size={24} color="#555555" />
                <TextInput
                    style={[styles.utils.text, { width: '100%' }]}
                    onChangeText={searchData}
                    value={search}
                    placeholder="O que você deseja ouvir?"
                    placeholderTextColor='#555555'
                />
            </View>

            {/* Musicas e artistas */}
                <FlatList
                    contentContainerStyle={{gap: 10}}
                    data={filteredMusics}
                    renderItem={({item}) => {
                        return <MusicCard 
                            music={item}
                            onPlay={() => playSound(item.id)}
                            load={loadData}
                        /> 
                    }}
                />
            {/* Controles da musica atual sendo reproduzida */}
            <MusicControls playSound={playSound} pauseSound={pauseSound} />
        </View>
    );
}

const styles = StyleSheet.create({
    ...utils,

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 10
    },
    searchBar: {
        alignItems: 'center',
        marginVertical: '4%',
        backgroundColor: '#323232',
        width: '107%',
        paddingVertical: '3%',
        paddingHorizontal: '7%',
        gap: '3%',
        flexDirection: 'row'
    },
    selectType: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: '4%'
    },
    option: {
        width: '30%',
        borderRadius: 25,
        paddingVertical: '1%',
        alignItems: 'center',
    },
});
