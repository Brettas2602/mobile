import { Platform, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import utils from "../src/styles/utils";
import { useState } from "react";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as DocumentPicker from 'expo-document-picker';
import axios from "axios";
import { router } from "expo-router";
import apiUrl from "../src/urls/apiUrl"

const MUSIC_API_URL = `${apiUrl}/api/musics`

export default function addMusic() {

    const [nome, setNome] = useState('')
    const [file, setFile] = useState('')
    const [fileDetails, setFileDetails] = useState()
    const [message, setMessage] = useState()

    async function pickFile() {
        try {
            const result = await DocumentPicker.getDocumentAsync({type: "audio/*"})

            if(result.canceled) {
                return
            }

            const fileAsset = result.assets[0]
            setFileDetails(fileAsset)
            console.log(fileAsset)
            setFile(fileAsset.name)
        } catch (err) {
            console.error(err)
            setFile('Erro ao escolher arquivo')
        }
    }
    
    async function insertMusic() {
        if (!fileDetails) {
            alert("Select a file")
            return
        }

        const fileUri = Platform.OS === 'ios' ? fileDetails.uri.replace('file://', '') : fileDetails.uri

        const fileInfo = {
            uri: fileUri,
            type: fileDetails.mimeType,
            name: fileDetails.name,
            size: fileDetails.size
        }

        const {data} = await axios.post(
            MUSIC_API_URL,
            {
                name: nome,
                artista: "Você",
                curtida: false,
                file: fileInfo
            }
        )

        setNome('')
        setFile('')
        setFileDetails(null)
        router.navigate('/(tabs)/home')
    }

    return(
        <View style={styles.container}>
            <TextInput
                style={[styles.utils.input, { textAlign: 'center', marginTop: -10 }]}
                onChangeText={setNome}
                value={nome}
                placeholder="Digite o nome da música"
                placeholderTextColor='#555555'
            />

            <TouchableOpacity style={styles.filePicker} onPress={pickFile}>
                <View style={{alignItems: 'center'}}>
                    <Text style={[styles.utils.text, {color: '#555555'}]}>{file || 'Selecione o arquivo .mp3'}</Text>
                    <FontAwesome6 name="download" size={40} color="#555555" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.utils.button} onPress={insertMusic}>
                <Text style={styles.utils.text}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    ...utils,

    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 150
    },

    filePicker: {
        backgroundColor: '#323232',
        width: '100%',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        gap: 10
    }
})