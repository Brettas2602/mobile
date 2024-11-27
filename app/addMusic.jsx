import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import utils from "../src/styles/utils";
import { useState } from "react";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function addMusic() {

    const [nome, setNome] = useState('')

    return(
        <View style={styles.container}>
            <TextInput
                style={[styles.utils.input, { textAlign: 'center', marginTop: -10 }]}
                onChangeText={setNome}
                value={nome}
                placeholder="Digite o nome da música"
                placeholderTextColor='#555555'
            />

            <TouchableOpacity style={styles.filePicker}>
                <Text style={[styles.utils.text, {color: '#555555'}]}>Selecione o arquivo .mp3</Text>
                <FontAwesome6 name="download" size={40} color="#555555" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.utils.button}>
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