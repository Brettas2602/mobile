import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import utils from '../../src/styles/utils'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import MusicCard from '../../src/components/MusicCard'
import ArtistCard from "../../src/components/ArtistCard";

export default function home() {

    const [search, setSearch] = useState('')
    const [selectedOption, setSelectedOption] = useState('Todos')

    function changeSelectedOption(option) {
        setSelectedOption(option)
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: '10%' }}>
                    <FontAwesome5 name="user-circle" size={50} color="white" />
                    <Text style={styles.utils.h1}>Busca</Text>
                </View>
                <Ionicons name="add-circle-outline" size={50} color="white" />
            </View>

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

            <View style={styles.selectType}>
                {['Todos', 'Músicas', 'Artistas'].map((option) => (
                    <TouchableOpacity 
                        key={option}
                        style={[styles.option, {backgroundColor: selectedOption === option ? '#67972A' : '#323232'}]}
                        onPress={() => changeSelectedOption(option)}
                    >
                        <Text style={styles.utils.text}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            
            <ScrollView contentContainerStyle={{gap: 10}} style={{flex: 1, width: '100%'}}>
                <MusicCard nome='Mirror Ball' artista='Você' curtida={true} />
                <MusicCard nome='Burn for You' artista='Notize' curtida={false} />
                <ArtistCard nome='Você' />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
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

    ...utils
})