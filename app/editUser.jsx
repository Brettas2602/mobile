import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import utils from "../src/styles/utils";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from "react";
import { router } from "expo-router";
import { useUser } from "../src/context/UserContext";
import axios from "axios";
import apiUrl from "../src/urls/apiUrl"

USER_API_URL = `${apiUrl}/api/usuario`

export default function editUSer() {
    const {id, nomeUsuario, setNomeUsuario, email, setEmail, setSenha} = useUser()

    const [campoNomeUsuario, onChangeCampoNomeUsuario] = useState(nomeUsuario)
    const [campoEmail, onChangeCampoEmail] = useState(email)
    const [campoSenha, onChangeCampoSenha] = useState('')
    const [campoConfirmarSenha, onChangeCampoConfirmarSenha] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    async function verificarCampos() {
        if (campoSenha.trim().length === 0 ||
            campoConfirmarSenha.trim().length === 0) {
            setMessage('Todos os campos devem ser preenchidos!')
            setError(true)
        } else if (campoSenha != campoConfirmarSenha) {
            setMessage('As senhas não estão iguais!')
            setError(true)
        } else {
            const {data} = await axios.put(USER_API_URL, {
                id: id,
                nomeDeUsuario: campoNomeUsuario,
                email: campoEmail,
                senha: campoSenha
            })

            setNomeUsuario(data.nomeDeUsuario)
            setEmail(data.email)
            setSenha(data.senha)

            setError(false)
            router.back()
        }
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            <FontAwesome5 name="user-circle" size={200} color="white" />

            <TextInput
                style={[styles.utils.input, { textAlign: 'center' }]}
                onChangeText={onChangeCampoNomeUsuario}
                value={campoNomeUsuario}
            />

            <TextInput
                style={[styles.utils.input, { textAlign: 'center' }]}
                onChangeText={onChangeCampoEmail}
                value={campoEmail}
            />

            <TextInput
                style={[styles.utils.input, { textAlign: 'center' }]}
                onChangeText={onChangeCampoSenha}
                value={campoSenha}
                placeholder="Digite a nova senha"
                placeholderTextColor='#555555'
            />

            <TextInput
                style={[styles.utils.input, { textAlign: 'center' }]}
                onChangeText={onChangeCampoConfirmarSenha}
                value={campoConfirmarSenha}
                placeholder="Confirme a nova senha"
                placeholderTextColor='#555555'
            />

            {error ?
                <View style={[styles.utils.alert, { width: '100%', height: 70 }]}>
                    <Text style={[styles.utils.text, { color: 'red', textAlign: 'center' }]}>{message}</Text>
                </View>
                : <></>
            }

            <TouchableOpacity style={styles.utils.button} onPress={verificarCampos}>
                <Text style={styles.utils.text}>Confirmar Mudancas</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    ...utils,

    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 15,
    }
})