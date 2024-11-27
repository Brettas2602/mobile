import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from "react-native";
import utils from '../../src/styles/utils';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import MusicCard from '../../src/components/MusicCard';
import ArtistCard from "../../src/components/ArtistCard";
import { Link } from "expo-router";

export default function home() {
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('Todos');
    const [currentPathTrack, setCurrentPathTrack] = useState(null);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMusicData, setCurrentMusicData] = useState({ nome: null, artista: null });

    const playSound = async (fileName) => {
        try {
            if (currentPathTrack !== fileName) {
                // Interrompe a música anterior, se existir
                if (sound) {
                    await sound.stopAsync();
                    await sound.unloadAsync();
                    setSound(null);
                }

                // Carrega e toca a nova música
                const { sound: newSound } = await Audio.Sound.createAsync(require('../../assets/audio/Delusions of Saviour - Slayer.mp3'));
                setSound(newSound);
                setCurrentPathTrack(fileName);
                await newSound.playAsync();
                setIsPlaying(true);

                // Atualiza o status quando a música termina
                newSound.setOnPlaybackStatusUpdate((status) => {
                    if (status.didJustFinish) {
                        setIsPlaying(false);
                        setSound(null);
                        setCurrentPathTrack(null);
                    }
                });
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
                    onChangeText={setSearch}
                    value={search}
                    placeholder="O que você deseja ouvir?"
                    placeholderTextColor='#555555'
                />
            </View>

            {/* Filtros de pesquisa */}
            <View style={styles.selectType}>
                {['Todos', 'Músicas', 'Artistas'].map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[styles.option, { backgroundColor: selectedOption === option ? '#67972A' : '#323232' }]}
                        onPress={() => setSelectedOption(option)}
                    >
                        <Text style={styles.utils.text}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Musicas e artistas */}
            <ScrollView contentContainerStyle={{ gap: 10 }} style={{ flex: 1, width: '100%' }}>
                <MusicCard
                    nome='Delusions of Savior'
                    artista='Slayer'
                    curtida={true}
                    onPlay={() => {
                        playSound();
                        setCurrentMusicData({ nome: 'Delusions of Savior', artista: 'Slayer' });
                    }}
                />
                <ArtistCard nome='Você' />
            </ScrollView>

            {/* Controles da musica atual sendo reproduzida */}
            {sound
                ?
                <View style={styles.currentMusicContainer}>
                    <View>
                        <Text style={[styles.utils.nome, { fontSize: 20 }]}>{currentMusicData.nome || 'teste nome musica'}</Text>
                        <Text style={[styles.utils.description, { fontSize: 16 }]}>{currentMusicData.artista}</Text>
                    </View>
                    {!isPlaying 
                        ?
                        <TouchableOpacity onPress={playSound}>
                            <Ionicons name="play-circle-sharp" size={50} color="white" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={pauseSound}>
                            <Ionicons name="pause-circle" size={50} color="white" />
                        </TouchableOpacity>
                    }
                </View>
                :
                <></>
            }
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
    currentMusicContainer: {
        backgroundColor: '#323232',
        width: '107%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});
